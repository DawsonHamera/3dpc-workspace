export function formatBytes(bytes: number): string {
    if (!bytes) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB"];

    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, index);

    const precision = index === 0 ? 0 : 2;

    return `${value.toFixed(precision)} ${units[index]}`;
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(date));
}

export function getFileUrl(path?: string | null) {
    if (!path) return "";

    return `${import.meta.env.VITE_API_URL}/files/${path}/download`;
}