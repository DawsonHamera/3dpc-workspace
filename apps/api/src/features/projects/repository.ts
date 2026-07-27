import {
    and,
    eq,
    InferInsertModel,
    or,
} from "drizzle-orm";

import {
    files,
    projectFiles,
    projectMembers,
    projects,
} from "../../db/schema";

import type { Db } from "../../types";


const projectWithRelations = {
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
} as const;



export const findBySlug = async (
    db: Db,
    slug: string
) => {
    return db.query.projects.findFirst({
        where: eq(
            projects.slug,
            slug
        ),

        with: projectWithRelations,
    });
};



export const findById = async (
    db: Db,
    id: string
) => {
    return db.query.projects.findFirst({
        where: eq(
            projects.id,
            id
        ),

        with: projectWithRelations,
    });
};



export const findForUser = async (
    db: Db,
    userId: string
) => {

    const result = await db
        .select({
            project: projects,
        })

        .from(projects)

        .leftJoin(
            projectMembers,
            and(
                eq(
                    projectMembers.projectId,
                    projects.id
                ),

                eq(
                    projectMembers.userId,
                    userId
                )
            )
        )

        .where(
            or(
                eq(
                    projects.visibility,
                    "public"
                ),

                eq(
                    projectMembers.userId,
                    userId
                )
            )
        );


    return result.map(
        ({ project }) => project
    );
};



export const findPublic = async (
    db: Db
) => {

    const result = await db
        .select({
            project: projects,
        })

        .from(projects)

        .where(
            eq(
                projects.visibility,
                "public"
            )
        );


    return result.map(
        ({ project }) => project
    );
};



export const findMembership = async (
    db: Db,
    userId: string,
    projectId: string
) => {

    return db.query.projectMembers.findFirst({
        where: and(
            eq(
                projectMembers.userId,
                userId
            ),

            eq(
                projectMembers.projectId,
                projectId
            )
        ),
    });
};



export const insert = async (
    db: Db,
    data: InferInsertModel<typeof projects>
) => {

    const result = await db
        .insert(projects)
        .values(data)
        .returning();


    return result[0];
};



export const insertMember = async (
    db: Db,
    data: InferInsertModel<typeof projectMembers>
) => {

    await db
        .insert(projectMembers)
        .values(data);
};



export const insertFile = async (
    db: Db,
    data: InferInsertModel<typeof projectFiles>
) => {

    await db
        .insert(projectFiles)
        .values(data);
};



export const findDuplicateFile = async (
    db: Db,
    projectId: string,
    filename: string
) => {

    const result = await db
        .select({
            id: files.id,
        })

        .from(projectFiles)

        .innerJoin(
            files,
            eq(
                projectFiles.fileId,
                files.id
            )
        )

        .where(
            and(
                eq(
                    projectFiles.projectId,
                    projectId
                ),

                eq(
                    files.originalName,
                    filename
                )
            )
        )

        .limit(1);


    return result[0] ?? null;
};



export const remove = async (
    db: Db,
    id: string
) => {

    await db
        .delete(projects)
        .where(
            eq(
                projects.id,
                id
            )
        );
};