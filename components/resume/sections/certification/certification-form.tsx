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
import { CertificationFormData } from "@/lib/validations/resume";
import { Save, Loader2, Award, Link2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export const CertificationForm = ({
  form,
  actionFn,
  isLoading,
}: {
  form: UseFormReturn<CertificationFormData>;
  actionFn: (values: CertificationFormData) => void;
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
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Certification Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="AWS Certified Solutions Architect"
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
                name="issuer"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Award className="size-4" />
                      Issuer
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Amazon Web Services"
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
              name="credentialUrl"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Link2 className="size-4" />
                    Credential URL (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/credential"
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

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Description (Optional)
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

