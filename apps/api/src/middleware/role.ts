import { createMiddleware } from "hono/factory";
import { Env } from "../types";
import { AppError } from "../lib/errors";

export const requireRole = (...allowedRoles: string[]) => {
  return createMiddleware<Env>(async (c, next) => {

    const user = c.get("user");

    if (!user) {
      throw new AppError(
        401,
        "Unauthorized",
        "User not found",
      );
    }

    if (!allowedRoles.includes(user.role)) {
     throw new AppError(
        403,
        "Forbidden",
        "You do not have permission to access this resource",
      );
    }

    await next();
  });
}