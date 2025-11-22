import { z } from "zod";

const objectIdSchemaFn = (message: string) =>
  z.string().regex(/^[0-9a-fA-F]{24}$/, message);

export const createResumeSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be at most 50 characters long"),
  templateId: objectIdSchemaFn("Please select a template"),
});

export type CreateResumeFormData = z.infer<typeof createResumeSchema>;
