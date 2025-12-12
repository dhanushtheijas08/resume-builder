"use client";

import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import { useState } from "react";
import { EmptySection } from "../empty-section";
import { PersonalInfoDialog } from "./personal-info-dialog";
import { PersonalInfoDisplay } from "./personal-info-display";
import { Profile } from "@/app/generated/prisma/client";
import { usePersonalInfo } from "./use-personal-info";

export const PersonalInfo = ({
  profile,
  showProfileImage = true,
}: {
  profile: Profile | null;
  showProfileImage?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasData = !!profile;

  const {
    form,
    savePersonalInfo,
    updatePersonalInfo,
    handleFormReset,
    isLoading,
  } = usePersonalInfo(profile, () => setIsOpen(false));

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    handleFormReset(open);
  };

  return (
    <div className="space-y-4">
      {hasData && profile ? (
        <PersonalInfoDisplay
          profile={profile}
          showProfileImage={showProfileImage}
          onEditClick={() => handleOpenChange(true)}
        />
      ) : (
        <EmptySection
          title="No personal info added"
          description="Add your contact details to get started."
          icon={<User className="size-6 text-blue-500" />}
          iconContainerClassName="bg-blue-500/10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenChange(true)}
          >
            <Plus className="size-4 mr-2" />
            Add Personal Info
          </Button>
        </EmptySection>
      )}

      <PersonalInfoDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        form={form}
        actionFn={profile ? updatePersonalInfo : savePersonalInfo}
        isLoading={isLoading}
      />
    </div>
  );
};
