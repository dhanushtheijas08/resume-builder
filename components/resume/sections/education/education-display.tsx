"use client";

import { Education } from "@prisma/client";
import { SortableList } from "@/components/resume/sortable-list";
import { Button } from "@/components/ui/button";
import { updateOrderAction } from "@/lib/actions/resume-actions";
import { GraduationCap, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { EducationCard } from "./education-card";

type EducationDisplayProps = {
  educations: Education[];
  onAddClick: () => void;
  onEditClick: (education: Education) => void;
  onDeleteClick: (id: string) => void;
  isDeleting?: boolean;
};

export const EducationDisplay = ({
  educations,
  onAddClick,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: EducationDisplayProps) => {
  const router = useRouter();

  const { execute: updateOrder, status } = useAction(updateOrderAction, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message ?? "Education order updated successfully!");
        router.refresh();
      }
    },
    onError: ({ error }) => {
      const message =
        error.serverError?.message ||
        error.validationErrors?.formErrors?.[0] ||
        "Failed to update education order";
      toast.error(message);
    },
  });

  const handleReorder = useCallback(
    (
      _reorderedItems: Education[],
      updatedOrders: { id: string; order: number }[],
    ) => {
      if (status === "executing") return;
      updateOrder({ type: "EDUCATION", updatedOrder: updatedOrders });
    },
    [status, updateOrder],
  );

  const renderEducationCard = useCallback(
    (education: Education) => (
      <EducationCard
        education={education}
        onEditClick={() => onEditClick(education)}
        onDeleteClick={() => onDeleteClick(education.id)}
        isDeleting={isDeleting}
      />
    ),
    [onEditClick, onDeleteClick, isDeleting],
  );

  const renderOverlayCard = (education: Education) => (
    <EducationCard
      education={education}
      onEditClick={() => {}}
      onDeleteClick={() => {}}
      isDeleting={false}
    />
  );

  if (educations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="size-4" />
          <span>
            {educations.length} education{educations.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onAddClick}>
          <Plus className="size-4 mr-2" />
          Add Education
        </Button>
      </div>

      <SortableList
        items={educations}
        onReorder={handleReorder}
        renderItem={renderEducationCard}
        renderOverlayItem={renderOverlayCard}
        isDisabled={status === "executing"}
      />
    </div>
  );
};
