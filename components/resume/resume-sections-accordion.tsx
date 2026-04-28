"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SortableList } from "@/components/resume/sortable-list";
import { PersonalInfo } from "@/components/resume/sections/personal-info/personal-info";
import { WorkExperienceSection } from "@/components/resume/sections/work-experience/work-experience";
import { EducationSection } from "@/components/resume/sections/education/education";
import { SkillSection } from "@/components/resume/sections/skill/skill";
import { ProjectSection } from "@/components/resume/sections/project/project";
import { CertificationSection } from "@/components/resume/sections/certification/certification";
import { AwardSection } from "@/components/resume/sections/award/award";
import { PublicationSection } from "@/components/resume/sections/publication/publication";
// import { CustomSectionComponent } from "@/components/resume/sections/custom-section/custom-section";
import type { ResumeWithRelations } from "@/lib/queries/resume";
import {
  normalizeSectionOrder,
  type ResumeSectionKey,
} from "@/lib/resume-section-order";
import { updateSectionOrderAction } from "@/lib/actions/resume-actions";
import {
  Award,
  BookOpen,
  Briefcase,
  Code,
  // FileText,
  FolderKanban,
  GraduationCap,
  Trophy,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

type SkillType = "badge" | "progress" | "category";

interface TemplateMetaConfig {
  showProfileImage: boolean;
  skillType: SkillType;
  showProjectTech: boolean;
}

interface ResumeSectionsAccordionProps {
  resume: ResumeWithRelations;
  templateMeta: TemplateMetaConfig;
}

type ResumeAccordionSection = {
  id: ResumeSectionKey;
  title: string;
  description: string;
  icon: LucideIcon;
  iconWrapperClassName: string;
  iconClassName: string;
  content: React.ReactNode;
};

const ResumeAccordionItem = ({
  section,
}: {
  section: ResumeAccordionSection;
}) => {
  const Icon = section.icon;

  return (
    <AccordionItem
      value={section.id}
      className="border rounded-xl bg-card overflow-hidden"
    >
      <AccordionTrigger className="px-5 py-4 border-b border-border hover:no-underline hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          <div
            className={`size-8 rounded-lg flex items-center justify-center ${section.iconWrapperClassName}`}
          >
            <Icon className={`size-4 ${section.iconClassName}`} />
          </div>
          <div className="text-left">
            <span className="font-medium">{section.title}</span>
            <p className="text-xs text-muted-foreground font-normal">
              {section.description}
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-0 pb-0 border-b border-border">
        <div className="px-5 pb-5 pt-2">{section.content}</div>
      </AccordionContent>
    </AccordionItem>
  );
};

export function ResumeSectionsAccordion({
  resume,
  templateMeta,
}: ResumeSectionsAccordionProps) {
  const router = useRouter();

  const { execute: updateSectionOrder, status } = useAction(
    updateSectionOrderAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success(
            data.message ?? "Resume section order updated successfully!",
          );
          router.refresh();
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to update resume section order";
        toast.error(message);
      },
    },
  );

  const sections = useMemo<ResumeAccordionSection[]>(
    () => [
      {
        id: "personal",
        title: "Personal Information",
        description: "Contact details and summary",
        icon: User,
        iconWrapperClassName: "bg-blue-500/10",
        iconClassName: "text-blue-500",
        content: (
          <PersonalInfo
            profile={resume?.profile ?? null}
            showProfileImage={templateMeta.showProfileImage}
          />
        ),
      },
      {
        id: "workExperiences",
        title: "Work Experience",
        description: "Your professional history",
        icon: Briefcase,
        iconWrapperClassName: "bg-purple-500/10",
        iconClassName: "text-purple-500",
        content: (
          <WorkExperienceSection experiences={resume?.workExperiences ?? []} />
        ),
      },
      {
        id: "educations",
        title: "Education",
        description: "Academic background",
        icon: GraduationCap,
        iconWrapperClassName: "bg-emerald-500/10",
        iconClassName: "text-emerald-500",
        content: <EducationSection educations={resume?.educations ?? []} />,
      },
      {
        id: "skills",
        title: "Skills",
        description: "Technical expertise",
        icon: Code,
        iconWrapperClassName: "bg-orange-500/10",
        iconClassName: "text-orange-500",
        content: (
          <SkillSection
            skills={resume?.skills ?? []}
            initialSkillType={templateMeta.skillType}
          />
        ),
      },
      {
        id: "projects",
        title: "Projects",
        description: "Showcase your work",
        icon: FolderKanban,
        iconWrapperClassName: "bg-cyan-500/10",
        iconClassName: "text-cyan-500",
        content: (
          <ProjectSection
            projects={resume?.projects ?? []}
            showTechUsed={templateMeta.showProjectTech}
          />
        ),
      },
      {
        id: "certifications",
        title: "Certifications",
        description: "Professional credentials",
        icon: Award,
        iconWrapperClassName: "bg-yellow-500/10",
        iconClassName: "text-yellow-500",
        content: (
          <CertificationSection certifications={resume?.certifications ?? []} />
        ),
      },
      {
        id: "awards",
        title: "Awards / Achievements",
        description: "Your accomplishments",
        icon: Trophy,
        iconWrapperClassName: "bg-amber-500/10",
        iconClassName: "text-amber-500",
        content: <AwardSection awards={resume?.awards ?? null} />,
      },
      {
        id: "publications",
        title: "Publications",
        description: "Research and writing",
        icon: BookOpen,
        iconWrapperClassName: "bg-indigo-500/10",
        iconClassName: "text-indigo-500",
        content: (
          <PublicationSection publications={resume?.publications ?? []} />
        ),
      },
    ],
    [resume, templateMeta],
  );

  const orderedSections = useMemo(() => {
    const sectionsById = new Map<string, ResumeAccordionSection>(
      sections.map((section) => [section.id, section]),
    );

    return normalizeSectionOrder(resume.sectionOrder)
      .map((sectionId) => sectionsById.get(sectionId))
      .filter((section): section is ResumeAccordionSection => Boolean(section));
  }, [resume.sectionOrder, sections]);

  const handleReorder = useCallback(
    (reorderedSections: ResumeAccordionSection[]) => {
      if (status === "executing") return;

      const reorderedVisibleIds = reorderedSections.map(
        (section) => section.id,
      );
      const visibleSectionIds = new Set(
        orderedSections.map((section) => section.id),
      );
      const nextSectionOrder = normalizeSectionOrder(resume.sectionOrder).map(
        (sectionId) => {
          if (!visibleSectionIds.has(sectionId)) {
            return sectionId;
          }

          return reorderedVisibleIds.shift() ?? sectionId;
        },
      );

      updateSectionOrder({
        resumeId: resume.id,
        sectionOrder: nextSectionOrder,
      });
    },
    [
      orderedSections,
      resume.id,
      resume.sectionOrder,
      status,
      updateSectionOrder,
    ],
  );

  const renderSection = useCallback(
    (section: ResumeAccordionSection) => (
      <ResumeAccordionItem section={section} />
    ),
    [],
  );

  return (
    <ScrollArea className="w-full h-[calc(100vh-3.75rem)] md:h-[calc(100vh-3.75rem)] pb-16 md:pb-5 p-5">
      <Accordion
        type="multiple"
        defaultValue={["personal"]}
        className="w-full mb-14 md:mb-0"
      >
        <SortableList
          items={orderedSections}
          onReorder={handleReorder}
          renderItem={renderSection}
          renderOverlayItem={renderSection}
          isDisabled={status === "executing"}
        />
      </Accordion>
    </ScrollArea>
  );
}
