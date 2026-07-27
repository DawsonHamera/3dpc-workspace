import type { FileRecord } from "../hooks/useGetFileById";

export type ModelFile = {
    url: string;
    extension: string;
};

export async function modelAdapter(
    source: Blob,
    fileRecord: FileRecord
) {
    const extension =
        fileRecord.originalName
            .split(".")
            .pop()
            ?.toLowerCase() ?? "";

    return {
        url: URL.createObjectURL(source),
        extension,
    };
}