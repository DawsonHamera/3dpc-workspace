import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  grade: z.string().min(1).max(12).optional(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);