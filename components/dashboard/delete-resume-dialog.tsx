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
import { Spinner } from "@/components/ui/spinner";
import { deleteResumeAction } from "@/lib/actions/resume-actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteResumeDialogProps {
  resumeId: string;
  resumeTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteResumeDialog({
  resumeId,
  resumeTitle,
  open,
  onOpenChange,
}: DeleteResumeDialogProps) {
  const { execute, status } = useAction(deleteResumeAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.message);
        onOpenChange(false);
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError?.message || "Failed to delete resume");
      onOpenChange(false);
    },
  });

  const isDeleting = status === "executing";

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    execute({ resumeId });
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="p-4 pt-0 md:p-6">
        <ResponsiveDialogHeader className="pb-0">
          <ResponsiveDialogTitle>
            Are you absolutely sure?
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            This action cannot be undone. This will permanently delete your
            resume <strong>{resumeTitle}</strong> and remove its data from our
            servers.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="hidden md:block"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
