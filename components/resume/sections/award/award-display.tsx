"use client";

import { Award } from "@prisma/client";
import { Trophy, Plus } from "lucide-react";
import { AwardCard } from "./award-card";
import { Button } from "@/components/ui/button";

type AwardDisplayProps = {
  awards: Award[];
  onAddClick: () => void;
  onEditClick: (award: Award) => void;
  onDeleteClick: (id: string) => void;
  isDeleting?: boolean;
};

export const AwardDisplay = ({
  awards,
  onAddClick,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: AwardDisplayProps) => {
  if (awards.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="size-4" />
          <span>
            {awards.length} award{awards.length !== 1 ? "s" : ""} / achievement
            {awards.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onAddClick}>
          <Plus className="size-4 mr-2" />
          Add Award
        </Button>
      </div>

      <div className="space-y-3">
        {awards.map((award) => (
          <AwardCard
            key={award.id}
            award={award}
            onEditClick={() => onEditClick(award)}
            onDeleteClick={() => onDeleteClick(award.id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
};
