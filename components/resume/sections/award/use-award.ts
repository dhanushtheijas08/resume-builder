import {
  upsertAwardAction,
  deleteAwardAction,
} from "@/lib/actions/resume-actions/award-actions";
import { AwardFormData, awardSchema } from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { Award } from "@/app/generated/prisma/client";

export const defaultValues: AwardFormData = {
  description: "",
};

export const useAward = (awards: Award | null, onSuccess?: () => void) => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const form = useForm<AwardFormData>({
    resolver: zodResolver(awardSchema),
    defaultValues: { ...defaultValues },
  });

  useEffect(() => {
    if (awards) {
      form.reset({
        description: awards.description || "",
      });
    } else {
      form.reset({ ...defaultValues });
    }
  }, [awards, form]);

  const { execute: upsertAward, status: upsertStatus } = useAction(
    upsertAwardAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          form.reset({ ...defaultValues });
          onSuccess?.();
          toast.success(data.message ?? "Awards saved successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to save awards";
        toast.error(message);
      },
    }
  );

  const { execute: deleteAward, status: deleteStatus } = useAction(
    deleteAwardAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success(data.message ?? "Awards deleted successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to delete awards";
        toast.error(message);
      },
    }
  );

  const saveAward = (values: AwardFormData) =>
    upsertAward({ ...values, resumeId: resumeId });

  const updateAward = (values: AwardFormData) =>
    upsertAward({ ...values, resumeId: resumeId });

  const removeAward = () => deleteAward({ resumeId: resumeId });

  return {
    form,
    saveAward,
    updateAward,
    removeAward,
    isLoading: upsertStatus === "executing" || deleteStatus === "executing",
  };
};
