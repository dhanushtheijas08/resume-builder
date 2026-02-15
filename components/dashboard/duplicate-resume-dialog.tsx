"use client";

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { duplicateResumeAction } from "@/lib/actions/resume-actions";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

interface DuplicateResumeDialogProps {
  resumeId: string;
  originalTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DuplicateResumeDialog({
  resumeId,
  originalTitle,
  open,
  onOpenChange,
}: DuplicateResumeDialogProps) {
  const [title, setTitle] = useState(`${originalTitle} (Copy)`);
  const { execute, status } = useAction(duplicateResumeAction, {
    onSuccess: ({ data }) => {
      if (data?.success && data.redirectUrl) {
        toast.success(data.message);
        onOpenChange(false);
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError?.message || "Failed to duplicate resume");
    },
  });

  const isExecuting = status === "executing";

  const handleDuplicate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    execute({ resumeId, title: title.trim() });
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent
        className="p-4 pt-0 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleDuplicate}>
          <ResponsiveDialogHeader className="pb-0">
            <ResponsiveDialogTitle>Duplicate Resume</ResponsiveDialogTitle>
            <ResponsiveDialogDescription>
              Create a copy of <strong>{originalTitle}</strong>. Enter a name
              for the new resume.
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Resume Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Resume (Copy)"
                disabled={isExecuting}
                autoFocus
              />
            </div>
          </div>
          <ResponsiveDialogFooter className="p-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isExecuting}
              className="hidden md:block"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isExecuting}>
              {isExecuting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Duplicating...
                </>
              ) : (
                "Duplicate"
              )}
            </Button>
          </ResponsiveDialogFooter>
        </form>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
