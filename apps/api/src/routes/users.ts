import { Hono } from "hono";

import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { roles, users } from "../db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();


app.get(
    "/me",
    requireAuth,
    (c) => {

        const user = c.get("user");

        return c.json(user);
    }
);

app.get(
    "/",
    requireAuth,
    requireRole("Admin", "Owner"),
    async (c) => {
        const db = c.get("db");

        const result = await db.query.users.findMany({
            with: {
                role: true,
            },
        });

        return c.json(result);
    }
);


app.delete(
    "/:id",
    requireAuth,
    requireRole("Admin", "Owner"),
    async (c) => {

        return c.json({
            message: "Deleted user",
        });
    }
);


export default app;