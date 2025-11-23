import { UserHeader } from "@/components/common/header";
import { UserWelcomeMessge } from "@/components/dashboard/welcome-message";
import {
  ResumeListSection,
  type ResumeCardData,
} from "@/components/dashboard/resume-list-section";

const resumes: ResumeCardData[] = [
  {
    id: "1",
    title: "Software Engineer Resume",
    lastEdited: "2 hours ago",
    type: "resume" as const,
    gradient: "bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400",
  },
  {
    id: "2",
    title: "Product Manager CV",
    lastEdited: "1 day ago",
    type: "resume" as const,
    gradient: "bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400",
  },
  {
    id: "3",
    title: "Cover Letter - Google",
    lastEdited: "3 days ago",
    type: "cover-letter" as const,
    gradient: "bg-gradient-to-br from-orange-400 via-red-400 to-pink-400",
  },
  {
    id: "4",
    title: "Marketing Specialist Resume",
    lastEdited: "5 days ago",
    type: "resume" as const,
    gradient: "bg-gradient-to-br from-violet-400 via-purple-400 to-indigo-400",
  },
  {
    id: "5",
    title: "Data Analyst Resume",
    lastEdited: "1 week ago",
    type: "resume" as const,
    gradient: "bg-gradient-to-br from-amber-400 via-orange-400 to-red-400",
  },
  {
    id: "6",
    title: "Cover Letter - Microsoft",
    lastEdited: "1 week ago",
    type: "cover-letter" as const,
    gradient: "bg-gradient-to-br from-lime-400 via-green-400 to-emerald-400",
  },
];

export default function UserDashboardPage() {
  return (
    <div>
      <UserHeader />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <UserWelcomeMessge />
          <ResumeListSection resumes={resumes} />
        </div>
      </main>
    </div>
  );
}
