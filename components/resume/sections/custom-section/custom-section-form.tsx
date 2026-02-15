"use client";

import { TextEditor } from "@/components/resume/sections/text-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomSectionFormData } from "@/lib/validations/resume";
import { Save, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type ExperienceContent = {
  jobTitle?: string;
  company?: string;
  location?: string;
  timePeriod?: string;
  description?: string;
};

type EducationContent = {
  degree?: string;
  institution?: string;
  location?: string;
  timePeriod?: string;
  description?: string;
};

type ProjectContent = {
  name?: string;
  description?: string;
  url?: string;
  github?: string;
  technologies?: string;
  timePeriod?: string;
};

type SkillContent = {
  name?: string;
  proficiency?: number;
  category?: string;
  displayType?: string;
};

type CustomSectionFormProps = {
  form: UseFormReturn<CustomSectionFormData>;
  actionFn: (values: CustomSectionFormData) => void;
  isLoading: boolean;
};

export const CustomSectionForm = ({
  form,
  actionFn,
  isLoading,
}: CustomSectionFormProps) => {
  const sectionType = form.watch("type");

  const handleSubmit = (values: CustomSectionFormData) => {
    let content:
      | string
      | ExperienceContent
      | EducationContent
      | ProjectContent
      | SkillContent = values.content;

    if (sectionType === "SUMMARY") {
      content = typeof values.content === "string" ? values.content : "";
    } else if (sectionType === "EXPERIENCE") {
      const expData = values.content as ExperienceContent;
      content = {
        jobTitle: expData?.jobTitle || "",
        company: expData?.company || "",
        location: expData?.location || "",
        timePeriod: expData?.timePeriod || "",
        description: expData?.description || "",
      };
    } else if (sectionType === "EDUCATION") {
      const eduData = values.content as EducationContent;
      content = {
        degree: eduData?.degree || "",
        institution: eduData?.institution || "",
        location: eduData?.location || "",
        timePeriod: eduData?.timePeriod || "",
        description: eduData?.description || "",
      };
    } else if (sectionType === "PROJECT") {
      const projData = values.content as ProjectContent;
      content = {
        name: projData?.name || "",
        description: projData?.description || "",
        url: projData?.url || "",
        github: projData?.github || "",
        technologies: projData?.technologies || "",
        timePeriod: projData?.timePeriod || "",
      };
    } else if (sectionType === "SKILL") {
      const skillData = values.content as SkillContent;
      content = {
        name: skillData?.name || "",
        proficiency: skillData?.proficiency || 0,
        category: skillData?.category || "",
        displayType: skillData?.displayType || "badge",
      };
    }

    actionFn({
      ...values,
      content: content as string | Record<string, unknown>,
    });
  };

  const renderContentForm = () => {
    if (sectionType === "SUMMARY") {
      return (
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Summary Content
              </FormLabel>
              <FormControl>
                <TextEditor
                  isLoading={isLoading}
                  value={typeof field.value === "string" ? field.value : ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <div className="h-0.5 -mt-2.5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      );
    }

    if (sectionType === "EXPERIENCE") {
      const content = (form.watch("content") as ExperienceContent) || {};
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Job Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Software Engineer"
                      value={content.jobTitle || ""}
                      onChange={(e) => {
                        form.setValue("content", {
                          ...content,
                          jobTitle: e.target.value,
                        });
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Company
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tech Company Inc."
                      value={content.company || ""}
                      onChange={(e) => {
                        form.setValue("content", {
                          ...content,
                          company: e.target.value,
                        });
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="New York, NY"
                    value={content.location || ""}
                    onChange={(e) => {
                      form.setValue("content", {
                        ...content,
                        location: e.target.value,
                      });
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Time Period
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jan 2020 - Present"
                    value={content.timePeriod || ""}
                    onChange={(e) => {
                      form.setValue("content", {
                        ...content,
                        timePeriod: e.target.value,
                      });
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Description
                </FormLabel>
                <FormControl>
                  <TextEditor
                    isLoading={isLoading}
                    value={content.description || ""}
                    onChange={(value) => {
                      form.setValue("content", {
                        ...content,
                        description: value,
                      });
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      );
    }

    if (sectionType === "EDUCATION") {
      const content = (form.watch("content") as EducationContent) || {};
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Degree
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bachelor of Science"
                      value={content.degree || ""}
                      onChange={(e) => {
                        form.setValue("content", {
                          ...content,
                          degree: e.target.value,
                        });
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Institution
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="University Name"
                      value={content.institution || ""}
                      onChange={(e) => {
                        form.setValue("content", {
                          ...content,
                          institution: e.target.value,
                        });
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="City, State"
                    value={content.location || ""}
                    onChange={(e) => {
                      form.setValue("content", {
                        ...content,
                        location: e.target.value,
                      });
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Time Period
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jan 2020 - Present"
                    value={content.timePeriod || ""}
                    onChange={(e) => {
                      form.setValue("content", {
                        ...content,
                        timePeriod: e.target.value,
                      });
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Description
                </FormLabel>
                <FormControl>
                  <TextEditor
                    isLoading={isLoading}
                    value={content.description || ""}
                    onChange={(value) => {
                      form.setValue("content", {
                        ...content,
                        description: value,
                      });
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      );
    }

    if (sectionType === "PROJECT") {
      const content = (form.watch("content") as ProjectContent) || {};
      return (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Project Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Name"
                    value={content.name || ""}
                    onChange={(e) => {
                      form.setValue("content", {
                        ...content,
                        name: e.target.value,
                      });
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Project URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      value={content.url || ""}
                      onChange={(e) => {
                        form.setValue("content", {
                          ...content,
                          url: e.target.value,
                        });
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    GitHub URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/user/repo"
                      value={content.github || ""}
                      onChange={(e) => {
                        form.setValue("content", {
                          ...content,
                          github: e.target.value,
                        });
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Technologies
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="React, TypeScript, Node.js"
                    value={content.technologies || ""}
                    onChange={(e) => {
                      form.setValue("content", {
                        ...content,
                        technologies: e.target.value,
                      });
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Time Period
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jan 2020 - Present"
                    value={content.timePeriod || ""}
                    onChange={(e) => {
                      form.setValue("content", {
                        ...content,
                        timePeriod: e.target.value,
                      });
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Description
                </FormLabel>
                <FormControl>
                  <TextEditor
                    isLoading={isLoading}
                    value={content.description || ""}
                    onChange={(value) => {
                      form.setValue("content", {
                        ...content,
                        description: value,
                      });
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      );
    }

    if (sectionType === "SKILL") {
      const content = (form.watch("content") as SkillContent) || {};
      return (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-foreground">
                  Skill Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="JavaScript"
                    value={content.name || ""}
                    onChange={(e) => {
                      form.setValue("content", {
                        ...content,
                        name: e.target.value,
                      });
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Programming Languages"
                      value={content.category || ""}
                      onChange={(e) => {
                        form.setValue("content", {
                          ...content,
                          category: e.target.value,
                        });
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Proficiency (0-100)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="85"
                      value={content.proficiency || ""}
                      onChange={(e) => {
                        form.setValue("content", {
                          ...content,
                          proficiency: parseInt(e.target.value) || 0,
                        });
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full bg-background">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-2.5 md:space-y-3 md:pt-4 px-1"
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full md:space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Section Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Custom Section Title"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="h-0.5 -mt-2.5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full md:space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Section Type
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value === "SUMMARY") {
                        form.setValue("content", "");
                      } else {
                        form.setValue("content", {});
                      }
                    }}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select section type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SUMMARY">Summary</SelectItem>
                      <SelectItem value="EXPERIENCE">Experience</SelectItem>
                      <SelectItem value="EDUCATION">Education</SelectItem>
                      <SelectItem value="PROJECT">Project</SelectItem>
                      <SelectItem value="SKILL">Skill</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="h-0.5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">{renderContentForm()}</div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-fit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
