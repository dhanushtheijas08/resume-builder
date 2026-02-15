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

export const updateUserSchema = registerSchema
  .pick({
    name: true,
  })
  .partial();

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Password is required")
    .max(255, "Password must be at most 255 characters"),
  newPassword: z
    .string()
    .min(8, "Password is required")
    .max(255, "Password must be at most 255 characters"),
  confirmPassword: z
    .string()
    .min(8, "Password is required")
    .max(255, "Password must be at most 255 characters"),
});

export const accountSettingsSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(50, "Name must be at most 50 characters"),
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((values, ctx) => {
    const hasPasswordInput = [
      values.currentPassword,
      values.newPassword,
      values.confirmPassword,
    ].some((value) => value.length > 0);

    if (!hasPasswordInput) return;

    if (values.currentPassword.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currentPassword"],
        message: "Current password is required",
      });
    } else if (values.currentPassword.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currentPassword"],
        message: "Password must be at least 8 characters",
      });
    }

    if (values.newPassword.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["newPassword"],
        message: "New password is required",
      });
    } else if (values.newPassword.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["newPassword"],
        message: "Password must be at least 8 characters",
      });
    }

    if (values.confirmPassword.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Confirm password is required",
      });
    } else if (values.confirmPassword.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Password must be at least 8 characters",
      });
    }

    if (
      values.newPassword.length > 0 &&
      values.confirmPassword.length > 0 &&
      values.newPassword !== values.confirmPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
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
export type AccountSettingsSchema = z.infer<typeof accountSettingsSchema>;
