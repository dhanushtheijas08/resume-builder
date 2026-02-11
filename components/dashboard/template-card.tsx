"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Briefcase, Building2, Clock, Eye, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Template } from "./template-data";

interface TemplateCardProps {
  template: Template;
  viewMode?: "grid" | "list";
}

export const TemplateCard = ({
  template,
  viewMode = "grid",
}: TemplateCardProps) => {
  if (viewMode === "list") {
    return (
      <div className="group relative flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-muted/20 border border-border/50 hover:bg-muted/30 hover:border-primary/30 transition-all duration-300">
        <div className="relative w-full sm:w-36 h-48 sm:h-44 shrink-0 bg-card rounded-lg overflow-hidden border border-border/50 group-hover:shadow-xl transition-all duration-300">
          <Image
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
            width={128}
            height={160}
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-1">
            <h3 className="text-lg sm:text-xl font-medium truncate">
              {template.name}
            </h3>
            {template.popular && (
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20 self-start sm:self-auto">
                Popular
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
            {template.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-0">
            <span className="text-xs font-medium px-2 sm:px-2.5 py-1 rounded-md bg-muted/50 border border-border/50">
              {template.industry}
            </span>
            {template.role && (
              <span className="text-xs text-muted-foreground">
                {template.role}
              </span>
            )}
            {template.location && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="size-3" />
                {template.location}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-row sm:flex-col gap-2 w-full sm:max-w-44 sm:w-full">
          <Button
            variant="primary"
            size="sm"
            className="flex-1 sm:flex-none"
            asChild
          >
            <Link href={`/resumes/new?templateId=${template.id}`}>
              <Plus className="w-4 h-4 mr-2" />{" "}
              <span className="hidden sm:inline">Use This</span>
              <span className="sm:hidden">Use</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Eye className="w-4 h-4 sm:mr-2" />{" "}
            <span className="hidden sm:inline">Preview</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative cursor-pointer rounded-lg sm:rounded-xl border-2 border-transparent hover:border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="aspect-3/4 w-full bg-slate-50 rounded-b-lg overflow-hidden relative">
        <Image
          src={template.thumbnail}
          alt={template.name}
          quality={100}
          width={400}
          height={533}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info Overlay - Mobile: Always visible, Desktop: On hover */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 border-t translate-y-0 sm:translate-y-full group-hover:translate-y-0 transition-all opacity-100 sm:opacity-0 group-hover:opacity-100 duration-500 ease-out rounded-lg">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
              {template.name}
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-muted-foreground mt-1">
              {template.role && (
                <span className="flex items-center gap-1">
                  <Briefcase className="size-2.5 sm:size-3" />{" "}
                  <span className="truncate">{template.role}</span>
                </span>
              )}
              {template.experience && (
                <span className="flex items-center gap-1">
                  <Clock className="size-2.5 sm:size-3" />{" "}
                  <span className="truncate">{template.experience}</span>
                </span>
              )}
              {template.company && (
                <span className="flex items-center gap-1">
                  <Building2 className="size-2.5 sm:size-3" />{" "}
                  <span className="truncate">{template.company}</span>
                </span>
              )}
              {template.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="size-2.5 sm:size-3" />{" "}
                  <span className="truncate">{template.location}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-1.5 sm:gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
            asChild
          >
            <Link href={`/resumes/new?templateId=${template.id}`}>
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />{" "}
              <span className="hidden sm:inline">Use This</span>
              <span className="sm:hidden">Use</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 sm:h-9 px-2 sm:px-3"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>

      {/* Popular Badge */}
      {template.popular && (
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-lg">
          Popular
        </div>
      )}
    </motion.div>
  );
};

export const TemplateCardSkeleton = ({
  viewMode = "grid",
}: {
  viewMode?: "grid" | "list";
}) => {
  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-muted/10 border border-border/50 animate-pulse">
        <div className="w-full sm:w-32 h-48 sm:h-40 shrink-0 bg-muted/20 rounded-lg" />
        <div className="flex-1 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-5 sm:h-6 w-1/3 bg-muted/20 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-3 sm:h-4 w-full bg-muted/20 rounded" />
            <div className="h-3 sm:h-4 w-2/3 bg-muted/20 rounded" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-5 sm:h-6 w-16 sm:w-20 bg-muted/20 rounded" />
            <div className="h-3 sm:h-4 w-24 sm:w-32 bg-muted/20 rounded" />
          </div>
        </div>
        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
          <div className="h-8 sm:h-9 flex-1 sm:flex-none sm:w-24 bg-muted/20 rounded" />
          <div className="h-8 sm:h-9 flex-1 sm:flex-none sm:w-24 bg-muted/20 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative cursor-pointer rounded-lg sm:rounded-xl border-2 border-transparent overflow-hidden">
      <div className="aspect-3/4 w-full p-3 sm:p-5 rounded-b-lg bg-slate-50 animate-pulse">
        <div className="h-full w-full bg-white rounded-lg shadow-sm p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
          <div className="flex gap-2 sm:gap-3 items-center border-b pb-2 sm:pb-3">
            <div className="size-6 sm:size-8 rounded-full bg-slate-200 shrink-0" />
            <div className="space-y-1 sm:space-y-1.5 flex-1">
              <div className="h-1.5 sm:h-2 w-2/3 bg-slate-200 rounded-full" />
              <div className="h-1 sm:h-1.5 w-1/2 bg-slate-100 rounded-full" />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 mt-1">
            <div className="h-1 sm:h-1.5 w-full bg-slate-100 rounded-full" />
            <div className="h-1 sm:h-1.5 w-full bg-slate-100 rounded-full" />
            <div className="h-1 sm:h-1.5 w-3/4 bg-slate-100 rounded-full" />
          </div>
          <div className="space-y-2 sm:space-y-3 mt-2">
            <div className="h-1 sm:h-1.5 w-1/3 bg-slate-200 rounded-full" />
            <div className="h-1 sm:h-1.5 w-full bg-slate-100 rounded-full" />
            <div className="h-1 sm:h-1.5 w-full bg-slate-100 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
