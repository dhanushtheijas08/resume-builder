"use client";

import { Project } from "@prisma/client";
import { SortableList } from "@/components/resume/sortable-list";
import { Button } from "@/components/ui/button";
import { updateOrderAction } from "@/lib/actions/resume-actions";
import { FolderKanban, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { ProjectCard } from "./project-card";

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
  const router = useRouter();

  const { execute: updateOrder, status } = useAction(updateOrderAction, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message ?? "Project order updated successfully!");
        router.refresh();
      }
    },
    onError: ({ error }) => {
      const message =
        error.serverError?.message ||
        error.validationErrors?.formErrors?.[0] ||
        "Failed to update project order";
      toast.error(message);
    },
  });

  const handleReorder = useCallback(
    (
      _reorderedItems: Project[],
      updatedOrders: { id: string; order: number }[],
    ) => {
      if (status === "executing") return;
      updateOrder({ type: "PROJECT", updatedOrder: updatedOrders });
    },
    [status, updateOrder],
  );

  const renderProjectCard = useCallback(
    (project: Project) => (
      <ProjectCard
        project={project}
        onEditClick={() => onEditClick(project)}
        onDeleteClick={() => onDeleteClick(project.id)}
        showTechUsed={showTechUsed}
        isDeleting={isDeleting}
      />
    ),
    [onEditClick, onDeleteClick, showTechUsed, isDeleting],
  );

  const renderOverlayCard = (project: Project) => (
    <ProjectCard
      project={project}
      onEditClick={() => {}}
      onDeleteClick={() => {}}
      showTechUsed={showTechUsed}
      isDeleting={false}
    />
  );

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <FolderKanban className="size-3.5 sm:size-4" />
          <span>
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddClick}
          className="w-full sm:w-auto bg-background/40 hover:bg-background/60"
        >
          <Plus className="size-4 mr-2" />
          Add Project
        </Button>
      </div>

      <SortableList
        items={projects}
        onReorder={handleReorder}
        renderItem={renderProjectCard}
        renderOverlayItem={renderOverlayCard}
        isDisabled={status === "executing"}
      />
    </div>
  );
};
