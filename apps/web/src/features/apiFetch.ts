import type { ApiError } from "./types";
export async function apiFetch<T>(
    res: {
        ok: boolean;
        json: () => Promise<T>;
    }
): Promise<T> {
    if (!res.ok) {
        throw await res.json();
    }

    return await res.json();
}

export function isApiError(error: unknown): error is ApiError {
    return (
        typeof error === "object" &&
        error !== null &&
        "error" in error &&
        typeof (error as ApiError).error === "object" &&
        typeof (error as ApiError).error.message === "string" &&
        typeof (error as ApiError).error.code === "string"
    );
}