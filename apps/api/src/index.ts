import { Hono } from "hono";

import { dbMiddleware } from "./middleware/db";

import authRoutes from "./features/auth/routes";
import userRoutes from "./features/users/routes";

import type { Env } from "./types";
import { AppError } from "./lib/errors";
import fileRoutes from "./features/files/routes";
import { cors } from "hono/cors";
import { projectRoutes } from "./features/projects/routes";
import { ZodError } from "zod/v3";
import { auditRoutes } from "./features/audit/route";
import { serviceContext } from "./middleware/services";
import { onshapeRoutes } from "./features/onshape/routes";
import googleOAuthRoutes from "./features/google/routes";
import testEmailRoutes from "./features/google/test";

const app = new Hono<Env>()
    .use(
        "*",
        cors({
            origin: [
                "http://localhost:5173",
                "https://3dpc-workspace.pages.dev",
            ],
            credentials: true,
        })
    )
    .use("*", dbMiddleware)
    .use("*", serviceContext)
    .route("/users", userRoutes)
    .route("/auth", authRoutes)
    .route("/files", fileRoutes)
    .route("/projects", projectRoutes)
    .route("/audit", auditRoutes)
    .route("/onshape", onshapeRoutes)
    // .route("/auth/google", googleOAuthRoutes)
    // .route("/test/email", testEmailRoutes)
    .get("/health", (c) => {
        return c.json({
            status: "ok"
        });
    })
    .onError((err, c) => {

        if (err instanceof AppError) {
            return c.json(
                {
                    error: {
                        code: err.code,
                        message: err.message,
                        details: err.details,
                    },
                },
                err.status
            );
        }

        if (err instanceof ZodError) {
            return c.json(
                {
                    error: {
                        code: "VALIDATION_ERROR",
                        message: "Invalid request data",
                        details: err.flatten(),
                    },
                },
                400
            );
        }

        console.error(err);

        return c.json(
            {
                error: {
                    code: "INTERNAL_ERROR",
                    message: "Something went wrong",
                },
            },
            500
        );
    });


export type AppType = typeof app;

export default app;

