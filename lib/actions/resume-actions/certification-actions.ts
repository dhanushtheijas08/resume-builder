"use server";
import { PrismaClientKnownRequestError } from "@/app/generated/prisma/internal/prismaNamespace";
import prisma from "@/lib/prisma";
import { ActionError, safeAction } from "@/lib/safe-action";
import { ResponseData } from "@/lib/validations/auth";
import {
  objectIdSchemaFn,
  certificationSchema,
} from "@/lib/validations/resume";
import { validateUser } from "../validate-user";
import { z } from "zod";

export const createCertificationAction = safeAction
  .inputSchema(
    certificationSchema.safeExtend({
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
      await prisma.certification.create({
        data: {
          order: parsedInput.order,
          title: parsedInput.title,
          issuer: parsedInput.issuer,
          credentialUrl:
            parsedInput.credentialUrl && parsedInput.credentialUrl !== ""
              ? parsedInput.credentialUrl
              : null,
          description: parsedInput.description ?? null,
          resumeId: parsedInput.resumeId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to create certification", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Certification created successfully",
      statusCode: 201,
    };
  });

export const editCertificationAction = safeAction
  .inputSchema(
    certificationSchema.safeExtend({
      id: objectIdSchemaFn("Invalid certification ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    try {
      const certification = await prisma.certification.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!certification) {
        throw new ActionError("Certification not found", 404);
      }

      if (certification.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to edit this certification",
          403
        );
      }

      await prisma.certification.update({
        where: { id: parsedInput.id },
        data: {
          order: parsedInput.order,
          title: parsedInput.title,
          issuer: parsedInput.issuer,
          credentialUrl:
            parsedInput.credentialUrl && parsedInput.credentialUrl !== ""
              ? parsedInput.credentialUrl
              : null,
          description: parsedInput.description ?? null,
        },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to update certification", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Certification updated successfully",
      statusCode: 200,
    };
  });

export const deleteCertificationAction = safeAction
  .inputSchema(
    z.object({
      id: objectIdSchemaFn("Invalid certification ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    try {
      const certification = await prisma.certification.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!certification) {
        throw new ActionError("Certification not found", 404);
      }

      if (certification.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to delete this certification",
          403
        );
      }

      await prisma.certification.delete({
        where: { id: parsedInput.id },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to delete certification", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Certification deleted successfully",
      statusCode: 200,
    };
  });

