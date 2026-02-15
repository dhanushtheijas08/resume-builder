"use client";

import { Publication } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { BookOpen, Edit2, Trash2, Link2 } from "lucide-react";
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
import Link from "next/link";

type PublicationCardProps = {
  publication: Publication;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isDeleting?: boolean;
};

export const PublicationCard = ({
  publication,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: PublicationCardProps) => {
  return (
    <div className="border rounded-lg p-4 sm:p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-semibold wrap-break-word">
              {publication.title}
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
            {publication.publisher && (
              <div className="flex items-center gap-1.5">
                <BookOpen className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate">{publication.publisher}</span>
              </div>
            )}
            {publication.url && (
              <Link
                prefetch={false}
                href={publication.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Link2 className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate max-w-[150px] sm:max-w-[200px]">
                  View Publication
                </span>
              </Link>
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
                <AlertDialogTitle>Delete Publication</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this publication? This action
                  cannot be undone.
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
