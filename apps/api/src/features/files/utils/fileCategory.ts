export type FileCategory =
    | "image"
    | "model"
    | "pdf"
    | "document"
    | "video"
    | "other";

export function getFileCategory(
    mimeType: string,
    fileName?: string
): FileCategory {

    const extension = fileName
        ?.split(".")
        .pop()
        ?.toLowerCase();

    const modelExtensions = [
        "stl",
        "3mf",
        "obj",
        "glb",
        "gltf",
    ];

    if (
        extension &&
        modelExtensions.includes(extension)
    ) {
        return "model";
    }

    if (extension === "pdoc") {
        return "document";
    }

    if (
        mimeType === "application/pdf" ||
        extension === "pdf"
    ) {
        return "pdf";
    }

    if (mimeType.startsWith("image/")) {
        return "image";
    }

    if (mimeType.startsWith("video/")) {
        return "video";
    }

    return "other";
}