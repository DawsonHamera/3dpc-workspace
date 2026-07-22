import { Hono } from "hono";

import { dbMiddleware } from "./middleware/db";

import authRoutes from "./features/auth/routes";
import userRoutes from "./features/users/routes";

import type { Env } from "./types";
import { AppError } from "./lib/errors";
import fileRoutes from "./features/files/routes";
import { cors } from "hono/cors";
import { projectRoutes } from "./features/projects/routes";

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
  .route("/users", userRoutes)
  .route("/auth", authRoutes)
  .route("/files", fileRoutes)
  .route("/projects", projectRoutes)
  .get("/health", (c) => {
    return c.json({
      status: "ok"
    });
  })
  .onError((err, c) => {

    if (err instanceof AppError) {
      const status = err.status as Parameters<typeof c.json>[1];

      return c.json(
        {
          error: {
            code: err.code,
            message: err.message,
          },
        },
        status
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

