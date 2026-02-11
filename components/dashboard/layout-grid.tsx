"use client";

import { Template } from "./template-data";
import { TemplateCard, TemplateCardSkeleton } from "./template-card";

interface LayoutGridProps {
  templates: Template[];
  isLoading?: boolean;
}

export const LayoutGrid = ({ templates, isLoading }: LayoutGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <TemplateCardSkeleton key={i} viewMode="grid" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
      {templates.map((template) => (
        <div key={template.id}>
          <TemplateCard template={template} viewMode="grid" />
        </div>
      ))}
    </div>
  );
};
