"use client";

import { MoreVertical, Download, Trash2, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DeleteResumeDialog } from "./delete-resume-dialog";
import { DuplicateResumeDialog } from "./duplicate-resume-dialog";
import { useExportResumeMutation } from "@/lib/mutations/export-resume";

interface ResumeCardProps {
  id: string;
  title: string;
  lastEdited: string;
  type: "resume" | "cover-letter";
  previewImageUrl?: string;
}

export function ResumeCard({
  id,
  title,
  lastEdited,
  previewImageUrl,
}: ResumeCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);

  const { mutate: exportPdfMutation, isPending } = useExportResumeMutation({
    isToastLoading: true,
  });

  return (
    <>
      <Link href={`/resume/${id}`}>
        <Card className="group relative pt-0 overflow-hidden border-muted/40 bg-card transition-all duration-300 hover:shadow-xl hover:border-border/80 hover:-translate-y-1 ">
          <div className="relative h-[350px] w-full overflow-hidden bg-muted/10 transition-colors group-hover:bg-muted/20">
            {previewImageUrl ? (
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={previewImageUrl}
                  alt={title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ) : (
              <div className="relative h-full w-full p-6">
                <div className="relative h-full w-full origin-top rounded-md bg-background shadow-sm ring-1 ring-border/10 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-md">
                  <div className="flex items-center gap-3 border-b border-border/5 p-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-2 w-24 rounded-full bg-muted-foreground/10" />
                      <div className="h-1.5 w-16 rounded-full bg-muted-foreground/10" />
                    </div>
                  </div>

                  <div className="space-y-3 p-4 opacity-50">
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full rounded-full bg-muted-foreground/10" />
                      <div className="h-1.5 w-5/6 rounded-full bg-muted-foreground/10" />
                      <div className="h-1.5 w-4/5 rounded-full bg-muted-foreground/10" />
                    </div>
                    <div className="space-y-1.5 pt-2">
                      <div className="h-1.5 w-11/12 rounded-full bg-muted-foreground/10" />
                      <div className="h-1.5 w-full rounded-full bg-muted-foreground/10" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="truncate font-semibold text-sm text-foreground/90 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground font-medium">
                Edited {lastEdited}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                onClick={(e) => e.stopPropagation()}
                className="z-30 absolute bottom-10 right-5"
                disabled={isPending}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => setShowDuplicateDialog(true)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => exportPdfMutation(id)}
                  disabled={isPending}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      </Link>

      <DeleteResumeDialog
        resumeId={id}
        resumeTitle={title}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />

      <DuplicateResumeDialog
        resumeId={id}
        originalTitle={title}
        open={showDuplicateDialog}
        onOpenChange={setShowDuplicateDialog}
      />
    </>
  );
}
