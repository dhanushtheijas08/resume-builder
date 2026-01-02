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

export const DATE_FORMATS = {
  "MMM YYYY": {
    label: "Jan 2021",
    regex: /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/,
    format: "MMM yyyy",
  },
  "MM/YYYY": {
    label: "01/2021",
    regex: /^(0[1-9]|1[0-2])\/\d{4}$/,
    format: "MM/yyyy",
  },
  "YYYY-MM": {
    label: "2021-01",
    regex: /^\d{4}-(0[1-9]|1[0-2])$/,
    format: "yyyy-MM",
  },
  "MMMM YYYY": {
    label: "January 2021",
    regex:
      /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}$/,
    format: "MMMM yyyy",
  },
} as const;

export type DateFormatType = keyof typeof DATE_FORMATS;

export const workExperienceSchema = z
  .object({
    order: z.number().int().min(1, "Order is required"),
    jobTitle: z
      .string()
      .min(1, "Job title is required")
      .max(100, "Job title must be at most 100 characters"),
    company: z
      .string()
      .min(1, "Company name is required")
      .max(100, "Company name must be at most 100 characters"),
    location: z
      .string()
      .max(100, "Location must be at most 100 characters")
      .optional(),
    dateFormat: z.enum(["MMM YYYY", "MM/YYYY", "YYYY-MM", "MMMM YYYY"]),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().or(z.literal("")),
    isCurrent: z.boolean(),
    description: z
      .string()
      .max(5000, "Description must be at most 5000 characters")
      .optional(),
  })
  .refine(
    (data) => {
      const formatConfig = DATE_FORMATS[data.dateFormat];
      return formatConfig.regex.test(data.startDate);
    },
    {
      message: "Start date format is invalid for selected format",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      if (data.isCurrent || !data.endDate || data.endDate === "") {
        return true;
      }
      const formatConfig = DATE_FORMATS[data.dateFormat];
      return formatConfig.regex.test(data.endDate);
    },
    {
      message: "End date format is invalid for selected format",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.isCurrent) {
        return true;
      }
      return data.endDate && data.endDate.trim() !== "";
    },
    {
      message: "End date is required when not a current position",
      path: ["endDate"],
    }
  );

export const educationSchema = z
  .object({
    order: z.number().int().min(1, "Order is required"),
    degree: z
      .string()
      .min(1, "Degree is required")
      .max(100, "Degree must be at most 100 characters"),
    institution: z
      .string()
      .min(1, "Institution name is required")
      .max(100, "Institution name must be at most 100 characters"),
    location: z
      .string()
      .max(100, "Location must be at most 100 characters")
      .optional(),
    dateFormat: z.enum(["MMM YYYY", "MM/YYYY", "YYYY-MM", "MMMM YYYY"]),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().or(z.literal("")),
    isCurrent: z.boolean(),
    description: z
      .string()
      .max(5000, "Description must be at most 5000 characters")
      .optional(),
  })
  .refine(
    (data) => {
      const formatConfig = DATE_FORMATS[data.dateFormat];
      return formatConfig.regex.test(data.startDate);
    },
    {
      message: "Start date format is invalid for selected format",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      if (data.isCurrent || !data.endDate || data.endDate === "") {
        return true;
      }
      const formatConfig = DATE_FORMATS[data.dateFormat];
      return formatConfig.regex.test(data.endDate);
    },
    {
      message: "End date format is invalid for selected format",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.isCurrent) {
        return true;
      }
      return data.endDate && data.endDate.trim() !== "";
    },
    {
      message: "End date is required when not currently studying",
      path: ["endDate"],
    }
  );

export const skillSchema = z.object({
  name: z
    .string()
    .min(1, "Skill name is required")
    .max(50, "Skill name must be at most 50 characters"),
  proficiency: z
    .number()
    .int()
    .min(0, "Proficiency must be at least 0")
    .max(100, "Proficiency must be at most 100")
    .optional(),
  category: z
    .string()
    .max(100, "Category must be at most 100 characters")
    .optional(),
  displayType: z.enum(["badge", "progress", "category"]).default("badge"),
});

export const projectSchema = z
  .object({
    order: z.number().int().min(1, "Order is required"),
    name: z
      .string()
      .min(1, "Project name is required")
      .max(100, "Project name must be at most 100 characters"),
    description: z
      .string()
      .max(5000, "Description must be at most 5000 characters")
      .optional(),
    url: z.url("Invalid URL").optional().or(z.literal("")),
    github: z.url("Invalid GitHub URL").optional().or(z.literal("")),
    technologies: z
      .string()
      .max(500, "Technologies list is too long")
      .optional(),
    dateFormat: z.enum(["MMM YYYY", "MM/YYYY", "YYYY-MM", "MMMM YYYY"]),
    startDate: z.string().optional(),
    endDate: z.string().optional().or(z.literal("")),
    isCurrent: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.startDate) return true;
      const formatConfig = DATE_FORMATS[data.dateFormat];
      return formatConfig.regex.test(data.startDate);
    },
    {
      message: "Start date format is invalid for selected format",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      if (data.isCurrent || !data.endDate || data.endDate === "") {
        return true;
      }
      const formatConfig = DATE_FORMATS[data.dateFormat];
      return formatConfig.regex.test(data.endDate);
    },
    {
      message: "End date format is invalid for selected format",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.isCurrent) {
        return true;
      }
      return !data.startDate || data.endDate || data.endDate === "";
    },
    {
      message: "End date is required when not an ongoing project",
      path: ["endDate"],
    }
  );

export const certificationSchema = z.object({
  order: z.number().int().min(1, "Order is required"),
  title: z
    .string()
    .min(1, "Certification title is required")
    .max(100, "Title must be at most 100 characters"),
  issuer: z
    .string()
    .min(1, "Issuer is required")
    .max(100, "Issuer must be at most 100 characters"),
  credentialUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z
    .string()
    .max(5000, "Description must be at most 5000 characters")
    .optional(),
});

export const awardSchema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .max(5000, "Description must be at most 5000 characters"),
});

export const publicationSchema = z.object({
  order: z.number().int().min(1, "Order is required"),
  title: z
    .string()
    .min(1, "Publication title is required")
    .max(200, "Title must be at most 200 characters"),
  publisher: z
    .string()
    .min(1, "Publisher is required")
    .max(100, "Publisher must be at most 100 characters"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  summary: z
    .string()
    .max(5000, "Summary must be at most 5000 characters")
    .optional(),
});

export const customSectionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  type: z.enum(["SUMMARY", "EXPERIENCE", "EDUCATION", "PROJECT", "SKILL"]),
  order: z.number().int().min(1, "Order is required"),
  content: z.any(),
});

export type CreateResumeFormData = z.infer<typeof createResumeSchema>;
export type PersonalInfoFormData = z.infer<typeof personalInfoSchme>;
export type WorkExperienceFormData = z.infer<typeof workExperienceSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type SkillFormData = z.input<typeof skillSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type CertificationFormData = z.infer<typeof certificationSchema>;
export type AwardFormData = z.infer<typeof awardSchema>;
export type PublicationFormData = z.infer<typeof publicationSchema>;
export type CustomSectionFormData = z.infer<typeof customSectionSchema>;
