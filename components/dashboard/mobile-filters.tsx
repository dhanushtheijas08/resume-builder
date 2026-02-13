"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpenChange = (open: boolean) => {
    setDrawerOpen(open);
    if (open) {
      onTempFiltersChange(initialFilters);
    }
  };

  const handleApply = () => {
    onApply();
    setDrawerOpen(false);
  };

  const handleReset = () => {
    onReset();
    setDrawerOpen(false);
  };

  return (
    <Drawer open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex-1 justify-start h-9">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Filters</span>
          {isFiltered && (
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="pb-4 border-b">
          <DrawerTitle>Filter Templates</DrawerTitle>
          <DrawerDescription>
            Select filters and click &quot;Apply Filters&quot; to see results
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <FiltersContent
            tempFilters={tempFilters}
            onTempFiltersChange={onTempFiltersChange}
            showButtons={false}
          />
        </div>
        <DrawerFooter className="pt-2 border-t">
          <Button
            variant="default"
            size="sm"
            onClick={handleApply}
            className="w-full h-10 font-medium"
          >
            Apply Filters
          </Button>
          {isFiltered && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="w-full h-10 text-muted-foreground hover:text-foreground border-dashed"
            >
              <X className="mr-2 h-4 w-4" />
              Clear All Filters
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
