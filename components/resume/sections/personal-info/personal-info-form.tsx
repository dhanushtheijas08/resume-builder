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
import { PersonalInfoFormData } from "@/lib/validations/resume";
import { Save } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
export const PersonalInfoForm = ({
  form,
  actionFn,
  isLoading,
}: {
  form: UseFormReturn<PersonalInfoFormData>;
  actionFn: (values: PersonalInfoFormData) => void;
  isLoading: boolean;
}) => {
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(actionFn)} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ram Kumar"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="h-2.5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ram@example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="h-2.5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1 (555) 123-4567"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="h-2.5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="San Francisco, CA"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="h-2.5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="linkedin.com/in/username"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="h-2.5">
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
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="github.com/username"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="h-2.5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="yourwebsite.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="h-2.5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Summary</FormLabel>
                <FormControl>
                  <TextEditor
                    isLoading={isLoading}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="h-2.5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="w-fit" disabled={isLoading}>
              <Save className="size-4" />
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
