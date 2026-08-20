import {
  mkdir,
  writeFile,
  readFile,
  access,
  rm,
} from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const JOBS_DIR =
  process.env.PRUSASLICER_JOBS_DIR ?? "/jobs";

export type PrusaSlicerPrinter =
  | "ender-3"
  | "ender-3-v3-se"
  | "cr-10"
  | "ultimaker-s5";

export type PrusaSlicerFilament =
  | "pla"
  | "petg"
  | "abs"
  | "tpu";

export type PrusaSlicerProfile =
  | "0.20mm"
  | "0.15mm"
  | "0.30mm";

export type PrusaSlicerJobStatus =
  | "queued"
  | "processing"
  | "complete"
  | "failed";

export type PrusaSlicerJobMeta = {
  originalFilename: string;
  printer: PrusaSlicerPrinter;
  filament: PrusaSlicerFilament;
  profile: PrusaSlicerProfile;
};

export type PrusaSlicerJob = {
  id: string;
  status: "queued";
};

function jobDir(jobId: string) {
  return path.join(JOBS_DIR, jobId);
}

function marker(jobId: string, name: string) {
  return path.join(jobDir(jobId), name);
}

export async function createPrusaSlicerJob(
  input: Buffer,
  meta: PrusaSlicerJobMeta,
) {
  const id = randomUUID();
  const dir = jobDir(id);

  await mkdir(dir, {
    recursive: true,
  });

  await writeFile(
    path.join(dir, "input.stl"),
    input,
  );

  await writeFile(
    path.join(dir, "meta.json"),
    JSON.stringify(meta, null, 2),
  );

  await writeFile(marker(id, "queued"), "");

  return {
    id,
    status: "queued" as const,
  };
}

export async function getPrusaSlicerJobStatus(
  jobId: string,
) {
  const dir = jobDir(jobId);

  try {
    await access(dir);
  } catch {
    return null;
  }

  if (await exists(marker(jobId, "failed"))) {
    return {
      id: jobId,
      status: "failed" as const,
    };
  }

  if (await exists(marker(jobId, "complete"))) {
    return {
      id: jobId,
      status: "complete" as const,
    };
  }

  if (await exists(marker(jobId, "processing"))) {
    return {
      id: jobId,
      status: "processing" as const,
    };
  }

  if (await exists(marker(jobId, "queued"))) {
    return {
      id: jobId,
      status: "queued" as const,
    };
  }

  return null;
}

export async function getPrusaSlicerOutput(
  jobId: string,
) {
  const status = await getPrusaSlicerJobStatus(jobId);

  if (status === null) {
    return null;
  }

  if (status.status !== "complete") {
    return {
      status: status.status,
      output: null,
    };
  }

  try {
    const output = await readFile(
      path.join(jobDir(jobId), "output.gcode"),
    );

    return {
      status: "complete" as const,
      output,
    };
  } catch {
    return {
      status: "failed" as const,
      output: null,
    };
  }
}

export async function deletePrusaSlicerJob(
  jobId: string,
) {
  await rm(jobDir(jobId), {
    recursive: true,
    force: true,
  });
}

async function exists(file: string) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}