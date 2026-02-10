import {
  ResumeListSection,
  type ResumeCardData,
} from "@/components/dashboard/resume-list-section";
import { UserWelcomeMessge } from "@/components/dashboard/welcome-message";
import { fetchUserResumes } from "@/lib/queries/resume";
import { formatDistanceToNow } from "date-fns";

export default async function UserDashboardPage() {
  const userResumes = await fetchUserResumes();

  const resumes: ResumeCardData[] = userResumes.map((resume) => ({
    id: resume.id,
    title: resume.title,
    lastEdited: formatDistanceToNow(new Date(resume.updatedAt), {
      addSuffix: true,
    }),
    type: "resume" as const,
    previewImageUrl: resume.template.previewImageUrl,
  }));

  return (
    <main className="flex-1 overflow-auto">
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        <UserWelcomeMessge />
        <ResumeListSection resumes={resumes} />
      </div>
    </main>
  );
}
