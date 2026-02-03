import {
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  EducationSection,
} from "@/components/resume-templates/template-1/sections";
import { HeaderSection } from "@/components/resume-templates/template-1/sections/HeaderSection";
import { groupSkillsByCategory } from "@/components/resume-templates/template-1/utils";

export const getResumeHtml = async ({ resumeData }: { resumeData: any }) => {
  const ReactDOMServer = await import("react-dom/server");
  return ReactDOMServer.renderToStaticMarkup(
    <Resume resumeData={resumeData} />,
  );
};

const Resume = ({ resumeData }: { resumeData: any }) => {
  return (
    <div
      id="resume-container"
      className="w-[210mm] min-h-[297mm] p-8 bg-white text-gray-900 shadow-lg "
    >
      <HeaderSection profile={resumeData.profile} />
      <ExperienceSection workExperiences={resumeData.workExperiences} />
      <ProjectsSection projects={resumeData.projects} />
      <SkillsSection groupedSkills={groupSkillsByCategory(resumeData.skills)} />
      <EducationSection educations={resumeData.educations} />
      <EducationSection educations={resumeData.educations} />
    </div>
  );
};
