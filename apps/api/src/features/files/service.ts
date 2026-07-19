import { eq, sql } from "drizzle-orm";
import { files } from "../../db/schema";
import { Db } from "../../types";

export function getFileCategory(
    mimeType: string
): "image" | "model" | "document" | "video" | "other" {

    if (mimeType.startsWith("image/")) {
        return "image";
    }

    if (
        mimeType === "model/stl" ||
        mimeType === "model/3mf"
    ) {
        return "model";
    }

    if (
        mimeType === "application/pdf" ||
        mimeType.includes("document")
    ) {
        return "document";
    }

    if (mimeType.startsWith("video/")) {
        return "video";
    }

    return "other";
}

type SaveFileInput = {
    file: File;
    safeName: string;
    key: string;
    metadata: any;
    uploadedBy: string;
};

export const saveFile = async (
    db: Db,
    {
        file,
        safeName,
        key,
        metadata,
        uploadedBy,
    }: SaveFileInput
) => {
    const savedFile = await db
        .insert(files)
        .values({
            key,
            originalName: safeName,
            mimeType: file.type,
            metadata,
            size: file.size,
            type: getFileCategory(file.type),
            uploadedBy,
        })
        .returning();

    return savedFile[0];
};

export async function getFileById(
    db: Db,
    fileId: string
) {
    const result = await db
        .select()
        .from(files)
        .where(eq(files.id, fileId))
        .limit(1);

    return result[0] ?? null;
}


export async function deleteFile(
    db: Db,
    id: string
) {
    await db
        .delete(files)
        .where(eq(files.id, id));
}

export async function getStorageUsage(
    db: Db,
    userId: string
) {
    const result = await db
        .select({
            total: sql<number>`sum(${files.size})`,
        })
        .from(files)
        .where(
            eq(files.uploadedBy, userId)
        );

    return Number(result[0]?.total ?? 0);
}