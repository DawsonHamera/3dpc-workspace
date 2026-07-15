import { Hono } from "hono";

import { dbMiddleware } from "./middleware/db";

import auth from "./features/auth/routes";
import users from "./features/users/routes";

import type { Env } from "./types";
import { AppError } from "./lib/errors";

const app = new Hono<Env>()
  .use("*", dbMiddleware)
  .route("/users", users)
  .route("/auth", auth)
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

