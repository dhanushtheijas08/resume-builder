"use client";

import { useMemo, useState } from "react";
import { Filter, Grid3x3, List } from "lucide-react";

import { ResumeCard } from "@/components/dashboard/resume-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ResumeCardData = {
  id: string;
  title: string;
  lastEdited: string;
  type: "resume" | "cover-letter";
  gradient: string;
};

type ViewMode = "grid" | "list";
type SortOption = "recent" | "name" | "oldest";

interface ResumeListSectionProps {
  resumes: ResumeCardData[];
}

export function ResumeListSection({ resumes }: ResumeListSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const sortedResumes = useMemo(() => {
    const items = [...resumes];

    if (sortBy === "name") {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "oldest") {
      items.reverse();
    }

    return items;
  }, [resumes, sortBy]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold mb-4">Your Resumes</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => setSortBy(value)}
          >
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

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {sortedResumes.map((resume) => (
          <ResumeCard key={resume.id} {...resume} />
        ))}
      </div>
    </section>
  );
}
