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
import { AwardFormData } from "@/lib/validations/resume";
import { Save, Loader2, Trophy } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export const AwardForm = ({
  form,
  actionFn,
  isLoading,
}: {
  form: UseFormReturn<AwardFormData>;
  actionFn: (values: AwardFormData) => void;
  isLoading: boolean;
}) => {
  return (
    <div className="w-full bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(actionFn)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
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
