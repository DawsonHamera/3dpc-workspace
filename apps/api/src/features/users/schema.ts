import z from "zod";


export const updateRoleSchema = z.object({
    roleName: z.string(),
});


export const updatePasswordSchema = z.object({
    currentPassword: z.string().optional(),
    newPassword: z
        .string()
        .min(
            8,
            "Password must be at least 8 characters"
        ),
});