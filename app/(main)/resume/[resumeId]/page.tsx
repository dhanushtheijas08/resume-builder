import { EducationSection } from "@/components/resume/sections/education/education";
import { PersonalInfo } from "@/components/resume/sections/personal-info/personal-info";
import { ProjectSection } from "@/components/resume/sections/project/project";
import { SkillSection } from "@/components/resume/sections/skill/skill";
import { WorkExperienceSection } from "@/components/resume/sections/work-experience/work-experience";
import { CertificationSection } from "@/components/resume/sections/certification/certification";
import { AwardSection } from "@/components/resume/sections/award/award";
import { PublicationSection } from "@/components/resume/sections/publication/publication";
import { CustomSectionComponent } from "@/components/resume/sections/custom-section/custom-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OBJECT_ID_REGEX } from "@/lib/const";
import { fetchResumeById } from "@/lib/queries/resume";
import {
  Briefcase,
  Code,
  FolderKanban,
  GraduationCap,
  User,
  Award,
  Trophy,
  BookOpen,
  FileText,
} from "lucide-react";
import { ResumePreview } from "@/components/resume/resume-preview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { TemplateId } from "@/components/resume-templates";
import { ExportResume } from "@/components/resume/export-resume";

const ResumePage = async ({ params }: { params: { resumeId: string } }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const { resumeId } = await params;

  if (!resumeId || !OBJECT_ID_REGEX.test(resumeId)) {
    throw new Error("Invalid resume ID format");
  }
  const resume = await fetchResumeById(resumeId);

  if (!resume || resume.userId !== session.user.id) {
    throw new Error("Resume not found or access denied");
  }

  const parseTemplateMeta = (meta?: string) => {
    const config = {
      showProfileImage: true,
      skillType: "badge" as "badge" | "progress" | "category",
      showProjectTech: true,
    };

    if (!meta) return config;

    meta.split("#").forEach((entry) => {
      const [key, value] = entry.split(":");
      switch (key) {
        case "p":
          config.showProfileImage = value === "1";
          break;
        case "s":
          config.skillType =
            value === "2" ? "progress" : value === "3" ? "category" : "badge";
          break;
        case "pr":
          config.showProjectTech = value === "1";
          break;
        default:
          break;
      }
    });

    return config;
  };

  const templateMeta = parseTemplateMeta(resume.template?.metaData || "");

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex items-center justify-between px-4 py-2.5 border-b">
        <h1 className="text-xl font-bold">Coders CV</h1>
        <ExportResume />
      </nav>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={40} defaultSize={42}>
          <ScrollArea className="w-full h-[calc(100vh-3.75rem)] p-5">
            <Accordion
              type="multiple"
              defaultValue={["personal"]}
              className="w-full space-y-3"
            >
              <AccordionItem
                value="personal"
                className="border rounded-xl bg-card shadow-sm overflow-hidden "
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
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <PersonalInfo
                      profile={resume?.profile ?? null}
                      showProfileImage={templateMeta.showProfileImage}
                    />
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
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <WorkExperienceSection
                      experiences={resume?.workExperiences ?? []}
                    />
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
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <EducationSection educations={resume?.educations ?? []} />
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
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <SkillSection
                      skills={resume?.skills ?? []}
                      initialSkillType={templateMeta.skillType}
                    />
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
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <ProjectSection
                      projects={resume?.projects ?? []}
                      showTechUsed={templateMeta.showProjectTech}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="certifications"
                className="border rounded-xl bg-card shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      <Award className="size-4 text-yellow-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Certifications</span>
                      <p className="text-xs text-muted-foreground font-normal">
                        Professional credentials
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <CertificationSection
                      certifications={resume?.certifications ?? []}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="awards"
                className="border rounded-xl bg-card shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Trophy className="size-4 text-amber-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Awards / Achievements</span>
                      <p className="text-xs text-muted-foreground font-normal">
                        Your accomplishments
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <AwardSection awards={resume?.awards ?? null} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="publications"
                className="border rounded-xl bg-card shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                      <BookOpen className="size-4 text-indigo-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Publications</span>
                      <p className="text-xs text-muted-foreground font-normal">
                        Research and writing
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <PublicationSection
                      publications={resume?.publications ?? []}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="custom-sections"
                className="border rounded-xl bg-card shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <FileText className="size-4 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Custom Sections</span>
                      <p className="text-xs text-muted-foreground font-normal">
                        Additional sections
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="px-5 pb-5 pt-2">
                    <CustomSectionComponent
                      customSections={resume?.customSection ?? []}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel minSize={50} defaultSize={58} className="w-full">
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResumePage;
