import {
  createCertificationAction,
  deleteCertificationAction,
  editCertificationAction,
} from "@/lib/actions/resume-actions/certification-actions";
import {
  CertificationFormData,
  certificationSchema,
} from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Certification } from "@prisma/client";
import { useEffect } from "react";

export const defaultValues: CertificationFormData = {
  order: 1,
  title: "",
  issuer: "",
  credentialUrl: "",
  description: "",
};

export const useCertification = (
  certification: Certification | null,
  maxOrder: number,
  onSuccess?: () => void,
) => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const form = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: { ...defaultValues, order: maxOrder },
  });

  useEffect(() => {
    if (certification) {
      form.reset({
        title: certification.title || "",
        issuer: certification.issuer || "",
        credentialUrl: certification.credentialUrl || "",
        description: certification.description || "",
        order: certification.order || maxOrder,
      });
    } else {
      form.reset({ ...defaultValues, order: maxOrder });
    }
  }, [certification, form, maxOrder]);

  const { execute: createCertification, status } = useAction(
    createCertificationAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          form.reset({ ...defaultValues, order: maxOrder });
          onSuccess?.();
          toast.success(data.message ?? "Certification created successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to create certification";
        toast.error(message);
      },
    },
  );

  const { execute: editCertification, status: editStatus } = useAction(
    editCertificationAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          onSuccess?.();
          toast.success(data.message ?? "Certification updated successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to update certification";
        toast.error(message);
      },
    },
  );

  const { execute: deleteCertification, status: deleteStatus } = useAction(
    deleteCertificationAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success(data.message ?? "Certification deleted successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to delete certification";
        toast.error(message);
      },
    },
  );

  const saveCertification = (values: CertificationFormData) =>
    createCertification({ ...values, resumeId: resumeId });

  const updateCertification = (values: CertificationFormData) =>
    editCertification({ id: certification?.id || "", ...values });

  const removeCertification = (id: string) => deleteCertification({ id });

  return {
    form,
    saveCertification,
    updateCertification,
    removeCertification,
    isLoading:
      status === "executing" ||
      editStatus === "executing" ||
      deleteStatus === "executing",
  };
};
