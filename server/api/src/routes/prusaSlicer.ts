import { Hono } from "hono";
import {
  createPrusaSlicerJob,
  getPrusaSlicerJobStatus,
  getPrusaSlicerOutput,
  deletePrusaSlicerJob,
} from "../services/prusaSlicer.js";

const prusaSlicerRoutes = new Hono();

prusaSlicerRoutes.post("/jobs", async (c) => {
  const body = await c.req.parseBody();

  const file = body.file;

  if (!(file instanceof File)) {
    return c.json(
      {
        error: "file is required",
      },
      400,
    );
  }

  if (!file.name.toLowerCase().endsWith(".stl")) {
    return c.json(
      {
        error: "Only STL files are currently supported",
      },
      400,
    );
  }

  const printer =
    typeof body.printer === "string"
      ? body.printer
      : "ender-3";

  const filament =
    typeof body.filament === "string"
      ? body.filament
      : "pla";

  const profile =
    typeof body.profile === "string"
      ? body.profile
      : "0.20mm";

  const input = Buffer.from(await file.arrayBuffer());

  const job = await createPrusaSlicerJob(input, {
    originalFilename: file.name,
    printer,
    filament,
    profile,
  });

  return c.json(job, 202);
});

prusaSlicerRoutes.get("/jobs/:id", async (c) => {
  const id = c.req.param("id");

  const result = await getPrusaSlicerJobStatus(id);

  if (result === null) {
    return c.json(
      {
        error: "Job not found",
      },
      404,
    );
  }

  return c.json(result);
});

prusaSlicerRoutes.get("/jobs/:id/output", async (c) => {
  const id = c.req.param("id");

  const result = await getPrusaSlicerOutput(id);

  if (result === null) {
    return c.json(
      {
        error: "Job not found",
      },
      404,
    );
  }

  if (result.status !== "complete") {
    return c.json(result, 409);
  }

  return new Response(result.output, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="${id}.gcode"`,
    },
  });
});

prusaSlicerRoutes.delete("/jobs/:id", async (c) => {
  const id = c.req.param("id");

  await deletePrusaSlicerJob(id);

  return c.json({
    deleted: true,
  });
});

export default prusaSlicerRoutes;