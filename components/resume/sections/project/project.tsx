"use client";

import { Project } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { FolderKanban, Plus } from "lucide-react";
import { useState } from "react";
import { EmptySection } from "../empty-section";
import { useProject } from "./use-project";
import { ProjectDialog } from "./project-dialog";
import { ProjectDisplay } from "./project-display";

export const ProjectSection = ({
  projects,
  showTechUsed = true,
}: {
  projects: Project[];
  showTechUsed?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const hasData = projects.length > 0;
  const sortedProjects = projects.sort((a, b) => a.order - b.order);
  const maxOrder = (sortedProjects.at(-1)?.order ?? 0) + 1;

  const { form, saveProject, updateProject, removeProject, isLoading } =
    useProject(editingProject, maxOrder, () => {
      setIsOpen(false);
      setEditingProject(null);
    });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingProject(null);
    }
  };

  const handleAddClick = () => {
    setEditingProject(null);
    handleOpenChange(true);
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    handleOpenChange(true);
  };

  return (
    <div className="space-y-4">
      {hasData ? (
        <ProjectDisplay
          projects={sortedProjects}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onDeleteClick={removeProject}
          showTechUsed={showTechUsed}
          isDeleting={isLoading}
        />
      ) : (
        <EmptySection
          title="No projects added"
          description="Showcase your best work and personal projects to impress potential employers."
          icon={<FolderKanban className="size-6 text-cyan-500" />}
          iconContainerClassName="bg-cyan-500/10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddClick}
            disabled={isLoading}
          >
            <Plus className="size-4 mr-2" />
            Add Projects
          </Button>
        </EmptySection>
      )}

      <ProjectDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        form={form}
        actionFn={editingProject ? updateProject : saveProject}
        isLoading={isLoading}
        isEditing={!!editingProject}
      />
    </div>
  );
};
