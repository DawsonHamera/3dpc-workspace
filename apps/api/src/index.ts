import { Hono } from "hono";

import { dbMiddleware } from "./middleware/db";
import { requireAuth } from "./middleware/auth";

import users from "./routes/users";
import login from "./routes/login";
import { Variables } from "hono/types";


const app = new Hono<{
  Bindings: CloudflareBindings;
  Variables: Variables;
}>();


app.use("*", dbMiddleware);


app.route("/users", users);

app.route("/login", login);


export default app;