"use client";

import { Education } from "@prisma/client";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit2, GraduationCap, MapPin, Trash2 } from "lucide-react";

type EducationCardProps = {
  education: Education;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isDeleting?: boolean;
};

export const EducationCard = ({
  education,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: EducationCardProps) => {
  const formatDate = (date: string | null) => {
    if (!date) return "Present";
    return date;
  };

  return (
    <div className="border rounded-lg p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-4 relative">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{education.degree}</h3>
            {education.isCurrent && (
              <Badge
                variant="default"
                className="bg-green-500/20 text-green-500 border-green-500/30"
              >
                Current
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {education.institution && (
              <div className="flex items-center gap-1.5">
                <GraduationCap className="size-4 shrink-0" />
                <span className="truncate">{education.institution}</span>
              </div>
            )}
            {education.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4 shrink-0" />
                <span className="truncate">{education.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4 shrink-0" />
              <span>
                {education.startDate} - {formatDate(education.endDate)}
              </span>
            </div>
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
                <AlertDialogTitle>Delete Education</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this education entry? This
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
