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

export function isApiError(err: unknown): err is ApiError {
    return (
        typeof err === "object" &&
        err !== null &&
        "error" in err
    );
}