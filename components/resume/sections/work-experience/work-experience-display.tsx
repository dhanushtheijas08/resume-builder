"use client";

import { WorkExperience } from "@/app/generated/prisma/client";
import { SortableList } from "@/components/resume/sortable-list";
import { Button } from "@/components/ui/button";
import { updateOrderAction } from "@/lib/actions/resume-actions";
import { Briefcase, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { WorkExperienceCard } from "./work-experience-card";

type WorkExperienceDisplayProps = {
  experiences: WorkExperience[];
  onAddClick: () => void;
  onEditClick: (experience: WorkExperience) => void;
  onDeleteClick: (id: string) => void;
  isDeleting?: boolean;
};

export const WorkExperienceDisplay = ({
  experiences,
  onAddClick,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: WorkExperienceDisplayProps) => {
  const router = useRouter();

  const { execute: updateOrder, status } = useAction(updateOrderAction, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message ?? "Work experience order updated successfully!");
        router.refresh();
      }
    },
    onError: ({ error }) => {
      const message =
        error.serverError?.message ||
        error.validationErrors?.formErrors?.[0] ||
        "Failed to update work experience order";
      toast.error(message);
    },
  });

  const handleReorder = useCallback(
    (
      _reorderedItems: WorkExperience[],
      updatedOrders: { id: string; order: number }[]
    ) => {
      if (status === "executing") return;
      updateOrder({ type: "EXPERIENCE", updatedOrder: updatedOrders });
    },
    [status, updateOrder]
  );

  const renderExperienceCard = useCallback(
    (experience: WorkExperience) => (
      <WorkExperienceCard
        experience={experience}
        onEditClick={() => onEditClick(experience)}
        onDeleteClick={() => onDeleteClick(experience.id)}
        isDeleting={isDeleting}
      />
    ),
    [onEditClick, onDeleteClick, isDeleting]
  );

  const renderOverlayCard = (experience: WorkExperience) => (
    <WorkExperienceCard
      experience={experience}
      onEditClick={() => {}}
      onDeleteClick={() => {}}
      isDeleting={false}
    />
  );

  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="size-4" />
          <span>
            {experiences.length} experience{experiences.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onAddClick}>
          <Plus className="size-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <SortableList
        items={experiences}
        onReorder={handleReorder}
        renderItem={renderExperienceCard}
        renderOverlayItem={renderOverlayCard}
        isDisabled={status === "executing"}
      />
    </div>
  );
};
