import { Hono } from "hono";
import { Env } from "../../types";
import { deleteUser, getUserByIdWithRoles, getUsersWithRoles, updateUser, updateUserAvatar } from "./service";
import { requireRole } from "../../middleware/role";
import { requireAuth } from "../../middleware/auth";
import { handleFileRemoval, handleFileUpload, saveFile } from "../files/service";
import { R2Storage } from "../../services/storage";
import { AppError } from "../../lib/errors";
import { AuditActions, auditLogger } from "../../services/auditLog";
import { verifyUser } from "../auth/service";
import { hashToken } from "../../lib/crypto";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import getRoleNameById, { getRoleByName } from "../roles/service";
import { validateJson } from "../../lib/validation";

function sanitizeFilename(name: string) {
    return name
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(0, 100);
}


const usersRoutes = new Hono<Env>()

    .get("/", requireAuth, requireRole("Admin", "Owner"), async (c) => {
        const db = c.get("db");
        const users = await getUsersWithRoles(db);
        const sanitizedUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatarId: user.avatarFileId,
        }));
        return c.json(sanitizedUsers);
    })

    .get("/:id", requireAuth, requireRole("Admin", "Owner"), async (c) => {
        const db = c.get("db");
        const { id } = c.req.param();
        const user = await getUserByIdWithRoles(db, id);
        return c.json(user);
    })

    .delete(
        "/:id",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        async (c) => {
            const db = c.get("db");
            const user = c.get("user");
            const { id } = c.req.param();

            const audit = auditLogger(db);

            if (user?.role === "Member" && user?.id !== id) {
                throw new AppError(
                    403,
                    "FORBIDDEN",
                    "You are not allowed to delete this user"
                );
            }

            const userToDelete = await getUserByIdWithRoles(db, id);

            await deleteUser(db, id);

            await audit.create({
                userId: user!.id,
                action: AuditActions.USER_REMOVED,
                resourceType: "user",
                resourceId: id,
                description: `Deleted user ${userToDelete?.name}`,
            });
            return c.json({
                message: "Deleted user",
            });
        }
    )

    .patch(
        "/:id/role",
        requireAuth,
        requireRole("Admin", "Owner"),
        validateJson(
            z.object({
                roleName: z.string(),
            })
        ),
        async (c) => {
            const db = c.get("db");
            const { id } = c.req.param();
            const { roleName } = await c.req.json();

            const user = c.get("user");

            const audit = auditLogger(db);

            const roleId = await getRoleByName(db, roleName);

            const updatedUser = await updateUser(db, id, { roleId });


            await audit.create({
                userId: user!.id,
                action: AuditActions.USER_UPDATED,
                resourceType: "user",
                resourceId: id,
                description: `Updated role for user ${updatedUser?.name} to ${roleName}`,
            });

            return c.json({
                message: "Updated user role",
            });
        }
    )

    .patch(
        "/:id/password",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        validateJson(
            z.object({
                currentPassword: z.string().optional(),
                newPassword: z
                    .string()
                    .min(8, "New password must be at least 8 characters long"),
            })
        ),
        async (c) => {

            const db = c.get("db");
            const { id } = c.req.param();

            const {
                currentPassword,
                newPassword,
            } = await c.req.json();


            const user = c.get("user");

            const audit = auditLogger(db);


            if (
                user?.role === "Member" &&
                user.id !== id
            ) {
                throw new AppError(
                    403,
                    "FORBIDDEN",
                    "You are not allowed to change this user's password"
                );
            }



            const isAdmin =
                user?.role === "Admin" ||
                user?.role === "Owner";


            if (!isAdmin) {

                if (!currentPassword) {

                    throw new AppError(
                        400,
                        "BAD_REQUEST",
                        "Current password is required"
                    );

                }

                if (!user) {
                    throw new AppError(
                        400,
                        "BAD_REQUEST",
                        "User retrieval failed"
                    );
                }


                const verify = await verifyUser(
                    db,
                    user.email,
                    currentPassword
                );


                if (!verify) {

                    throw new AppError(
                        401,
                        "INVALID_CREDENTIALS",
                        "Invalid current password."
                    );

                }

            }



            const passwordHash = await hashToken(
                newPassword
            );


            const updatedUser = await updateUser(
                db,
                id,
                {
                    passwordHash,
                }
            );


            await audit.create({
                userId: user?.id,
                action: AuditActions.USER_UPDATED,
                resourceType: "user",
                resourceId: id,
                description:
                    `Updated password for user ${updatedUser?.name}`,
            });


            return c.json({
                message: "Updated user password",
            });

        }
    )

    .patch(
        "/avatar",
        requireAuth,
        async (c) => {
            const body = await c.req.parseBody();

            const user = c.get("user");

            const file = body.file;

            const db = c.get("db");

            const audit = auditLogger(db);

            const storage = new R2Storage(c.env.FILES);

            if (!user) {
                throw new AppError(
                    401,
                    "UNAUTHORIZED",
                    "Unauthorized"
                );
            }

            if (!file) {
                throw new AppError(
                    400,
                    "BAD_REQUEST",
                    "No file provided"
                )
            }
            console.log("Uploading avatar for user:", user.id);

            const userData = await getUserByIdWithRoles(db, user.id);

            if (!userData) {
                throw new AppError(
                    404,
                    "USER_NOT_FOUND",
                    "User not found"
                );
            }

            if (userData.avatarFileId) {
                console.log("Deleting old avatar for user:", user.id);
                await updateUserAvatar(
                    db,
                    user.id,
                    null
                );
                await handleFileRemoval(db, storage, userData.avatarFileId);
            }

            const savedFile = await handleFileUpload({
                db,
                storage,
                file,
                uploadedBy: user.id,
                options: {
                    requiredTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
                    maxFileSize: (5 * 1024 * 1024), // 5MB
                    location: "avatars"
                }
            });

            // update user reference
            await updateUserAvatar(
                db,
                user.id,
                savedFile.id
            );

            await audit.create({
                userId: user.id,
                action: AuditActions.USER_UPDATED,
                resourceType: "user",
                resourceId: user.id,
                description: `Updated avatar for user ${userData.name}`,
            });

            return c.json({
                avatarFileId: savedFile.id,
            });
        }
    )

export default usersRoutes;