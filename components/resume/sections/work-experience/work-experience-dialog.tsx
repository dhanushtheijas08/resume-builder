"use client";

import { WorkExperienceFormData } from "@/lib/validations/resume";
import { Briefcase } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResumeDialog } from "../resume-dialog";
import { WorkExperienceForm } from "./work-experience-form";

type WorkExperienceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<WorkExperienceFormData>;
  actionFn: (values: WorkExperienceFormData) => void;
  isLoading: boolean;
  isEditing?: boolean;
};

export const WorkExperienceDialog = ({
  open,
  onOpenChange,
  form,
  actionFn,
  isLoading,
  isEditing = false,
}: WorkExperienceDialogProps) => {
  return (
    <ResumeDialog
      title={isEditing ? "Edit Work Experience" : "Add Work Experience"}
      description={
        isEditing
          ? "Update your work experience details."
          : "Add a new work experience to your resume."
      }
      open={open}
      onOpenChange={onOpenChange}
      className="md:max-w-2xl w-full max-h-[90vh] overflow-hidden md:overflow-y-auto md:custom-scrollbar"
      icon={<Briefcase className="size-5" />}
    >
      <WorkExperienceForm
        form={form}
        actionFn={actionFn}
        isLoading={isLoading}
      />
    </ResumeDialog>
  );
};
