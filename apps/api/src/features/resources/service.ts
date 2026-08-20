import type { Bindings, ServicesContext } from "../../types";

import {
    createResource,
    createOnshapeResource,
    createFileResourceRecord,
    addResourceToProject,
    deleteOnshapeResource,
    deleteResourceFromProject,
    findOnshapeResourceByDocumentId,
} from "./repository";

import { AppError } from "../../lib/errors";
import { getOnshapeDocument } from "../onshape/service";
import { projectResources, resourceFiles, resources } from "../../db/schema";
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
    const existingOnshapeResource =
        await findOnshapeResourceByDocumentId(
            services.db,
            documentId,
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

    const document = await getOnshapeDocument({
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

export const createFileProjectResource = async ({
    services,
    userId,
    projectId,
    fileId,
}: {
    services: ServicesContext;
    userId: string;
    projectId: string;
    fileId: string;
}) => {
    const file = await services.db.query.files.findFirst({
        where: (files, { eq }) =>
            eq(files.id, fileId),
    });

    if (!file) {
        throw new AppError(
            404,
            "FILE_NOT_FOUND",
            "File not found",
        );
    }

    const resource = await createResource(
        services.db,
        {
            createdBy: userId,
            type: "file",
            name: file.originalName,
        },
    );

    await createFileResourceRecord(
        services.db,
        {
            resourceId: resource.id,
            fileId,
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
                    return null;
                }

                try {
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
                } catch {
                    /*
                     * Onshape being unavailable should not
                     * prevent other resources from loading.
                     */
                    return null;
                }
            }

            if (resource.type === "file") {
                if (!resource.file?.file) {
                    return null;
                }

                return {
                    id: resource.id,
                    name: resource.name,
                    type: "file" as const,
                    createdBy: resource.createdBy,
                    createdAt: resource.createdAt,
                    updatedAt: resource.updatedAt,
                    file: resource.file.file,
                };
            }

            return null;
        }),
    );

    return resourcesWithFailures.filter(
        (
            resource,
        ): resource is NonNullable<typeof resource> =>
            resource !== null,
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

export const deleteFileProjectResource = async ({
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
                        file: true,
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

    if (resource.resource.type !== "file") {
        throw new AppError(
            400,
            "INVALID_RESOURCE_TYPE",
            "Resource is not a file resource",
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
        await services.db.delete(resourceFiles)
            .where(
                eq(resourceFiles.resourceId, resourceId),
            );
        await services.db.delete(resources)
            .where(
                eq(resources.id, resourceId),
            );
    }
};