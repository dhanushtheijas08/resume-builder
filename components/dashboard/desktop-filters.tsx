"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { COMPANIES, EXPERIENCE, LOCATIONS, ROLES } from "../resume/data";
import { FilterCombobox } from "../resume/filter-combobox";
import { Label } from "../ui/label";

interface DesktopFiltersProps {
  role: string;
  experience: string;
  company: string;
  location: string;
  isFiltered: boolean;
  onFilterChange: (
    key: "role" | "experience" | "company" | "location",
    value: string,
  ) => void;
  onClearAll: () => void;
}

export const DesktopFilters = ({
  role,
  experience,
  company,
  location,
  isFiltered,
  onFilterChange,
  onClearAll,
}: DesktopFiltersProps) => {
  return (
    <div className="flex-1 w-full">
      <div className="flex flex-row flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[180px] max-w-[240px] lg:min-w-[200px] space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Role
          </Label>
          <FilterCombobox
            value={role}
            onChange={(value) => onFilterChange("role", value)}
            options={ROLES}
            placeholder="Select Role"
            searchPlaceholder="Search role..."
          />
        </div>
        <div className="flex-1 min-w-[180px] max-w-[240px] lg:min-w-[200px] space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Experience
          </Label>
          <FilterCombobox
            value={experience}
            onChange={(value) => onFilterChange("experience", value)}
            options={EXPERIENCE}
            placeholder="Select Experience"
            searchPlaceholder="Search experience..."
          />
        </div>
        <div className="flex-1 min-w-[180px] max-w-[240px] lg:min-w-[200px] space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Company
          </Label>
          <FilterCombobox
            value={company}
            onChange={(value) => onFilterChange("company", value)}
            options={COMPANIES}
            placeholder="Select Company"
            searchPlaceholder="Search company..."
          />
        </div>
        <div className="flex-1 min-w-[180px] max-w-[240px] lg:min-w-[200px] space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Location
          </Label>
          <FilterCombobox
            value={location}
            onChange={(value) => onFilterChange("location", value)}
            options={LOCATIONS}
            placeholder="Select Location"
            searchPlaceholder="Search location..."
          />
        </div>

        {isFiltered && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="h-9 text-muted-foreground hover:text-foreground border-dashed"
          >
            <X className="mr-0.5 h-4 w-4" />
            <span className="text-sm">Clear Filters</span>
          </Button>
        )}
      </div>
    </div>
  );
};
