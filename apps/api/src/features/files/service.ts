import { AppError } from "../../lib/errors";
import type { ServicesContext } from "../../types";
import { createFileRecord, deleteFileRecord, findFileById, updateFileRecord } from "./repository";
import { getFileCategory } from "./utils/fileCategory";
import { sanitizeStorageFilename } from "./utils/filename";
import { validateFile } from "./utils/validation";

export const uploadFile = async ({
    services: { db, storage, audit },
    file,
    uploadedBy,
    options
}: {
    services: ServicesContext;
    file: File;
    uploadedBy: string;
    options?: {
        location?: string;
        requiredTypes?: ("image" | "model" | "document" | "video" | "other")[];
        maxFileSize?: number;
    };
}) => {

    const {
        location = "uploads",
        requiredTypes = [
            "image",
            "model",
            "document",
            "video",
            "other",
        ],
        maxFileSize = 1024 * 1024 * 15,
    } = options ?? {};

    validateFile(file, maxFileSize, requiredTypes); // 15MB


    const id = crypto.randomUUID();

    const key =
        `${location}/${id}/${sanitizeStorageFilename(file.name)}`;


    await storage.upload(
        key,
        file
    );

    const savedFile = await createFileRecord(
        db,
        {
            key,
            originalName: file.name,
            mimeType: file.type,
            size: file.size,
            type: getFileCategory(
                file.type,
                file.name
            ),
            metadata: {},
            uploadedBy
        }
    );

    await audit.create({
        userId: uploadedBy,
        action: "FILE_UPLOADED",
        resourceType: "file",
        resourceId: savedFile.id,
        description: `Uploaded file ${savedFile.originalName}`,
    });

    return savedFile;
}

export const updateFile = async ({
    services: { db, storage, audit },
    file,
    id,
    userId,
    options
}: {
    services: ServicesContext;
    file: File;
    id: string;
    userId: string;
    options?: {
        location?: string;
    };
}) => {
    validateFile(file, 1024 * 1024 * 10); // 10MB

    const basePath = options?.location ?? "uploads";

    const key =
        `${basePath}/${id}/${sanitizeStorageFilename(file.name)}`;

    await storage.upload(
        key,
        file
    );

    const savedFile = await updateFileRecord(
        db,
        id,
        userId,
    );

    await audit.create({
        userId: userId,
        action: "FILE_UPDATED",
        resourceType: "file",
        resourceId: savedFile.id,
        description: `Updated file ${savedFile.originalName}`,
    });

    return savedFile;
};

export const removeFile = async ({
    services: { db, storage, audit },
    userId,
    id
}: {
    services: ServicesContext;
    userId: string;
    id: string;
}) => {

    const file = await findFileById(db, id);


    if (!file) {
        throw new AppError(
            404,
            "FILE_NOT_FOUND",
            "File not found"
        );
    }


    await storage.delete(
        file.key
    );


    await deleteFileRecord(
        db,
        id
    );

    await audit.create({
        userId,
        action: "FILE_DELETED",
        resourceType: "file",
        resourceId: file.id,
        description: `Deleted file ${file.originalName}`,
    });
}

export const downloadFile = async ({
    services: { db, storage },
    id,
}: {
    services: ServicesContext;
    id: string;
}) => {
    const file = await findFileById(
        db,
        id
    );

    if (!file) {
        throw new AppError(
            404,
            "FILE_NOT_FOUND",
            "File not found."
        );
    }

    const object = await storage.get(file.key);

    if (!object) {
        throw new AppError(
            404,
            "STORED_FILE_MISSING",
            "Stored file missing."
        );
    }

    return {
        file,
        object,
    };
}