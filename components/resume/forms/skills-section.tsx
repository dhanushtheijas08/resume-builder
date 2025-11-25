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
  Skill,
  createEmptySkill,
} from "@/lib/store/resume-store";
import { Code, Plus, X } from "lucide-react";

const SKILL_CATEGORIES = [
  "Languages",
  "Frameworks",
  "Tools",
  "Cloud",
  "Databases",
  "Other",
];

// Category colors
const CATEGORY_COLORS: Record<string, string> = {
  Languages: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  Frameworks: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  Tools: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
  Cloud: "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20",
  Databases: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  Other: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
};

export function SkillsSection() {
  const { resumeData, removeSkill } = useResumeStore();
  const { skills } = resumeData;
  const [isOpen, setIsOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Skill>(createEmptySkill());

  const handleAdd = () => {
    setEditingSkill(null);
    setFormData(createEmptySkill());
    setIsOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({ ...skill });
    setIsOpen(true);
  };

  const handleSave = () => {
    const { setSkill, resumeData } = useResumeStore.getState();

    if (editingSkill) {
      setSkill(editingSkill.id, formData);
    } else {
      useResumeStore.setState({
        resumeData: {
          ...resumeData,
          skills: [...resumeData.skills, formData],
        },
      });
    }
    setIsOpen(false);
    setEditingSkill(null);
  };

  const handleDelete = (id: string) => {
    removeSkill(id);
  };

  const handleChange = (field: keyof Skill, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <div className="space-y-4">
      {/* Header with count and add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Code className="size-4" />
          <span>
            {skills.length} {skills.length === 1 ? "skill" : "skills"}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="size-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Skills by category */}
      {skills.length > 0 ? (
        <div className="space-y-4">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => handleEdit(skill)}
                    className={`group relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      CATEGORY_COLORS[category] || CATEGORY_COLORS.Other
                    }`}
                  >
                    {skill.name}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(skill.id);
                      }}
                      className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="size-2.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
          <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Code className="size-6 text-muted-foreground" />
          </div>
          <h4 className="font-medium mb-1">No skills added</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Add your technical skills and expertise.
          </p>
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="size-4 mr-2" />
            Add Skill
          </Button>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code className="size-5" />
              {editingSkill ? "Edit Skill" : "Add Skill"}
            </DialogTitle>
            <DialogDescription>
              {editingSkill
                ? "Update your skill details."
                : "Add a new skill to your resume."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="JavaScript"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                {SKILL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              {editingSkill ? "Save Changes" : "Add Skill"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
