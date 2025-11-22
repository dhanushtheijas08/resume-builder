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
import {
  CreateResumeFormData,
  createResumeSchema,
} from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { Layout, Plus, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { COMPANIES, EXPERIENCE, ROLES, TEMPLATES } from "./data";
import { FilterCombobox } from "./filter-combobox";
import { TemplateCard } from "./template-card";

export function CreateResume() {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedExp, setSelectedExp] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
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

  const filteredTemplates = TEMPLATES.filter((template) => {
    const roleMatch = selectedRole === "All" || template.role === selectedRole;
    const expMatch =
      selectedExp === "All" || template.experience === selectedExp;
    const companyMatch =
      selectedCompany === "All" || template.company === selectedCompany;
    return roleMatch && expMatch && companyMatch;
  });

  const isPending = status === "executing";

  const handleTemplateSelect = (templateId: string) => {
    form.setValue(
      "templateId",
      selectedTemplate === templateId ? "" : templateId,
      { shouldDirty: true, shouldTouch: true, shouldValidate: true }
    );
  };

  const resetAllFilters = () => {
    setSelectedRole("All");
    setSelectedExp("All");
    setSelectedCompany("All");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 max-w-fit" variant="primary">
          <Plus className="size-4" />
          Create Resume
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
            <div className="w-80 border-r bg-muted/30 p-6 flex flex-col gap-8 shrink-0">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold tracking-tight">
                  Create Resume
                </DialogTitle>
                <DialogDescription>
                  Choose a template to get started
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
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
                    {(selectedRole !== "All" ||
                      selectedExp !== "All" ||
                      selectedCompany !== "All") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetAllFilters}
                        className="h-auto bg-transparent border-none hover:bg-transparent p-0 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-3" />
                        Reset
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Role
                      </Label>
                      <FilterCombobox
                        value={selectedRole}
                        onChange={setSelectedRole}
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
                        value={selectedExp}
                        onChange={setSelectedExp}
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
                        value={selectedCompany}
                        onChange={setSelectedCompany}
                        options={COMPANIES}
                        placeholder="Select Company"
                        searchPlaceholder="Search company..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Selected Template
                  </span>
                  <span className="font-medium truncate max-w-[120px]">
                    {selectedTemplate
                      ? TEMPLATES.find((t) => t.id === selectedTemplate)?.name
                      : "None"}
                  </span>
                </div>
                {errors.templateId?.message && (
                  <p className="text-xs text-destructive">
                    {errors.templateId.message}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="create-resume-form"
                    // disabled={isPending || !titleValue || !selectedTemplate}
                    className="relative overflow-hidden"
                    variant="primary"
                  >
                    {isPending ? (
                      "Creating..."
                    ) : (
                      <>
                        Create
                        <Sparkles className="ml-2 size-3.5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content - Template Grid */}
            <div className="flex-1 flex flex-col bg-background">
              <div className="h-14 border-b flex items-center px-6 justify-between bg-background/50 backdrop-blur sticky top-0 z-10">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Layout className="size-4" />
                  <span>{filteredTemplates.length} templates available</span>
                </div>
                {/* Could add search here later */}
              </div>

              <ScrollArea className="flex-1 p-6 max-h-[82.5vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                  <AnimatePresence mode="popLayout">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        isSelected={selectedTemplate === template.id}
                        onClick={() => handleTemplateSelect(template.id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
