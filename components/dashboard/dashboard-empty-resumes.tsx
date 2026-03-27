"use client";

import { CreateResume } from "@/components/resume/create-resume";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileText, Plus } from "lucide-react";

export function DashboardEmptyResumes() {
  return (
    <Empty className="gap-5.5 rounded-xl border border-dashed py-16 md:py-20 ">
      <EmptyHeader className="max-w-md gap-3">
        <EmptyMedia
          variant="icon"
          className="size-12 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15"
        >
          <FileText className="size-6" />
        </EmptyMedia>
        <EmptyTitle className="text-xl">No resumes yet</EmptyTitle>
        <EmptyDescription className="text-sm text-muted-foreground/80">
          Select a template, add your experience, and export a ready-to-send
          resume.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateResume
          trigger={
            <Button variant="primary" className="gap-2 max-w-72">
              <Plus className="size-4" />
              Get started
            </Button>
          }
        />
      </EmptyContent>
    </Empty>
  );
}
