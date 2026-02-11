"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createResumeAction } from "@/lib/actions/resume-actions";
import { getEnv } from "@/lib/env";
import {
  CreateResumeFormData,
  createResumeSchema,
} from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Layout, Plus, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import { Kbd } from "../ui/kbd";
import { COMPANIES, EXPERIENCE, ROLES } from "./data";
import { FilterCombobox } from "./filter-combobox";
import { TemplateCard, TemplateCardSkeleton } from "./template-card";
import { TEMPLATE_COLORS } from "@/lib/const";
import { fetchResumeTemplates } from "@/lib/api/resume.api";

const ITEMS_PER_PAGE = 9;

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

function getExperienceLabel(experience: number): string {
  if (experience < 2) return "Entry Level";
  if (experience < 5) return "Mid Level";
  if (experience < 8) return "Senior";
  if (experience < 12) return "Lead";
  return "Executive";
}

export function CreateResume() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    role: "All",
    exp: "All",
    company: "All",
  });
  const router = useRouter();
  const form = useForm<CreateResumeFormData>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: {
      title: "",
      templateId: "",
    },
  });
  const titleValue = useWatch({
    control: form.control,
    name: "title",
  });
  const selectedTemplate =
    useWatch({
      control: form.control,
      name: "templateId",
    }) || "";
  const { errors } = form.formState;

  const { execute: createResume, status } = useAction(createResumeAction, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message ?? "Resume created successfully!");
        setOpen(false);
        if (data.redirectUrl) {
          router.push(data.redirectUrl);
        }
      } else {
        toast.error(data.message ?? "Failed to create resume");
      }
    },
    onError: ({ error }) => {
      const message =
        error.serverError?.message ||
        error.validationErrors?.formErrors?.[0] ||
        "Failed to create resume";
      toast.error(message);
      if (error.serverError?.redirectUrl) {
        router.push(error.serverError.redirectUrl);
      }
    },
  });

  const {
    data: apiData,
    isLoading,
    isError,
  } = useQuery<ResumeTemplateApiResponse, Error>({
    queryKey: ["resume-templates", filterOptions, currentPage],
    queryFn: () =>
      fetchResumeTemplates({
        page: currentPage,
        role: filterOptions.role,
        exp: filterOptions.exp,
        company: filterOptions.company,
      }),
    enabled: open,
  });

  const totalTemplates = apiData?.data.pagination.total ?? 0;
  const totalPages = apiData?.data.pagination.totalPages ?? 1;

  const uiTemplates = useMemo(() => {
    const templates = apiData?.data.templates ?? [];

    return templates.map((template, index) => {
      const palette = TEMPLATE_COLORS[index % TEMPLATE_COLORS.length];

      return {
        id: template.id,
        name: template.title,
        role: template.role,
        experience: getExperienceLabel(template.experience),
        company: template.company,
        previewImageUrl: template.previewImageUrl,
        color: palette.color,
        accent: palette.accent,
      };
    });
  }, [apiData]);

  const isPending = status === "executing";

  const selectTemplate = (templateId: string) => {
    form.setValue(
      "templateId",
      selectedTemplate === templateId ? "" : templateId,
      { shouldDirty: true, shouldTouch: true, shouldValidate: true },
    );
  };

  const resetAllFilters = () => {
    setFilterOptions({
      role: "All",
      exp: "All",
      company: "All",
    });
    setCurrentPage(1);
  };

  useHotkeys(
    ["c", "shift+c"],
    () => {
      if (!open) setOpen(true);
    },
    { preventDefault: true },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1.5 max-w-fit" variant="primary">
          <Plus className="size-4" />
          Create Resume
          <Kbd className="hidden lg:flex text-xs bg-card/30 mt-0.5 text-primary-foreground">
            c
          </Kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] w-full max-w-6xl h-[90vh] p-0 overflow-hidden border-none shadow-2xl bg-background/95 backdrop-blur-xl">
        <Form {...form}>
          <form
            id="create-resume-form"
            onSubmit={form.handleSubmit(createResume)}
            className="flex h-full"
          >
            {/* Sidebar - Filters & Info */}
            <div className="w-80 border-r bg-muted/30  flex flex-col gap-8 shrink-0">
              <DialogHeader className="px-6 pt-6">
                <DialogTitle className="text-2xl font-semibold tracking-tight">
                  Create Resume
                </DialogTitle>
                <DialogDescription>
                  Choose a template to get started
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Resume Name
                  </Label>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Title</FormLabel>
                        <FormControl>
                          <Input
                            id="title"
                            placeholder="e.g. Full Stack 2024"
                            className="bg-background"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Filters</Label>
                    {filterOptions.role !== "All" ||
                    filterOptions.exp !== "All" ||
                    filterOptions.company !== "All" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetAllFilters}
                        className="h-auto bg-transparent border-none hover:bg-transparent p-0 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-3" />
                        Reset
                      </Button>
                    ) : null}
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Role
                      </Label>
                      <FilterCombobox
                        value={filterOptions.role}
                        onChange={(value) => {
                          setFilterOptions((prev) => ({
                            ...prev,
                            role: value,
                          }));
                          setCurrentPage(1);
                        }}
                        options={ROLES}
                        placeholder="Select Role"
                        searchPlaceholder="Search role..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Experience
                      </Label>
                      <FilterCombobox
                        value={filterOptions.exp}
                        onChange={(value) => {
                          setFilterOptions((prev) => ({ ...prev, exp: value }));
                          setCurrentPage(1);
                        }}
                        options={EXPERIENCE}
                        placeholder="Select Experience"
                        searchPlaceholder="Search experience..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Company
                      </Label>
                      <FilterCombobox
                        value={filterOptions.company}
                        onChange={(value) => {
                          setFilterOptions((prev) => ({
                            ...prev,
                            company: value,
                          }));
                          setCurrentPage(1);
                        }}
                        options={COMPANIES}
                        placeholder="Select Company"
                        searchPlaceholder="Search company..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" px-3.5 pt-6 border-t space-y-4 mt-14">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Selected Template
                  </span>
                  <span className="font-medium truncate max-w-[120px]">
                    {uiTemplates.find(
                      (template) => template.id === selectedTemplate,
                    )?.name ?? "None"}
                  </span>
                </div>
                {errors.templateId?.message && (
                  <p className="text-xs text-destructive">
                    {errors.templateId.message}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-3">
                  {/* <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button> */}
                  <Button
                    type="submit"
                    form="create-resume-form"
                    disabled={isPending || !titleValue || !selectedTemplate}
                    className="relative overflow-hidden"
                    variant="primary"
                  >
                    {isPending ? "Creating..." : "Create"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content - Template Grid */}
            <div className="flex-1 flex flex-col bg-background">
              <div className="h-14 border-b flex items-center px-6 justify-between bg-background/50 backdrop-blur sticky top-0 z-10">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Layout className="size-4" />
                  <span>
                    {isLoading && !apiData
                      ? "Loading templates..."
                      : `${totalTemplates} templates available`}
                  </span>
                </div>
              </div>

              <ScrollArea className="flex-1 p-6 max-h-[82.5vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                  {isLoading && !apiData ? (
                    Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                      <TemplateCardSkeleton key={index} />
                    ))
                  ) : isError ? (
                    <p className="text-sm text-destructive">
                      Failed to load templates. Please try again.
                    </p>
                  ) : uiTemplates.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No templates found for the selected filters.
                    </p>
                  ) : (
                    <>
                      {uiTemplates.map((template) => (
                        <TemplateCard
                          key={template.id}
                          template={template}
                          isSelected={selectedTemplate === template.id}
                          onClick={() => selectTemplate(template.id)}
                        />
                      ))}
                    </>
                  )}
                </div>
              </ScrollArea>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 py-4 border-t bg-background sticky bottom-0 z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
