"use client";

import { PersonalInfoFormData } from "@/lib/validations/resume";
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResumeDialog } from "../resume-dialog";
import { PersonalInfoForm } from "./personal-info-form";

type PersonalInfoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<PersonalInfoFormData>;
  actionFn: (values: PersonalInfoFormData) => void;
  isLoading: boolean;
};

export const PersonalInfoDialog = ({
  open,
  onOpenChange,
  form,
  actionFn,
  isLoading,
}: PersonalInfoDialogProps) => {
  return (
    <ResumeDialog
      title="Edit Personal Info"
      description="Add your contact details and professional summary."
      open={open}
      onOpenChange={onOpenChange}
      className="sm:max-w-2xl w-full max-h-[90vh]"
      icon={<User className="size-5" />}
    >
      <PersonalInfoForm form={form} actionFn={actionFn} isLoading={isLoading} />
    </ResumeDialog>
  );
};
