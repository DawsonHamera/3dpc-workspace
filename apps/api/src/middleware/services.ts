import { createMiddleware } from "hono/factory";
import type { Env } from "../types";
import { R2Storage } from "../services/storage";
import { auditLogger } from "../services/auditLog";


export const serviceContext = createMiddleware<Env>(
    async (c, next) => {

        const db = c.get("db");


        c.set(
            "services",
            {
                db,

                storage: new R2Storage(
                    c.env.FILES
                ),

                audit: auditLogger(
                    db
                ),
            }
        );


        await next();
    }
);