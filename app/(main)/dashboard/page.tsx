"use client";

import { useState } from "react";
import { Grid3x3, List, Filter } from "lucide-react";
import { UserHeader } from "@/components/common/header";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dummy data
const resumes = [
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");

  const filteredResumes = resumes.filter((resume) => {
    if (filter === "all") return true;
    if (filter === "resume") return resume.type === "resume";
    if (filter === "cover-letter") return resume.type === "cover-letter";
    return true;
  });

  return (
    <div>
      <UserHeader />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          {/* Greeting Section */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Hello, John! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back. Lets create something amazing today.
            </p>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Tabs
              value={filter}
              onValueChange={setFilter}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="resume">Resumes</TabsTrigger>
                <TabsTrigger value="cover-letter">Cover Letters</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 size-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Edited</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="size-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="size-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="size-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="size-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Resume Grid/List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredResumes.map((resume) => (
                <ResumeCard key={resume.id} {...resume} />
              ))}
            </div>

            {filteredResumes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No documents found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters or create a new document
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
