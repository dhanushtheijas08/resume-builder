"use client";

import { useCustomSearchParams } from "@/lib/search-params";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { ActiveFilters } from "./active-filters";
import { DesktopFilters } from "./desktop-filters";
import { LayoutButton } from "./layout-button";
import { MobileFilters } from "./mobile-filters";
import {
  SearchParamsTypes,
  TemplatesHeaderProps,
  TempFilters,
} from "./templates-header.types";

export type { LayoutType } from "./templates-header.types";

export const TemplatesHeader = ({
  currentLayout,
  onLayoutChange,
}: TemplatesHeaderProps) => {
  const searchParams = useCustomSearchParams<SearchParamsTypes>();
  const location = searchParams.get("location") ?? "All";
  const role = searchParams.get("role") ?? "All";
  const experience = searchParams.get("experience") ?? "All";
  const company = searchParams.get("company") ?? "All";

  const [tempFilters, setTempFilters] = useState<TempFilters>({
    role,
    experience,
    company,
    location,
  });

  const isFiltered =
    (role.trim().length > 0 && role !== "All") ||
    (experience.trim().length > 0 && experience !== "All") ||
    (company.trim().length > 0 && company !== "All") ||
    (location.trim().length > 0 && location !== "All");

  const applyFilters = () => {
    let filterParams: { key: keyof TempFilters; value: string }[] = [];

    for (const [key, val] of Object.entries(tempFilters)) {
      if (val.trim().length > 0) {
        filterParams = [
          ...filterParams,
          { key: key as keyof TempFilters, value: val },
        ];
      }
    }
    searchParams.setMany([...filterParams, { key: "page", value: 1 }]);
  };

  const resetAllFilters = () => {
    searchParams.removeAll();
  };

  const setFilters = (
    key: "role" | "experience" | "company" | "location",
    value: string,
  ) => {
    searchParams.setMany([
      { key, value: value || "All" },
      { key: "page", value: 1 },
    ]);
  };

  const removeFilters = (
    type: "role" | "experience" | "company" | "location",
  ) => {
    searchParams.setMany([
      { key: type, value: "All" },
      { key: "page", value: 1 },
    ]);
  };

  const activeFilters = [
    role.trim().length > 0 &&
      role !== "All" && { label: role, type: "role" as const },
    experience.trim().length > 0 &&
      experience !== "All" && {
        label: experience,
        type: "experience" as const,
      },
    company.trim().length > 0 &&
      company !== "All" && { label: company, type: "company" as const },
    location.trim().length > 0 &&
      location !== "All" && { label: location, type: "location" as const },
  ].filter(Boolean) as Array<{
    label: string;
    type: "role" | "experience" | "company" | "location";
  }>;

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 mb-6 sm:mb-8">
      <div className="md:hidden space-y-3">
        <div className="flex items-center gap-2">
          <MobileFilters
            isFiltered={isFiltered}
            activeFiltersCount={activeFilters.length}
            tempFilters={tempFilters}
            onTempFiltersChange={setTempFilters}
            onApply={applyFilters}
            onReset={resetAllFilters}
            initialFilters={{ role, experience, company, location }}
          />

          <div className="flex items-center gap-1 p-1 bg-muted/40 border border-border/50 rounded-lg backdrop-blur-sm shrink-0">
            <LayoutButton
              active={currentLayout === "grid"}
              onClick={() => onLayoutChange("grid")}
              icon={<LayoutGrid className="w-4 h-4" />}
              label="Grid"
            />
            <LayoutButton
              active={currentLayout === "list"}
              onClick={() => onLayoutChange("list")}
              icon={<List className="w-4 h-4" />}
              label="List"
            />
          </div>
        </div>

        {isFiltered && (
          <ActiveFilters
            activeFilters={activeFilters}
            onRemoveFilter={removeFilters}
            onClearAll={resetAllFilters}
          />
        )}
      </div>

      <div className="hidden md:flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
        <DesktopFilters
          role={role}
          experience={experience}
          company={company}
          location={location}
          isFiltered={isFiltered}
          onFilterChange={setFilters}
          onClearAll={resetAllFilters}
        />

        <div className="flex items-center self-end gap-1.5 sm:gap-2 p-1 bg-muted/40 border border-border/50 rounded-lg backdrop-blur-sm shrink-0 w-fit">
          <LayoutButton
            active={currentLayout === "grid"}
            onClick={() => onLayoutChange("grid")}
            icon={<LayoutGrid className="w-4 h-4" />}
            label="Grid"
          />
          <LayoutButton
            active={currentLayout === "list"}
            onClick={() => onLayoutChange("list")}
            icon={<List className="w-4 h-4" />}
            label="List"
          />
        </div>
      </div>
    </div>
  );
};
