import { mkdir, writeFile, readFile, access, rm } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { getPrinter } from "../config/printers.js";
import { getFilament } from "../config/filaments.js";
import { getPrintProfile } from "../config/printProfiles.js";

const JOBS_DIR = process.env.PRUSASLICER_JOBS_DIR ?? "../prusaslicer/jobs";

export type PrusaSlicerJobStatus =
  | "queued"
  | "processing"
  | "complete"
  | "failed";

export type CreatePrusaSlicerJobInput = {
  file: Buffer;
  printerId: string;
  filamentId: string;
  printProfileId: string;
};

export type PrusaSlicerJob = {
  id: string;
  status: PrusaSlicerJobStatus;
  printerId: string;
  filamentId: string;
  printProfileId: string;
};

function jobDir(jobId: string) {
  return path.join(JOBS_DIR, jobId);
}

function marker(jobId: string, name: string) {
  return path.join(jobDir(jobId), name);
}

export async function createPrusaSlicerJob(
  input: CreatePrusaSlicerJobInput,
) {
  const printer = getPrinter(input.printerId);

  if (!printer) {
    throw new Error(`Unknown printer: ${input.printerId}`);
  }

  const filament = getFilament(input.filamentId);

  if (!filament) {
    throw new Error(`Unknown filament: ${input.filamentId}`);
  }

  const printProfile = getPrintProfile(input.printProfileId);

  if (!printProfile) {
    throw new Error(`Unknown print profile: ${input.printProfileId}`);
  }

  const id = randomUUID();
  const dir = jobDir(id);

  await mkdir(dir, {
    recursive: true,
  });

  await writeFile(
    path.join(dir, "input.stl"),
    input.file,
  );

  await writeFile(
    path.join(dir, "job.json"),
    JSON.stringify(
      {
        id,
        printerId: printer.id,
        filamentId: filament.id,
        printProfileId: printProfile.id,
      },
      null,
      2,
    ),
  );

  await writeFile(marker(id, "queued"), "");

  return {
    id,
    status: "queued" as const,
    printerId: printer.id,
    filamentId: filament.id,
    printProfileId: printProfile.id,
  };
}

export async function getPrusaSlicerJobStatus(
  jobId: string,
): Promise<PrusaSlicerJobStatus | null> {
  const dir = jobDir(jobId);

  try {
    await access(dir);
  } catch {
    return null;
  }

  if (await exists(marker(jobId, "failed"))) {
    return "failed";
  }

  if (await exists(marker(jobId, "complete"))) {
    return "complete";
  }

  if (await exists(marker(jobId, "processing"))) {
    return "processing";
  }

  if (await exists(marker(jobId, "queued"))) {
    return "queued";
  }

  return null;
}

export async function getPrusaSlicerOutput(jobId: string) {
  const status = await getPrusaSlicerJobStatus(jobId);

  if (status === null) {
    return null;
  }

  if (status !== "complete") {
    return {
      status,
      output: null,
    };
  }

  const outputPath = path.join(jobDir(jobId), "output.gcode");

  try {
    const output = await readFile(outputPath);

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

export async function getPrusaSlicerJob(jobId: string) {
  const status = await getPrusaSlicerJobStatus(jobId);

  if (!status) {
    return null;
  }

  try {
    const metadata = JSON.parse(
      await readFile(
        path.join(jobDir(jobId), "job.json"),
        "utf8",
      ),
    );

    return {
      ...metadata,
      status,
    } as PrusaSlicerJob;
  } catch {
    return null;
  }
}

export async function deletePrusaSlicerJob(jobId: string) {
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