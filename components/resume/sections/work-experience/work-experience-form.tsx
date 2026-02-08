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
import { WorkExperienceFormData } from "@/lib/validations/resume";
import { Loader2, Save } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export const WorkExperienceForm = ({
  form,
  actionFn,
  isLoading,
}: {
  form: UseFormReturn<WorkExperienceFormData>;
  actionFn: (values: WorkExperienceFormData) => void;
  isLoading: boolean;
}) => {
  return (
    <div className="w-full bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(actionFn)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Job Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senior Software Engineer"
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
                name="company"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Company
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tech Corp Inc."
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
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="San Francisco, CA or Remote"
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
                name="timePeriod"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Time Period
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jan 2020 - Feb 2025 or 12/23/2035 - 11/12/89"
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
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Role Description
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
          </div>

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
