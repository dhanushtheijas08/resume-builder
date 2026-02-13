import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonalInfo } from "@/components/resume/sections/personal-info/personal-info";
import { WorkExperienceSection } from "@/components/resume/sections/work-experience/work-experience";
import { EducationSection } from "@/components/resume/sections/education/education";
import { SkillSection } from "@/components/resume/sections/skill/skill";
import { ProjectSection } from "@/components/resume/sections/project/project";
import { CertificationSection } from "@/components/resume/sections/certification/certification";
import { AwardSection } from "@/components/resume/sections/award/award";
import { PublicationSection } from "@/components/resume/sections/publication/publication";
import { CustomSectionComponent } from "@/components/resume/sections/custom-section/custom-section";
import type { ResumeWithRelations } from "@/lib/queries/resume";
import {
  Award,
  BookOpen,
  Briefcase,
  Code,
  FileText,
  FolderKanban,
  GraduationCap,
  Trophy,
  User,
} from "lucide-react";

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

export function ResumeSectionsAccordion({
  resume,
  templateMeta,
}: ResumeSectionsAccordionProps) {
  return (
    <ScrollArea className="w-full h-[calc(100vh-3.75rem)] md:h-[calc(100vh-3.75rem)] pb-16 md:pb-0 p-5">
      <Accordion
        type="multiple"
        defaultValue={["personal"]}
        className="w-full space-y-3 mb-14 md:mb-0"
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
              <PublicationSection publications={resume?.publications ?? []} />
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
  );
}
