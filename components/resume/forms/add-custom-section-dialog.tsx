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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useResumeStore,
  CustomField,
  CustomFieldType,
  generateId,
} from "@/lib/store/resume-store";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  Languages,
  Lightbulb,
  Medal,
  Mic,
  Plus,
  Sparkles,
  Star,
  Target,
  Trash2,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icon mapping
const ICONS = [
  { name: "star", icon: Star },
  { name: "award", icon: Award },
  { name: "trophy", icon: Trophy },
  { name: "medal", icon: Medal },
  { name: "target", icon: Target },
  { name: "lightbulb", icon: Lightbulb },
  { name: "heart", icon: Heart },
  { name: "users", icon: Users },
  { name: "globe", icon: Globe },
  { name: "languages", icon: Languages },
  { name: "mic", icon: Mic },
  { name: "book", icon: BookOpen },
  { name: "zap", icon: Zap },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  star: Star,
  award: Award,
  trophy: Trophy,
  medal: Medal,
  target: Target,
  lightbulb: Lightbulb,
  heart: Heart,
  users: Users,
  globe: Globe,
  languages: Languages,
  mic: Mic,
  book: BookOpen,
  zap: Zap,
  briefcase: Briefcase,
  graduationcap: GraduationCap,
  filetext: FileText,
};

const COLORS = [
  { name: "rose", value: "rose" },
  { name: "pink", value: "pink" },
  { name: "fuchsia", value: "fuchsia" },
  { name: "violet", value: "violet" },
  { name: "indigo", value: "indigo" },
  { name: "blue", value: "blue" },
  { name: "cyan", value: "cyan" },
  { name: "teal", value: "teal" },
  { name: "emerald", value: "emerald" },
  { name: "lime", value: "lime" },
  { name: "amber", value: "amber" },
  { name: "orange", value: "orange" },
];

const FIELD_TYPES: { type: CustomFieldType; label: string; description: string }[] = [
  { type: "text", label: "Text", description: "Single line text input" },
  { type: "textarea", label: "Text Area", description: "Multi-line text input" },
  { type: "richtext", label: "Rich Text", description: "Formatted text with bullets" },
  { type: "date", label: "Date", description: "Month and year picker" },
  { type: "url", label: "URL", description: "Website link" },
  { type: "email", label: "Email", description: "Email address" },
  { type: "phone", label: "Phone", description: "Phone number" },
];

// Predefined Templates
interface SectionTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  allowMultiple: boolean;
  fields: Omit<CustomField, "id">[];
}

const SECTION_TEMPLATES: SectionTemplate[] = [
  {
    id: "work-experience",
    name: "Work Experience",
    description: "Job positions with company, dates, and descriptions",
    icon: "briefcase",
    color: "purple",
    allowMultiple: true,
    fields: [
      { name: "Position", type: "text", placeholder: "e.g., Software Engineer" },
      { name: "Company", type: "text", placeholder: "e.g., Google" },
      { name: "Location", type: "text", placeholder: "e.g., San Francisco, CA" },
      { name: "Start Date", type: "date", placeholder: "" },
      { name: "End Date", type: "date", placeholder: "" },
      { name: "Description", type: "richtext", placeholder: "Describe your responsibilities..." },
    ],
  },
  {
    id: "education",
    name: "Education",
    description: "Degrees, institutions, and graduation dates",
    icon: "graduationcap",
    color: "emerald",
    allowMultiple: true,
    fields: [
      { name: "Degree", type: "text", placeholder: "e.g., Bachelor of Science" },
      { name: "Field of Study", type: "text", placeholder: "e.g., Computer Science" },
      { name: "Institution", type: "text", placeholder: "e.g., MIT" },
      { name: "Location", type: "text", placeholder: "e.g., Cambridge, MA" },
      { name: "Start Date", type: "date", placeholder: "" },
      { name: "End Date", type: "date", placeholder: "" },
    ],
  },
  {
    id: "certifications",
    name: "Certifications",
    description: "Professional certifications and licenses",
    icon: "award",
    color: "amber",
    allowMultiple: true,
    fields: [
      { name: "Certificate Name", type: "text", placeholder: "e.g., AWS Solutions Architect" },
      { name: "Issuing Organization", type: "text", placeholder: "e.g., Amazon Web Services" },
      { name: "Issue Date", type: "date", placeholder: "" },
      { name: "Expiry Date", type: "date", placeholder: "" },
      { name: "Credential URL", type: "url", placeholder: "https://..." },
    ],
  },
  {
    id: "languages",
    name: "Languages",
    description: "Languages you speak and proficiency levels",
    icon: "languages",
    color: "blue",
    allowMultiple: true,
    fields: [
      { name: "Language", type: "text", placeholder: "e.g., Spanish" },
      { name: "Proficiency", type: "text", placeholder: "e.g., Native, Fluent, Intermediate" },
    ],
  },
  {
    id: "volunteer",
    name: "Volunteer Work",
    description: "Volunteer experience and community service",
    icon: "heart",
    color: "rose",
    allowMultiple: true,
    fields: [
      { name: "Role", type: "text", placeholder: "e.g., Volunteer Coordinator" },
      { name: "Organization", type: "text", placeholder: "e.g., Red Cross" },
      { name: "Location", type: "text", placeholder: "e.g., New York, NY" },
      { name: "Start Date", type: "date", placeholder: "" },
      { name: "End Date", type: "date", placeholder: "" },
      { name: "Description", type: "richtext", placeholder: "Describe your contributions..." },
    ],
  },
  {
    id: "publications",
    name: "Publications",
    description: "Research papers, articles, and books",
    icon: "book",
    color: "indigo",
    allowMultiple: true,
    fields: [
      { name: "Title", type: "text", placeholder: "e.g., Machine Learning in Healthcare" },
      { name: "Publisher/Journal", type: "text", placeholder: "e.g., Nature, IEEE" },
      { name: "Publication Date", type: "date", placeholder: "" },
      { name: "URL", type: "url", placeholder: "https://..." },
      { name: "Description", type: "textarea", placeholder: "Brief description..." },
    ],
  },
  {
    id: "awards",
    name: "Awards & Honors",
    description: "Recognition and achievements",
    icon: "trophy",
    color: "amber",
    allowMultiple: true,
    fields: [
      { name: "Award Name", type: "text", placeholder: "e.g., Employee of the Year" },
      { name: "Issuer", type: "text", placeholder: "e.g., Company Name" },
      { name: "Date", type: "date", placeholder: "" },
      { name: "Description", type: "textarea", placeholder: "What was the award for?" },
    ],
  },
  {
    id: "courses",
    name: "Courses & Training",
    description: "Online courses and professional training",
    icon: "lightbulb",
    color: "cyan",
    allowMultiple: true,
    fields: [
      { name: "Course Name", type: "text", placeholder: "e.g., Advanced React Patterns" },
      { name: "Platform/Institution", type: "text", placeholder: "e.g., Coursera, Udemy" },
      { name: "Completion Date", type: "date", placeholder: "" },
      { name: "Certificate URL", type: "url", placeholder: "https://..." },
    ],
  },
  {
    id: "references",
    name: "References",
    description: "Professional references and recommendations",
    icon: "users",
    color: "teal",
    allowMultiple: true,
    fields: [
      { name: "Name", type: "text", placeholder: "e.g., John Smith" },
      { name: "Title", type: "text", placeholder: "e.g., Senior Manager" },
      { name: "Company", type: "text", placeholder: "e.g., Tech Corp" },
      { name: "Email", type: "email", placeholder: "john@company.com" },
      { name: "Phone", type: "phone", placeholder: "+1 (555) 123-4567" },
      { name: "Relationship", type: "text", placeholder: "e.g., Former Supervisor" },
    ],
  },
  {
    id: "interests",
    name: "Interests & Hobbies",
    description: "Personal interests and activities",
    icon: "star",
    color: "pink",
    allowMultiple: true,
    fields: [
      { name: "Interest", type: "text", placeholder: "e.g., Photography" },
      { name: "Description", type: "textarea", placeholder: "Brief description (optional)" },
    ],
  },
];

interface AddCustomSectionDialogProps {
  trigger?: React.ReactNode;
}

type DialogStep = "select-template" | "customize";

export function AddCustomSectionDialog({ trigger }: AddCustomSectionDialogProps) {
  const { addCustomSection } = useResumeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<DialogStep>("select-template");
  const [selectedTemplate, setSelectedTemplate] = useState<SectionTemplate | null>(null);

  // Form state
  const [sectionName, setSectionName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("star");
  const [selectedColor, setSelectedColor] = useState("violet");
  const [allowMultiple, setAllowMultiple] = useState(true);
  const [fields, setFields] = useState<CustomField[]>([
    { id: generateId(), name: "Title", type: "text", placeholder: "", required: true },
  ]);

  const resetForm = () => {
    setStep("select-template");
    setSelectedTemplate(null);
    setSectionName("");
    setSelectedIcon("star");
    setSelectedColor("violet");
    setAllowMultiple(true);
    setFields([
      { id: generateId(), name: "Title", type: "text", placeholder: "", required: true },
    ]);
  };

  const handleSelectTemplate = (template: SectionTemplate | null) => {
    setSelectedTemplate(template);
    if (template) {
      setSectionName(template.name);
      setSelectedIcon(template.icon);
      setSelectedColor(template.color);
      setAllowMultiple(template.allowMultiple);
      setFields(
        template.fields.map((f) => ({
          ...f,
          id: generateId(),
          required: false,
        }))
      );
    } else {
      // Start from scratch
      setSectionName("");
      setSelectedIcon("star");
      setSelectedColor("violet");
      setAllowMultiple(true);
      setFields([
        { id: generateId(), name: "Title", type: "text", placeholder: "", required: true },
      ]);
    }
    setStep("customize");
  };

  const handleAddField = () => {
    setFields([
      ...fields,
      { id: generateId(), name: "", type: "text", placeholder: "", required: false },
    ]);
  };

  const handleRemoveField = (id: string) => {
    if (fields.length > 1) {
      setFields(fields.filter((f) => f.id !== id));
    }
  };

  const handleFieldChange = (
    id: string,
    key: keyof CustomField,
    value: string | boolean
  ) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const handleSave = () => {
    if (!sectionName.trim() || fields.length === 0) return;

    addCustomSection({
      name: sectionName,
      icon: selectedIcon,
      color: selectedColor,
      fields: fields.filter((f) => f.name.trim()),
      allowMultiple,
    });

    resetForm();
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      rose: "bg-rose-500",
      pink: "bg-pink-500",
      fuchsia: "bg-fuchsia-500",
      violet: "bg-violet-500",
      purple: "bg-purple-500",
      indigo: "bg-indigo-500",
      blue: "bg-blue-500",
      cyan: "bg-cyan-500",
      teal: "bg-teal-500",
      emerald: "bg-emerald-500",
      lime: "bg-lime-500",
      amber: "bg-amber-500",
      orange: "bg-orange-500",
    };
    return colorMap[color] || "bg-violet-500";
  };

  const getColorBgLight = (color: string) => {
    const colorMap: Record<string, string> = {
      rose: "bg-rose-500/10",
      pink: "bg-pink-500/10",
      fuchsia: "bg-fuchsia-500/10",
      violet: "bg-violet-500/10",
      purple: "bg-purple-500/10",
      indigo: "bg-indigo-500/10",
      blue: "bg-blue-500/10",
      cyan: "bg-cyan-500/10",
      teal: "bg-teal-500/10",
      emerald: "bg-emerald-500/10",
      lime: "bg-lime-500/10",
      amber: "bg-amber-500/10",
      orange: "bg-orange-500/10",
    };
    return colorMap[color] || "bg-violet-500/10";
  };

  const getColorText = (color: string) => {
    const colorMap: Record<string, string> = {
      rose: "text-rose-500",
      pink: "text-pink-500",
      fuchsia: "text-fuchsia-500",
      violet: "text-violet-500",
      purple: "text-purple-500",
      indigo: "text-indigo-500",
      blue: "text-blue-500",
      cyan: "text-cyan-500",
      teal: "text-teal-500",
      emerald: "text-emerald-500",
      lime: "text-lime-500",
      amber: "text-amber-500",
      orange: "text-orange-500",
    };
    return colorMap[color] || "text-violet-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="size-4 mr-2" />
            Add Section
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh]">
        {step === "select-template" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="size-5" />
                Choose a Template
              </DialogTitle>
              <DialogDescription>
                Start with a template or create your own custom section from scratch.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="py-4 space-y-4">
                {/* Start from Scratch */}
                <button
                  type="button"
                  onClick={() => handleSelectTemplate(null)}
                  className="w-full border-2 border-dashed rounded-xl p-4 hover:border-primary hover:bg-primary/5 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10">
                      <Plus className="size-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Start from Scratch</h3>
                      <p className="text-sm text-muted-foreground">
                        Create a completely custom section with your own fields
                      </p>
                    </div>
                  </div>
                </button>

                {/* Template Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {SECTION_TEMPLATES.map((template) => {
                    const IconComponent = ICON_MAP[template.icon] || Star;
                    return (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => handleSelectTemplate(template)}
                        className="border rounded-xl p-4 hover:border-primary hover:bg-accent/50 transition-colors text-left group"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`size-10 rounded-lg ${getColorBgLight(template.color)} flex items-center justify-center`}
                          >
                            <IconComponent
                              className={`size-5 ${getColorText(template.color)}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {template.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {template.fields.length} fields
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
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
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 mr-1"
                  onClick={() => setStep("select-template")}
                >
                  <ArrowLeft className="size-4" />
                </Button>
                {selectedTemplate ? `Customize ${selectedTemplate.name}` : "Create Custom Section"}
              </DialogTitle>
              <DialogDescription>
                {selectedTemplate
                  ? "Customize the template fields to match your needs."
                  : "Create a new section with custom fields for your resume."}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-6 py-4">
                {/* Section Name */}
                <div className="space-y-2">
                  <Label htmlFor="sectionName">Section Name</Label>
                  <Input
                    id="sectionName"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    placeholder="e.g., Certifications, Languages, Volunteer Work"
                  />
                </div>

                {/* Icon Selection */}
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <div className="flex flex-wrap gap-2">
                    {ICONS.map(({ name, icon: Icon }) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setSelectedIcon(name)}
                        className={`size-10 rounded-lg flex items-center justify-center transition-colors ${
                          selectedIcon === name
                            ? `${getColorClass(selectedColor)} text-white`
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        <Icon className="size-5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map(({ value }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSelectedColor(value)}
                        className={`size-8 rounded-full ${getColorClass(value)} transition-all ${
                          selectedColor === value
                            ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110"
                            : "hover:scale-105"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Allow Multiple Entries */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="allowMultiple"
                    checked={allowMultiple}
                    onChange={(e) => setAllowMultiple(e.target.checked)}
                    className="rounded border-input"
                  />
                  <Label htmlFor="allowMultiple" className="cursor-pointer">
                    Allow multiple entries (like Work Experience)
                  </Label>
                </div>

                {/* Fields */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Fields</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddField}
                    >
                      <Plus className="size-4 mr-1" />
                      Add Field
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="border rounded-lg p-4 bg-muted/30 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">
                            Field {index + 1}
                          </span>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-7"
                              onClick={() => handleRemoveField(field.id)}
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Field Name</Label>
                            <Input
                              value={field.name}
                              onChange={(e) =>
                                handleFieldChange(field.id, "name", e.target.value)
                              }
                              placeholder="e.g., Certificate Name"
                              className="h-9"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Field Type</Label>
                            <select
                              value={field.type}
                              onChange={(e) =>
                                handleFieldChange(
                                  field.id,
                                  "type",
                                  e.target.value as CustomFieldType
                                )
                              }
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                              {FIELD_TYPES.map((ft) => (
                                <option key={ft.type} value={ft.type}>
                                  {ft.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Placeholder (optional)</Label>
                          <Input
                            value={field.placeholder || ""}
                            onChange={(e) =>
                              handleFieldChange(field.id, "placeholder", e.target.value)
                            }
                            placeholder="e.g., Enter certificate name"
                            className="h-9"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("select-template")}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={!sectionName.trim() || fields.every((f) => !f.name.trim())}
              >
                Create Section
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
