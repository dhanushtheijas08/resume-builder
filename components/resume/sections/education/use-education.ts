import {
  createEducationAction,
  deleteEducationAction,
  editEducationAction,
} from "@/lib/actions/resume-actions/education-actions";
import { EducationFormData, educationSchema } from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Education } from "@prisma/client";
import { useEffect } from "react";

export const defaultValues: EducationFormData = {
  order: 1,
  degree: "",
  institution: "",
  location: "",
  dateFormat: "MMM YYYY",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
};

export const useEducation = (
  education: Education | null,
  maxOrder: number,
  onSuccess?: () => void,
) => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: { ...defaultValues, order: maxOrder },
  });

  useEffect(() => {
    if (education) {
      form.reset({
        degree: education.degree || "",
        institution: education.institution || "",
        location: education.location || "",
        dateFormat: "MMM YYYY" as const,
        startDate: education.startDate || "",
        endDate: education.endDate || "",
        isCurrent: education.isCurrent || false,
        description: education.description || "",
        order: education.order || maxOrder,
      });
    } else {
      form.reset({ ...defaultValues, order: maxOrder });
    }
  }, [education, form, maxOrder]);

  const { execute: createEducation, status } = useAction(
    createEducationAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          form.reset({ ...defaultValues, order: maxOrder });
          onSuccess?.();
          toast.success(data.message ?? "Education created successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to create education";
        toast.error(message);
      },
    },
  );

  const { execute: editEducation, status: editStatus } = useAction(
    editEducationAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          onSuccess?.();
          toast.success(data.message ?? "Education updated successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to update education";
        toast.error(message);
      },
    },
  );

  const { execute: deleteEducation, status: deleteStatus } = useAction(
    deleteEducationAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success(data.message ?? "Education deleted successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to delete education";
        toast.error(message);
      },
    },
  );

  const saveEducation = (values: EducationFormData) =>
    createEducation({ ...values, resumeId: resumeId });

  const updateEducation = (values: EducationFormData) =>
    editEducation({ id: education?.id || "", ...values });

  const removeEducation = (id: string) => deleteEducation({ id });

  return {
    form,
    saveEducation,
    updateEducation,
    removeEducation,
    isLoading:
      status === "executing" ||
      editStatus === "executing" ||
      deleteStatus === "executing",
  };
};
