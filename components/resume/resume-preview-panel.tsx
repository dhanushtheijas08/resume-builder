import { ResumePreview } from "@/components/resume/resume-preview";
import { TemplateId } from "@/components/resume-templates";
import type { ResumeWithRelations } from "@/lib/queries/resume";

interface ResumePreviewPanelProps {
  resume: ResumeWithRelations;
}

export function ResumePreviewPanel({ resume }: ResumePreviewPanelProps) {
  return (
    <ResumePreview
      templateId={resume.templateId as TemplateId}
      resumeData={{
        profile: resume.profile,
        workExperiences: resume.workExperiences,
        educations: resume.educations,
        skills: resume.skills,
        projects: resume.projects,
        certifications: resume.certifications,
        awards: resume.awards,
        publications: resume.publications,
        customSections: resume.customSection ?? [],
      }}
    />
  );
}
