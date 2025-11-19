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
interface ResumeCardProps {
  id: string;
  title: string;
  lastEdited: string;
  type: "resume" | "cover-letter";
  gradient: string;
}

export function ResumeCard({
  title,
  lastEdited,
  type,
  gradient,
}: ResumeCardProps) {
  return (
    <Card className="group relative overflow-hidden border border-border/50 bg-background transition-all hover:shadow-md hover:border-border">
      {/* Updated preview area to match Image 1: Clean light gray background with a miniature document mockup */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30 p-6">
        <div className="h-full w-full rounded-sm bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-md">
          {/* Document Skeleton */}
          <div className="flex flex-col gap-2 p-3 opacity-50">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20" />
              <div className="space-y-1 flex-1">
                <div className="h-1.5 w-12 rounded bg-primary/20" />
                <div className="h-1 w-8 rounded bg-primary/10" />
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <div className="h-1 w-full rounded bg-muted-foreground/20" />
              <div className="h-1 w-full rounded bg-muted-foreground/20" />
              <div className="h-1 w-3/4 rounded bg-muted-foreground/20" />
            </div>
            <div className="space-y-1 mt-1">
              <div className="h-1 w-11/12 rounded bg-muted-foreground/20" />
              <div className="h-1 w-full rounded bg-muted-foreground/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Updated footer to be minimal: Title and date only, with menu on hover */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="font-medium text-sm leading-none truncate">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground">
              Last edited {lastEdited}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="h-3 w-3" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="mr-2 size-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 size-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
