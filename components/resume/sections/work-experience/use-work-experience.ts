import {
  createWorkExperienceAction,
  deleteWorkExperienceAction,
  editWorkExperienceAction,
} from "@/lib/actions/resume-actions/work-experience-actions";
import {
  WorkExperienceFormData,
  workExperienceSchema,
} from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { WorkExperience } from "@prisma/client";
import { useEffect } from "react";

export const defaultValues: WorkExperienceFormData = {
  jobTitle: "",
  company: "",
  location: "",
  timePeriod: "",
  description: "",
  order: 1,
};

export const useWorkExperience = (
  workExperience: WorkExperience | null,
  maxOrder: number,
  onSuccess?: () => void,
) => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const form = useForm<WorkExperienceFormData>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: { ...defaultValues, order: maxOrder },
  });

  useEffect(() => {
    if (workExperience) {
      form.reset({
        jobTitle: workExperience.jobTitle || "",
        company: workExperience.company || "",
        location: workExperience.location || "",
        timePeriod: workExperience.timePeriod || "",
        description: workExperience.description || "",
        order: workExperience.order || maxOrder,
      });
    } else {
      form.reset({ ...defaultValues, order: maxOrder });
    }
  }, [workExperience, form, maxOrder]);

  const { execute: createWorkExperience, status } = useAction(
    createWorkExperienceAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          form.reset({ ...defaultValues, order: maxOrder });
          onSuccess?.();
          toast.success(
            data.message ?? "Work experience created successfully!",
          );
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to create work experience";
        toast.error(message);
      },
    },
  );

  const { execute: editWorkExperience, status: editStatus } = useAction(
    editWorkExperienceAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          onSuccess?.();
          toast.success(
            data.message ?? "Work experience updated successfully!",
          );
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to update work experience";
        toast.error(message);
      },
    },
  );

  const { execute: deleteWorkExperience, status: deleteStatus } = useAction(
    deleteWorkExperienceAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success(
            data.message ?? "Work experience deleted successfully!",
          );
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to delete work experience";
        toast.error(message);
      },
    },
  );

  const saveWorkExperience = (values: WorkExperienceFormData) =>
    createWorkExperience({ ...values, resumeId: resumeId });

  const updateWorkExperience = (values: WorkExperienceFormData) =>
    editWorkExperience({ id: workExperience?.id || "", ...values });

  const removeWorkExperience = (id: string) => deleteWorkExperience({ id });

  return {
    form,
    saveWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    isLoading:
      status === "executing" ||
      editStatus === "executing" ||
      deleteStatus === "executing",
  };
};
