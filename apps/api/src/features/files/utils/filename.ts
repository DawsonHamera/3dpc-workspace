export function sanitizeStorageFilename(
    name:string
){
    return name
        .replace(/[^a-zA-Z0-9._-]/g,"_")
        .slice(0,100);
}