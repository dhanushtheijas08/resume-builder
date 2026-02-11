"use client";

import { LayoutGrid } from "@/components/dashboard/layout-grid";
import { LayoutList } from "@/components/dashboard/layout-list";
import {
  LayoutType,
  TemplatesHeader,
} from "@/components/dashboard/templates-header";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { useSearchParams } from "next/navigation";
import { fetchResumeTemplates } from "@/lib/api/resume.api";
import { useCustomSearchParams } from "@/lib/search-params";

type ResumeTemplateApiItem = {
  id: string;
  title: string;
  role: string;
  experience: number;
  company: string;
  location: string;
  previewImageUrl: string;
  tags: string[];
};

type ResumeTemplateApiResponse = {
  data: {
    templates: ResumeTemplateApiItem[];
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
  };
};

function getExperienceLabel(experience: number | string): string {
  const exp = experience.toString();
  if (exp === "Entry Level") return "Entry Level";
  if (exp === "Mid Level") return "Mid Level";
  if (exp === "Senior") return "Senior";
  if (exp === "Lead") return "Lead";
  if (exp === "Executive") return "Executive";
  return "All";
}

type SearchParamsTypes = {
  page: number;
  location: string;
  role: string;
  experience: string;
  company: string;
};

export default function TemplatesPage() {
  const [layout, setLayout] = useState<LayoutType>("grid");

  const searchParams = useCustomSearchParams<SearchParamsTypes>();
  const location = searchParams.get("location") ?? "All";
  const role = searchParams.get("role") ?? "All";
  const experience = searchParams.get("experience") ?? "All";
  const company = searchParams.get("company") ?? "All";
  const pageParam = searchParams.get("page");
  const currentPage =
    pageParam && Number(pageParam) > 0 ? Number(pageParam) : 1;

  const {
    data: apiData,
    isPending,
    isFetching,
    isError,
  } = useQuery<ResumeTemplateApiResponse, Error>({
    queryKey: [
      "resume-templates-page",
      role,
      experience,
      company,
      location,
      currentPage,
    ],
    queryFn: () =>
      fetchResumeTemplates({
        page: currentPage,
        role: role,
        exp: experience,
        company: company,
        location: location,
      }),
    placeholderData: keepPreviousData,
  });

  const isInitialLoading = isPending && !apiData;

  const templates = useMemo(() => {
    const apiTemplates = apiData?.data.templates ?? [];
    return apiTemplates.map((t) => ({
      id: t.id,
      name: t.title,
      description: `A professional ${t.role} template tailored for ${t.company}.`,
      industry: t.location,
      thumbnail: t.previewImageUrl,
      role: t.role,
      experience: getExperienceLabel(t.experience),
      company: t.company,
      location: t.location,
    }));
  }, [apiData]);

  const totalPages = apiData?.data.pagination.totalPages ?? 1;

  return (
    <div className="container relative mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl">
      <TemplatesHeader currentLayout={layout} onLayoutChange={setLayout} />

      <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[600px] pb-8 sm:pb-12 md:pb-16">
        {isError ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] space-y-4 px-4">
            <div className="text-center space-y-2">
              <p className="text-base sm:text-lg font-medium text-destructive">
                Failed to load templates
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Please try again later.
              </p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            {layout === "grid" && (
              <div key="grid">
                <LayoutGrid
                  templates={templates}
                  isLoading={isInitialLoading}
                />
              </div>
            )}
            {layout === "list" && (
              <div key="list">
                <LayoutList
                  templates={templates}
                  isLoading={isInitialLoading}
                />
              </div>
            )}
          </>
        )}

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-4 sm:py-6 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPage = Math.max(1, currentPage - 1);
                searchParams.set("page", newPage.toString());
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === 1 || isFetching}
              className="w-full sm:w-auto min-w-25 sm:min-w-25"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md bg-muted/50 text-xs sm:text-sm">
              <span className="font-medium text-foreground">
                Page {currentPage}
              </span>
              <span className="text-muted-foreground">of</span>
              <span className="font-medium text-foreground">{totalPages}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPage = Math.min(totalPages, currentPage + 1);
                searchParams.set("page", newPage.toString());
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages || isFetching}
              className="w-full sm:w-auto min-w-[100px] sm:min-w-[100px]"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
