import {
  createPublicationAction,
  deletePublicationAction,
  editPublicationAction,
} from "@/lib/actions/resume-actions/publication-actions";
import {
  PublicationFormData,
  publicationSchema,
} from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Publication } from "@/app/generated/prisma/client";
import { useEffect } from "react";

export const defaultValues: PublicationFormData = {
  order: 1,
  title: "",
  publisher: "",
  url: "",
  summary: "",
};

export const usePublication = (
  publication: Publication | null,
  maxOrder: number,
  onSuccess?: () => void
) => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const form = useForm<PublicationFormData>({
    resolver: zodResolver(publicationSchema),
    defaultValues: { ...defaultValues, order: maxOrder },
  });

  useEffect(() => {
    if (publication) {
      form.reset({
        title: publication.title || "",
        publisher: publication.publisher || "",
        url: publication.url || "",
        summary: publication.summary || "",
        order: publication.order || maxOrder,
      });
    } else {
      form.reset({ ...defaultValues, order: maxOrder });
    }
  }, [publication, form, maxOrder]);

  const { execute: createPublication, status } = useAction(
    createPublicationAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          form.reset({ ...defaultValues, order: maxOrder });
          onSuccess?.();
          toast.success(data.message ?? "Publication created successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to create publication";
        toast.error(message);
      },
    }
  );

  const { execute: editPublication, status: editStatus } = useAction(
    editPublicationAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          onSuccess?.();
          toast.success(data.message ?? "Publication updated successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to update publication";
        toast.error(message);
      },
    }
  );

  const { execute: deletePublication, status: deleteStatus } = useAction(
    deletePublicationAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success(data.message ?? "Publication deleted successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to delete publication";
        toast.error(message);
      },
    }
  );

  const savePublication = (values: PublicationFormData) =>
    createPublication({ ...values, resumeId: resumeId });

  const updatePublication = (values: PublicationFormData) =>
    editPublication({ id: publication?.id || "", ...values });

  const removePublication = (id: string) => deletePublication({ id });

  return {
    form,
    savePublication,
    updatePublication,
    removePublication,
    isLoading:
      status === "executing" ||
      editStatus === "executing" ||
      deleteStatus === "executing",
  };
};
