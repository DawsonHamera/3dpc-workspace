import {
    findBySlug,
    findById,
    findForUser,
    findPublic,
    insert,
    insertMember,
    insertFile,
    findDuplicateFile,
    remove,
} from "./repository";

import {
    R2Storage,
} from "../../services/storage";

import {
    auditLogger,
    AuditActions,
} from "../../services/auditLog";

import type { Db, ServicesContext } from "../../types";

import { AppError } from "../../lib/errors";
import { removeFile, uploadFile } from "../files/service";



export async function getProjectsForUser(
    db: Db,
    userId: string
) {
    return findForUser(
        db,
        userId
    );
}



export async function getPublicProjects(
    db: Db
) {
    return findPublic(db);
}



export async function getProjectBySlug(
    db: Db,
    slug: string
) {
    const project =
        await findBySlug(
            db,
            slug
        );

    if (!project) {
        return null;
    }


    return {
        ...project,

        files: project.files
            .filter(
                ({ file }) =>
                    !file.isTemplate
            ).map(
                ({ file }) => ({
                    id: file.id,
                    originalName: file.originalName,
                    type: file.type,
                    size: file.size,
                    createdAt: file.createdAt,
                })

            ),

        members: project.members.map(
            member => ({
                id: member.id,
                role: member.role,
                joinedAt: member.joinedAt,
                user: member.user,
            })
        ),
    };
}



export async function getProjectById(
    db: Db,
    id: string
) {
    return findById(
        db,
        id
    );
}



export async function createProject(
    {
        db,
        userId,
        data,
    }: {
        db: Db;
        userId: string;
        data: {
            name: string;
            slug: string;
            description?: string;
            shortDescription?: string;
            visibility?: "public" | "private";
            isFeatured?: boolean;
        };
    }
) {

    const project =
        await insert(
            db,
            {
                name: data.name,
                slug: data.slug,
                description: data.description,
                shortDescription: data.shortDescription,

                visibility:
                    data.visibility ?? "public",

                isFeatured:
                    data.isFeatured ? 1 : 0,
            }
        );


    await insertMember(
        db,
        {
            projectId: project.id,
            userId,
            role: "owner",
        }
    );


    return project;
}



export async function uploadProjectFile(
    {
        db,
        storage,
        userId,
        projectSlug,
        file,
    }: {
        db: Db;
        storage: R2Storage;
        userId: string;
        projectSlug: string;
        file: File;
    }
) {

    const project =
        await findBySlug(
            db,
            projectSlug
        );


    if (!project) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Project not found"
        );
    }

1

    const duplicate =
        await findDuplicateFile(
            db,
            project.id,
            file.name
        );

    if (duplicate) {
        throw new AppError(
            400,
            "BAD_REQUEST",
            "A file with that name already exists in this project."
        );
    }



    const uploaded =
        await uploadFile({
            services: { db, storage, audit: auditLogger(db) },
            file,

            uploadedBy: userId,

            options: {
                location: "projects",
            },
        });



    await insertFile(
        db,
        {
            projectId: project.id,
            fileId: uploaded.id,
        }
    );



    const audit =
        auditLogger(db);


    await audit.create({
        userId,

        action:
            AuditActions.PROJECT_FILE_UPLOADED,

        resourceType:
            "file",

        resourceId:
            uploaded.id,

        description:
            `Uploaded file ${uploaded.originalName} to project ${project.slug}`,
    });



    return uploaded;
}



export async function deleteProject(
    {
        services: { db, storage, audit },
        id,
        userId,
    }: {
        services: ServicesContext;
        id: string;
        userId: string;
    }
) {

    const project =
        await findById(
            db,
            id
        );


    if (!project) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Project not found"
        );
    }



    // remove files first because project_files
    // and storage need cleanup
    for (const projectFile of project.files) {

        await removeFile(
            {
                services: { db, storage, audit },
                userId,
                id: projectFile.file.id
            }
        );
    }



    await remove(
        db,
        id
    );


    await audit.create({
        userId,

        action:
            AuditActions.PROJECT_DELETED,

        resourceType:
            "project",

        resourceId:
            id,

        description:
            `Deleted project ${project.slug}`,
    });
}