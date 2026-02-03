import {
  createProfileAction,
  editProfileAction,
} from "@/lib/actions/resume-actions/personal-info-actions";
import {
  PersonalInfoFormData,
  personalInfoSchme,
} from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Profile } from "@prisma/client";

export const defaultValues: PersonalInfoFormData = {
  name: "",
  email: "",
  phoneNumber: "",
  location: "",
  designation: "",
  bio: "",
  linkedin: "",
  github: "",
  portfolio: "",
  profileImage: "",
};

export const usePersonalInfo = (
  profile: Profile | null,
  onSuccess?: () => void,
) => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const formDefaultValues = profile
    ? {
        name: profile.name || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        location: profile.location || "",
        designation: profile.designation || "",
        bio: profile.bio || "",
        linkedin: profile.linkedin || "",
        github: profile.github || "",
        portfolio: profile.portfolio || "",
        profileImage: profile.profileImage || "",
      }
    : defaultValues;

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchme),
    defaultValues: formDefaultValues,
  });

  const { execute: createProfile, status } = useAction(createProfileAction, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message ?? "Profile created successfully!");
        onSuccess?.();
      }
    },
    onError: ({ error }) => {
      const message =
        error.serverError?.message ||
        error.validationErrors?.formErrors?.[0] ||
        "Failed to save profile";
      toast.error(message);
    },
  });

  const { execute: editProfile, status: editStatus } = useAction(
    editProfileAction,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success(data.message ?? "Profile updated successfully!");
          onSuccess?.();
        }
      },
      onError: ({ error }) => {
        const message =
          error.serverError?.message ||
          error.validationErrors?.formErrors?.[0] ||
          "Failed to update profile";
        toast.error(message);
      },
    },
  );

  const savePersonalInfo = (values: PersonalInfoFormData) =>
    createProfile({ ...values, resumeId: resumeId });

  const updatePersonalInfo = (values: PersonalInfoFormData) =>
    editProfile({ id: profile?.id || "", ...values });

  const handleFormReset = (open: boolean) => {
    if (open && profile) {
      form.reset(formDefaultValues);
    } else if (open && !profile) {
      form.reset(defaultValues);
    }
  };

  return {
    form,
    savePersonalInfo,
    updatePersonalInfo,
    handleFormReset,
    isLoading: status === "executing" || editStatus === "executing",
  };
};
