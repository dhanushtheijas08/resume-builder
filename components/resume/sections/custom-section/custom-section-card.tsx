"use client";

import { CustomSection } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
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

type CustomSectionCardProps = {
  customSection: CustomSection;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isDeleting?: boolean;
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "SUMMARY":
      return "Summary";
    case "EXPERIENCE":
      return "Experience";
    case "EDUCATION":
      return "Education";
    case "PROJECT":
      return "Project";
    case "SKILL":
      return "Skill";
    default:
      return type;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "SUMMARY":
      return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    case "EXPERIENCE":
      return "bg-purple-500/20 text-purple-500 border-purple-500/30";
    case "EDUCATION":
      return "bg-emerald-500/20 text-emerald-500 border-emerald-500/30";
    case "PROJECT":
      return "bg-cyan-500/20 text-cyan-500 border-cyan-500/30";
    case "SKILL":
      return "bg-orange-500/20 text-orange-500 border-orange-500/30";
    default:
      return "bg-gray-500/20 text-gray-500 border-gray-500/30";
  }
};

export const CustomSectionCard = ({
  customSection,
  onEditClick,
  onDeleteClick,
  isDeleting = false,
}: CustomSectionCardProps) => {
  const content = customSection.content;
  const previewText =
    typeof content === "string"
      ? content.replace(/<[^>]*>/g, "").substring(0, 100)
      : typeof content === "object" && content !== null
        ? JSON.stringify(content).substring(0, 100)
        : String(content).substring(0, 100);

  return (
    <div className="border rounded-lg p-4 sm:p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-semibold wrap-break-word">{customSection.title}</h3>
            <Badge
              variant="default"
              className={`${getTypeColor(customSection.type)} text-[10px] sm:text-xs px-2 py-0.5`}
            >
              {getTypeLabel(customSection.type)}
            </Badge>
          </div>

          <div className="text-xs sm:text-sm text-muted-foreground">
            {previewText}
            {previewText.length >= 100 && "..."}
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity mt-0 sm:mt-2.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onEditClick}
            disabled={isDeleting}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <Edit2 className="size-3.5 sm:size-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isDeleting}
                className="h-8 w-8 sm:h-9 sm:w-9 text-destructive hover:text-destructive"
              >
                <Trash2 className="size-3.5 sm:size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Custom Section</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this custom section? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:gap-0">
                <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDeleteClick}
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
  );
};
