import { and, eq } from "drizzle-orm";

import {
    resources,
    resourceOnshape,
    projectResources,
    CreateResource,
    resourceFiles,
} from "../../db/schema";
import { Db, ServicesContext } from "../../types";


export const createResource = async (
    db: Db,
    data: CreateResource,
) => {
    const [resource] = await db
        .insert(resources)
        .values(data)
        .returning();

    return resource;
};

export const createOnshapeResource = async (
    db: Db,
    data: {
        resourceId: string;
        documentId: string;
    },
) => {
    const [resource] = await db
        .insert(resourceOnshape)
        .values(data)
        .returning();

    return resource;
};

export const createFileResourceRecord = async (
    db: Db,
    data: {
        resourceId: string;
        fileId: string;
    },
) => {
    const [resource] = await db
        .insert(resourceFiles)
        .values(data)
        .returning();
    return resource;
}


export const addResourceToProject = async (
    db: Db,
    data: {
        projectId: string;
        resourceId: string;
    },
) => {
    const [projectResource] = await db
        .insert(projectResources)
        .values(data)
        .returning();

    return projectResource;
};

export const deleteOnshapeResource = async (
    db: Db,
    resourceId: string,
) => {
    await db
        .delete(resourceOnshape)
        .where(eq(resourceOnshape.resourceId, resourceId));
}

export const deleteResourceFromProject = async (
    db: Db,
    projectId: string,
    resourceId: string,
) => {
    await db
        .delete(projectResources)
        .where(
            and(
                eq(projectResources.projectId, projectId),
                eq(projectResources.resourceId, resourceId),
            )
        );
}

export const findOnshapeResourceByDocumentId = async (
    db: Db,
    documentId: string,
) => {
    return db.query.resourceOnshape.findFirst({
        where: eq(
            resourceOnshape.documentId,
            documentId,
        ),
        with: {
            resource: true,
        },
    });
};