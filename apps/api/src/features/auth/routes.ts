import { Hono } from "hono";
import type { Env } from "../../types";
import { createSession, deleteSession, registerUser, verifyUser } from "./service";
import { registerSchema } from "./schema";
import { zValidator } from "@hono/zod-validator";
import { validateJson } from "../../lib/validation";
import { requireAuth } from "../../middleware/auth";
import { AppError } from "../../lib/errors";
import { getUserByIdWithRoles } from "../users/service";

const authRoutes = new Hono<Env>()

    .get("/me", requireAuth, async (c) => {
        const userId = c.get("user")?.id;

        if (!userId) {
            throw new AppError(
                404,
                "USER_NOT_FOUND",
                "User not found."
            );
        }

        const db = c.get("db");

        const user = await getUserByIdWithRoles(db, userId);

        if (!user) {
            throw new AppError(
                404,
                "USER_NOT_FOUND",
                "User not found."
            );
        }

        return c.json({
            user: {
                id: user.id,
                name: user.name,
                avatarId: user.avatarFileId,
                role: user.role,
            }
        });
    })
    
    .post("/login", async (c) => {
        const db = c.get("db");

        const { email, password } = await c.req.json();

        const userId = await verifyUser(db, email, password);

        if (!userId) {
            throw new AppError(
                401,
                "INVALID_CREDENTIALS",
                "Invalid email or password."
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
                "SameSite=None",
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
            throw new AppError(
                400,
                "REGISTRATION_FAILED",
                "User registration failed."
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
                "SameSite=None",
                "Path=/",
                "Max-Age=2592000",
            ].join("; ")
        );


        return c.json({
            success: true,
        });
    });


export default authRoutes;

