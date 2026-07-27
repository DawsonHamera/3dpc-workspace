import { Hono } from "hono";
import { Env } from "../../types";

import {
    getUsers,
    getUser,
    removeUser,
    changeUserPassword,
    updateAvatar,
    updateUserRole,
} from "./service";

import {
    requireAuth
} from "../../middleware/auth";

import {
    requireRole
} from "../../middleware/role";

import {
    AppError
} from "../../lib/errors";

import {
    validateJson
} from "../../lib/validation";

import {
    updatePasswordSchema,
    updateRoleSchema,
} from "./schema";


const usersRoutes = new Hono<Env>()


.get(
    "/",
    requireAuth,
    requireRole(
        "Admin",
        "Owner"
    ),
    async (c) => {

        const users =
            await getUsers({
                services: c.get("services"),
            });


        return c.json(
            users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatarId: user.avatarFileId,
            }))
        );
    }
)



.get(
    "/:id",
    requireAuth,
    requireRole(
        "Admin",
        "Owner"
    ),
    async (c) => {

        const user =
            await getUser({
                services: c.get("services"),
                id: c.req.param("id"),
            });


        if (!user) {
            throw new AppError(
                404,
                "USER_NOT_FOUND",
                "User not found"
            );
        }


        return c.json(user);
    }
)



.delete(
    "/:id",
    requireAuth,
    requireRole(
        "Admin",
        "Owner",
        "Member"
    ),
    async (c) => {

        const currentUser =
            c.get("user");


        if (!currentUser) {
            throw new AppError(
                401,
                "UNAUTHORIZED",
                "Unauthorized"
            );
        }


        const id =
            c.req.param("id");


        if (
            currentUser.role === "Member" &&
            currentUser.id !== id
        ) {
            throw new AppError(
                403,
                "FORBIDDEN",
                "Cannot delete another user"
            );
        }


        const deleted =
            await removeUser({
                services: c.get("services"),
                id,
                deletedBy: currentUser.id,
            });


        return c.json({
            message: "Deleted user",
            id: deleted.id,
        });
    }
)



.patch(
    "/:id/role",
    requireAuth,
    requireRole(
        "Admin",
        "Owner"
    ),
    validateJson(
        updateRoleSchema
    ),
    async (c) => {

        const user =
            c.get("user");


        if (!user) {
            throw new AppError(
                401,
                "UNAUTHORIZED",
                "Unauthorized"
            );
        }


        const {
            roleName
        } =
            await c.req.json();


        const updated =
            await updateUserRole({
                services: c.get("services"),
                userId: c.req.param("id"),
                roleName,
                updatedBy: user.id,
            });


        return c.json({
            message: "Updated user role",
            user: updated,
        });
    }
)



.patch(
    "/:id/password",
    requireAuth,
    requireRole(
        "Admin",
        "Owner",
        "Member"
    ),
    validateJson(
        updatePasswordSchema
    ),
    async (c) => {

        const currentUser =
            c.get("user");


        if (!currentUser) {
            throw new AppError(
                401,
                "UNAUTHORIZED",
                "Unauthorized"
            );
        }


        const {
            currentPassword,
            newPassword,
        } =
            await c.req.json();


        const updated =
            await changeUserPassword({
                services: c.get("services"),
                user: currentUser,
                userId: c.req.param("id"),
                currentPassword,
                newPassword,
            });


        return c.json({
            message: "Updated password",
            userId: updated?.id,
        });
    }
)



.patch(
    "/avatar",
    requireAuth,
    async (c) => {

        const user =
            c.get("user");


        if (!user) {
            throw new AppError(
                401,
                "UNAUTHORIZED",
                "Unauthorized"
            );
        }


        const body =
            await c.req.parseBody();


        const file =
            body.file;


        if (!(file instanceof File)) {
            throw new AppError(
                400,
                "BAD_REQUEST",
                "No file provided"
            );
        }


        const savedFile =
            await updateAvatar({
                services: c.get("services"),
                user,
                file,
            });


        return c.json({
            avatarFileId: savedFile.id,
        });
    }
);


export default usersRoutes;