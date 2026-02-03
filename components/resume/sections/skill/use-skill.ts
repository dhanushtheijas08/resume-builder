import {
  createSkillAction,
  deleteSkillAction,
  editSkillAction,
} from "@/lib/actions/resume-actions/skill-actions";
import { SkillFormData, skillSchema } from "@/lib/validations/resume";
import { Skill } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { z } from "zod";

export const defaultValues: SkillFormData = {
  name: "",
  proficiency: undefined,
  category: undefined,
  displayType: "badge",
};

export const useSkill = (skill: Skill | null, onSuccess?: () => void) => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const form = useForm<z.input<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues,
  });

  useEffect(() => {
    if (skill) {
      form.reset({
        name: skill.name || "",
        proficiency: skill.proficiency ?? undefined,
        category: skill.category ?? undefined,
        displayType:
          (skill.displayType as "badge" | "progress" | "category") || "badge",
      });
    } else {
      form.reset(defaultValues);
    }
  }, [skill, form]);

  const { execute: createSkill, status } = useAction(createSkillAction, {
    onSuccess: ({ data }) => {
      if (data.success) {
        form.reset(defaultValues);
        onSuccess?.();
        toast.success(data.message ?? "Skill created successfully!");
      }
    },
    onError: ({ error }) => {
      const message =
        error.serverError?.message ||
        error.validationErrors?.formErrors?.[0] ||
        "Failed to create skill";
      toast.error(message);
    },
  });

  const { execute: editSkill, status: editStatus } = useAction(
    editSkillAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          onSuccess?.();
          toast.success(data.message ?? "Skill updated successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to update skill";
        toast.error(message);
      },
    },
  );

  const { execute: deleteSkill, status: deleteStatus } = useAction(
    deleteSkillAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success(data.message ?? "Skill deleted successfully!");
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to delete skill";
        toast.error(message);
      },
    },
  );

  const saveSkill = (values: SkillFormData) =>
    createSkill({ ...values, resumeId: resumeId });

  const updateSkill = (values: SkillFormData) =>
    editSkill({ id: skill?.id || "", ...values });

  const removeSkill = (id: string) => deleteSkill({ id });

  return {
    form,
    saveSkill,
    updateSkill,
    removeSkill,
    isLoading:
      status === "executing" ||
      editStatus === "executing" ||
      deleteStatus === "executing",
  };
};
