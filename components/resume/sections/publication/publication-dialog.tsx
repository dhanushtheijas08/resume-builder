"use client";

import { PublicationFormData } from "@/lib/validations/resume";
import { BookOpen } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResumeDialog } from "../resume-dialog";
import { PublicationForm } from "./publication-form";

type PublicationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<PublicationFormData>;
  actionFn: (values: PublicationFormData) => void;
  isLoading: boolean;
  isEditing?: boolean;
};

export const PublicationDialog = ({
  open,
  onOpenChange,
  form,
  actionFn,
  isLoading,
  isEditing = false,
}: PublicationDialogProps) => {
  return (
    <ResumeDialog
      title={isEditing ? "Edit Publication" : "Add Publication"}
      description={
        isEditing
          ? "Update your publication details."
          : "Add a new publication to showcase your research and writing."
      }
      open={open}
      onOpenChange={onOpenChange}
      className="md:max-w-2xl w-full max-h-[90vh] overflow-hidden md:overflow-y-auto md:custom-scrollbar"
      icon={<BookOpen className="size-5" />}
    >
      <PublicationForm form={form} actionFn={actionFn} isLoading={isLoading} />
    </ResumeDialog>
  );
};
