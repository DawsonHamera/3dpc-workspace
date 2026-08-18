import type { Bindings, ServicesContext } from "../../types";

import {
    createResource,
    createOnshapeResource,
    addResourceToProject,
    deleteOnshapeResource,
    deleteResourceFromProject,
    findOnshapeResourceByDocumentId,
} from "./repository";

import {
    AppError,
} from "../../lib/errors";
import { getOnshapeDocument } from "../onshape/service";
import { projectResources } from "../../db/schema";
import { and, eq } from "drizzle-orm";

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

    const existingOnshapeResource = await findOnshapeResourceByDocumentId(
        services.db,
        documentId
    );

    if (existingOnshapeResource) {
        await addResourceToProject(
            services.db,
            {
                projectId,
                resourceId: existingOnshapeResource.resourceId,
            },
        );

        return existingOnshapeResource;
    }

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

    const resourcesWithFailures = await Promise.all(
        resources.map(async ({ resource }) => {
            if (resource.type === "onshape") {
                if (!resource.onshape) {
                    throw new AppError(
                        500,
                        "INVALID_RESOURCE",
                        "Onshape resource is missing its Onshape data",
                    );
                }

                try {
                    const document = await getOnshapeDocument({
                        services,
                        env,
                        userId: resource.createdBy,
                        documentId: resource.onshape.documentId,
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
                } catch {
                    return null;
                }
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

    return resourcesWithFailures.filter(
        (resource): resource is NonNullable<typeof resource> =>
            resource !== null
    );
};

export const deleteOnshapeProjectResource = async ({
    services,
    projectId,
    resourceId,
}: {
    services: ServicesContext;
    projectId: string;
    resourceId: string;
}) => {
    const resource =
        await services.db.query.projectResources.findFirst({
            where: and(
                eq(projectResources.projectId, projectId),
                eq(projectResources.resourceId, resourceId),
            ),
            with: {
                resource: {
                    with: {
                        onshape: true,
                    },
                },
            },
        });

    if (!resource) {
        throw new AppError(
            404,
            "RESOURCE_NOT_FOUND",
            "Resource not found in project",
        );
    }

    if (resource.resource.type !== "onshape") {
        throw new AppError(
            400,
            "INVALID_RESOURCE_TYPE",
            "Resource is not an Onshape resource",
        );
    }

    await deleteResourceFromProject(
        services.db,
        projectId,
        resourceId,
    );

    const remaining =
        await services.db.query.projectResources.findFirst({
            where: eq(
                projectResources.resourceId,
                resourceId,
            ),
        });

    if (!remaining) {
        await deleteOnshapeResource(
            services.db,
            resourceId,
        );
    }

};