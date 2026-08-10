import type { Bindings, ServicesContext } from "../../types";

import {
    createResource,
    createOnshapeResource,
    addResourceToProject,
} from "./repository";

import {
    AppError,
} from "../../lib/errors";
import { getOnshapeDocument } from "../onshape/service";
import { projectResources } from "../../db/schema";
import { eq } from "drizzle-orm";

export const createOnshapeProjectResource = async ({
    services,
    env,
    userId,
    projectId,
    documentId,
}: {
    services: ServicesContext;
    env: Bindings;
    userId: string;
    projectId: string;
    documentId: string;
}) => {

    /*
     * Get the user's Onshape connection.
     *
     * This is intentionally done through the existing
     * Onshape service rather than touching the connection
     * table directly here.
     */
    const document =
        await getOnshapeDocument({
            services,
            env,
            userId,
            documentId,
        });

    if (!document) {
        throw new AppError(
            404,
            "ONSHAPE_DOCUMENT_NOT_FOUND",
            "Onshape document not found",
        );
    }

    /*
     * Create the generic resource and its type-specific
     * Onshape record together.
     */
    const resource = await createResource(
        services.db,
        {
            createdBy: userId,
            type: "onshape",
            name: document.name,
        },
    );

    await createOnshapeResource(
        services.db,
        {
            resourceId: resource.id,
            documentId,
        },
    );

    await addResourceToProject(
        services.db,
        {
            projectId,
            resourceId: resource.id,
        },
    );

    return resource;
};

export const getProjectResources = async (
    services: ServicesContext,
    env: Bindings,
    projectId: string,
) => {
    const resources =
        await services.db.query.projectResources.findMany({
            where: eq(
                projectResources.projectId,
                projectId,
            ),
            with: {
                resource: {
                    with: {
                        file: {
                            with: {
                                file: true,
                            },
                        },
                        onshape: true,
                    },
                },
            },
        });

    return Promise.all(
        resources.map(async ({ resource }) => {
            if (resource.type === "onshape") {
                console.log(resource)
                if (!resource.onshape) {
                    throw new AppError(
                        500,
                        "INVALID_RESOURCE",
                        "Onshape resource is missing its Onshape data",
                    );
                }

                console.log(
                    "Resource is onshape, fetching document..."
                );

                const document =
                    await getOnshapeDocument({
                        services,
                        env,
                        userId: resource.createdBy,
                        documentId:
                            resource.onshape.documentId,
                    });

                return {
                    id: resource.id,
                    name: resource.name,
                    type: "onshape" as const,
                    createdBy: resource.createdBy,
                    createdAt: resource.createdAt,
                    updatedAt: resource.updatedAt,
                    onshape: document,
                };
            }

            return {
                id: resource.id,
                name: resource.name,
                type: "file" as const,
                createdBy: resource.createdBy,
                createdAt: resource.createdAt,
                updatedAt: resource.updatedAt,
                file: resource.file!.file,
            };
        })
    );
};