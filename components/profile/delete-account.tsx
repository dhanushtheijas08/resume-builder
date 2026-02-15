"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteUserAction } from "@/lib/actions/auth-actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { SettingsCard } from "./settings-card";

export function DeleteAccount() {
  const { execute, isExecuting } = useAction(deleteUserAction, {
    onSuccess: (data) => {
      if (data.data?.success) {
        toast.success(data.data.message);
      }
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  return (
    <SettingsCard
      title="Danger Zone"
      description="Permanently delete your account and all of your content."
      danger
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          This action is not reversible. Please be certain.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => execute()}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={isExecuting}
              >
                {isExecuting ? "Deleting..." : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SettingsCard>
  );
}
