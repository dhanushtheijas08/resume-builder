import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password is required")
    .max(255, "Password must be at most 255 characters"),
});

export const registerSchema = loginSchema.extend({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
});

export const socialLoginSchema = z.object({
  provider: z.enum(["google", "github"]),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type SocialLoginFormData = z.infer<typeof socialLoginSchema>;
export const responseSchema = z.object({
  message: z.string(),
  statusCode: z.number(),
  success: z.boolean(),
  redirectUrl: z.string().optional(),
  data: z.any().optional(),
});

export type ResponseData = z.infer<typeof responseSchema>;
