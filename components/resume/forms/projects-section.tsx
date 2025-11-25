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
  Project,
  createEmptyProject,
} from "@/lib/store/resume-store";
import { RichTextEditor } from "../editor/rich-text-editor";
import {
  Edit2,
  ExternalLink,
  FolderKanban,
  Github,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function ProjectsSection() {
  const { resumeData, removeProject } = useResumeStore();
  const { projects } = resumeData;
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>(createEmptyProject());
  const [techInput, setTechInput] = useState("");

  const handleAdd = () => {
    setEditingProject(null);
    setFormData(createEmptyProject());
    setTechInput("");
    setIsOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({ ...project });
    setTechInput("");
    setIsOpen(true);
  };

  const handleSave = () => {
    const { setProject, resumeData } = useResumeStore.getState();

    if (editingProject) {
      setProject(editingProject.id, formData);
    } else {
      useResumeStore.setState({
        resumeData: {
          ...resumeData,
          projects: [...resumeData.projects, formData],
        },
      });
    }
    setIsOpen(false);
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    removeProject(id);
  };

  const handleChange = (
    field: Exclude<keyof Project, "description">,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      handleChange("technologies", [...formData.technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    handleChange(
      "technologies",
      formData.technologies.filter((t) => t !== tech)
    );
  };

  return (
    <div className="space-y-4">
      {/* Header with count and add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FolderKanban className="size-4" />
          <span>
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="size-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Project cards */}
      {projects.length > 0 ? (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4 bg-card hover:bg-accent/5 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">
                      {project.name || "Untitled Project"}
                    </h3>
                    <div className="flex items-center gap-2">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit2 className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => handleDelete(project.id)}
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
            <FolderKanban className="size-6 text-muted-foreground" />
          </div>
          <h4 className="font-medium mb-1">No projects added</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Add your projects to showcase your work and skills.
          </p>
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="size-4 mr-2" />
            Add Project
          </Button>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderKanban className="size-5" />
              {editingProject ? "Edit Project" : "Add Project"}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? "Update your project details."
                : "Add a new project to showcase your work."}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="E-Commerce Platform"
                />
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Project URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url || ""}
                    onChange={(e) => handleChange("url", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    type="url"
                    value={formData.github || ""}
                    onChange={(e) => handleChange("github", e.target.value)}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    id="technologies"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    placeholder="React, Node.js, MongoDB..."
                  />
                  <Button type="button" variant="outline" onClick={handleAddTech}>
                    Add
                  </Button>
                </div>
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(tech)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
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
              {editingProject ? "Save Changes" : "Add Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
