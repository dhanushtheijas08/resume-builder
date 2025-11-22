"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase, Building2, Check, Clock } from "lucide-react";

interface Template {
  id: string;
  name: string;
  role: string;
  experience: string;
  company?: string;
  color: string;
  accent: string;
}

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onClick: () => void;
}

export function TemplateCard({
  template,
  isSelected,
  onClick,
}: TemplateCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden",
        isSelected
          ? "border-primary ring-4 ring-primary/10 scale-[1.02] shadow-xl"
          : "border-transparent hover:border-border hover:shadow-lg hover:-translate-y-1"
      )}
    >
      {/* Preview Area */}
      <div
        className={cn(
          "aspect-3/4 w-full p-5 transition-colors rounded-b-lg",
          template.color
        )}
      >
        <div className="h-full w-full bg-white rounded-lg shadow-sm p-4 flex flex-col gap-3 group-hover:shadow-md transition-all">
          {/* Header Skeleton */}
          <div className="flex gap-3 items-center border-b pb-3">
            <div
              className={cn("size-8 rounded-full shrink-0", template.accent)}
            />
            <div className="space-y-1.5 flex-1">
              <div className="h-2 w-2/3 bg-slate-200 rounded-full" />
              <div className="h-1.5 w-1/2 bg-slate-100 rounded-full" />
            </div>
          </div>
          {/* Body Skeleton */}
          <div className="space-y-3 mt-1">
            <div className="h-1.5 w-full bg-slate-100 rounded-full" />
            <div className="h-1.5 w-full bg-slate-100 rounded-full" />
            <div className="h-1.5 w-3/4 bg-slate-100 rounded-full" />
          </div>
          <div className="space-y-3 mt-2">
            <div className="h-1.5 w-1/3 bg-slate-200 rounded-full" />
            <div className="h-1.5 w-full bg-slate-100 rounded-full" />
            <div className="h-1.5 w-full bg-slate-100 rounded-full" />
          </div>
        </div>
      </div>

      {/* Info Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 border-t translate-y-full group-hover:translate-y-0 transition-all opacity-0 group-hover:opacity-100 duration-500 ease-out rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-sm text-slate-900 ">
              {template.name}
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Briefcase className="size-3" /> {template.role}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" /> {template.experience}
              </span>
              {template.company && (
                <span className="flex items-center gap-1">
                  <Building2 className="size-3" /> {template.company}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
          <Check className="size-5" />
        </div>
      )}
    </motion.div>
  );
}
