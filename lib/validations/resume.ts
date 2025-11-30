import { z } from "zod";

export const objectIdSchemaFn = (message: string) =>
  z.string().regex(/^[0-9a-fA-F]{24}$/, message);

export const createResumeSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be at most 50 characters long"),
  templateId: objectIdSchemaFn("Please select a template"),
});

export const personalInfoSchme = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
  email: z.email("Invalid email address").trim().toLowerCase(),
  designation: z
    .string()
    .trim()
    .max(50, "Designation must be at most 50 characters")
    .optional(),
  jobTitle: z
    .string()
    .max(50, "Job title must be at most 50 characters")
    .optional(),
  bio: z.string().max(5000, "Bio must be at most 5000 characters").optional(),
  phoneNumber: z
    .string("Invalid phone number")
    .min(9, "Phone number must be at least 9 characters")
    .max(20, "Phone number must be at most 20 characters"),
  location: z
    .string()
    .max(100, "Location must be at most 100 characters")
    .optional(),
  linkedin: z.url("Invalid LinkedIn URL").optional(),
  portfolio: z.url("Invalid portfolio URL").optional(),
  github: z.url("Invalid GitHub URL").optional(),
  profileImage: z.string("Invalid profile image").optional(),
});

export type CreateResumeFormData = z.infer<typeof createResumeSchema>;
export type PersonalInfoFormData = z.infer<typeof personalInfoSchme>;
