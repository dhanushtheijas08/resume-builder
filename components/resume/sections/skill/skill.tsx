"use client";

import { Button } from "@/components/ui/button";
import { Plus, Code } from "lucide-react";
import { useEffect, useState } from "react";
import { EmptySection } from "../empty-section";
import { SkillDialog, SkillType } from "./skill-dialog";
import { SkillDisplay } from "./skill-display";
import { Skill } from "@prisma/client";

export const SkillSection = ({
  skills,
  initialSkillType = "badge",
}: {
  skills: Skill[];
  initialSkillType?: SkillType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skillType, setSkillType] = useState<SkillType>(initialSkillType);

  useEffect(() => {
    setSkillType(initialSkillType);
  }, [initialSkillType]);

  const hasData = skills.length > 0;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const skillData = skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    proficiency: skill.proficiency ?? undefined,
    category: skill.category ?? undefined,
  }));

  return (
    <div className="space-y-4">
      {hasData ? (
        <SkillDisplay
          skills={skillData}
          skillType={skillType}
          onEditClick={() => handleOpenChange(true)}
          onSkillTypeChange={setSkillType}
        />
      ) : (
        <EmptySection
          title="No skills added"
          description="Add your skills to showcase your expertise."
          icon={<Code className="size-6 text-blue-500" />}
          iconContainerClassName="bg-blue-500/10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenChange(true)}
          >
            <Plus className="size-4 mr-2" />
            Add Skills
          </Button>
        </EmptySection>
      )}

      <SkillDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        skills={skills}
        skillType={skillType}
      />
    </div>
  );
};
