"use client";

import { Publication } from "@prisma/client";
import { SortableList } from "@/components/resume/sortable-list";
import { Button } from "@/components/ui/button";
import { updateOrderAction } from "@/lib/actions/resume-actions";
import { BookOpen, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { PublicationCard } from "./publication-card";

type PublicationDisplayProps = {
  publications: Publication[];
  onAddClick: () => void;
  onEditClick: (publication: Publication) => void;
  onDeleteClick: (id: string) => void;
  isDeleting?: boolean;
};

export const PublicationDisplay = ({
  publications,
  onAddClick,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: PublicationDisplayProps) => {
  const router = useRouter();

  const { execute: updateOrder, status } = useAction(updateOrderAction, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(
          data.message ?? "Publication order updated successfully!",
        );
        router.refresh();
      }
    },
    onError: ({ error }) => {
      const message =
        error.serverError?.message ||
        error.validationErrors?.formErrors?.[0] ||
        "Failed to update publication order";
      toast.error(message);
    },
  });

  const handleReorder = useCallback(
    (
      _reorderedItems: Publication[],
      updatedOrders: { id: string; order: number }[],
    ) => {
      if (status === "executing") return;
      updateOrder({ type: "PUBLICATION", updatedOrder: updatedOrders });
    },
    [status, updateOrder],
  );

  const renderPublicationCard = useCallback(
    (publication: Publication) => (
      <PublicationCard
        publication={publication}
        onEditClick={() => onEditClick(publication)}
        onDeleteClick={() => onDeleteClick(publication.id)}
        isDeleting={isDeleting}
      />
    ),
    [onEditClick, onDeleteClick, isDeleting],
  );

  const renderOverlayCard = (publication: Publication) => (
    <PublicationCard
      publication={publication}
      onEditClick={() => {}}
      onDeleteClick={() => {}}
      isDeleting={false}
    />
  );

  if (publications.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="size-4" />
          <span>
            {publications.length} publication
            {publications.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onAddClick}>
          <Plus className="size-4 mr-2" />
          Add Publication
        </Button>
      </div>

      <SortableList
        items={publications}
        onReorder={handleReorder}
        renderItem={renderPublicationCard}
        renderOverlayItem={renderOverlayCard}
        isDisabled={status === "executing"}
      />
    </div>
  );
};
