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
import { EducationFormData } from "@/lib/validations/resume";
import { Save, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DateRangePicker } from "../work-experience/date-range-picker";

export const EducationForm = ({
  form,
  actionFn,
  isLoading,
}: {
  form: UseFormReturn<EducationFormData>;
  actionFn: (values: EducationFormData) => void;
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
                name="degree"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Degree
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bachelor of Science in Computer Science"
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
                name="institution"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Institution
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="University of Technology"
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
                        placeholder="New York, NY or Remote"
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
                name="startDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Study Period
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
                        currentLabel="I'm currently studying here"
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
                    Description
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
