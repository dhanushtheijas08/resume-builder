"use client";

import { EducationFormData } from "@/lib/validations/resume";
import { GraduationCap } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResumeDialog } from "../resume-dialog";
import { EducationForm } from "./education-form";

type EducationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<EducationFormData>;
  actionFn: (values: EducationFormData) => void;
  isLoading: boolean;
  isEditing?: boolean;
};

export const EducationDialog = ({
  open,
  onOpenChange,
  form,
  actionFn,
  isLoading,
  isEditing = false,
}: EducationDialogProps) => {
  return (
    <ResumeDialog
      title={isEditing ? "Edit Education" : "Add Education"}
      description={
        isEditing
          ? "Update your education details."
          : "Add a new education entry to your resume."
      }
      open={open}
      onOpenChange={onOpenChange}
      className="sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
      icon={<GraduationCap className="size-5" />}
    >
      <EducationForm form={form} actionFn={actionFn} isLoading={isLoading} />
    </ResumeDialog>
  );
};
