"use client";

import { Project } from "@/app/generated/prisma/client";
import { FolderKanban, Plus } from "lucide-react";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";

type ProjectDisplayProps = {
  projects: Project[];
  onAddClick: () => void;
  onEditClick: (project: Project) => void;
  onDeleteClick: (id: string) => void;
  showTechUsed?: boolean;
  isDeleting?: boolean;
};

export const ProjectDisplay = ({
  projects,
  onAddClick,
  onEditClick,
  onDeleteClick,
  showTechUsed = true,
  isDeleting = false,
}: ProjectDisplayProps) => {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FolderKanban className="size-4" />
          <span>
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onAddClick}>
          <Plus className="size-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEditClick={() => onEditClick(project)}
            onDeleteClick={() => onDeleteClick(project.id)}
            showTechUsed={showTechUsed}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
};
