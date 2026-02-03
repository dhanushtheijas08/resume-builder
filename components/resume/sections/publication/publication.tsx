"use client";

import { Publication } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";
import { useState } from "react";
import { EmptySection } from "../empty-section";
import { usePublication } from "./use-publication";
import { PublicationDialog } from "./publication-dialog";
import { PublicationDisplay } from "./publication-display";

export const PublicationSection = ({
  publications,
}: {
  publications: Publication[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPublication, setEditingPublication] =
    useState<Publication | null>(null);

  const hasData = publications.length > 0;
  const sortedPublications = publications.sort((a, b) => a.order - b.order);
  const maxOrder = (sortedPublications.at(-1)?.order ?? 0) + 1;

  const {
    form,
    savePublication,
    updatePublication,
    removePublication,
    isLoading,
  } = usePublication(editingPublication, maxOrder, () => {
    setIsOpen(false);
    setEditingPublication(null);
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingPublication(null);
    }
  };

  const handleAddClick = () => {
    setEditingPublication(null);
    handleOpenChange(true);
  };

  const handleEditClick = (publication: Publication) => {
    setEditingPublication(publication);
    handleOpenChange(true);
  };

  return (
    <div className="space-y-4">
      {hasData ? (
        <PublicationDisplay
          publications={sortedPublications}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onDeleteClick={removePublication}
          isDeleting={isLoading}
        />
      ) : (
        <EmptySection
          title="No publications added"
          description="Add your publications to showcase your research and writing."
          icon={<BookOpen className="size-6 text-indigo-500" />}
          iconContainerClassName="bg-indigo-500/10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddClick}
            disabled={isLoading}
          >
            <Plus className="size-4 mr-2" />
            Add Publication
          </Button>
        </EmptySection>
      )}

      <PublicationDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        form={form}
        actionFn={editingPublication ? updatePublication : savePublication}
        isLoading={isLoading}
        isEditing={!!editingPublication}
      />
    </div>
  );
};
