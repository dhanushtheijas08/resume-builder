"use client";

import { Profile } from "@/app/generated/prisma/client";
import { GitHubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Button } from "@/components/ui/button";
import { Edit2, Globe, Mail, MapPin, Phone, User } from "lucide-react";

type PersonalInfoDisplayProps = {
  profile: Profile;
  onEditClick: () => void;
};

export const PersonalInfoDisplay = ({
  profile,
  onEditClick,
}: PersonalInfoDisplayProps) => {
  return (
    <div className="border rounded-lg p-5 bg-background/40">
      <div className="flex items-start gap-4 text-white/90">
        <div className="size-14 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
          <User className="size-7 text-blue-500" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">
                {profile.name || "Your Name"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Personal Information
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="shrink-0"
              onClick={onEditClick}
            >
              <Edit2 className="size-4 mr-2" />
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-4">
            {profile.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="size-4 text-muted-foreground shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
            )}
            {profile.phoneNumber && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-4 text-muted-foreground shrink-0" />
                <span className="truncate">{profile.phoneNumber}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="size-4 text-muted-foreground shrink-0" />
                <span className="truncate">{profile.location}</span>
              </div>
            )}
            {profile.linkedin && (
              <div className="flex items-center gap-2 text-sm">
                <LinkedinIcon className="size-5 text-muted-foreground shrink-0" />
                <span className="truncate">{profile.linkedin}</span>
              </div>
            )}
            {profile.github && (
              <div className="flex items-center gap-2 text-sm">
                <GitHubIcon className="size-4 text-muted-foreground shrink-0" />
                <span className="truncate">{profile.github}</span>
              </div>
            )}
            {profile.portfolio && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="size-4 text-muted-foreground shrink-0" />
                <span className="truncate">{profile.portfolio}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
