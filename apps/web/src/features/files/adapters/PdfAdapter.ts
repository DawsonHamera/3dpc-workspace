import type { FileRecord } from "../hooks/useGetFileById";

export async function pdfAdapter(
    source: Blob,
    _fileRecord: FileRecord
) {
    return source;
}