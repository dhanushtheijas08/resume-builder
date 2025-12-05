"use client";

import { Education } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus } from "lucide-react";
import { useState } from "react";
import { EmptySection } from "../empty-section";
import { useEducation } from "./use-education";
import { EducationDialog } from "./education-dialog";
import { EducationDisplay } from "./education-display";

export const EducationSection = ({
  educations,
}: {
  educations: Education[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );

  const hasData = educations.length > 0;
  const sortedEducations = educations.sort((a, b) => a.order - b.order);
  const maxOrder = (sortedEducations.at(-1)?.order ?? 0) + 1;

  const { form, saveEducation, updateEducation, removeEducation, isLoading } =
    useEducation(editingEducation, maxOrder, () => {
      setIsOpen(false);
      setEditingEducation(null);
    });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingEducation(null);
    }
  };

  const handleAddClick = () => {
    setEditingEducation(null);
    handleOpenChange(true);
  };

  const handleEditClick = (education: Education) => {
    setEditingEducation(education);
    handleOpenChange(true);
  };

  return (
    <div className="space-y-4">
      {hasData ? (
        <EducationDisplay
          educations={educations}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onDeleteClick={removeEducation}
          isDeleting={isLoading}
        />
      ) : (
        <EmptySection
          title="No education added"
          description="Add your academic background to showcase your qualifications."
          icon={<GraduationCap className="size-6 text-emerald-500" />}
          iconContainerClassName="bg-emerald-500/10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddClick}
            disabled={isLoading}
          >
            <Plus className="size-4 mr-2" />
            Add Education
          </Button>
        </EmptySection>
      )}

      <EducationDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        form={form}
        actionFn={editingEducation ? updateEducation : saveEducation}
        isLoading={isLoading}
        isEditing={!!editingEducation}
      />
    </div>
  );
};
