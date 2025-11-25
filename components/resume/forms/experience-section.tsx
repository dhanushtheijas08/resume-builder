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
import {
  useResumeStore,
  Experience,
  createEmptyExperience,
} from "@/lib/store/resume-store";
import { RichTextEditor } from "../editor/rich-text-editor";
import {
  Briefcase,
  Building2,
  Calendar,
  Edit2,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function ExperienceSection() {
  const { resumeData, removeExperience } = useResumeStore();
  const { experiences } = resumeData;
  const [isOpen, setIsOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [formData, setFormData] = useState<Experience>(createEmptyExperience());

  const handleAdd = () => {
    setEditingExperience(null);
    setFormData(createEmptyExperience());
    setIsOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({ ...experience });
    setIsOpen(true);
  };

  const handleSave = () => {
    const { setExperience, resumeData } = useResumeStore.getState();

    if (editingExperience) {
      setExperience(editingExperience.id, formData);
    } else {
      useResumeStore.setState({
        resumeData: {
          ...resumeData,
          experiences: [...resumeData.experiences, formData],
        },
      });
    }
    setIsOpen(false);
    setEditingExperience(null);
  };

  const handleDelete = (id: string) => {
    removeExperience(id);
  };

  const handleChange = (
    field: Exclude<keyof Experience, "description">,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const [year, month] = dateString.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with count and add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="size-4" />
          <span>
            {experiences.length}{" "}
            {experiences.length === 1 ? "experience" : "experiences"}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="size-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {/* Experience cards */}
      {experiences.length > 0 ? (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="border rounded-lg p-4 bg-card hover:bg-accent/5 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">
                      {exp.position || "Untitled Position"}
                    </h3>
                    {exp.current && (
                      <Badge
                        variant="outline"
                        className="text-xs border-emerald-500 text-emerald-500"
                      >
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                    {exp.company && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="size-3.5" />
                        {exp.company}
                      </span>
                    )}
                    {exp.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        {exp.location}
                      </span>
                    )}
                    {(exp.startDate || exp.endDate || exp.current) && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => handleEdit(exp)}
                  >
                    <Edit2 className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => handleDelete(exp.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
          <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Briefcase className="size-6 text-muted-foreground" />
          </div>
          <h4 className="font-medium mb-1">No experience added</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Add your work experience to showcase your career.
          </p>
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="size-4 mr-2" />
            Add Experience
          </Button>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="size-5" />
              {editingExperience ? "Edit Work Experience" : "Add Work Experience"}
            </DialogTitle>
            <DialogDescription>
              {editingExperience
                ? "Update your work experience details."
                : "Add a new work experience to your resume."}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleChange("position", e.target.value)}
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Tech Corp"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    disabled={formData.current}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="current"
                  checked={formData.current}
                  onChange={(e) => {
                    handleChange("current", e.target.checked);
                    if (e.target.checked) {
                      handleChange("endDate", "");
                    }
                  }}
                  className="rounded border-input"
                />
                <Label htmlFor="current" className="cursor-pointer">
                  Currently working here
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(content) =>
                    setFormData((prev) => ({ ...prev, description: content }))
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
              {editingExperience ? "Save Changes" : "Add Experience"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
