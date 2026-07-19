import { Hono } from "hono";
import { Env } from "../../types";
import { deleteUser, getUserByIdWithRoles, getUsersWithRoles, updateUserAvatar } from "./service";
import { requireRole } from "../../middleware/role";
import { requireAuth } from "../../middleware/auth";
import { saveFile } from "../files/service";
import { R2Storage } from "../../services/storage";

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
            const user = c.get("user");

            if (!user) {
                return c.json(
                    { error: "Unauthorized" },
                    401
                );
            }

            const body = await c.req.parseBody();

            const file = body.file;

            if (!(file instanceof File)) {
                return c.json(
                    { error: "No avatar uploaded" },
                    400
                );
            }

            if (!file.type.startsWith("image/")) {
                return c.json(
                    { error: "Avatar must be an image" },
                    400
                );
            }

            const MAX_SIZE = 5 * 1024 * 1024; // 5MB

            if (file.size > MAX_SIZE) {
                return c.json(
                    {
                        error: "Avatar must be smaller than 5MB",
                    },
                    413
                );
            }

            const db = c.get("db");

            // create file record
            const fileId = crypto.randomUUID();

            const safeName = sanitizeFilename(file.name);

            const key = `avatars/${fileId}/${safeName}`;

            const storage = new R2Storage(
                c.env.FILES
            );

            await storage.upload(
                key,
                file
            );

            const savedFile = await saveFile(
                db,
                {
                    file,
                    safeName,
                    key,
                    uploadedBy: user.id,
                    metadata: {
                        purpose: "avatar",
                    },
                }
            );

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