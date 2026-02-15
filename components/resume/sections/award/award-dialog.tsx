"use client";

import { AwardFormData } from "@/lib/validations/resume";
import { Trophy } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResumeDialog } from "../resume-dialog";
import { AwardForm } from "./award-form";

type AwardDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<AwardFormData>;
  actionFn: (values: AwardFormData) => void;
  isLoading: boolean;
  isEditing?: boolean;
};

export const AwardDialog = ({
  open,
  onOpenChange,
  form,
  actionFn,
  isLoading,
  isEditing = false,
}: AwardDialogProps) => {
  return (
    <ResumeDialog
      title={
        isEditing ? "Edit Awards / Achievements" : "Add Awards / Achievements"
      }
      description={
        isEditing
          ? "Update your awards and achievements. Use bullet points to list multiple items."
          : "Add your awards and achievements. You can use bullet points to list multiple items in a single field."
      }
      open={open}
      onOpenChange={onOpenChange}
      className="md:max-w-2xl w-full max-h-[90vh] overflow-hidden md:overflow-y-auto md:custom-scrollbar"
      icon={<Trophy className="size-5" />}
    >
      <AwardForm form={form} actionFn={actionFn} isLoading={isLoading} />
    </ResumeDialog>
  );
};
