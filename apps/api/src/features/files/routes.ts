import { Hono } from "hono";
import { Env } from "../../types";
import { deleteFile, getFileById, getStorageUsage, saveFile } from "./service";
import { requireAuth } from "../../middleware/auth";
import { requireRole } from "../../middleware/role";
import { R2Storage } from "../../services/storage";


function sanitizeFilename(name: string) {
    return name
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(0, 100);
}


const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const MAX_STORAGE = 5 * 1024 * 1024 * 1024; // 5GB


const fileRoutes = new Hono<Env>()

    .post(
        "/upload",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        async (c) => {

            const body = await c.req.parseBody();

            const metadataRaw = body.metadata;

            const file = body.file;

            if (!(file instanceof File)) {
                return c.json(
                    { error: "No file uploaded" },
                    400
                );
            }

            if (file.size > MAX_FILE_SIZE) {
                return c.json(
                    {
                        error: "File too large. Maximum size is 50MB."
                    },
                    413
                );
            }

            const user = c.get("user");

            if (!user) {
                return c.json(
                    { error: "There was an unexpected error while uploading." },
                    400
                );
            }

            let metadata = {};

            if (metadataRaw) {
                try {
                    metadata = JSON.parse(
                        metadataRaw.toString()
                    );
                } catch {
                    return c.json(
                        { error: "Invalid metadata JSON" },
                        400
                    );
                }
            }


            const fileId = crypto.randomUUID();

            const safeName = sanitizeFilename(file.name);

            const key = `uploads/${fileId}/${safeName}`;

            const storage = new R2Storage(c.env.FILES);

            await storage.upload(
                key,
                file
            );

            const db = c.get("db");


            const currentUsage = await getStorageUsage(
                db,
                user.id
            );

            console.log({
                currentUsage,
                currentUsageType: typeof currentUsage,
                fileSize: file.size,
                fileSizeType: typeof file.size,
            });

            if (
                currentUsage + file.size > MAX_STORAGE
            ) {
                return c.json(
                    {
                        error: "Storage quota exceeded"
                    },
                    413
                );
            }

            const savedFileId = await saveFile(db, { file, safeName, key, metadata, uploadedBy: user.id })



            return c.json(savedFileId);
        }
    )
    .get(
        "/:id",
        requireAuth,
        requireRole("Admin", "Owner", "Member", "Guest"),
        async (c) => {

            const { id } = c.req.param();
            const db = c.get("db");

            const file = await getFileById(db, id);

            if (!file) {
                return c.json(
                    { error: "File not found" },
                    404
                );
            }

            const storage = new R2Storage(c.env.FILES);

            const object = await storage.get(file.key);

            if (!object) {
                return c.json(
                    { error: "Stored file missing" },
                    404
                );
            }

            return new Response(
                object.body,
                {
                    headers: {
                        "Content-Type": object.httpMetadata?.contentType
                            ?? "application/octet-stream",

                        "Content-Length": object.size.toString(),

                        "Cache-Control": "public, max-age=3600",
                    },
                }
            );
        })

    .delete(
        "/:id",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        async (c) => {
            const { id } = c.req.param();

            const db = c.get("db");

            const file = await getFileById(
                db,
                id
            );

            if (!file) {
                return c.json(
                    { error: "File not found" },
                    404
                );
            }

            const storage = new R2Storage(
                c.env.FILES
            );

            await storage.delete(
                file.key
            );

            await deleteFile(
                db,
                id
            );

            return c.json({
                success: true,
            });
        }
    )
    .get(
        "/storage/usage",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        async (c) => {
            const user = c.get("user");

            if (!user) {
                return c.json(
                    { error: "Unauthorized" },
                    401
                );
            }

            const db = c.get("db");

            const used = await getStorageUsage(
                db,
                user.id
            );

            const limit = 5 * 1024 * 1024 * 1024; // 5GB

            return c.json({
                used,
                limit,
                remaining: Math.max(limit - used, 0),
                percentage: Math.round(
                    (used / limit) * 100
                ),
            });
        }
    )
    .get("/debug/r2", async (c) => {
        const objects = await c.env.FILES.list();

        return c.json(
            objects.objects.map((obj) => ({
                key: obj.key,
                size: obj.size,
                uploaded: obj.uploaded,
            }))
        );
    })

export default fileRoutes;