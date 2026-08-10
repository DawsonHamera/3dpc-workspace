import { Hono } from "hono";
import { Env } from "../../types";
import { requireAuth } from "../../middleware/auth";
import { requireRole } from "../../middleware/role";
import { getAuditLogs } from "./service";


export const auditRoutes = new Hono<Env>()
    .get(
        "/",
        requireAuth,
        requireRole("owner", "admin"),
        async (c) => {
            const db = c.get("db");
            const limitParam = c.req.query("limit");

            const limit = limitParam
                ? Number(limitParam)
                : 50;

            const logs = await getAuditLogs(db, {
                limit
            });


            return c.json({
                data: logs,
            });
        }
    );