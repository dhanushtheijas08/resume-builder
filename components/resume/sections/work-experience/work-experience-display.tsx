"use client";

import { WorkExperience } from "@/app/generated/prisma/client";
import { Briefcase, Plus } from "lucide-react";
import { WorkExperienceCard } from "./work-experience-card";
import { Button } from "@/components/ui/button";

type WorkExperienceDisplayProps = {
  experiences: WorkExperience[];
  onAddClick: () => void;
  onEditClick: (experience: WorkExperience) => void;
  onDeleteClick: (id: string) => void;
  isDeleting?: boolean;
};

export const WorkExperienceDisplay = ({
  experiences,
  onAddClick,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: WorkExperienceDisplayProps) => {
  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="size-4" />
          <span>
            {experiences.length} experience{experiences.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onAddClick}>
          <Plus className="size-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-3">
        {experiences.map((experience) => (
          <WorkExperienceCard
            key={experience.id}
            experience={experience}
            onEditClick={() => onEditClick(experience)}
            onDeleteClick={() => onDeleteClick(experience.id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
};
