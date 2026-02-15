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
import { Award } from "@prisma/client";

export const AwardSection = ({ awards }: { awards: Award | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { form, saveAward, updateAward, removeAward, isLoading } = useAward(
    awards,
    () => {
      setIsOpen(false);
    },
  );

  const openAwardDialog = (open: boolean) => {
    setIsOpen(open);
  };

  const editAward = () => {
    openAwardDialog(true);
  };

  function truncateHtml(html: string, maxLength: number): string {
    const plainText = html.replace(/<[^>]*>/g, "");

    if (plainText.length <= maxLength) return html;

    let visibleCount = 0;
    let i = 0;
    let result = "";

    while (i < html.length && visibleCount < maxLength) {
      if (html[i] === "<") {
        const closeIndex = html.indexOf(">", i);
        if (closeIndex === -1) break;
        result += html.slice(i, closeIndex + 1);
        i = closeIndex + 1;
      } else {
        result += html[i];
        visibleCount++;
        i++;
      }
    }

    return result + "...";
  }

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
                    __html: truncateHtml(awards.description, 250),
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity mt-0 sm:mt-2.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={editAward}
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
                      onClick={removeAward}
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
            onClick={editAward}
            disabled={isLoading}
          >
            <Edit2 className="size-4 mr-2" />
            Add Awards
          </Button>
        </EmptySection>
      )}

      <AwardDialog
        open={isOpen}
        onOpenChange={openAwardDialog}
        form={form}
        actionFn={awards ? updateAward : saveAward}
        isLoading={isLoading}
        isEditing={!!awards}
      />
    </div>
  );
};
