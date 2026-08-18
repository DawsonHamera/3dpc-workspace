import { Hono } from "hono";
import health from "./routes/health.js";
import prusaSlicerRoutes from "./routes/prusaSlicer.js";

export const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: "3DPC server",
    status: "ok",
  });
});

app.route("/health", health);
app.route("/slicer", prusaSlicerRoutes);