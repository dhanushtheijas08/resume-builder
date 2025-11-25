"use client";

import { EducationSection } from "@/components/resume/forms/education-section";
import { ExperienceSection } from "@/components/resume/forms/experience-section";
import { PersonalInfoSection } from "@/components/resume/forms/personal-info-section";
import { ProjectsSection } from "@/components/resume/forms/projects-section";
import { SkillsSection } from "@/components/resume/forms/skills-section";
import { ResumePreview } from "@/components/resume/preview/resume-preview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Briefcase,
  Code,
  FileText,
  FolderKanban,
  GraduationCap,
  User,
} from "lucide-react";

export default function ResumePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/2 border-r bg-muted/20 flex flex-col">
        <div className="border-b bg-background px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <FileText className="size-5" />
            <h1 className="text-xl font-semibold">Resume Builder</h1>
          </div>
        </div>

        <ScrollArea className="flex-1 max-h-[calc(100vh-73px)]">
          <div className="p-6 pb-10">
            <Accordion
              type="multiple"
              defaultValue={[
                "personal",
                "experience",
                "education",
                "skills",
                "projects",
              ]}
              className="w-full space-y-4"
            >
              <AccordionItem
                value="personal"
                className="border rounded-lg bg-card"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <span className="flex items-center gap-2">
                    <User className="size-4" />
                    Personal Information
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5">
                    <PersonalInfoSection />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="experience"
                className="border rounded-lg bg-card"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <span className="flex items-center gap-2">
                    <Briefcase className="size-4" />
                    Work Experience
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5">
                    <ExperienceSection />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="education"
                className="border rounded-lg bg-card"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="size-4" />
                    Education
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5">
                    <EducationSection />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="skills"
                className="border rounded-lg bg-card"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <span className="flex items-center gap-2">
                    <Code className="size-4" />
                    Skills
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5">
                    <SkillsSection />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="projects"
                className="border rounded-lg bg-card"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <span className="flex items-center gap-2">
                    <FolderKanban className="size-4" />
                    Projects
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5">
                    <ProjectsSection />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </div>

      <ScrollArea className="w-1/2 bg-gray-50 dark:bg-gray-900/50 flex flex-col overflow-hidden">
        <div className="border-b bg-background px-6 py-4 sticky top-0 z-10">
          <h2 className="text-lg font-semibold">Live Preview</h2>
        </div>
        <div className="flex-1">
          <div
            className="p-8 flex justify-center"
            id="resume-preview-container"
          >
            <div id="resume-preview">
              <ResumePreview />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
