"use client";

import { CustomSection } from "@/app/generated/prisma/client";
import { SortableList } from "@/components/resume/sortable-list";
import { Button } from "@/components/ui/button";
import { updateOrderAction } from "@/lib/actions/resume-actions";
import { FileText, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { CustomSectionCard } from "./custom-section-card";

type CustomSectionDisplayProps = {
  customSections: CustomSection[];
  onAddClick: () => void;
  onEditClick: (customSection: CustomSection) => void;
  onDeleteClick: (id: string) => void;
  isDeleting?: boolean;
};

export const CustomSectionDisplay = ({
  customSections,
  onAddClick,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: CustomSectionDisplayProps) => {
  const router = useRouter();

  const { execute: updateOrder, status } = useAction(updateOrderAction, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message ?? "Custom section order updated successfully!");
        router.refresh();
      }
    },
    onError: ({ error }) => {
      const message =
        error.serverError?.message ||
        error.validationErrors?.formErrors?.[0] ||
        "Failed to update custom section order";
      toast.error(message);
    },
  });

  const handleReorder = useCallback(
    (
      _reorderedItems: CustomSection[],
      updatedOrders: { id: string; order: number }[]
    ) => {
      if (status === "executing") return;
      updateOrder({ type: "CUSTOM_SECTION", updatedOrder: updatedOrders });
    },
    [status, updateOrder]
  );

  const renderCustomSectionCard = useCallback(
    (customSection: CustomSection) => (
      <CustomSectionCard
        customSection={customSection}
        onEditClick={() => onEditClick(customSection)}
        onDeleteClick={() => onDeleteClick(customSection.id)}
        isDeleting={isDeleting}
      />
    ),
    [onEditClick, onDeleteClick, isDeleting]
  );

  const renderOverlayCard = (customSection: CustomSection) => (
    <CustomSectionCard
      customSection={customSection}
      onEditClick={() => {}}
      onDeleteClick={() => {}}
      isDeleting={false}
    />
  );

  if (customSections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="size-4" />
          <span>
            {customSections.length} custom section
            {customSections.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onAddClick}>
          <Plus className="size-4 mr-2" />
          Add Custom Section
        </Button>
      </div>

      <SortableList
        items={customSections}
        onReorder={handleReorder}
        renderItem={renderCustomSectionCard}
        renderOverlayItem={renderOverlayCard}
        isDisabled={status === "executing"}
      />
    </div>
  );
};
