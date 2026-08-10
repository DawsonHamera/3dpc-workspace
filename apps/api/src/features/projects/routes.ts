import { Hono } from "hono";

import {
    requireAuth,
} from "../../middleware/auth";

import {
    requireRole,
} from "../../middleware/role";

import {
    requireProjectMembership,
} from "../../middleware/projectMembership";

import {
    validateJson,
} from "../../lib/validation";

import {
    zValidator,
} from "@hono/zod-validator";

import {
    AppError,
} from "../../lib/errors";

import {
    R2Storage,
} from "../../services/storage";

import {
    getProjectsForUser,
    getPublicProjects,
    getProjectBySlug,
    createProject,
    deleteProject,
    inviteMembersToProject,
    deleteProjectMember,
} from "./service";

import {
    createProjectSchema,
    uploadSchema,
} from "./schema";

import type {
    Env,
} from "../../types";
import z from "zod";
import { requireUser } from "../../lib/auth";
import { resourcesRoutes } from "../resources/routes";

const projectDetailRoutes = new Hono<Env>()

    .get(
        "/",
        requireAuth,
        requireRole(
            "admin",
            "owner",
            "member",
        ),
        requireProjectMembership(),
        async (c) => {
            const project =
                await getProjectBySlug(
                    c.get("services"),
                    c.req.param("slug")!,
                );

            if (!project) {
                throw new AppError(
                    404,
                    "NOT_FOUND",
                    "Project not found",
                );
            }

            return c.json(project);
        },
    )


    .delete(
        "/",
        requireAuth,
        requireRole("admin", "owner"),
        requireProjectMembership("owner", "lead"),

        async (c) => {

            const user = c.get("user");

            const services = c.get("services");


            if (!user) {
                throw new AppError(
                    400,
                    "BAD_REQUEST",
                    "User not found"
                );
            }


            await deleteProject({
                services,
                slug: c.req.param("slug")!,
                userId: user.id,
            });

            return c.json({
                message:
                    "Project deleted successfully",
            });
        }
    )

     .post(
        "/members",
        requireAuth,
        requireRole(
            "admin",
            "owner",
            "member"
        ),
        requireProjectMembership(),
        validateJson(
            z.object({
                userIds: z.array(z.string()),
            })
        ),
        async (c) => {

            const user = requireUser(c);

            const { userIds } = await c.req.json();

            await inviteMembersToProject({
                services: c.get("services"),
                projectSlug: c.req.param("slug")!,
                userIds,
                invitedByUserId: user.id,
            });

            return c.json({
                message:
                    "Members invited successfully",
            });
        }

    )

    .delete(
        "/members/:userId",
        requireAuth,
        requireRole(
            "admin",
            "owner",
            "member"
        ),
        requireProjectMembership(),
        async (c) => {
            const user = requireUser(c);

            const membership = c.get("projectMembership");

            const hasGlobalPermission =
                user.role === "owner" ||
                user.role === "admin";

            const hasProjectPermission =
                membership === "owner" ||
                membership === "lead";


            if (!hasGlobalPermission && !hasProjectPermission) {
                throw new AppError(
                    403,
                    "FORBIDDEN",
                    "You do not have permission to manage this project"
                );
            }

            await deleteProjectMember({
                services: c.get("services"),
                projectSlug: c.req.param("slug")!,
                userId: c.req.param("userId"),
            });

            return c.json({
                message: "Member removed successfully",
            });
        }
    )

    .route(
        "/resources",
        resourcesRoutes,
    );




export const projectRoutes = new Hono<Env>()

    .get(
        "/",
        requireAuth,
        requireRole(
            "admin",
            "owner",
            "member"
        ),

        async (c) => {

            const user =
                c.get("user");


            if (!user) {
                throw new AppError(
                    400,
                    "BAD_REQUEST",
                    "User not found"
                );
            }


            const projects =
                await getProjectsForUser(
                    c.get("db"),
                    user.id
                );


            return c.json(
                projects
            );
        }
    )



    .get(
        "/public",

        async (c) => {

            const projects =
                await getPublicProjects(
                    c.get("db")
                );


            return c.json(
                projects
            );
        }
    )

    .route(
        "/:slug",
        projectDetailRoutes,
    )

    .post(
        "/",

        requireAuth,

        requireRole(
            "admin",
            "owner",
            "member"
        ),

        validateJson(
            createProjectSchema
        ),

        async (c) => {

            const user =
                c.get("user");


            if (!user) {
                throw new AppError(
                    400,
                    "BAD_REQUEST",
                    "User not found"
                );
            }


            const project =
                await createProject({
                    db: c.get("db"),

                    userId:
                        user.id,

                    data:
                        await c.req.json(),
                });



            return c.json(
                project,
                201
            );
        }
    )

// .post(
//     "/:projectSlug/files",

//     requireAuth,

//     requireRole(
//         "Admin",
//         "Owner",
//         "Member"
//     ),

//     requireProjectMembership(),

//     zValidator(
//         "form",
//         uploadSchema
//     ),

//     async (c) => {

//         const user = requireUser(c);


//         const {
//             file,
//         } = c.req.valid(
//             "form"
//         );



//         const result =
//             await uploadProjectFile({

//                 db:
//                     c.get("db"),

//                 storage:
//                     new R2Storage(
//                         c.env.FILES
//                     ),

//                 userId:
//                     user.id,

//                 projectSlug:
//                     c.req.param(
//                         "projectSlug"
//                     ),

//                 file,
//             });



//         return c.json(
//             {
//                 id:
//                     result.id,
//             },

//             201
//         );
//     }
// )