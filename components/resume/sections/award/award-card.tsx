"use client";

import { Award } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Trophy } from "lucide-react";

type AwardCardProps = {
  award: Award;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isDeleting?: boolean;
};

export const AwardCard = ({
  award,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: AwardCardProps) => {
  return (
    <div className="border rounded-lg p-4 sm:p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-3">
            <Trophy className="size-4 sm:size-5 text-yellow-500 shrink-0 mt-0.5" />
            {award.description && (
              <div
                className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: award.description }}
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity mt-0 sm:mt-2.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onEditClick}
            disabled={isDeleting}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <Edit2 className="size-3.5 sm:size-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isDeleting}
                className="h-8 w-8 sm:h-9 sm:w-9 text-destructive hover:text-destructive"
              >
                <Trash2 className="size-3.5 sm:size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Award / Achievement</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this award or achievement?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:gap-0">
                <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDeleteClick}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
