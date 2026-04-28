import {
  CustomSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  EducationSection,
} from "@/components/resume-templates/template-1/sections";
import { HeaderSection } from "@/components/resume-templates/template-1/sections/HeaderSection";
import type { ResumeData } from "@/components/resume/resume-preview";
import {
  groupSkillsByCategory,
  normalizeSectionOrder,
} from "@/components/resume-templates/template-1/utils";
import { Fragment } from "react";

export const getResumeHtml = async ({
  resumeData,
}: {
  resumeData: ResumeData;
}) => {
  const ReactDOMServer = await import("react-dom/server");
  return ReactDOMServer.renderToStaticMarkup(
    <Resume resumeData={resumeData} />,
  );
};

const Resume = ({ resumeData }: { resumeData: ResumeData }) => {
  const sortedEducations = [...resumeData.educations].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const sortedWorkExperiences = [...resumeData.workExperiences].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const sortedProjects = [...resumeData.projects].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const sortedCustomSections = [...resumeData.customSections].sort(
    (a, b) => a.order - b.order,
  );
  const groupedSkills = groupSkillsByCategory(resumeData.skills);
  const sectionOrder = normalizeSectionOrder(resumeData.sectionOrder);

  const renderSection = (section: string) => {
    switch (section) {
      case "personal":
        return <HeaderSection profile={resumeData.profile} />;
      case "workExperiences":
        return <ExperienceSection workExperiences={sortedWorkExperiences} />;
      case "educations":
        return <EducationSection educations={sortedEducations} />;
      case "skills":
        return <SkillsSection groupedSkills={groupedSkills} />;
      case "projects":
        return <ProjectsSection projects={sortedProjects} />;
      case "customSection":
        return sortedCustomSections.map((customSection) => (
          <CustomSection key={customSection.id} customSection={customSection} />
        ));
      default:
        return null;
    }
  };

  return (
    <div
      id="resume-container"
      className="w-[210mm] min-h-[297mm] p-8 bg-white text-gray-900 shadow-lg "
    >
      {sectionOrder.map((section) => (
        <Fragment key={section}>{renderSection(section)}</Fragment>
      ))}
    </div>
  );
};
