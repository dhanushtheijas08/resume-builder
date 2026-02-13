import { Button } from "@/components/ui/button";
import { ResumeEditorLayout } from "@/components/resume/resume-editor-layout";
import { ResumeSectionsAccordion } from "@/components/resume/resume-sections-accordion";
import { ResumePreviewPanel } from "@/components/resume/resume-preview-panel";
import { OBJECT_ID_REGEX } from "@/lib/const";
import { fetchResumeById } from "@/lib/queries/resume";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ExportResumeButton } from "@/components/resume/export-resume-button";

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
      <nav className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Coder CV</h1>
        </div>
        <ExportResumeButton />
      </nav>
      <ResumeEditorLayout
        contentPanel={
          <ResumeSectionsAccordion
            resume={resume}
            templateMeta={templateMeta}
          />
        }
        previewPanel={<ResumePreviewPanel resume={resume} />}
      />
    </div>
  );
};

export default ResumePage;
