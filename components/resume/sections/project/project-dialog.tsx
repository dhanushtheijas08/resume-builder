"use client";

import { ProjectFormData } from "@/lib/validations/resume";
import { FolderKanban } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResumeDialog } from "../resume-dialog";
import { ProjectForm } from "./project-form";

type ProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<ProjectFormData>;
  actionFn: (values: ProjectFormData) => void;
  isLoading: boolean;
  isEditing?: boolean;
};

export const ProjectDialog = ({
  open,
  onOpenChange,
  form,
  actionFn,
  isLoading,
  isEditing = false,
}: ProjectDialogProps) => {
  return (
    <ResumeDialog
      title={isEditing ? "Edit Project" : "Add Project"}
      description={
        isEditing
          ? "Update your project details."
          : "Add a new project to showcase your work."
      }
      open={open}
      onOpenChange={onOpenChange}
      className="md:max-w-2xl w-full max-h-[90vh] overflow-hidden md:overflow-y-auto md:custom-scrollbar"
      icon={<FolderKanban className="size-5" />}
    >
      <ProjectForm form={form} actionFn={actionFn} isLoading={isLoading} />
    </ResumeDialog>
  );
};
