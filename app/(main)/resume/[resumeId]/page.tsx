"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Briefcase,
  Check,
  Code,
  Download,
  Eye,
  FileText,
  FolderKanban,
  GraduationCap,
  Loader2,
  PanelLeftClose,
  PanelRightClose,
  Save,
  User,
  Sparkles,
} from "lucide-react";
import { useResumeStore } from "@/lib/store/resume-store";

export default function ResumePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { resumeData } = useResumeStore();

  // Calculate completion percentage
  const calculateCompletion = () => {
    let completed = 0;
    const total = 5;

    if (resumeData.personalInfo.fullName && resumeData.personalInfo.email)
      completed++;
    if (resumeData.experiences.length > 0) completed++;
    if (resumeData.education.length > 0) completed++;
    if (resumeData.skills.length > 0) completed++;
    if (resumeData.projects.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const completion = calculateCompletion();

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsExporting(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Panel - Editor */}
      <div
        className={`${
          showPreview ? "w-1/2" : "w-full"
        } border-r flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Resume Builder</h1>
              <p className="text-xs text-muted-foreground">
                {lastSaved
                  ? `Last saved ${lastSaved.toLocaleTimeString()}`
                  : "Unsaved changes"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="hidden md:flex"
            >
              {showPreview ? (
                <PanelRightClose className="size-4 mr-2" />
              ) : (
                <PanelLeftClose className="size-4 mr-2" />
              )}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Save className="size-4 mr-2" />
              )}
              Save
            </Button>
            <Button size="sm" onClick={handleExport} disabled={isExporting}>
              {isExporting ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Download className="size-4 mr-2" />
              )}
              Export PDF
            </Button>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="px-6 py-3 border-b bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <span className="text-sm font-medium">Resume Completion</span>
            </div>
            <span className="text-sm font-semibold text-primary">
              {completion}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {completion === 100
              ? "Your resume is complete!"
              : "Fill in all sections to complete your resume"}
          </p>
        </div>

        {/* Sections */}
        <ScrollArea className="flex-1">
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
              className="w-full space-y-3"
            >
              <AccordionItem
                value="personal"
                className="border rounded-xl bg-card shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <User className="size-4 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Personal Information</span>
                      <p className="text-xs text-muted-foreground font-normal">
                        Contact details and summary
                      </p>
                    </div>
                  </div>
                  {resumeData.personalInfo.fullName && (
                    <Check className="size-4 text-emerald-500 mr-2" />
                  )}
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <PersonalInfoSection />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="experience"
                className="border rounded-xl bg-card shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Briefcase className="size-4 text-purple-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Work Experience</span>
                      <p className="text-xs text-muted-foreground font-normal">
                        Your professional history
                      </p>
                    </div>
                  </div>
                  {resumeData.experiences.length > 0 && (
                    <Check className="size-4 text-emerald-500 mr-2" />
                  )}
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <ExperienceSection />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="education"
                className="border rounded-xl bg-card shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <GraduationCap className="size-4 text-emerald-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Education</span>
                      <p className="text-xs text-muted-foreground font-normal">
                        Academic background
                      </p>
                    </div>
                  </div>
                  {resumeData.education.length > 0 && (
                    <Check className="size-4 text-emerald-500 mr-2" />
                  )}
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <EducationSection />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="skills"
                className="border rounded-xl bg-card shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Code className="size-4 text-orange-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Skills</span>
                      <p className="text-xs text-muted-foreground font-normal">
                        Technical expertise
                      </p>
                    </div>
                  </div>
                  {resumeData.skills.length > 0 && (
                    <Check className="size-4 text-emerald-500 mr-2" />
                  )}
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <SkillsSection />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="projects"
                className="border rounded-xl bg-card shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <FolderKanban className="size-4 text-cyan-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Projects</span>
                      <p className="text-xs text-muted-foreground font-normal">
                        Showcase your work
                      </p>
                    </div>
                  </div>
                  {resumeData.projects.length > 0 && (
                    <Check className="size-4 text-emerald-500 mr-2" />
                  )}
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <ProjectsSection />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Preview */}
      {showPreview && (
        <div className="w-1/2 flex flex-col bg-muted/30">
          {/* Preview Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <Eye className="size-4 text-muted-foreground" />
              <h2 className="font-semibold">Live Preview</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                A4 Format
              </span>
            </div>
          </header>

          {/* Preview Content */}
          <ScrollArea className="flex-1">
            <div className="p-8 flex justify-center">
              <div
                className="shadow-2xl rounded-sm"
                id="resume-preview-container"
              >
                <div id="resume-preview">
                  <ResumePreview />
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
