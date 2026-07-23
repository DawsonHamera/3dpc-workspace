import { eq, sql } from "drizzle-orm";
import { files } from "../../db/schema";
import { Db } from "../../types";
import { AppError } from "../../lib/errors";
import { R2Storage } from "../../services/storage";

export function getFileCategory(
    mimeType: string,
    fileName?: string
): "image" | "model" | "document" | "video" | "other" {

    const extension = fileName?.split(".").pop()?.toLowerCase();

    if (extension) {
        const modelExtensions = ["stl", "3mf"];
        const documentExtensions = ["pdf", "doc", "docx", "txt", "pdoc"];

        if (modelExtensions.includes(extension)) {
            return "model";
        }

        if (documentExtensions.includes(extension)) {
            return "document";
        }
    }

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
            type: getFileCategory(file.type, file.name),
            uploadedBy,
        })
        .returning();

    return savedFile[0];
};

export const updateFile = async (
    db: Db,
    {
        fileId,
        editedBy,
    }: {
        fileId: string;
        editedBy: string;
    }
) => {
    const updatedFile = await db
        .update(files)
        .set({
            lastEditedBy: editedBy,
            updatedAt: new Date(),
        })
        .where(eq(files.id, fileId))
        .returning();

    return updatedFile[0];
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

function sanitizeFilename(name: string) {
    return name
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(0, 100);
}

type FileUploadOptions = {
    requiredTypes?: string[];
    maxFileSize?: number;
    maxStorage?: number;
    location?: string;
};

interface FileUploadTypes {
    db: Db;
    storage: R2Storage;
    file: File | string;
    uploadedBy: string;
    options?: FileUploadOptions;
}

export async function handleFileUpload({
    db,
    storage,
    file,
    uploadedBy,
    options = {},
}: FileUploadTypes) {

    const {
        requiredTypes = [],
        maxFileSize = 10 * 1024 * 1024,
        maxStorage = 5 * 1024 * 1024 * 1024
    } = options;

    if (!(file instanceof File)) {
        throw new AppError(
            404,
            "FILE_NOT_FOUND",
            "File not found in the request."
        );

    }

    if (file.size > maxFileSize) {
        throw new AppError(
            400,
            "FILE_TOO_LARGE",
            `File size exceeds the maximum limit of ${maxFileSize / (1024 * 1024)}MB.`
        );
    }

    if (requiredTypes.length > 0 && !requiredTypes.includes(file.type)) {
        throw new AppError(
            400,
            "FILE_TYPE_NOT_ALLOWED",
            `File type ${file.type} is not allowed.`
        );
    }

    const fileId = crypto.randomUUID();

    const safeName = sanitizeFilename(file.name);

    const location = options.location || "uploads";
    const key = `${location}/${fileId}/${safeName}`;


    const currentUsage = await getStorageUsage(
        db,
        uploadedBy
    );

    if (Number(currentUsage) + Number(file.size) > Number(maxStorage)) {
        throw new AppError(
            400,
            "STORAGE_EXCEEDED",
            `You have exceeded your storage limit of ${maxStorage / (1024 * 1024)}MB.`
        );
    }

    await storage.upload(
        key,
        file
    );

    const savedFileId = await saveFile(db, { file, safeName, key, metadata: {}, uploadedBy })

    return savedFileId;

}

export async function handleFileRemoval(
    db: Db,
    storage: R2Storage,
    fileId: string
) {
    const file = await getFileById(
        db,
        fileId
    );

    if (!file) {
        throw new AppError(
            404,
            "FILE_NOT_FOUND",
            "File not found."
        );
    }
    await storage.delete(file.key);

    await deleteFile(
        db,
        fileId
    );
}


type FileUpdateOptions = {
    maxFileSize?: number;
    maxStorage?: number;
};

interface FileUpdateTypes {
    db: Db;
    storage: R2Storage;
    file: File | string;
    fileId: string;
    editedBy: string;
    options?: FileUpdateOptions;
}

export async function handleFileUpdate({
    db,
    storage,
    file,
    fileId,
    editedBy,
    options = {},
}: FileUpdateTypes) {

    const {
        maxFileSize = 10 * 1024 * 1024,
        maxStorage = 5 * 1024 * 1024 * 1024
    } = options;

    if (!(file instanceof File)) {
        throw new AppError(
            404,
            "FILE_NOT_FOUND",
            "File not found in the request."
        );

    }

    if (file.size > maxFileSize) {
        throw new AppError(
            400,
            "FILE_TOO_LARGE",
            `File size exceeds the maximum limit of ${maxFileSize / (1024 * 1024)}MB.`
        );
    }

    const fileData = await getFileById(db, fileId);

    if (!fileData) {
        throw new AppError(
            404,
            "FILE_NOT_FOUND",
            "File does not exist."
        );
    }

    const currentUsage = await getStorageUsage(
        db,
        editedBy
    );

    if (Number(currentUsage) + Number(file.size) > Number(maxStorage)) {
        throw new AppError(
            400,
            "STORAGE_EXCEEDED",
            `You have exceeded your storage limit of ${maxStorage / (1024 * 1024)}MB.`
        );
    }

    await storage.upload(
        fileData.key,
        file
    );

    const updatedFile = await updateFile(db, { fileId: fileData.id, editedBy })

    return updatedFile;
}