"use client";

import { Button } from "@/components/ui/button";
import { Trophy, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { EmptySection } from "../empty-section";
import { useAward } from "./use-award";
import { AwardDialog } from "./award-dialog";
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

export const AwardSection = ({ awards }: { awards: string | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { form, saveAward, updateAward, removeAward, isLoading } = useAward(
    awards,
    () => {
      setIsOpen(false);
    }
  );

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleEditClick = () => {
    handleOpenChange(true);
  };

  const handleDeleteClick = () => {
    removeAward();
  };

  return (
    <div className="space-y-4">
      {awards ? (
        <div className="border rounded-lg p-5 bg-background/40 hover:bg-background/60 transition-colors group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <div
                  className="text-sm text-muted-foreground leading-relaxed flex-1"
                  dangerouslySetInnerHTML={{
                    __html: awards,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 group-hover:opacity-100 opacity-0 transition-opacity">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleEditClick}
                disabled={isLoading}
              >
                <Edit2 className="size-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={isLoading}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Awards / Achievements
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete all awards and
                      achievements? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteClick}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ) : (
        <EmptySection
          title="No awards / achievements added"
          description="Add your awards and achievements."
          icon={<Trophy className="size-6 text-amber-500" />}
          iconContainerClassName="bg-amber-500/10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditClick}
            disabled={isLoading}
          >
            <Edit2 className="size-4 mr-2" />
            Add Awards
          </Button>
        </EmptySection>
      )}

      <AwardDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        form={form}
        actionFn={awards ? updateAward : saveAward}
        isLoading={isLoading}
        isEditing={!!awards}
      />
    </div>
  );
};
