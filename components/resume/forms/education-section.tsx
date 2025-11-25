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
  Education,
  createEmptyEducation,
} from "@/lib/store/resume-store";
import {
  Building2,
  Calendar,
  Edit2,
  GraduationCap,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function EducationSection() {
  const { resumeData, removeEducation } = useResumeStore();
  const { education } = resumeData;
  const [isOpen, setIsOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );
  const [formData, setFormData] = useState<Education>(createEmptyEducation());

  const handleAdd = () => {
    setEditingEducation(null);
    setFormData(createEmptyEducation());
    setIsOpen(true);
  };

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setFormData({ ...edu });
    setIsOpen(true);
  };

  const handleSave = () => {
    const { setEducation, resumeData } = useResumeStore.getState();

    if (editingEducation) {
      setEducation(editingEducation.id, formData);
    } else {
      useResumeStore.setState({
        resumeData: {
          ...resumeData,
          education: [...resumeData.education, formData],
        },
      });
    }
    setIsOpen(false);
    setEditingEducation(null);
  };

  const handleDelete = (id: string) => {
    removeEducation(id);
  };

  const handleChange = (field: keyof Education, value: string | boolean) => {
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
          <GraduationCap className="size-4" />
          <span>
            {education.length} {education.length === 1 ? "education" : "education"}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="size-4 mr-2" />
          Add Education
        </Button>
      </div>

      {/* Education cards */}
      {education.length > 0 ? (
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="border rounded-lg p-4 bg-card hover:bg-accent/5 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">
                      {edu.degree && edu.field
                        ? `${edu.degree} in ${edu.field}`
                        : edu.degree || edu.field || "Untitled Degree"}
                    </h3>
                    {edu.current && (
                      <Badge
                        variant="outline"
                        className="text-xs border-emerald-500 text-emerald-500"
                      >
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                    {edu.institution && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="size-3.5" />
                        {edu.institution}
                      </span>
                    )}
                    {edu.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        {edu.location}
                      </span>
                    )}
                    {(edu.startDate || edu.endDate || edu.current) && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {formatDate(edu.startDate)} -{" "}
                        {edu.current ? "Present" : formatDate(edu.endDate)}
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
                    onClick={() => handleEdit(edu)}
                  >
                    <Edit2 className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => handleDelete(edu.id)}
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
            <GraduationCap className="size-6 text-muted-foreground" />
          </div>
          <h4 className="font-medium mb-1">No education added</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Add your educational background.
          </p>
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="size-4 mr-2" />
            Add Education
          </Button>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="size-5" />
              {editingEducation ? "Edit Education" : "Add Education"}
            </DialogTitle>
            <DialogDescription>
              {editingEducation
                ? "Update your education details."
                : "Add your educational background."}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleChange("institution", e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={formData.degree}
                    onChange={(e) => handleChange("degree", e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    value={formData.field}
                    onChange={(e) => handleChange("field", e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  Currently studying
                </Label>
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
              {editingEducation ? "Save Changes" : "Add Education"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
