"use client";

import { CustomSectionFormData } from "@/lib/validations/resume";
import { FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResumeDialog } from "../resume-dialog";
import { CustomSectionForm } from "./custom-section-form";

type CustomSectionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<CustomSectionFormData>;
  actionFn: (values: CustomSectionFormData) => void;
  isLoading: boolean;
  isEditing?: boolean;
};

export const CustomSectionDialog = ({
  open,
  onOpenChange,
  form,
  actionFn,
  isLoading,
  isEditing = false,
}: CustomSectionDialogProps) => {
  return (
    <ResumeDialog
      title={isEditing ? "Edit Custom Section" : "Add Custom Section"}
      description={
        isEditing
          ? "Update your custom section details."
          : "Add a new custom section to your resume."
      }
      open={open}
      onOpenChange={onOpenChange}
      className="sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
      icon={<FileText className="size-5" />}
    >
      <CustomSectionForm
        form={form}
        actionFn={actionFn}
        isLoading={isLoading}
      />
    </ResumeDialog>
  );
};
