import {
  createCustomSectionAction,
  deleteCustomSectionAction,
  editCustomSectionAction,
} from "@/lib/actions/resume-actions/custom-section-actions";
import {
  CustomSectionFormData,
  customSectionSchema,
} from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CustomSection } from "@prisma/client";
import { useEffect } from "react";

export const defaultValues: CustomSectionFormData = {
  title: "",
  type: "SUMMARY",
  order: 1,
  content: "",
};

export const useCustomSection = (
  customSection: CustomSection | null,
  maxOrder: number,
  onSuccess?: () => void,
) => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const form = useForm<CustomSectionFormData>({
    resolver: zodResolver(customSectionSchema),
    defaultValues: { ...defaultValues, order: maxOrder },
  });

  useEffect(() => {
    if (customSection) {
      form.reset({
        title: customSection.title || "",
        type: customSection.type as
          | "SUMMARY"
          | "EXPERIENCE"
          | "EDUCATION"
          | "PROJECT"
          | "SKILL",
        order: customSection.order || maxOrder,
        content: customSection.content,
      });
    } else {
      form.reset({ ...defaultValues, order: maxOrder });
    }
  }, [customSection, form, maxOrder]);

  const { execute: createCustomSection, status } = useAction(
    createCustomSectionAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          form.reset({ ...defaultValues, order: maxOrder });
          onSuccess?.();
          toast.success(data.message ?? "Custom section created successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to create custom section";
        toast.error(message);
      },
    },
  );

  const { execute: editCustomSection, status: editStatus } = useAction(
    editCustomSectionAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          onSuccess?.();
          toast.success(data.message ?? "Custom section updated successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to update custom section";
        toast.error(message);
      },
    },
  );

  const { execute: deleteCustomSection, status: deleteStatus } = useAction(
    deleteCustomSectionAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success(data.message ?? "Custom section deleted successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to delete custom section";
        toast.error(message);
      },
    },
  );

  const saveCustomSection = (values: CustomSectionFormData) =>
    createCustomSection({ ...values, resumeId: resumeId });

  const updateCustomSection = (values: CustomSectionFormData) =>
    editCustomSection({ id: customSection?.id || "", ...values });

  const removeCustomSection = (id: string) => deleteCustomSection({ id });

  return {
    form,
    saveCustomSection,
    updateCustomSection,
    removeCustomSection,
    isLoading:
      status === "executing" ||
      editStatus === "executing" ||
      deleteStatus === "executing",
  };
};
