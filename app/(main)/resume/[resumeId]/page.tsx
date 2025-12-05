import { PersonalInfo } from "@/components/resume/sections/personal-info/personal-info";
import { WorkExperienceSection } from "@/components/resume/sections/work-experience/work-experience";
import { EducationSection } from "@/components/resume/sections/education/education";
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
import { fetchUserResume } from "@/lib/queries/resume";
import {
  Briefcase,
  Code,
  Download,
  FolderKanban,
  GraduationCap,
  User,
} from "lucide-react";

const ResumePage = async ({ params }: { params: { resumeId: string } }) => {
  const { resumeId } = await params;

  if (!resumeId || !OBJECT_ID_REGEX.test(resumeId)) {
    throw new Error("Invalid resume ID format");
  }
  const resume = await fetchUserResume(resumeId);

  if (!resume) {
    throw new Error("Resume not found");
  }

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex items-center justify-between px-4 py-2.5 border-b">
        <h1 className="text-xl font-bold">Resume Builder</h1>
        <Button variant="primary" className="w-fit h-8.5">
          <Download className="size-4 mr-0.5" />
          Export PDF
        </Button>
      </nav>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={35}>
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
                    <PersonalInfo profile={resume?.profile ?? null} />
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
                    {/* <SkillsSection /> */}
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
                    {/* <ProjectsSection /> */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel minSize={50}>Preview Section</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResumePage;
