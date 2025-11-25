"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeStore, PersonalInfo } from "@/lib/store/resume-store";
import { RichTextEditor } from "../editor/rich-text-editor";
import {
  Edit2,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plus,
  User,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PersonalInfoSection() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo);

  const handleOpen = () => {
    setFormData(personalInfo);
    setIsOpen(true);
  };

  const handleSave = () => {
    updatePersonalInfo(formData);
    setIsOpen(false);
  };

  const handleChange = (
    field: Exclude<keyof PersonalInfo, "summary">,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const hasData = personalInfo.fullName || personalInfo.email;

  return (
    <div className="space-y-4">
      {hasData ? (
        <div className="border rounded-lg p-5 bg-card">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="size-14 rounded-full bg-muted flex items-center justify-center shrink-0">
              <User className="size-7 text-muted-foreground" />
            </div>

            {/* Info */}
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
                  onClick={handleOpen}
                  className="shrink-0"
                >
                  <Edit2 className="size-4 mr-2" />
                  Edit
                </Button>
              </div>

              {/* Contact Grid */}
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
                    <Linkedin className="size-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-2 text-sm">
                    <Github className="size-4 text-muted-foreground shrink-0" />
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
          <Button type="button" variant="outline" size="sm" onClick={handleOpen}>
            <Plus className="size-4 mr-2" />
            Add Personal Info
          </Button>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="size-5" />
              {hasData ? "Edit Personal Information" : "Add Personal Information"}
            </DialogTitle>
            <DialogDescription>
              {hasData
                ? "Update your personal details that will appear on your resume."
                : "Add your contact details and professional summary."}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin || ""}
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={formData.github || ""}
                    onChange={(e) => handleChange("github", e.target.value)}
                    placeholder="github.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website || ""}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="yourwebsite.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <RichTextEditor
                  content={formData.summary}
                  onChange={(content) =>
                    setFormData((prev) => ({ ...prev, summary: content }))
                  }
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
