"use client";
import type { ResumeData } from "@/components/resume/resume-preview";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { EducationSection } from "./sections/EducationSection";
import { CustomSection } from "./sections/CustomSection";
import { groupSkillsByCategory } from "./utils";

interface Template1Props {
  resumeData: ResumeData;
}

const Template1 = ({ resumeData }: Template1Props) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [resumePage, setResumePage] = useState<HTMLElement[][]>([]);

  const renderResumeContent = () => {
    const profile = resumeData.profile;
    const groupedSkills = groupSkillsByCategory(resumeData.skills);
    const sortedEducations = [...resumeData.educations].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );
    const sortedWorkExperiences = [...resumeData.workExperiences].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );
    const sortedProjects = [...resumeData.projects].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );

    return (
      <div
        ref={resumeRef}
        className="w-[210mm] min-h-[297mm] p-8 bg-white text-gray-900 shadow-lg "
      >
        <HeaderSection profile={profile} />
        <ExperienceSection workExperiences={sortedWorkExperiences} />
        <ProjectsSection projects={sortedProjects} />
        <SkillsSection groupedSkills={groupedSkills} />
        <EducationSection educations={sortedEducations} />
        <EducationSection educations={sortedEducations} />
        {resumeData.customSections
          .sort((a, b) => a.order - b.order)
          .map((customSection) => (
            <CustomSection
              key={customSection.id}
              customSection={customSection}
            />
          ))}
      </div>
    );
  };

  const getFullHeight = (element: HTMLElement) => {
    const styles = window.getComputedStyle(element);
    const marginTop = parseFloat(styles.marginTop);
    const marginBottom = parseFloat(styles.marginBottom);
    return element.offsetHeight + marginTop + marginBottom;
  };

  const resumeDataKey = useMemo(() => {
    return JSON.stringify({
      profileId: resumeData.profile?.id,
      workExpCount: resumeData.workExperiences.length,
      eduCount: resumeData.educations.length,
      projectCount: resumeData.projects.length,
      skillCount: resumeData.skills.length,
      certCount: resumeData.certifications.length,
      pubCount: resumeData.publications.length,
      customSectionCount: resumeData.customSections.length,
      workExpOrders: resumeData.workExperiences.map((e) => e.order),
      eduOrders: resumeData.educations.map((e) => e.order),
      projectOrders: resumeData.projects.map((p) => p.order),
    });
  }, [resumeData]);

  const pageSplit = useCallback(() => {
    const A4_HEIGHT_PX = 1123;
    const PADDING_PX = 40;
    const USABLE_HEIGHT = A4_HEIGHT_PX - PADDING_PX * 2;

    if (!resumeRef.current) return;

    const sections = Array.from(
      (resumeRef.current as HTMLElement).querySelectorAll("section"),
    );

    const pages: HTMLElement[][] = [];
    let currentPage: HTMLElement[] = [];
    let usedHeight = 0;

    for (const section of sections) {
      const sectionHeight = getFullHeight(section);

      if (usedHeight + sectionHeight <= USABLE_HEIGHT) {
        currentPage.push(section);
        usedHeight += sectionHeight;
        continue;
      }

      for (const child of Array.from(section.children) as HTMLElement[]) {
        const h = getFullHeight(child);

        if (usedHeight + h > USABLE_HEIGHT) {
          pages.push([...currentPage]);
          currentPage = [];
          usedHeight = 0;
        }

        currentPage.push(child);
        usedHeight += h;
      }
    }

    if (currentPage.length) pages.push([...currentPage]);

    requestAnimationFrame(() => {
      setResumePage(pages);
    });
  }, []);

  useLayoutEffect(() => {
    if (resumeRef.current) {
      pageSplit();
    }
  }, [pageSplit, resumeDataKey]);

  return (
    <>
      <div
        className="absolute opacity-0 pointer-events-none"
        style={{ width: "210mm" }}
      >
        {renderResumeContent()}
      </div>

      {resumePage.map((page, index) => (
        <div
          key={index}
          className="mx-auto bg-white p-8 mb-8"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          {page.map((section, idx) => (
            <div
              key={idx}
              className=" bg-white text-black"
              dangerouslySetInnerHTML={{ __html: section.outerHTML }}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Template1;
