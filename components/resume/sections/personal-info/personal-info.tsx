"use client";
import { useState } from "react";
import { GitHubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Button } from "@/components/ui/button";
import { Edit2, Globe, Mail, MapPin, Phone, Plus, User } from "lucide-react";
import { ResumeDialog } from "../resume-dialog";
import { PersonalInfoForm } from "./personal-info-form";

export const PersonalInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hasData = true;
  const personalInfo = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
    website: "yourwebsite.com",
  };
  const savePersonalInfo = () => {
    console.log("savePersonalInfo");
  };

  return (
    <div className="space-y-4">
      {hasData ? (
        <div className="border rounded-lg p-5 bg-background/40 ">
          <div className="flex items-start gap-4 text-white/90">
            <div className="size-14 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <User className="size-7 text-blue-500" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {personalInfo.fullName || "Your Name"}
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
                  onClick={() => setIsOpen(true)}
                >
                  <Edit2 className="size-4 mr-2" />
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-4">
                {personalInfo.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="size-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="size-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="size-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2 text-sm">
                    <LinkedinIcon className="size-5 text-muted-foreground shrink-0" />
                    <span className="truncate">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-2 text-sm">
                    <GitHubIcon className="size-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{personalInfo.github}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="size-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
          <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <User className="size-6 text-muted-foreground" />
          </div>
          <h4 className="font-medium mb-1">No personal info added</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Add your contact details to get started.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="size-4 mr-2" />
            Add Personal Info
          </Button>
        </div>
      )}

      <ResumeDialog
        title="Edit Personal Info"
        description="Add your contact details and professional summary."
        open={isOpen}
        onOpenChange={setIsOpen}
        actionFn={savePersonalInfo}
        className="sm:max-w-2xl w-full max-h-[90vh]"
        icon={<User className="size-5" />}
      >
        <PersonalInfoForm />
      </ResumeDialog>
    </div>
  );
};
