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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { WorkExperience } from "@prisma/client";
import { Building2, Calendar, Edit2, MapPin, Trash2 } from "lucide-react";

type WorkExperienceCardProps = {
  experience: WorkExperience;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isDeleting?: boolean;
};

export const WorkExperienceCard = ({
  experience,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: WorkExperienceCardProps) => {
  return (
    <div className="border rounded-lg p-4 sm:p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="text-base sm:text-lg font-semibold wrap-break-word">
            {experience.jobTitle}
          </h3>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            {experience.company && (
              <div className="flex items-center gap-1.5">
                <Building2 className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate">{experience.company}</span>
              </div>
            )}
            {experience.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate">{experience.location}</span>
              </div>
            )}
            {experience.timePeriod && (
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 sm:size-4 shrink-0" />
                <span className="wrap-break-word">{experience.timePeriod}</span>
              </div>
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
                <AlertDialogTitle>Delete Work Experience</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this work experience? This
                  action cannot be undone.
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
