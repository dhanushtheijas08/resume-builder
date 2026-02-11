"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { FiltersContent } from "./filters-content";
import { TempFilters } from "./templates-header.types";

interface MobileFiltersProps {
  isFiltered: boolean;
  activeFiltersCount: number;
  tempFilters: TempFilters;
  onTempFiltersChange: (filters: TempFilters) => void;
  onApply: () => void;
  onReset: () => void;
  initialFilters: TempFilters;
}

export const MobileFilters = ({
  isFiltered,
  activeFiltersCount,
  tempFilters,
  onTempFiltersChange,
  onApply,
  onReset,
  initialFilters,
}: MobileFiltersProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open);
    if (open) {
      onTempFiltersChange(initialFilters);
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex-1 justify-start h-9">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Filters</span>
          {isFiltered && (
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[85vh] rounded-t-2xl max-h-[85vh] flex flex-col"
      >
        <SheetHeader className="pb-4 border-b">
          <SheetTitle>Filter Templates</SheetTitle>
          <SheetDescription>
            Select filters and click &quot;Apply Filters&quot; to see results
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4 pt-0">
          <FiltersContent
            tempFilters={tempFilters}
            onTempFiltersChange={onTempFiltersChange}
            onApply={() => {
              onApply();
              setSheetOpen(false);
            }}
            onReset={onReset}
            onClose={() => setSheetOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
