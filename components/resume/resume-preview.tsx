"use client";
import { useRef } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { TEMPLATE_REGISTRY, TemplateId } from "../resume-templates";
import { ResumeToolbar } from "./resume-toolbar";
import type {
  Profile,
  WorkExperience,
  Education,
  Skill,
  Project,
  Certification,
  Publication,
  CustomSection,
  Award,
} from "@prisma/client";
import { useIsMobile } from "@/hooks/use-mobile";

export type ResumeData = {
  profile: Profile | null;
  workExperiences: WorkExperience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  awards: Award | null;
  publications: Publication[];
  customSections: CustomSection[];
};

export const ResumePreview = ({
  templateId,
  resumeData,
}: {
  templateId: TemplateId;
  resumeData: ResumeData;
}) => {
  const isMobile = useIsMobile();

  const resumeRef = useRef(null);
  const TemplateComponent = TEMPLATE_REGISTRY[templateId as TemplateId];

  return (
    <div className="relative">
      <TransformWrapper
        key={isMobile ? "mobile" : "desktop"}
        ref={resumeRef}
        smooth={false}
        maxScale={2}
        minScale={0.5}
        initialScale={isMobile ? 0.5 : 1}
        limitToBounds={false}
        centerOnInit={isMobile ? false : true}
        initialPositionX={isMobile ? 15 : 0}
      >
        <div className="absolute top-2.5 right-1/2 translate-x-1/2 sm:translate-x-0 z-10">
          <ResumeToolbar />
        </div>
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
          <TemplateComponent resumeData={resumeData} />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
