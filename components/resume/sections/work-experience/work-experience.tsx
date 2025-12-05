"use client";

import { WorkExperience } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus } from "lucide-react";
import { useState } from "react";
import { EmptySection } from "../empty-section";
import { useWorkExperience } from "./use-work-experience";
import { WorkExperienceDialog } from "./work-experience-dialog";
import { WorkExperienceDisplay } from "./work-experience-display";

export const WorkExperienceSection = ({
  experiences,
}: {
  experiences: WorkExperience[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<WorkExperience | null>(null);

  const hasData = experiences.length > 0;
  const sortedExperiences = experiences.sort((a, b) => a.order - b.order);
  const maxOrder = (sortedExperiences.at(-1)?.order ?? 0) + 1;

  console.log(maxOrder);

  const {
    form,
    saveWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    isLoading,
  } = useWorkExperience(editingExperience, maxOrder, () => {
    setIsOpen(false);
    setEditingExperience(null);
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingExperience(null);
    }
  };

  const handleAddClick = () => {
    setEditingExperience(null);
    handleOpenChange(true);
  };

  const handleEditClick = (experience: WorkExperience) => {
    setEditingExperience(experience);
    handleOpenChange(true);
  };

  return (
    <div className="space-y-4">
      {hasData ? (
        <WorkExperienceDisplay
          experiences={sortedExperiences}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onDeleteClick={removeWorkExperience}
          isDeleting={isLoading}
        />
      ) : (
        <EmptySection
          title="No work experience added"
          description="Add your professional history to showcase your career."
          icon={<Briefcase className="size-6 text-purple-500" />}
          iconContainerClassName="bg-purple-500/10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddClick}
            disabled={isLoading}
          >
            <Plus className="size-4 mr-2" />
            Add Experience
          </Button>
        </EmptySection>
      )}

      <WorkExperienceDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        form={form}
        actionFn={editingExperience ? updateWorkExperience : saveWorkExperience}
        isLoading={isLoading}
        isEditing={!!editingExperience}
      />
    </div>
  );
};
