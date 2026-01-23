"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            resume <strong>{resumeTitle}</strong> and remove its data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
