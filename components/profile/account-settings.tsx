"use client";

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
  changePasswordAction,
  updateUserAction,
} from "@/lib/actions/auth-actions";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SettingsCard } from "./settings-card";
import { accountSettingsSchema } from "@/lib/validations/auth";

export function AccountSettings() {
  const { data: session } = authClient.useSession();
  const { executeAsync, isExecuting } = useAction(updateUserAction);
  const {
    executeAsync: executePasswordAsync,
    isExecuting: isChangingPassword,
  } = useAction(changePasswordAction);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof accountSettingsSchema>>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      name: session?.user?.name || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    form.setValue("name", session?.user?.name || "");
  }, [form, session?.user?.name]);

  async function onSubmit(values: z.infer<typeof accountSettingsSchema>) {
    const currentName = (session?.user?.name || "").trim();
    const nextName = values.name.trim();
    const wantsPasswordChange = [
      values.currentPassword,
      values.newPassword,
      values.confirmPassword,
    ].some((value) => value.length > 0);
    const hasNameChange = nextName !== currentName;

    if (!hasNameChange && !wantsPasswordChange) {
      toast.message("No changes to save");
      return;
    }

    setIsSaving(true);

    let profileUpdated = false;
    let passwordUpdated = false;

    try {
      if (hasNameChange) {
        const result = await executeAsync({ name: nextName });
        if (!result.data?.success) {
          throw new Error("Failed to update profile");
        }
        profileUpdated = true;
      }

      if (wantsPasswordChange) {
        const passwordResult = await executePasswordAsync({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        });

        if (!passwordResult.data?.success) {
          throw new Error("Failed to change password");
        }

        passwordUpdated = true;
      }

      form.reset({
        name: nextName,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      if (profileUpdated && passwordUpdated) {
        toast.success("Profile and password updated successfully");
        window.location.href = "/login";
      } else if (profileUpdated) {
        toast.success("Profile updated successfully");
      } else if (passwordUpdated) {
        toast.success("Password updated. Please log in again.");
        window.location.href = "/login";
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to save account settings";

      if (profileUpdated && wantsPasswordChange) {
        toast.error(`${message}. Profile changes were saved.`);
      } else {
        toast.error(message);
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <SettingsCard
      title="Account Settings"
      description="Update your profile and password with one save action."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSaving || isExecuting || isChangingPassword}
            >
              {isSaving || isExecuting || isChangingPassword
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </SettingsCard>
  );
}
