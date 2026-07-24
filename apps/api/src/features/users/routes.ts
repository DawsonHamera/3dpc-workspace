import { Hono } from "hono";
import { Env } from "../../types";
import { deleteUser, getUserByIdWithRoles, getUsersWithRoles, updateUserAvatar } from "./service";
import { requireRole } from "../../middleware/role";
import { requireAuth } from "../../middleware/auth";
import { handleFileRemoval, handleFileUpload, saveFile } from "../files/service";
import { R2Storage } from "../../services/storage";
import { AppError } from "../../lib/errors";

function sanitizeFilename(name: string) {
    return name
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(0, 100);
}


const usersRoutes = new Hono<Env>()

    .get("/", requireAuth, requireRole("Admin", "Owner"), async (c) => {
        const db = c.get("db");
        const users = await getUsersWithRoles(db);
        return c.json(users);
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
        requireRole("Admin", "Owner"),
        async (c) => {
            const db = c.get("db");
            const { id } = c.req.param();
            await deleteUser(db, id);
            return c.json({
                message: "Deleted user",
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

            return c.json({
                avatarFileId: savedFile.id,
            });
        }
    )

export default usersRoutes;