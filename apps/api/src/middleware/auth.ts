import { createMiddleware } from "hono/factory";
import { getSession } from "../features/auth/service";

export const requireAuth = createMiddleware(async (c, next) => {
  const cookieHeader = c.req.header("Cookie");

  const token = cookieHeader
    ?.match(/(?:^|;\s*)session=([^;]+)/)
    ?.at(1);


  if (!token) {
    return c.json(
      {
        error: "Unauthorized",
      },
      401
    );
  }


  const db = c.get("db");

  const session = await getSession(
    db,
    token
  );


  if (!session) {
    return c.json(
      {
        error: "Invalid session",
      },
      401
    );
  }


  // Optional: reject expired sessions
  if (session.expiresAt < new Date()) {
    return c.json(
      {
        error: "Session expired",
      },
      401
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