import { zValidator } from "@hono/zod-validator";
import type { ZodType } from "zod";
import { AppError } from "./errors";

export function validateJson<T extends ZodType>(
    schema: T
) {
    return zValidator(
        "json",
        schema,
        (result) => {
            if (!result.success) {
                throw new AppError(
                    400,
                    "VALIDATION_ERROR",
                    "Invalid request",
                    result.error.issues
                );
            }
        }
    );
}