"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ActiveFilter } from "./templates-header.types";

interface ActiveFiltersProps {
  activeFilters: ActiveFilter[];
  onRemoveFilter: (type: ActiveFilter["type"]) => void;
  onClearAll: () => void;
}

export const ActiveFilters = ({
  activeFilters,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersProps) => {
  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeFilters.map((filter, index) => (
        <div
          key={index}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-medium text-primary"
        >
          <span>{filter.label}</span>
          <button
            onClick={() => onRemoveFilter(filter.type)}
            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
      >
        <X className="h-3 w-3 mr-1" />
        Reset
      </Button>
    </div>
  );
};
