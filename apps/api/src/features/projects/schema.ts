import z from "zod";


export const uploadSchema = z.object({
    file: z.instanceof(File),
    metadata: z.string().optional(),
});


export const createProjectSchema = z.object({
    name: z.string().min(
        1,
        "Project name is required"
    ),

    description: z.string().optional(),

    shortDescription: z.string().optional(),

    visibility: z.enum([
        "public",
        "private",
    ]).optional(),

    isFeatured: z.boolean().optional(),

    slug: z.string().min(
        1,
        "Project slug is required"
    ),
});