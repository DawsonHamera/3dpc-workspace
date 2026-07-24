import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { isApiError } from "@/features/apiFetch";

type ValidationDetail = {
    path: (string | number)[];
    message: string;
};

function applyValidationErrors<T extends FieldValues>(
    details: ValidationDetail[],
    setError: UseFormSetError<T>
) {
    details.forEach((field) => {
        const key = field.path[0];

        if (typeof key === "string") {
            setError(key as Path<T>, {
                type: "server",
                message: field.message,
            });
        }
    });
}

export function handleMutationError<T extends FieldValues>(
    err: unknown,
    setError: UseFormSetError<T>
) {
    if (isApiError(err)) {

        if (err.error.code === "VALIDATION_ERROR") {
            applyValidationErrors(
                err.error.details ?? [],
                setError
            );

            return;
        }

        setError("root", {
            type: "server",
            message: err.error.message,
        });

        return;
    }

    setError("root", {
        type: "server",
        message: `An unexpected error occurred. Secret Stuff: ${err}`,
    });
}