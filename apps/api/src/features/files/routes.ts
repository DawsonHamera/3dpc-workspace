import { Hono } from "hono";
import { Env } from "../../types";
import { deleteFile, getFileById, getStorageUsage, handleFileUpdate, handleFileUpload, saveFile } from "./service";
import { requireAuth } from "../../middleware/auth";
import { requireRole } from "../../middleware/role";
import { R2Storage } from "../../services/storage";
import { AppError } from "../../lib/errors";
import z from "zod";
import { zValidator } from "@hono/zod-validator";


function sanitizeFilename(name: string) {
    return name
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(0, 100);
}

const uploadSchema = z.object({
    file: z.instanceof(File),
    metadata: z.string().optional(),
})


const fileRoutes = new Hono<Env>()

    .post(
        "/upload",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        async (c) => {

            const body = await c.req.parseBody();

            const user = c.get("user");

            const file = body.file;

            const db = c.get("db");

            const storage = new R2Storage(c.env.FILES);

            if (!file) {
                throw new AppError(
                    400,
                    "BAD_REQUEST",
                    "No file provided",
                );
            }

            const savedFile = await handleFileUpload({
                db,
                storage,
                file,
                uploadedBy: user!.id
            });



            return c.json(savedFile.id);
        }
    )

    .patch(
        "/:id",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        zValidator(
            "form",
            uploadSchema,
            (result, c) => {
                if (!result.success) {
                    throw new AppError(
                        400,
                        "VALIDATION_ERROR",
                        "Invalid upload data"
                    );
                }
            }
        ),

        async (c) => {


            const user = c.get("user");

            const fileId = c.req.param("id");

            const { file } = c.req.valid("form");

            const db = c.get("db");

            const storage = new R2Storage(c.env.FILES);


            if (!file) {
                throw new AppError(
                    400,
                    "BAD_REQUEST",
                    "No file provided",
                );
            }

            const savedFile = await handleFileUpdate({
                db,
                storage,
                fileId,
                file,
                editedBy: user!.id
            });


            return c.json(savedFile.id);
        }
    )

    .get(
        "/:id/download",
        requireAuth,
        requireRole("Admin", "Owner", "Member", "Guest"),
        async (c) => {

            console.log(
                "DOWNLOAD REQUEST",
                c.req.url,
                c.req.header("host")
            );

            const { id } = c.req.param();
            const db = c.get("db");

            const file = await getFileById(db, id);

            if (!file) {
                throw new AppError(
                    404,
                    "FILE_NOT_FOUND",
                    "File not found."
                );
            }

            const storage = new R2Storage(c.env.FILES);

            const object = await storage.get(file.key);

            if (!object) {
                throw new AppError(
                    404,
                    "STORED_FILE_MISSING",
                    "Stored file missing"
                );
            }

            return new Response(
                object.body,
                {
                    headers: {
                        "Content-Type": object.httpMetadata?.contentType
                            ?? "application/octet-stream",

                        "Content-Length": object.size.toString(),

                          "Cache-Control": "no-store",
                    },
                }
            );
        })

    .get(
        "/:id",
        requireAuth,
        requireRole("Admin", "Owner", "Member", "Guest"),
        async (c) => {
            const { id } = c.req.param();
            const db = c.get("db");

            const file = await getFileById(db, id);

            if (!file) {
                throw new AppError(
                    404,
                    "FILE_NOT_FOUND",
                    "File not found."
                );
            }

            return c.json(file);
        }
    )

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
                throw new AppError(
                    404,
                    "FILE_NOT_FOUND",
                    "File not found."
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
                throw new AppError(
                    401,
                    "UNAUTHORIZED",
                    "Unauthorized"
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