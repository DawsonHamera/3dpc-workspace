import { and, eq, or } from "drizzle-orm";
import { files, projectFiles, projectMembers, projects } from "../../db/schema";
import { Db } from "../../types";
import { deleteFile } from "../files/service";

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
                    user: {
                        columns: {
                            id: true,
                            name: true,
                            email: true,
                            avatarFileId: true,
                        },
                    },
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

export const getProjectById = async (db: Db, projectId: string) => {
    const project = await db.query.projects.findFirst({
        where: (projects, { eq }) => eq(projects.id, projectId),
        with: {
            files: {
                with: {
                    file: true,
                },
            },
            members: {
                with: {
                    user: {
                        columns: {
                            id: true,
                            name: true,
                            email: true,
                            avatarFileId: true,
                        },
                    },
                },
            },
        },
    });
    return project;
}

export const getProjectsForUser = async (db: Db, userId: string) => {
    const result = await db
        .select({
            project: projects,
        })
        .from(projects)
        .leftJoin(
            projectMembers,
            and(
                eq(projectMembers.projectId, projects.id),
                eq(projectMembers.userId, userId)
            )
        )
        .where(
            or(
                eq(projects.visibility, "public"),
                eq(projectMembers.userId, userId)
            )
        );

    return result.map(({ project }) => project);
};

export const getPublicProjects = async (db: Db) => {
    const result = await db
        .select({
            project: projects,
        })
        .from(projects)
        .where(
            or(
                eq(projects.visibility, "public"),
            )
        );

    return result.map(({ project }) => project);
};

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

export const createProject = async (db: Db, projectData: {
    name: string;
    slug: string;
    description?: string;
    shortDescription?: string;
    visibility?: "public" | "private";
    isFeatured?: boolean;
    createdBy: string;
}) => {
    const newProject = await db.insert(projects).values({
        name: projectData.name,
        slug: projectData.slug,
        description: projectData.description,
        shortDescription: projectData.shortDescription,
        visibility: projectData.visibility ?? "public",
        isFeatured: projectData.isFeatured ? 1 : 0,
    }).returning();

    await db.insert(projectMembers).values({
        projectId: newProject[0].id,
        userId: projectData.createdBy,
        role: "owner",
    });

    return newProject[0];
};

export const deleteProject = async (db: Db, projectId: string) => {
   const projectFilesIds = await db
        .select({ id: projectFiles.fileId })
        .from(projectFiles)
        .where(eq(projectFiles.projectId, projectId));


    projectFilesIds.forEach(async (file) => {
        await deleteFile(db, file.id);
    });

    await db.delete(projects).where(
        eq(projects.id, projectId)
    );
}