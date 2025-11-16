import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password is required")
    .max(255, "Password must be at least 255 characters"),
});

export const registerSchema = loginSchema.extend({
  name: z
    .string()
    .min(1, "Name is required")
    .min(50, "Name must be at least 50 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
