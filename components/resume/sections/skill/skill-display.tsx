"use client";

import { Button } from "@/components/ui/button";
import { Edit2, LayoutGrid, BarChart3, GripHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillData, SkillType } from "./skill-dialog";

type SkillDisplayProps = {
  skills: SkillData[];
  skillType: SkillType;
  onEditClick: () => void;
  onSkillTypeChange: (type: SkillType) => void;
};

export const SkillDisplay = ({
  skills,
  skillType,
  onEditClick,
  onSkillTypeChange,
}: SkillDisplayProps) => {
  if (skills.length === 0) return null;

  const groupedSkills =
    skillType === "category"
      ? skills.reduce((acc, skill) => {
          const category = skill.category || "Other";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(skill);
          return acc;
        }, {} as Record<string, SkillData[]>)
      : {};

  return (
    <div className="border rounded-lg p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">
            Skills
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {skills.length} {skills.length === 1 ? "skill" : "skills"} showcased
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs
            value={skillType}
            onValueChange={(value) => onSkillTypeChange(value as SkillType)}
            className="hidden sm:block"
          >
            <TabsList className="h-8">
              <TabsTrigger value="badge" className="text-xs px-2 h-6">
                <GripHorizontal className="size-3 mr-1" />
                Badge
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-xs px-2 h-6">
                <BarChart3 className="size-3 mr-1" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="category" className="text-xs px-2 h-6">
                <LayoutGrid className="size-3 mr-1" />
                Category
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={onEditClick}
          >
            <Edit2 className="size-4" />
            <span className="sr-only">Edit skills</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {skillType === "badge" && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="text-sm py-1.5 px-3.5 hover:bg-secondary/80 transition-colors cursor-default"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        )}

        {skillType === "progress" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded">
                    {skill.proficiency || 0}%
                  </span>
                </div>
                <Progress value={skill.proficiency || 0} className="h-2" />
              </div>
            ))}
          </div>
        )}

        {skillType === "category" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div
                key={category}
                className="space-y-3 bg-secondary/10 p-4 rounded-lg border border-border/50"
              >
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="outline"
                      className="text-xs py-1 px-2.5 bg-background hover:bg-background/80"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
