"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import { ActionError, safeAction } from "@/lib/safe-action";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";
import { ResponseData } from "@/lib/validations/auth";
import { objectIdSchemaFn, publicationSchema } from "@/lib/validations/resume";
import { validateUser } from "../validate-user";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const createPublicationAction = safeAction
  .inputSchema(
    publicationSchema.safeExtend({
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
      await prisma.publication.create({
        data: {
          order: parsedInput.order,
          title: parsedInput.title,
          publisher: parsedInput.publisher,
          url:
            parsedInput.url && parsedInput.url !== "" ? parsedInput.url : null,
          summary: parsedInput.summary
            ? sanitizeServerHtml(parsedInput.summary)
            : null,
          resumeId: parsedInput.resumeId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to create publication", 500);
      }
      throw error;
    }

    revalidatePath(`/resume/${parsedInput.resumeId}`);

    return {
      success: true,
      message: "Publication created successfully",
      statusCode: 201,
    };
  });

export const editPublicationAction = safeAction
  .inputSchema(
    publicationSchema.safeExtend({
      id: objectIdSchemaFn("Invalid publication ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    let resumeId: string | null = null;

    try {
      const publication = await prisma.publication.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!publication) {
        throw new ActionError("Publication not found", 404);
      }

      if (publication.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to edit this publication",
          403
        );
      }

      resumeId = publication.resumeId;

      await prisma.publication.update({
        where: { id: parsedInput.id },
        data: {
          order: parsedInput.order,
          title: parsedInput.title,
          publisher: parsedInput.publisher,
          url:
            parsedInput.url && parsedInput.url !== "" ? parsedInput.url : null,
          summary: parsedInput.summary
            ? sanitizeServerHtml(parsedInput.summary)
            : null,
        },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to update publication", 500);
      }
      throw error;
    }

    if (resumeId) {
      revalidatePath(`/resume/${resumeId}`);
    }

    return {
      success: true,
      message: "Publication updated successfully",
      statusCode: 200,
    };
  });

export const deletePublicationAction = safeAction
  .inputSchema(
    z.object({
      id: objectIdSchemaFn("Invalid publication ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    let resumeId: string | null = null;

    try {
      const publication = await prisma.publication.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!publication) {
        throw new ActionError("Publication not found", 404);
      }

      if (publication.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to delete this publication",
          403
        );
      }

      resumeId = publication.resumeId;

      await prisma.publication.delete({
        where: { id: parsedInput.id },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to delete publication", 500);
      }
      throw error;
    }

    if (resumeId) {
      revalidatePath(`/resume/${resumeId}`);
    }

    return {
      success: true,
      message: "Publication deleted successfully",
      statusCode: 200,
    };
  });
