"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";
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
      ? skills.reduce(
          (acc, skill) => {
            const category = skill.category || "Other";
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(skill);
            return acc;
          },
          {} as Record<string, SkillData[]>,
        )
      : {};

  return (
    <div className="border rounded-lg p-4 sm:p-5 bg-background/40 hover:bg-background/60 transition-colors group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
            Skills
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {skills.length} {skills.length === 1 ? "skill" : "skills"} showcased
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onEditClick}
            className="w-full sm:w-auto bg-background/40 hover:bg-background/60"
          >
            <Plus className="size-3.5 sm:size-4" />
            <span className="text-sm">Add skill</span>
          </Button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {skillType === "badge" && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="text-xs sm:text-sm py-1 sm:py-1.5 px-2.5 sm:px-3.5 hover:bg-secondary/80 transition-colors cursor-default"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        )}

        {skillType === "progress" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded">
                    {skill.proficiency || 0}%
                  </span>
                </div>
                <Progress value={skill.proficiency || 0} className="h-1.5 sm:h-2" />
              </div>
            ))}
          </div>
        )}

        {skillType === "category" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div
                key={category}
                className="space-y-2 sm:space-y-3 bg-secondary/10 p-3 sm:p-4 rounded-lg border border-border/50"
              >
                <h4 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-primary rounded-full" />
                  {category}
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="outline"
                      className="text-[10px] sm:text-xs py-0.5 sm:py-1 px-2 sm:px-2.5 bg-background hover:bg-background/80"
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
