"use client";

import { CustomSection } from "@/app/generated/prisma/client";
import { FileText, Plus } from "lucide-react";
import { CustomSectionCard } from "./custom-section-card";
import { Button } from "@/components/ui/button";

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

      <div className="space-y-3">
        {customSections.map((customSection) => (
          <CustomSectionCard
            key={customSection.id}
            customSection={customSection}
            onEditClick={() => onEditClick(customSection)}
            onDeleteClick={() => onDeleteClick(customSection.id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
};
