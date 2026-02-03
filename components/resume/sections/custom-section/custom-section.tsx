"use client";

import { CustomSection } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { useState } from "react";
import { EmptySection } from "../empty-section";
import { useCustomSection } from "./use-custom-section";
import { CustomSectionDialog } from "./custom-section-dialog";
import { CustomSectionDisplay } from "./custom-section-display";

export const CustomSectionComponent = ({
  customSections,
}: {
  customSections: CustomSection[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCustomSection, setEditingCustomSection] =
    useState<CustomSection | null>(null);

  const hasData = customSections.length > 0;
  const sortedCustomSections = customSections.sort((a, b) => a.order - b.order);
  const maxOrder = (sortedCustomSections.at(-1)?.order ?? 0) + 1;

  const {
    form,
    saveCustomSection,
    updateCustomSection,
    removeCustomSection,
    isLoading,
  } = useCustomSection(editingCustomSection, maxOrder, () => {
    setIsOpen(false);
    setEditingCustomSection(null);
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingCustomSection(null);
    }
  };

  const handleAddClick = () => {
    setEditingCustomSection(null);
    handleOpenChange(true);
  };

  const handleEditClick = (customSection: CustomSection) => {
    setEditingCustomSection(customSection);
    handleOpenChange(true);
  };

  return (
    <div className="space-y-4">
      {hasData ? (
        <CustomSectionDisplay
          customSections={customSections}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onDeleteClick={removeCustomSection}
          isDeleting={isLoading}
        />
      ) : (
        <EmptySection
          title="No custom sections added"
          description="Add custom sections to showcase additional information on your resume."
          icon={<FileText className="size-6 text-blue-500" />}
          iconContainerClassName="bg-blue-500/10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddClick}
            disabled={isLoading}
          >
            <Plus className="size-4 mr-2" />
            Add Custom Section
          </Button>
        </EmptySection>
      )}

      <CustomSectionDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        form={form}
        actionFn={
          editingCustomSection ? updateCustomSection : saveCustomSection
        }
        isLoading={isLoading}
        isEditing={!!editingCustomSection}
      />
    </div>
  );
};
