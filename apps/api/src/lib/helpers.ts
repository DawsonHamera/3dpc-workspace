export function formatBytes(bytes: number): string {
    if (!bytes) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB"];

    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, index);

    const precision = index === 0 ? 0 : 2;

    return `${value.toFixed(precision)} ${units[index]}`;
}