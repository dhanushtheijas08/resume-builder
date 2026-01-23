"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { duplicateResumeAction } from "@/lib/actions/resume-actions";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const router = useRouter();
  const [title, setTitle] = useState(`${originalTitle} (Copy)`);

  useEffect(() => {
    if (open) {
      setTitle(`${originalTitle} (Copy)`);
    }
  }, [open, originalTitle]);

  const { execute, status } = useAction(duplicateResumeAction, {
    onSuccess: ({ data }) => {
      if (data?.success && data.redirectUrl) {
        toast.success(data.message);
        onOpenChange(false);
        router.push(data.redirectUrl);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleDuplicate}>
          <DialogHeader>
            <DialogTitle>Duplicate Resume</DialogTitle>
            <DialogDescription>
              Create a copy of <strong>{originalTitle}</strong>. Enter a name for the new resume.
            </DialogDescription>
          </DialogHeader>
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
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isExecuting}
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
