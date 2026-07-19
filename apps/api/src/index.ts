import { Hono } from "hono";

import { dbMiddleware } from "./middleware/db";

import authRoutes from "./features/auth/routes";
import userRoutes from "./features/users/routes";

import type { Env } from "./types";
import { AppError } from "./lib/errors";
import fileRoutes from "./features/files/routes";

const app = new Hono<Env>()
  .use("*", dbMiddleware)
  .route("/users", userRoutes)
  .route("/auth", authRoutes)
  .route("/files", fileRoutes)
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

