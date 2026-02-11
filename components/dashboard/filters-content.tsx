"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { COMPANIES, EXPERIENCE, LOCATIONS, ROLES } from "../resume/data";
import { FilterCombobox } from "../resume/filter-combobox";
import { Label } from "../ui/label";
import { FiltersContentProps } from "./templates-header.types";

export const FiltersContent = ({
  tempFilters,
  onTempFiltersChange,
  onApply,
  onReset,
  onClose,
}: FiltersContentProps) => {
  const isFiltered =
    tempFilters.role !== "All" ||
    tempFilters.experience !== "All" ||
    tempFilters.company !== "All" ||
    tempFilters.location !== "All";

  return (
    <div className="space-y-4">
      <div className="flex-1 space-y-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">Role</Label>
          <FilterCombobox
            value={tempFilters.role}
            onChange={(value) =>
              onTempFiltersChange({ ...tempFilters, role: value })
            }
            options={ROLES}
            placeholder="Select Role"
            searchPlaceholder="Search role..."
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">
            Experience
          </Label>
          <FilterCombobox
            value={tempFilters.experience}
            onChange={(value) =>
              onTempFiltersChange({ ...tempFilters, experience: value })
            }
            options={EXPERIENCE}
            placeholder="Select Experience"
            searchPlaceholder="Search experience..."
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">Company</Label>
          <FilterCombobox
            value={tempFilters.company}
            onChange={(value) =>
              onTempFiltersChange({ ...tempFilters, company: value })
            }
            options={COMPANIES}
            placeholder="Select Company"
            searchPlaceholder="Search company..."
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">
            Location
          </Label>
          <FilterCombobox
            value={tempFilters.location}
            onChange={(value) =>
              onTempFiltersChange({ ...tempFilters, location: value })
            }
            options={LOCATIONS}
            placeholder="Select Location"
            searchPlaceholder="Search location..."
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-2 border-t mt-5">
        <Button
          variant="default"
          size="sm"
          onClick={onApply}
          className="w-full h-10 font-medium"
        >
          Apply Filters
        </Button>
        {isFiltered && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onReset();
              onClose();
            }}
            className="w-full h-10 text-muted-foreground hover:text-foreground border-dashed"
          >
            <X className="mr-2 h-4 w-4" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
};
