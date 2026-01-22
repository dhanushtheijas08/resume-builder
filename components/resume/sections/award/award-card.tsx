"use client";

import { Award } from "@/app/generated/prisma/client";
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
    <div className="border rounded-lg p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="size-5 text-yellow-500 shrink-0" />
            {award.description && (
              <div
                className="text-sm text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: award.description }}
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 group-hover:opacity-100 opacity-0 transition-opacity mt-2.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onEditClick}
            disabled={isDeleting}
          >
            <Edit2 className="size-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isDeleting}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Award / Achievement</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this award or achievement?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
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

