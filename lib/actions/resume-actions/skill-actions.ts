"use server";
import { PrismaClientKnownRequestError } from "@/app/generated/prisma/internal/prismaNamespace";
import prisma from "@/lib/prisma";
import { ActionError, safeAction } from "@/lib/safe-action";
import { ResponseData } from "@/lib/validations/auth";
import { objectIdSchemaFn, skillSchema } from "@/lib/validations/resume";
import { validateUser } from "../validate-user";
import { z } from "zod";

export const createSkillAction = safeAction
  .inputSchema(
    skillSchema.safeExtend({
      resumeId: objectIdSchemaFn("Invalid resume ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    const resume = await prisma.resume.findUnique({
      where: { id: parsedInput.resumeId },
      select: { userId: true },
    });

    if (!resume) {
      throw new ActionError("Resume not found", 404);
    }

    if (resume.userId !== user.id) {
      throw new ActionError(
        "You do not have permission to edit this resume",
        403
      );
    }

    try {
      await prisma.skill.create({
        data: {
          name: parsedInput.name,
          proficiency: parsedInput.proficiency ?? null,
          category: parsedInput.category ?? null,
          displayType: parsedInput.displayType ?? "badge",
          resumeId: parsedInput.resumeId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to create skill", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Skill created successfully",
      statusCode: 201,
    };
  });

export const editSkillAction = safeAction
  .inputSchema(
    skillSchema.safeExtend({
      id: objectIdSchemaFn("Invalid skill ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    try {
      const skill = await prisma.skill.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!skill) {
        throw new ActionError("Skill not found", 404);
      }

      if (skill.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to edit this skill",
          403
        );
      }

      await prisma.skill.update({
        where: { id: parsedInput.id },
        data: {
          name: parsedInput.name,
          proficiency: parsedInput.proficiency ?? null,
          category: parsedInput.category ?? null,
          displayType: parsedInput.displayType ?? "badge",
        },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to update skill", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Skill updated successfully",
      statusCode: 200,
    };
  });

export const deleteSkillAction = safeAction
  .inputSchema(
    z.object({
      id: objectIdSchemaFn("Invalid skill ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    try {
      const skill = await prisma.skill.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!skill) {
        throw new ActionError("Skill not found", 404);
      }

      if (skill.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to delete this skill",
          403
        );
      }

      await prisma.skill.delete({
        where: { id: parsedInput.id },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to delete skill", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Skill deleted successfully",
      statusCode: 200,
    };
  });
