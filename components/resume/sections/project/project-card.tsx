"use client";

import { Project } from "@prisma/client";
import { GitHubIcon } from "@/components/icons";
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
import { Calendar, Edit2, Link2, Trash2 } from "lucide-react";
import Link from "next/link";

type ProjectCardProps = {
  project: Project;
  onEditClick: () => void;
  onDeleteClick: () => void;
  showTechUsed?: boolean;
  isDeleting?: boolean;
};

export const ProjectCard = ({
  project,
  onEditClick,
  onDeleteClick,
  showTechUsed = true,
  isDeleting = false,
}: ProjectCardProps) => {
  return (
    <div className="border rounded-lg p-4 sm:p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-semibold wrap-break-word">
                  {project.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
            {project.timePeriod && (
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 sm:size-4 shrink-0" />
                <span className="wrap-break-word">{project.timePeriod}</span>
              </div>
            )}
            {project.url && (
              <Link
                prefetch={false}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Link2 className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate max-w-[150px] sm:max-w-[200px]">
                  View Project
                </span>
              </Link>
            )}
            {project.github && (
              <Link
                prefetch={false}
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <GitHubIcon className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate max-w-[150px] sm:max-w-[200px]">
                  Source Code
                </span>
              </Link>
            )}
          </div>

          {showTechUsed &&
            project.technologies &&
            project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {project.technologies
                  .slice(0, 6)
                  .map((tech: string, i: number) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 h-4 sm:h-5 font-normal bg-muted/80 text-muted-foreground border-border/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                {project.technologies.length > 6 && (
                  <Badge
                    variant="outline"
                    className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 h-4 sm:h-5 font-normal bg-muted/80 text-muted-foreground border-border/50"
                  >
                    +{project.technologies.length - 6} more
                  </Badge>
                )}
              </div>
            )}
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
                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this project? This action
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
