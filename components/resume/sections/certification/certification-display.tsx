"use client";

import { Certification } from "@/app/generated/prisma/client";
import { SortableList } from "@/components/resume/sortable-list";
import { Button } from "@/components/ui/button";
import { updateOrderAction } from "@/lib/actions/resume-actions";
import { Award, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { CertificationCard } from "./certification-card";

type CertificationDisplayProps = {
  certifications: Certification[];
  onAddClick: () => void;
  onEditClick: (certification: Certification) => void;
  onDeleteClick: (id: string) => void;
  isDeleting?: boolean;
};

export const CertificationDisplay = ({
  certifications,
  onAddClick,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: CertificationDisplayProps) => {
  const router = useRouter();

  const { execute: updateOrder, status } = useAction(updateOrderAction, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message ?? "Certification order updated successfully!");
        router.refresh();
      }
    },
    onError: ({ error }) => {
      const message =
        error.serverError?.message ||
        error.validationErrors?.formErrors?.[0] ||
        "Failed to update certification order";
      toast.error(message);
    },
  });

  const handleReorder = useCallback(
    (
      _reorderedItems: Certification[],
      updatedOrders: { id: string; order: number }[]
    ) => {
      if (status === "executing") return;
      updateOrder({ type: "CERTIFICATION", updatedOrder: updatedOrders });
    },
    [status, updateOrder]
  );

  const renderCertificationCard = useCallback(
    (certification: Certification) => (
      <CertificationCard
        certification={certification}
        onEditClick={() => onEditClick(certification)}
        onDeleteClick={() => onDeleteClick(certification.id)}
        isDeleting={isDeleting}
      />
    ),
    [onEditClick, onDeleteClick, isDeleting]
  );

  const renderOverlayCard = (certification: Certification) => (
    <CertificationCard
      certification={certification}
      onEditClick={() => {}}
      onDeleteClick={() => {}}
      isDeleting={false}
    />
  );

  if (certifications.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Award className="size-4" />
          <span>
            {certifications.length} certification
            {certifications.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onAddClick}>
          <Plus className="size-4 mr-2" />
          Add Certification
        </Button>
      </div>

      <SortableList
        items={certifications}
        onReorder={handleReorder}
        renderItem={renderCertificationCard}
        renderOverlayItem={renderOverlayCard}
        isDisabled={status === "executing"}
      />
    </div>
  );
};

