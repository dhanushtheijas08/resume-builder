import * as z from "zod";

export const ProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
});

export const EducationSchema = z.object({
  id: z.number().optional(),
  education: z.object({
    eduId: z.number().optional(),
    institutionName: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
    score: z.coerce.number().optional(),
  }),
});

export const ExperienceSchema = z.object({
  id: z.number().optional(),
  experience: z.object({
    expId: z.number().optional(),
    role: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const SkillSchema = z.object({
  id: z.number().optional(),
  skill: z.object({
    skillId: z.number().optional(),
    skillName: z.string(),
    level: z.string().optional(),
  }),
});

export const ProjectSchema = z.object({
  id: z.number().optional(),
  project: z.object({
    projectId: z.number().optional(),
    projectName: z.string(),
    deploymentLink: z.string().optional(),
    repoLink: z.string().optional(),
    projectDescription: z.string().optional(),
  }),
});
export const LanguageSchema = z.object({
  id: z.number().optional(),
  language: z.object({
    LanguageId: z.number().optional(),
    languageName: z.string(),
    proficiency: z.string().optional(),
  }),
});
export const CertificationSchema = z.object({
  id: z.number().optional(),
  certification: z.object({
    certificationId: z.number().optional(),
    certificationName: z.string(),
    certificationAuthority: z.string(),
    certificationProof: z.string().optional(),
    date: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const PublicationSchema = z.object({
  id: z.number().optional(),
  publication: z.object({
    publicationId: z.number().optional(),
    publicationName: z.string(),
    publicationLink: z.string().optional(),
    publicationPublisher: z.string().optional(),
    publicationDate: z.string().optional(),
    publicationDescription: z.string().optional(),
  }),
});

export const ResumeSchema = z.object({
  id: z.number().optional(),
  profile: ProfileSchema,
  education: z.array(EducationSchema),
  experience: z.array(ExperienceSchema),
  skills: z.array(SkillSchema),
  projects: z.array(ProjectSchema),
  languages: z.array(LanguageSchema),
  certifications: z.array(CertificationSchema),
});
