"use client";

import { CertificationFormData } from "@/lib/validations/resume";
import { Award } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResumeDialog } from "../resume-dialog";
import { CertificationForm } from "./certification-form";

type CertificationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<CertificationFormData>;
  actionFn: (values: CertificationFormData) => void;
  isLoading: boolean;
  isEditing?: boolean;
};

export const CertificationDialog = ({
  open,
  onOpenChange,
  form,
  actionFn,
  isLoading,
  isEditing = false,
}: CertificationDialogProps) => {
  return (
    <ResumeDialog
      title={isEditing ? "Edit Certification" : "Add Certification"}
      description={
        isEditing
          ? "Update your certification details."
          : "Add a new certification to showcase your credentials."
      }
      open={open}
      onOpenChange={onOpenChange}
      className="sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
      icon={<Award className="size-5" />}
    >
      <CertificationForm
        form={form}
        actionFn={actionFn}
        isLoading={isLoading}
      />
    </ResumeDialog>
  );
};

