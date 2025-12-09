"use client";

import { Code } from "lucide-react";
import { ResumeDialog } from "../resume-dialog";
import { SkillForm } from "./skill-form";
import { Skill } from "@/app/generated/prisma/client";

export type SkillType = "badge" | "progress" | "category";

export type SkillData = {
  id: string;
  name: string;
  proficiency?: number;
  category?: string;
};

type SkillDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skills: Skill[];
  skillType: SkillType;
};

export const SkillDialog = ({
  open,
  onOpenChange,
  skills,
  skillType,
}: SkillDialogProps) => {
  return (
    <ResumeDialog
      title="Manage Skills"
      description="Add, edit, and organize your skills."
      open={open}
      onOpenChange={onOpenChange}
      className="sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
      icon={<Code className="size-5" />}
    >
      <SkillForm skills={skills} skillType={skillType} />
    </ResumeDialog>
  );
};
