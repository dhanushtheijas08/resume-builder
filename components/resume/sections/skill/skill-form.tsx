"use client";

// Temporary type until Prisma client is regenerated
type Skill = {
  id: string;
  name: string;
  proficiency: number | null;
  category: string | null;
  displayType: string;
  resumeId: string;
  createdAt: Date;
  updatedAt: Date;
};
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Save,
  Plus,
  Trash2,
  Loader2,
  X,
  Edit2,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { SkillType } from "./skill-dialog";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useSkill, defaultValues } from "./use-skill";
import { SkillFormData } from "@/lib/validations/resume";
import { UseFormReturn } from "react-hook-form";
import { Slider } from "@/components/ui/slider";

type SkillFormProps = {
  skills: Skill[];
  skillType: SkillType;
};

// Dummy categories for category type
const DEFAULT_CATEGORIES = [
  "Programming Languages",
  "Frameworks & Libraries",
  "Tools & Technologies",
  "Databases",
  "Cloud Services",
  "Design Tools",
  "Soft Skills",
  "Languages",
  "Other",
];

export const SkillForm = ({ skills, skillType }: SkillFormProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const editingSkill = skills.find((s) => s.id === editingId) || null;

  const { form, saveSkill, updateSkill, removeSkill, isLoading } = useSkill(
    editingSkill,
    () => {
      setEditingId(null);
    }
  );

  const typedForm = form as unknown as UseFormReturn<SkillFormData>;

  const handleAddSkill = (values: SkillFormData) => {
    const skillData: SkillFormData = {
      ...values,
      displayType: skillType,
    };
    saveSkill(skillData);
  };

  const handleUpdateSkill = (values: SkillFormData) => {
    if (!editingId) return;
    const skillData: SkillFormData = {
      ...values,
      displayType: skillType,
    };
    updateSkill(skillData);
  };

  const handleDeleteSkill = (id: string) => {
    removeSkill(id);
    if (editingId === id) {
      setEditingId(null);
      form.reset(defaultValues);
    }
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingId(skill.id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.reset(defaultValues);
  };

  const onSubmit = (values: SkillFormData) => {
    if (editingId) {
      handleUpdateSkill(values);
    } else {
      handleAddSkill(values);
    }
  };

  // Group skills by category for category type
  const groupedSkills =
    skillType === "category"
      ? skills.reduce((acc, skill) => {
          const category = skill.category || "Other";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(skill);
          return acc;
        }, {} as Record<string, Skill[]>)
      : {};

  // Get unique categories from default list + existing skills
  const availableCategories = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...skills.map((s) => s.category).filter((c): c is string => !!c),
    ])
  ).sort();

  return (
    <div className="space-y-6">
      {/* Input Form Section */}
      <div className="p-4 rounded-lg border bg-secondary/10">
        <h4 className="font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
          {editingId ? (
            <>
              <Edit2 className="size-4 text-primary" />
              Edit Skill
            </>
          ) : (
            <>
              <Plus className="size-4 text-primary" />
              Add New Skill
            </>
          )}
        </h4>

        <Form {...form}>
          <form
            onSubmit={typedForm.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-4 items-end"
          >
            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField<SkillFormData>
                  control={typedForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-semibold">
                        Skill Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. React, Design, etc."
                          {...field}
                          disabled={isLoading}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {skillType === "category" && (
                  <FormField<SkillFormData>
                    control={typedForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="space-y-1 flex flex-col">
                        <FormLabel className="text-xs font-semibold">
                          Category
                        </FormLabel>
                        <Popover
                          open={openCombobox}
                          onOpenChange={setOpenCombobox}
                          modal={true}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCombobox}
                                className={cn(
                                  "w-full justify-between bg-background font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                                disabled={isLoading}
                              >
                                {field.value
                                  ? field.value
                                  : "Select or create category..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-full p-0 custom-scrollbar"
                            align="start"
                          >
                            <Command className="w-full min-w-[285px]">
                              <CommandInput
                                placeholder="Search or create category..."
                                onValueChange={setSearchValue}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && searchValue) {
                                    const exactMatch = availableCategories.some(
                                      (c) =>
                                        c.toLowerCase() ===
                                        searchValue.toLowerCase()
                                    );

                                    if (!exactMatch) {
                                      e.preventDefault();
                                      form.setValue("category", searchValue);
                                      setOpenCombobox(false);
                                    }
                                  }
                                }}
                              />
                              <CommandList>
                                <CommandEmpty className="py-1 px-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-center h-auto px-2 py-1.5 text-sm"
                                    onClick={() => {
                                      form.setValue("category", searchValue);
                                      setOpenCombobox(false);
                                    }}
                                  >
                                    <Plus className="h-4 w-4" />
                                    <span className="truncate">
                                      Create &quot;{searchValue}&quot;{" "}
                                    </span>
                                  </Button>
                                  <div className="w-full text-center">
                                    <span className="text-muted-foreground text-xs ml-1">
                                      No category found. Press Enter to create.
                                    </span>
                                  </div>
                                </CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                  {availableCategories.map((category) => (
                                    <CommandItem
                                      value={category}
                                      key={category}
                                      onSelect={() => {
                                        form.setValue("category", category);
                                        setOpenCombobox(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          category === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {category}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {skillType === "progress" && (
                  <FormField<SkillFormData>
                    control={typedForm.control}
                    name="proficiency"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <div className="flex justify-between">
                          <FormLabel className="text-xs font-semibold">
                            Proficiency
                          </FormLabel>
                          <span className="text-xs font-mono">
                            {field.value ?? 0}%
                          </span>
                        </div>
                        <FormControl>
                          <Slider
                            min={0}
                            max={100}
                            step={5}
                            value={[field.value ?? 0] as number[]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="h-9 cursor-pointer w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="submit"
                disabled={isLoading}
                size="sm"
                className="flex-1 sm:flex-none"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin mr-2" />
                ) : editingId ? (
                  <Save className="size-4 mr-2" />
                ) : (
                  <Plus className="size-4 mr-2" />
                )}
                {editingId ? "Update" : "Add"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                  title="Cancel Edit"
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>

      {/* List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h4 className="font-semibold text-sm">
            Added Skills ({skills.length})
          </h4>
          {skills.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm("Are you sure you want to remove all skills?")) {
                  skills.forEach((skill) => removeSkill(skill.id));
                }
              }}
              disabled={isLoading}
              className="text-xs text-muted-foreground hover:text-destructive h-8"
            >
              <Trash2 className="size-3 mr-1.5" />
              Clear All
            </Button>
          )}
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
            <p className="text-sm">No skills added yet.</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            {skillType === "category" ? (
              <div className="space-y-6">
                {Object.entries(groupedSkills).map(
                  ([category, categorySkills]) => (
                    <div key={category} className="space-y-3">
                      <h5 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {category}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {(categorySkills as Skill[]).map((skill) => (
                          <SkillPill
                            key={skill.id}
                            skill={skill}
                            onEdit={handleEditSkill}
                            onDelete={handleDeleteSkill}
                            isLoading={isLoading}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : skillType === "progress" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group flex items-center gap-3 p-3 bg-card border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {skill.name}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {skill.proficiency ?? 0}%
                        </span>
                      </div>
                      <Progress
                        value={skill.proficiency ?? 0}
                        className="h-1.5"
                      />
                    </div>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => handleEditSkill(skill)}
                        disabled={isLoading}
                      >
                        <Edit2 className="size-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 hover:text-destructive"
                        onClick={() => handleDeleteSkill(skill.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillPill
                    key={skill.id}
                    skill={skill}
                    onEdit={handleEditSkill}
                    onDelete={handleDeleteSkill}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

const SkillPill = ({
  skill,
  onEdit,
  onDelete,
  isLoading,
}: {
  skill: Skill;
  onEdit: (s: Skill) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}) => {
  return (
    <Badge
      variant="secondary"
      className="group pl-3 pr-1 py-1 hover:bg-secondary/80 transition-colors flex items-center gap-1.5"
    >
      <span className="font-medium">{skill.name}</span>
      <div className="flex items-center border-l border-border/50 pl-1 ml-1 gap-0.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-5 w-5 rounded-full hover:bg-background hover:text-primary"
          onClick={() => onEdit(skill)}
          disabled={isLoading}
        >
          <Edit2 className="size-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-5 w-5 rounded-full hover:bg-background hover:text-destructive"
          onClick={() => onDelete(skill.id)}
          disabled={isLoading}
        >
          <X className="size-3" />
        </Button>
      </div>
    </Badge>
  );
};
