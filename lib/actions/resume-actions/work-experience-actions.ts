"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import { ActionError, safeAction } from "@/lib/safe-action";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";
import { ResponseData } from "@/lib/validations/auth";
import {
  objectIdSchemaFn,
  workExperienceSchema,
} from "@/lib/validations/resume";
import { validateUser } from "../validate-user";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const createWorkExperienceAction = safeAction
  .inputSchema(
    workExperienceSchema.safeExtend({
      resumeId: objectIdSchemaFn("Invalid resume ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    try {
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
      await prisma.workExperience.create({
        data: {
          order: parsedInput.order,
          jobTitle: parsedInput.jobTitle,
          company: parsedInput.company,
          location: parsedInput.location ?? "",
          startDate: parsedInput.startDate,
          endDate: parsedInput.isCurrent ? null : parsedInput.endDate ?? null,
          isCurrent: parsedInput.isCurrent,
          description: parsedInput.description
            ? sanitizeServerHtml(parsedInput.description)
            : "",
          resumeId: parsedInput.resumeId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to create work experience", 500);
      }
      throw error;
    }

    revalidatePath(`/resume/${parsedInput.resumeId}`);

    return {
      success: true,
      message: "Work experience created successfully",
      statusCode: 201,
    };
  });

export const editWorkExperienceAction = safeAction
  .inputSchema(
    workExperienceSchema.safeExtend({
      id: objectIdSchemaFn("Invalid work experience ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    let resumeId: string | null = null;

    try {
      const workExperience = await prisma.workExperience.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!workExperience) {
        throw new ActionError("Work experience not found", 404);
      }

      if (workExperience.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to edit this work experience",
          403
        );
      }

      resumeId = workExperience.resumeId;

      await prisma.workExperience.update({
        where: { id: parsedInput.id },
        data: {
          order: parsedInput.order,
          jobTitle: parsedInput.jobTitle,
          company: parsedInput.company,
          location: parsedInput.location ?? "",
          startDate: parsedInput.startDate,
          endDate: parsedInput.isCurrent ? null : parsedInput.endDate ?? null,
          isCurrent: parsedInput.isCurrent,
          description: parsedInput.description
            ? sanitizeServerHtml(parsedInput.description)
            : "",
        },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to update work experience", 500);
      }
      throw error;
    }

    if (resumeId) {
      revalidatePath(`/resume/${resumeId}`);
    }

    return {
      success: true,
      message: "Work experience updated successfully",
      statusCode: 200,
    };
  });

export const deleteWorkExperienceAction = safeAction
  .inputSchema(
    z.object({
      id: objectIdSchemaFn("Invalid work experience ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    let resumeId: string | null = null;

    try {
      const workExperience = await prisma.workExperience.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!workExperience) {
        throw new ActionError("Work experience not found", 404);
      }

      if (workExperience.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to delete this work experience",
          403
        );
      }

      resumeId = workExperience.resumeId;

      await prisma.workExperience.delete({
        where: { id: parsedInput.id },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to delete work experience", 500);
      }
      throw error;
    }

    if (resumeId) {
      revalidatePath(`/resume/${resumeId}`);
    }

    return {
      success: true,
      message: "Work experience deleted successfully",
      statusCode: 200,
    };
  });
