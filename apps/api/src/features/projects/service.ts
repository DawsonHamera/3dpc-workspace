import { eq } from "drizzle-orm";
import { projectMembers } from "../../db/schema";
import { Db } from "../../types";

export const getProjectBySlug = async (db: Db, projectSlug: string) => {
    return await db.query.projects.findFirst({
        where: (projects, { eq }) => eq(projects.slug, projectSlug),

        with: {
            files: {
                with: {
                    file: true,
                },
            },
            members: {
                with: {
                    user: true,
                },
            },
        },

    });
}

export const getProjectsForUser = async (db: Db, userId: string) => {
    const memberships = await db.query.projectMembers.findMany({
        where: eq(projectMembers.userId, userId),

        with: {
            project: true,
        },
    });

    const projects = memberships.map(
        (membership) => membership.project
    );

    return projects;
}

export const confirmUserProjectMembership = async (db: Db, userId: string, projectId: string) => {
    const membership = await db.query.projectMembers.findFirst({
        where: (projectMembers, { eq }) => eq(projectMembers.userId, userId) && eq(projectMembers.projectId, projectId),
    });

    return membership;
}