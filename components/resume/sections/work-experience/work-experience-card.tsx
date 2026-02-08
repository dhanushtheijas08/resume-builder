"use client";

import { WorkExperience } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin, Edit2, Trash2 } from "lucide-react";
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
    <div className="border rounded-lg p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{experience.jobTitle}</h3>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {experience.company && (
              <div className="flex items-center gap-1.5">
                <Building2 className="size-4 shrink-0" />
                <span className="truncate">{experience.company}</span>
              </div>
            )}
            {experience.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4 shrink-0" />
                <span className="truncate">{experience.location}</span>
              </div>
            )}
            {experience.timePeriod && (
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4 shrink-0" />
                <span>{experience.timePeriod}</span>
              </div>
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
                <AlertDialogTitle>Delete Work Experience</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this work experience? This
                  action cannot be undone.
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
