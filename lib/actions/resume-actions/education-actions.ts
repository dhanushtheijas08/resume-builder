"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import { ActionError, safeAction } from "@/lib/safe-action";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";
import { ResponseData } from "@/lib/validations/auth";
import { objectIdSchemaFn, educationSchema } from "@/lib/validations/resume";
import { validateUser } from "../validate-user";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const createEducationAction = safeAction
  .inputSchema(
    educationSchema.safeExtend({
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
      await prisma.education.create({
        data: {
          order: parsedInput.order,
          degree: parsedInput.degree,
          institution: parsedInput.institution,
          location: parsedInput.location ?? "",
          timePeriod: parsedInput.timePeriod ?? null,
          description: parsedInput.description
            ? sanitizeServerHtml(parsedInput.description)
            : "",
          resumeId: parsedInput.resumeId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to create education", 500);
      }
      throw error;
    }

    revalidatePath(`/resume/${parsedInput.resumeId}`);

    return {
      success: true,
      message: "Education created successfully",
      statusCode: 201,
    };
  });

export const editEducationAction = safeAction
  .inputSchema(
    educationSchema.safeExtend({
      id: objectIdSchemaFn("Invalid education ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    let resumeId: string | null = null;

    try {
      const education = await prisma.education.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!education) {
        throw new ActionError("Education not found", 404);
      }

      if (education.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to edit this education",
          403
        );
      }

      resumeId = education.resumeId;

      await prisma.education.update({
        where: { id: parsedInput.id },
        data: {
          order: parsedInput.order,
          degree: parsedInput.degree,
          institution: parsedInput.institution,
          location: parsedInput.location ?? "",
          timePeriod: parsedInput.timePeriod ?? null,
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
        throw new ActionError("Failed to update education", 500);
      }
      throw error;
    }

    if (resumeId) {
      revalidatePath(`/resume/${resumeId}`);
    }

    return {
      success: true,
      message: "Education updated successfully",
      statusCode: 200,
    };
  });

export const deleteEducationAction = safeAction
  .inputSchema(
    z.object({
      id: objectIdSchemaFn("Invalid education ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    let resumeId: string | null = null;

    try {
      const education = await prisma.education.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!education) {
        throw new ActionError("Education not found", 404);
      }

      if (education.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to delete this education",
          403
        );
      }

      resumeId = education.resumeId;

      await prisma.education.delete({
        where: { id: parsedInput.id },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to delete education", 500);
      }
      throw error;
    }

    if (resumeId) {
      revalidatePath(`/resume/${resumeId}`);
    }

    return {
      success: true,
      message: "Education deleted successfully",
      statusCode: 200,
    };
  });
