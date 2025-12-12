"use client";

import { GitHubIcon } from "@/components/icons/github";
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
import { ProjectFormData } from "@/lib/validations/resume";
import { Calendar, Code2, Globe, Loader2, Save } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DateRangePicker } from "../work-experience/date-range-picker";

export const ProjectForm = ({
  form,
  actionFn,
  isLoading,
}: {
  form: UseFormReturn<ProjectFormData>;
  actionFn: (values: ProjectFormData) => void;
  isLoading: boolean;
}) => {
  return (
    <div className="w-full bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(actionFn)} className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Project Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E-commerce Platform"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="h-0.5 -mt-1">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Code2 className="size-4" />
                      Technologies Used
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="React, Node.js, TypeScript (comma separated)"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Globe className="size-4" />
                      Live URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://yourproject.com"
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
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <GitHubIcon className="size-4" />
                      GitHub Repository
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/repo"
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
            </div>

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Calendar className="size-4" />
                    Project Timeline
                  </FormLabel>
                  <FormControl>
                    <DateRangePicker
                      startDate={field.value}
                      endDate={form.watch("endDate") || ""}
                      isCurrent={form.watch("isCurrent")}
                      dateFormat={form.watch("dateFormat") || "MMM YYYY"}
                      onDateFormatChange={(format) => {
                        form.setValue("dateFormat", format);
                      }}
                      onChange={(data) => {
                        form.setValue("startDate", data.startDate);
                        form.setValue("endDate", data.endDate);
                        form.setValue("isCurrent", data.isCurrent);
                      }}
                      disabled={isLoading}
                      currentLabel="This is an ongoing project"
                    />
                  </FormControl>
                  <div className="h-0.5 -mt-2.5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Project Description
                </FormLabel>
                <FormControl>
                  <TextEditor
                    isLoading={isLoading}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="h-0.5 -mt-2.5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end">
            <Button type="submit" disabled={isLoading} className="w-fit">
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
