import * as z from "zod";
import { EducationSchema, ExperienceSchema, ProfileSchema } from "./schema";
export type Profile = z.infer<typeof ProfileSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;

export type Skill = {
  id: number;
  name: string;
  level?: number;
};
export type Project = {
  id: number;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date | string;
  link?: string;
};

export type Resume = {
  profile: Profile;
  experiences: Experience;
  educations: Education;
  skills: Skill[];
  projects: Project[];
};

export type ResumeStore = Resume & {
  setProfile: (profile: Profile) => void;
  setExperiences: (experiences: Experience) => void;
  setEducations: (educations: Education) => void;
  setSkills: (skills: Skill[]) => void;
  setProjects: (projects: Project[]) => void;
};