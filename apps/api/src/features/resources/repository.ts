import { eq } from "drizzle-orm";

import {
    resources,
    resourceOnshape,
    projectResources,
    CreateResource,
} from "../../db/schema";
import { Db } from "../../types";


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
