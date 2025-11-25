"use client";

import { create } from "zustand";
import { JSONContent } from "@tiptap/react";

// Types
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  summary: JSONContent;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: JSONContent;
}

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: JSONContent;
  url?: string;
  github?: string;
  technologies: string[];
}

// Custom Section Types
export type CustomFieldType = "text" | "textarea" | "richtext" | "date" | "url" | "email" | "phone";

export interface CustomField {
  id: string;
  name: string;
  type: CustomFieldType;
  placeholder?: string;
  required?: boolean;
}

export interface CustomSectionEntry {
  id: string;
  values: Record<string, string | JSONContent>;
}

export interface CustomSection {
  id: string;
  name: string;
  icon: string;
  color: string;
  fields: CustomField[];
  entries: CustomSectionEntry[];
  allowMultiple: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  customSections: CustomSection[];
}

interface ResumeStore {
  resumeData: ResumeData;
  // Personal Info
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  setExperience: (id: string, data: Experience) => void;
  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  setEducation: (id: string, data: Education) => void;
  // Skills
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  setSkill: (id: string, data: Skill) => void;
  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  setProject: (id: string, data: Project) => void;
  // Custom Sections
  addCustomSection: (section: Omit<CustomSection, "id" | "entries">) => string;
  updateCustomSection: (id: string, data: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionEntry: (sectionId: string, entry: CustomSectionEntry) => void;
  updateCustomSectionEntry: (sectionId: string, entryId: string, values: Record<string, string | JSONContent>) => void;
  removeCustomSectionEntry: (sectionId: string, entryId: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

const emptyContent: JSONContent = { type: "doc", content: [] };

// Helper to create rich text content
const createTextContent = (text: string): JSONContent => ({
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text }],
    },
  ],
});

const createBulletList = (items: string[]): JSONContent => ({
  type: "doc",
  content: [
    {
      type: "bulletList",
      content: items.map((item) => ({
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: item }],
          },
        ],
      })),
    },
  ],
});

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    website: "johndoe.dev",
    summary: createTextContent(
      "Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about building scalable applications and leading technical teams. Skilled in modern web technologies and cloud infrastructure."
    ),
  },
  experiences: [
    {
      id: "exp1",
      position: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "2021-01",
      endDate: "",
      current: true,
      description: createBulletList([
        "Led development of microservices architecture serving 1M+ daily users",
        "Mentored team of 5 junior developers and conducted code reviews",
        "Implemented CI/CD pipelines reducing deployment time by 40%",
        "Architected real-time notification system using WebSockets",
      ]),
    },
    {
      id: "exp2",
      position: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      startDate: "2019-06",
      endDate: "2020-12",
      current: false,
      description: createBulletList([
        "Developed and maintained React and Node.js applications",
        "Implemented RESTful APIs and GraphQL endpoints",
        "Optimized database queries improving performance by 60%",
        "Collaborated with design team to implement responsive UI components",
      ]),
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California",
      location: "Berkeley, CA",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      current: false,
    },
  ],
  skills: [
    { id: "skill1", name: "JavaScript", category: "Languages" },
    { id: "skill2", name: "TypeScript", category: "Languages" },
    { id: "skill3", name: "Python", category: "Languages" },
    { id: "skill4", name: "React", category: "Frameworks" },
    { id: "skill5", name: "Node.js", category: "Frameworks" },
    { id: "skill6", name: "Next.js", category: "Frameworks" },
    { id: "skill7", name: "AWS", category: "Cloud" },
    { id: "skill8", name: "Docker", category: "Tools" },
    { id: "skill9", name: "PostgreSQL", category: "Databases" },
    { id: "skill10", name: "MongoDB", category: "Databases" },
  ],
  projects: [
    {
      id: "proj1",
      name: "E-Commerce Platform",
      description: createTextContent(
        "Built a full-stack e-commerce platform with React, Node.js, and Stripe integration. Features include user authentication, product catalog, shopping cart, and order management."
      ),
      url: "https://ecommerce-demo.com",
      github: "https://github.com/johndoe/ecommerce",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    },
    {
      id: "proj2",
      name: "Task Management App",
      description: createTextContent(
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team workspaces. Built with Next.js and deployed on Vercel."
      ),
      url: "https://taskapp-demo.com",
      github: "https://github.com/johndoe/taskapp",
      technologies: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    },
  ],
  customSections: [],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeData,

  // Personal Info
  updatePersonalInfo: (data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalInfo: { ...state.resumeData.personalInfo, ...data },
      },
    })),

  // Experience
  addExperience: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experiences: [
          ...state.resumeData.experiences,
          {
            id: generateId(),
            position: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: { type: "doc", content: [] },
          },
        ],
      },
    })),

  updateExperience: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experiences: state.resumeData.experiences.map((exp) =>
          exp.id === id ? { ...exp, ...data } : exp
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experiences: state.resumeData.experiences.filter(
          (exp) => exp.id !== id
        ),
      },
    })),

  setExperience: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experiences: state.resumeData.experiences.map((exp) =>
          exp.id === id ? data : exp
        ),
      },
    })),

  // Education
  addEducation: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [
          ...state.resumeData.education,
          {
            id: generateId(),
            institution: "",
            location: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            current: false,
          },
        ],
      },
    })),

  updateEducation: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((edu) =>
          edu.id === id ? { ...edu, ...data } : edu
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((edu) => edu.id !== id),
      },
    })),

  setEducation: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((edu) =>
          edu.id === id ? data : edu
        ),
      },
    })),

  // Skills
  addSkill: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [
          ...state.resumeData.skills,
          {
            id: generateId(),
            name: "",
            category: "Languages",
          },
        ],
      },
    })),

  updateSkill: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.map((skill) =>
          skill.id === id ? { ...skill, ...data } : skill
        ),
      },
    })),

  removeSkill: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.filter((skill) => skill.id !== id),
      },
    })),

  setSkill: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.map((skill) =>
          skill.id === id ? data : skill
        ),
      },
    })),

  // Projects
  addProject: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [
          ...state.resumeData.projects,
          {
            id: generateId(),
            name: "",
            description: { type: "doc", content: [] },
            url: "",
            github: "",
            technologies: [],
          },
        ],
      },
    })),

  updateProject: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((project) =>
          project.id === id ? { ...project, ...data } : project
        ),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter(
          (project) => project.id !== id
        ),
      },
    })),

  setProject: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((project) =>
          project.id === id ? data : project
        ),
      },
    })),

  // Custom Sections
  addCustomSection: (section) => {
    const id = generateId();
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        customSections: [
          ...state.resumeData.customSections,
          { ...section, id, entries: [] },
        ],
      },
    }));
    return id;
  },

  updateCustomSection: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        customSections: state.resumeData.customSections.map((section) =>
          section.id === id ? { ...section, ...data } : section
        ),
      },
    })),

  removeCustomSection: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        customSections: state.resumeData.customSections.filter(
          (section) => section.id !== id
        ),
      },
    })),

  addCustomSectionEntry: (sectionId, entry) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        customSections: state.resumeData.customSections.map((section) =>
          section.id === sectionId
            ? { ...section, entries: [...section.entries, entry] }
            : section
        ),
      },
    })),

  updateCustomSectionEntry: (sectionId, entryId, values) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        customSections: state.resumeData.customSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                entries: section.entries.map((entry) =>
                  entry.id === entryId ? { ...entry, values } : entry
                ),
              }
            : section
        ),
      },
    })),

  removeCustomSectionEntry: (sectionId, entryId) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        customSections: state.resumeData.customSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                entries: section.entries.filter((entry) => entry.id !== entryId),
              }
            : section
        ),
      },
    })),
}));

// Helper to create empty instances for dialog forms
export const createEmptyExperience = (): Experience => ({
  id: generateId(),
  position: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: { type: "doc", content: [] },
});

export const createEmptyEducation = (): Education => ({
  id: generateId(),
  institution: "",
  location: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  current: false,
});

export const createEmptySkill = (): Skill => ({
  id: generateId(),
  name: "",
  category: "Languages",
});

export const createEmptyProject = (): Project => ({
  id: generateId(),
  name: "",
  description: { type: "doc", content: [] },
  url: "",
  github: "",
  technologies: [],
});

export const createCustomSectionEntry = (fields: CustomField[]): CustomSectionEntry => ({
  id: generateId(),
  values: fields.reduce((acc, field) => {
    acc[field.id] = field.type === "richtext" ? { type: "doc", content: [] } : "";
    return acc;
  }, {} as Record<string, string | JSONContent>),
});

export { generateId };

