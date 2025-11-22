import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreateResume } from "../resume/create-resume";

export function UserHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-[4.3rem]  items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />

      <div className="flex-1" />
      <CreateResume />
    </header>
  );
}
