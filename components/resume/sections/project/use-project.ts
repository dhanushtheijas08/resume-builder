import {
  createProjectAction,
  deleteProjectAction,
  editProjectAction,
} from "@/lib/actions/resume-actions/project-actions";
import { ProjectFormData, projectSchema } from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Project } from "@prisma/client";
import { useEffect } from "react";

export const defaultValues: ProjectFormData = {
  name: "",
  description: "",
  url: "",
  github: "",
  technologies: "",
  dateFormat: "MMM YYYY",
  startDate: "",
  endDate: "",
  isCurrent: false,
  order: 1,
};

export const useProject = (
  project: Project | null,
  maxOrder: number,
  onSuccess?: () => void,
) => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { ...defaultValues, order: maxOrder },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name || "",
        description: project.description || "",
        url: project.url || "",
        github: project.github || "",
        technologies: project.technologies?.join(", ") || "",
        dateFormat: "MMM YYYY" as const,
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        isCurrent: project.isCurrent || false,
        order: project.order || maxOrder,
      });
    } else {
      form.reset({ ...defaultValues, order: maxOrder });
    }
  }, [project, form, maxOrder]);

  const { execute: createProject, status } = useAction(createProjectAction, {
    onSuccess: ({ data }) => {
      if (data.success) {
        form.reset({ ...defaultValues, order: maxOrder });
        onSuccess?.();
        toast.success(data.message ?? "Project created successfully!");
      }
    },
    onError: ({ error }) => {
      const message =
        error.serverError?.message ||
        error.validationErrors?.formErrors?.[0] ||
        "Failed to create project";
      toast.error(message);
    },
  });

  const { execute: editProject, status: editStatus } = useAction(
    editProjectAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          onSuccess?.();
          toast.success(data.message ?? "Project updated successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to update project";
        toast.error(message);
      },
    },
  );

  const { execute: deleteProject, status: deleteStatus } = useAction(
    deleteProjectAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success(data.message ?? "Project deleted successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to delete project";
        toast.error(message);
      },
    },
  );

  const saveProject = (values: ProjectFormData) =>
    createProject({ ...values, resumeId: resumeId });

  const updateProject = (values: ProjectFormData) =>
    editProject({ id: project?.id || "", ...values });

  const removeProject = (id: string) => deleteProject({ id });

  return {
    form,
    saveProject,
    updateProject,
    removeProject,
    isLoading:
      status === "executing" ||
      editStatus === "executing" ||
      deleteStatus === "executing",
  };
};
