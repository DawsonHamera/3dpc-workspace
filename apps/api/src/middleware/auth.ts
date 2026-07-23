import { createMiddleware } from "hono/factory";
import { getSession } from "../features/auth/service";
import { AppError } from "../lib/errors";

export const requireAuth = createMiddleware(async (c, next) => {
  const cookieHeader = c.req.header("Cookie");

  const token = cookieHeader
    ?.match(/(?:^|;\s*)session=([^;]+)/)
    ?.at(1);


  if (!token) {
    throw new AppError(
      401,
      "Unauthorized",
      "Session token missing",
    );
  }


  const db = c.get("db");

  const session = await getSession(
    db,
    token
  );


  if (!session) {
    throw new AppError(
      401,
      "Unauthorized",
      "Invalid session",
    );
  }


  // Optional: reject expired sessions
  if (session.expiresAt < new Date()) {
    throw new AppError(
      401,
      "Unauthorized",
      "Session expired",
    );
  }


  c.set("user", {
    id: session.user.id,
    email: session.user.email,
    roleId: session.user.roleId,
    role: session.user.role.name,
  });


  await next();
});