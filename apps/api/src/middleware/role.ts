import { createMiddleware } from "hono/factory";
import { Env } from "../types";

export const requireRole = (...allowedRoles: string[]) => {
  return createMiddleware<Env>(async (c, next) => {

    const user = c.get("user");

    if (!user) {
      return c.json(
        {
          error: "Unauthorized",
        },
        401
      );
    }

    if (!allowedRoles.includes(user.role.name)) {
      return c.json(
        {
          error: "Forbidden",
        },
        403
      );
    }

    await next();
  });
}