import { Hono } from "hono";
import type { Env } from "../../types";
import { createSession, deleteSession, registerUser, verifyUser } from "./service";
import { registerSchema } from "./schema";
import { zValidator } from "@hono/zod-validator";
import { validateJson } from "../../lib/validation";
import { requireAuth } from "../../middleware/auth";
import { AppError } from "../../lib/errors";

const authRoutes = new Hono<Env>()

    .get("/me", requireAuth, async (c) => {
        const user = c.get("user");

        if (!user) {
            return c.json({
                user: null
            });
        }
        return c.json({
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
            }
        });
    })
    
    .post("/login", async (c) => {
        const db = c.get("db");

        const { email, password } = await c.req.json();

        const userId = await verifyUser(db, email, password);

        if (!userId) {
            return c.json(
                {
                    error: "Invalid credentials",
                },
                401
            );
        }

        const token = await createSession(
            db,
            userId
        );


        c.header(
            "Set-Cookie",
            [
                `session=${token}`,
                "HttpOnly",
                "Secure",
                "SameSite=Strict",
                "Path=/",
                "Max-Age=2592000",
            ].join("; ")
        );


        return c.json({
            success: true,
        });
    })


    .post("/logout", async (c) => {
        const cookieHeader = c.req.header("Cookie");

        const token = cookieHeader
            ?.match(/(?:^|;\s*)session=([^;]+)/)
            ?.at(1);

        if (!token) {
             throw new AppError(
                   404,
                   "SESSION_NOT_FOUND",
                   "Session not found, user may already be logged out."
                 );
        }

        if (token) {
            const db = c.get("db");
            await deleteSession(db, token);
        }

        c.header(
            "Set-Cookie",
            [
                "session=; Max-Age=0",
                "HttpOnly",
                "Secure",
                "SameSite=Strict",
                "Path=/",
            ].join("; ")
        );

        return c.json({
            success: true,
        });
    })

    .post("/register", validateJson(registerSchema), async (c) => {
        const db = c.get("db");

        const data = c.req.valid("json");

        const userId = await registerUser(db, data);

        if (!userId) {
            return c.json(
                {
                    error: "Failed to register user. User may already exist or input is invalid.",
                },
                400
            );
        }

        return c.json({
            success: true,
        });
    });


export default authRoutes;

