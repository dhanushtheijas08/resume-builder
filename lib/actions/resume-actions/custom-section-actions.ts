"use server";
import { PrismaClientKnownRequestError } from "@/app/generated/prisma/internal/prismaNamespace";
import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { ActionError, safeAction } from "@/lib/safe-action";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";
import { ResponseData } from "@/lib/validations/auth";
import {
  objectIdSchemaFn,
  customSectionSchema,
} from "@/lib/validations/resume";
import { validateUser } from "../validate-user";
import { z } from "zod";

export const createCustomSectionAction = safeAction
  .inputSchema(
    customSectionSchema.safeExtend({
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

    let processedContent: Prisma.InputJsonValue =
      parsedInput.content as Prisma.InputJsonValue;

    if (parsedInput.type === "SUMMARY") {
      processedContent = parsedInput.content
        ? sanitizeServerHtml(String(parsedInput.content))
        : "";
    } else {
      if (
        typeof parsedInput.content === "object" &&
        parsedInput.content !== null
      ) {
        const content = parsedInput.content as Record<string, unknown>;
        if (typeof content.description === "string") {
          content.description = sanitizeServerHtml(content.description);
        }
        if (typeof content.bio === "string") {
          content.bio = sanitizeServerHtml(content.bio);
        }
        processedContent = content as Prisma.InputJsonValue;
      }
    }

    try {
      await prisma.customSection.create({
        data: {
          title: parsedInput.title,
          type: parsedInput.type,
          order: parsedInput.order,
          content: processedContent,
          resumeId: parsedInput.resumeId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to create custom section", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Custom section created successfully",
      statusCode: 201,
    };
  });

export const editCustomSectionAction = safeAction
  .inputSchema(
    customSectionSchema.safeExtend({
      id: objectIdSchemaFn("Invalid custom section ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    try {
      const customSection = await prisma.customSection.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!customSection) {
        throw new ActionError("Custom section not found", 404);
      }

      if (customSection.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to edit this custom section",
          403
        );
      }

      let processedContent: Prisma.InputJsonValue =
        parsedInput.content as Prisma.InputJsonValue;

      if (parsedInput.type === "SUMMARY") {
        processedContent = parsedInput.content
          ? sanitizeServerHtml(String(parsedInput.content))
          : "";
      } else {
        if (
          typeof parsedInput.content === "object" &&
          parsedInput.content !== null
        ) {
          const content = parsedInput.content as Record<string, unknown>;
          if (typeof content.description === "string") {
            content.description = sanitizeServerHtml(content.description);
          }
          if (typeof content.bio === "string") {
            content.bio = sanitizeServerHtml(content.bio);
          }
          processedContent = content as Prisma.InputJsonValue;
        }
      }

      await prisma.customSection.update({
        where: { id: parsedInput.id },
        data: {
          title: parsedInput.title,
          type: parsedInput.type,
          order: parsedInput.order,
          content: processedContent,
        },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to update custom section", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Custom section updated successfully",
      statusCode: 200,
    };
  });

export const deleteCustomSectionAction = safeAction
  .inputSchema(
    z.object({
      id: objectIdSchemaFn("Invalid custom section ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    try {
      const customSection = await prisma.customSection.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!customSection) {
        throw new ActionError("Custom section not found", 404);
      }

      if (customSection.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to delete this custom section",
          403
        );
      }

      await prisma.customSection.delete({
        where: { id: parsedInput.id },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to delete custom section", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Custom section deleted successfully",
      statusCode: 200,
    };
  });
