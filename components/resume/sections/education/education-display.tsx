"use client";

import { Education } from "@/app/generated/prisma/client";
import { GraduationCap, Plus } from "lucide-react";
import { EducationCard } from "./education-card";
import { Button } from "@/components/ui/button";

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

      <div className="space-y-3">
        {educations.map((education) => (
          <EducationCard
            key={education.id}
            education={education}
            onEditClick={() => onEditClick(education)}
            onDeleteClick={() => onDeleteClick(education.id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
};
