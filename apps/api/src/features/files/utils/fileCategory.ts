export type FileCategory =
    | "image"
    | "model"
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

    const documentExtensions = [
        "pdf",
        "doc",
        "docx",
        "txt",
    ];


    if (extension && modelExtensions.includes(extension)) {
        return "model";
    }


    if (extension && documentExtensions.includes(extension)) {
        return "document";
    }


    if (mimeType.startsWith("image/")) {
        return "image";
    }


    if (mimeType.startsWith("video/")) {
        return "video";
    }


    return "other";
}