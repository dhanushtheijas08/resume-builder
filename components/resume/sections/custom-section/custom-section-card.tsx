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
    <div className="border rounded-lg p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{customSection.title}</h3>
            <Badge
              variant="default"
              className={getTypeColor(customSection.type)}
            >
              {getTypeLabel(customSection.type)}
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            {previewText}
            {previewText.length >= 100 && "..."}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 group-hover:opacity-100 opacity-0 transition-opacity mt-2.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onEditClick}
            disabled={isDeleting}
          >
            <Edit2 className="size-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isDeleting}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Custom Section</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this custom section? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
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
