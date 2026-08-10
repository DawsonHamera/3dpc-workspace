import {
    findBySlug,
    findById,
    findForUser,
    findPublic,
    insert,
    insertMember,
    remove,
    removeMember,
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
import { getUser } from "../users/service";



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
    services: ServicesContext,
    slug: string
) {
    const project =
        await findBySlug(
            services.db,
            slug
        );

    if (!project) {
        return null;
    }


    return {
        ...project,

        // files: project.files
        //     .filter(
        //         ({ file }) =>
        //             !file.isTemplate
        //     ).map(
        //         ({ file }) => ({
        //             id: file.id,
        //             originalName: file.originalName,
        //             type: file.type,
        //             size: file.size,
        //             createdAt: file.createdAt,
        //         })

        //     ),

        resources: project.resources.map(
            resource => resource.resource
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



// export async function uploadProjectFile(
//     {
//         db,
//         storage,
//         userId,
//         projectSlug,
//         file,
//     }: {
//         db: Db;
//         storage: R2Storage;
//         userId: string;
//         projectSlug: string;
//         file: File;
//     }
// ) {

//     const project =
//         await findBySlug(
//             db,
//             projectSlug
//         );


//     if (!project) {
//         throw new AppError(
//             404,
//             "NOT_FOUND",
//             "Project not found"
//         );
//     }

// 1

//     const duplicate =
//         await findDuplicateFile(
//             db,
//             project.id,
//             file.name
//         );

//     if (duplicate) {
//         throw new AppError(
//             400,
//             "BAD_REQUEST",
//             "A file with that name already exists in this project."
//         );
//     }



//     const uploaded =
//         await uploadFile({
//             services: { db, storage, audit: auditLogger(db) },
//             file,

//             uploadedBy: userId,

//             options: {
//                 location: "projects",
//             },
//         });



//     await insertFile(
//         db,
//         {
//             projectId: project.id,
//             fileId: uploaded.id,
//         }
//     );



//     const audit =
//         auditLogger(db);


//     await audit.create({
//         userId,

//         action:
//             AuditActions.PROJECT_FILE_UPLOADED,

//         resourceType:
//             "file",

//         resourceId:
//             uploaded.id,

//         description:
//             `Uploaded file ${uploaded.originalName} to project ${project.slug}`,
//     });



//     return uploaded;
// }

export const inviteMembersToProject = async ({
    services: { db, audit },
    projectSlug,
    userIds,
    invitedByUserId,
}: {
    services: ServicesContext;
    projectSlug: string;
    userIds: string[];
    invitedByUserId: string;
}) => {

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

    for (const userId of userIds) {

        await insertMember(
            db,
            {
                projectId: project.id,
                userId,
                role: "contributor",
            }
        );

    }

    await audit.create({
        userId: invitedByUserId,
        action:
            AuditActions.PROJECT_MEMBERS_INVITED,
        resourceType:
            "project",
        resourceId:
            project.id,
        description:
            `Invited ${userIds.length} members to project ${project.slug}`,
    });
};


export async function deleteProject(
    {
        services: { db, storage, audit },
        slug,
        userId,
    }: {
        services: ServicesContext;
        slug: string;
        userId: string;
    }
) {

    const project =
        await findBySlug(
            db,
            slug
        );


    if (!project) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Project not found"
        );
    }



    // // remove files first because project_files
    // // and storage need cleanup
    // for (const projectFile of project.files) {

    //     await removeFile(
    //         {
    //             services: { db, storage, audit },
    //             userId,
    //             id: projectFile.file.id
    //         }
    //     );
    // }



    await remove(
        db,
        slug
    );


    await audit.create({
        userId,

        action:
            AuditActions.PROJECT_DELETED,

        resourceType:
            "project",

        resourceId:
            project.id,

        description:
            `Deleted project ${slug}`,
    });
}

export const deleteProjectMember = async ({
    services: { db, audit, storage },
    projectSlug,
    userId,
}: {
    services: ServicesContext;
    projectSlug: string;
    userId: string;
}) => {
    const project =
        await findBySlug(
            db,
            projectSlug
        );

    const user = await getUser({
        services: { db, audit, storage },
        id: userId,
    });

    if (!project) {
        throw new AppError(
            404,
            "NOT_FOUND",
            "Project not found"
        );
    }

    await removeMember(
        db,
        project.id,
        userId
    );

    await audit.create({
        userId,
        action:
            AuditActions.PROJECT_MEMBER_REMOVED,
        resourceType:
            "project",  
        
        resourceId:
            project.id,
        description:
            `Removed member ${user!.name} from project ${project.slug}`,
    });
};