"use client";

import { Certification } from "@/app/generated/prisma/client";
import { Award, Plus } from "lucide-react";
import { CertificationCard } from "./certification-card";
import { Button } from "@/components/ui/button";

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

      <div className="space-y-3">
        {certifications.map((certification) => (
          <CertificationCard
            key={certification.id}
            certification={certification}
            onEditClick={() => onEditClick(certification)}
            onDeleteClick={() => onDeleteClick(certification.id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
};

