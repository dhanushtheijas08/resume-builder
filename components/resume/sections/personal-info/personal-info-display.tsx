"use client";

import { GitHubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Profile } from "@prisma/client";
import { Edit2, Globe, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";

type PersonalInfoDisplayProps = {
  profile: Profile;
  onEditClick: () => void;
  showProfileImage?: boolean;
};

export const PersonalInfoDisplay = ({
  profile,
  onEditClick,
  showProfileImage = true,
}: PersonalInfoDisplayProps) => {
  return (
    <>
      <div className="border border-white/10 rounded-xl p-4 sm:p-5 bg-background/40 w-full">
        <div className="flex items-center gap-3 sm:gap-4">
          {showProfileImage && (
            <div className="size-12 sm:size-14 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 overflow-hidden mx-auto sm:mx-0">
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt={profile.name ?? "Profile photo"}
                  width={56}
                  height={56}
                  className="size-full object-cover"
                />
              ) : (
                <User className="size-6 sm:size-7 text-blue-500" />
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-white leading-snug truncate">
              {profile.name || "Your Name"}
            </h3>
            <p className="text-[11px] sm:text-xs text-white/40 mt-0.5">
              Personal Information
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onEditClick}
            className="shrink-0 h-8 px-2.5 text-xs text-white/60 hover:text-white hover:bg-white/10 rounded-lg gap-1.5"
          >
            <Edit2 className="size-3.5" />
            Edit
          </Button>
        </div>

        <div className="h-px bg-white/8 my-3 sm:my-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
          {profile.email && (
            <InfoRow icon={<Mail className="size-3.5" />}>
              {profile.email}
            </InfoRow>
          )}
          {profile.phoneNumber && (
            <InfoRow icon={<Phone className="size-3.5" />}>
              {profile.phoneNumber}
            </InfoRow>
          )}
          {profile.location && (
            <InfoRow icon={<MapPin className="size-3.5" />}>
              {profile.location}
            </InfoRow>
          )}
          {profile.linkedin && (
            <InfoRow icon={<LinkedinIcon className="size-3.5" />}>
              {profile.linkedin}
            </InfoRow>
          )}
          {profile.github && (
            <InfoRow icon={<GitHubIcon className="size-3.5" />}>
              {profile.github}
            </InfoRow>
          )}
          {profile.portfolio && (
            <InfoRow icon={<Globe className="size-3.5" />}>
              {profile.portfolio}
            </InfoRow>
          )}
        </div>
      </div>
    </>
  );
};

const InfoRow = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-2 min-w-0 group">
    <span className="shrink-0 flex items-center justify-center size-6 rounded-md text-white/90">
      {icon}
    </span>
    <span className="text-xs sm:text-[13px] text-white/90 truncate min-w-0 leading-tight">
      {children}
    </span>
  </div>
);
