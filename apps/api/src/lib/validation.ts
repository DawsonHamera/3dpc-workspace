import { zValidator } from "@hono/zod-validator";
import type { ZodType } from "zod";

export function validateJson<T extends ZodType>(
  schema: T
) {
  return zValidator(
    "json",
    schema,
    (result, c) => {
      if (!result.success) {
        return c.json(
          {
            error: {
              code: "VALIDATION_ERROR",
              message: "Invalid request",
              fields: result.error.issues,
            },
          },
          400
        );
      }
    }
  );
}