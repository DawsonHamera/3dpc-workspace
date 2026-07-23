import { and, eq } from "drizzle-orm";
import { files, projectFiles, projectMembers } from "../../db/schema";
import { Db } from "../../types";

export const getProjectBySlug = async (db: Db, projectSlug: string) => {
    const project = await db.query.projects.findFirst({
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

    if (!project) {
        return null;
    }

    const filteredProject = {
        ...project,
        files: project.files.filter(
            ({ file }) => !file.isTemplate
        ),
    };

    return filteredProject;
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

export const saveProjectFile = async (db: Db, projectId: string, fileId: string) => {
    await db.insert(projectFiles).values({
        projectId,
        fileId,
    });
}

export const checkForDuplicateFileInSameProject = async (
    db: Db,
    projectId: string,
    fileName: string
) => {
    const duplicate = await db
        .select({
            id: files.id,
            name: files.originalName,
        })
        .from(projectFiles)
        .innerJoin(
            files,
            eq(projectFiles.fileId, files.id)
        )
        .where(
            and(
                eq(projectFiles.projectId, projectId),
                eq(files.originalName, fileName)
            )
        )
        .limit(1);

    return duplicate[0] ?? null;
};