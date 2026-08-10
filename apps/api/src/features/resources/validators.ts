import { z } from "zod";

export const createOnshapeResourceSchema = z.object({
    documentId: z.string().min(1),
});

export type CreateOnshapeResourceInput =
    z.infer<typeof createOnshapeResourceSchema>;