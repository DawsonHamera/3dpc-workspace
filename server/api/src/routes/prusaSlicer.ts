import { Hono } from "hono";
import {
  createPrusaSlicerJob,
  getPrusaSlicerJob,
  getPrusaSlicerOutput,
  deletePrusaSlicerJob,
} from "../services/prusaSlicer.js";

const app = new Hono();

app.post("/jobs", async (c) => {
  const body = await c.req.parseBody();

  const file = body.file;
  const printerId = body.printerId;
  const filamentId = body.filamentId;
  const printProfileId = body.printProfileId;

  if (!(file instanceof File)) {
    return c.json(
      {
        error: "Missing file",
      },
      400,
    );
  }

  if (typeof printerId !== "string") {
    return c.json(
      {
        error: "Missing printerId",
      },
      400,
    );
  }

  if (typeof filamentId !== "string") {
    return c.json(
      {
        error: "Missing filamentId",
      },
      400,
    );
  }

  if (typeof printProfileId !== "string") {
    return c.json(
      {
        error: "Missing printProfileId",
      },
      400,
    );
  }

  try {
    const result = await createPrusaSlicerJob({
      file: Buffer.from(await file.arrayBuffer()),
      printerId,
      filamentId,
      printProfileId,
    });

    return c.json(result, 201);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create PrusaSlicer job";

    return c.json(
      {
        error: message,
      },
      400,
    );
  }
});

app.get("/jobs/:id", async (c) => {
  const id = c.req.param("id");

  const job = await getPrusaSlicerJob(id);

  if (!job) {
    return c.json(
      {
        error: "Job not found",
      },
      404,
    );
  }

  return c.json(job);
});

app.get("/jobs/:id/output", async (c) => {
  const id = c.req.param("id");

  const result = await getPrusaSlicerOutput(id);

  if (!result) {
    return c.json(
      {
        error: "Job not found",
      },
      404,
    );
  }

  if (result.status !== "complete") {
    return c.json(result);
  }

  return new Response(result.output, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${id}.gcode"`,
    },
  });
});

app.delete("/jobs/:id", async (c) => {
  const id = c.req.param("id");

  await deletePrusaSlicerJob(id);

  return c.json({
    success: true,
  });
});

export default app;