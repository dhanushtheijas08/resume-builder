"use client";

import { Publication } from "@/app/generated/prisma/client";
import { BookOpen, Plus } from "lucide-react";
import { PublicationCard } from "./publication-card";
import { Button } from "@/components/ui/button";

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

      <div className="space-y-3">
        {publications.map((publication) => (
          <PublicationCard
            key={publication.id}
            publication={publication}
            onEditClick={() => onEditClick(publication)}
            onDeleteClick={() => onDeleteClick(publication.id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
};

