"use server";
import { PrismaClientKnownRequestError } from "@/app/generated/prisma/internal/prismaNamespace";
import prisma from "@/lib/prisma";
import { ActionError, safeAction } from "@/lib/safe-action";
import { ResponseData } from "@/lib/validations/auth";
import { objectIdSchemaFn, awardSchema } from "@/lib/validations/resume";
import { validateUser } from "../validate-user";
import { z } from "zod";

export const upsertAwardAction = safeAction
  .inputSchema(
    awardSchema.safeExtend({
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
      await prisma.resume.update({
        where: { id: parsedInput.resumeId },
        data: {
          awards: parsedInput.description,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to save awards", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Awards saved successfully",
      statusCode: 200,
    };
  });

export const deleteAwardAction = safeAction
  .inputSchema(
    z.object({
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
          "You do not have permission to delete awards from this resume",
          403
        );
      }

      await prisma.resume.update({
        where: { id: parsedInput.resumeId },
        data: {
          awards: null,
        },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to delete awards", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Awards deleted successfully",
      statusCode: 200,
    };
  });
