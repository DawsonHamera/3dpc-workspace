import { createMiddleware } from "hono/factory";

export const requireRole = (...allowedRoles: string[]) => {
  return createMiddleware(async (c, next) => {

    const user = c.get("user");

    if (!allowedRoles.includes(user.role)) {
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