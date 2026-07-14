import { Hono } from "hono";
import { createSession } from "../services/sessions";

const app = new Hono();


app.post("/", async (c) => {
  const db = c.get("db");

  // after checking password...
  const userId = "c6e2b431-94c1-4be9-b453-6ba1a6829ec0"; // replace with actual user ID after authentication


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
      "SameSite=Strict",
      "Path=/",
      "Max-Age=2592000",
    ].join("; ")
  );


  return c.json({
    success: true,
  });
});

export default app;