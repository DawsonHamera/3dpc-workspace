import { Hono } from "hono";
import { requireAuth } from "../../middleware/auth";
import { requireRole } from "../../middleware/role";
import { AppError } from "../../lib/errors";
import { R2Storage } from "../../services/storage";
import { AuditActions, auditLogger } from "../../services/auditLog";
import { findFileById, getStorageUsage } from "./repository";
import { downloadFile, getStorageMetrics, removeFile, updateFile, uploadFile } from "./service";
import { Env } from "../../types";
import { requireUser } from "../../lib/auth";

const fileRoutes = new Hono<Env>()

    .post(
        "/upload",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        async (c) => {

            const body = await c.req.parseBody();

            const file = body.file;

            const user = requireUser(c);

            if (!(file instanceof File)) {
                throw new AppError(
                    400,
                    "BAD_REQUEST",
                    "No file provided"
                );
            }

            const savedFile = await uploadFile({
                services: c.get("services"),
                file,
                uploadedBy: user.id,
            });


            await auditLogger(c.get("db")).create({
                userId: user.id,
                action: AuditActions.FILE_UPLOADED,
                resourceType: "file",
                resourceId: savedFile.id,
                description: `Uploaded file ${savedFile.originalName}`,
            });


            return c.json({
                id: savedFile.id,
            }, 201);
        }
    )

    .get(
        "/storage/usage",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        async (c) => {
            const user = requireUser(c);

            const metrics = await getStorageMetrics({
                services: c.get("services"),
                userId: user.id,
            });

            return c.json(metrics);
        }
    )

    .patch(
        "/:id",
        requireAuth,
        requireRole("Admin", "Owner", "Member"),
        async (c) => {
            const body = await c.req.parseBody();

            const file = body.file;

            const user = requireUser(c);

            if (!(file instanceof File)) {
                throw new AppError(
                    400,
                    "BAD_REQUEST",
                    "No file provided"
                );
            }

            const savedFile = await updateFile({
                services: c.get("services"),
                file,
                userId: user.id,
                id: c.req.param("id"),
            });


            return c.json({
                id: savedFile.id,
            }, 201);
        }
    )


    .get(
        "/:id/download",
        requireAuth,
        requireRole(
            "Admin",
            "Owner",
            "Member",
            "Guest"
        ),
        async (c) => {

            const { object, file } = await downloadFile({
                services: c.get("services"),
                id: c.req.param("id"),
            });


            return new Response(
                object.body,
                {
                    headers: {
                        "Content-Type":
                            file.mimeType ??
                            "application/octet-stream",

                        "Content-Length":
                            file.size.toString(),

                        "Content-Disposition":
                            `attachment; filename="${file.originalName}"`,

                        "Cache-Control":
                            "no-store",
                    },
                }
            );
        }
    )


    .get(
        "/:id",
        requireAuth,
        async (c) => {

            const file = await findFileById(
                c.get("db"),
                c.req.param("id")
            );

            if (!file) {
                throw new AppError(
                    404,
                    "FILE_NOT_FOUND",
                    "File not found"
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

            const user = requireUser(c);

            await removeFile({
                services: c.get("services"), 
                userId: user.id,
                id: c.req.param("id")
            });


            return c.json({
                success: true
            });
        }
    );


export default fileRoutes;