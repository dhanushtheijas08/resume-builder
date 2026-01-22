"use client";

import { Project } from "@/app/generated/prisma/client";
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
    <div className="border rounded-lg p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                {project.isCurrent && (
                  <Badge
                    variant="default"
                    className="bg-green-500/20 text-green-500 border-green-500/30"
                  >
                    Active
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
            {(project.startDate || project.endDate) && (
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4 shrink-0" />
                <span className="font-mono">
                  {project.startDate || "N/A"} -{" "}
                  {project.isCurrent ? "Present" : project.endDate || "N/A"}
                </span>
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
                <Link2 className="size-4 shrink-0" />
                <span className="truncate max-w-[200px]">View Project</span>
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
                <GitHubIcon className="size-4 shrink-0" />
                <span className="truncate max-w-[200px]">Source Code</span>
              </Link>
            )}
          </div>

          {project.description && (
            <div
              className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          )}

          {showTechUsed &&
            project.technologies &&
            project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.technologies
                  .slice(0, 6)
                  .map((tech: string, i: number) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-[10px] px-2 h-5 font-normal bg-muted/80 text-muted-foreground border-border/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                {project.technologies.length > 6 && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-2 h-5 font-normal bg-muted/80 text-muted-foreground border-border/50"
                  >
                    +{project.technologies.length - 6} more
                  </Badge>
                )}
              </div>
            )}
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
                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this project? This action
                  cannot be undone.
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
