export type LayoutType = "grid" | "list";

export interface TemplatesHeaderProps {
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
}

export type SearchParamsTypes = {
  page: number;
  location: string;
  role: string;
  experience: string;
  company: string;
};

export type TempFilters = {
  role: string;
  experience: string;
  company: string;
  location: string;
};

export interface FiltersContentProps {
  tempFilters: TempFilters;
  onTempFiltersChange: (filters: TempFilters) => void;
  onApply?: () => void;
  onReset?: () => void;
  onClose?: () => void;
  showButtons?: boolean;
}

export interface ActiveFilter {
  label: string;
  type: "role" | "experience" | "company" | "location";
}
