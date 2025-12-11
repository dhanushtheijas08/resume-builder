"use server";
import { PrismaClientKnownRequestError } from "@/app/generated/prisma/internal/prismaNamespace";
import prisma from "@/lib/prisma";
import { ActionError, safeAction } from "@/lib/safe-action";
import { ResponseData } from "@/lib/validations/auth";
import { objectIdSchemaFn, projectSchema } from "@/lib/validations/resume";
import { validateUser } from "../validate-user";
import { z } from "zod";

export const createProjectAction = safeAction
  .inputSchema(
    projectSchema.safeExtend({
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

    const technologiesArray = parsedInput.technologies
      ? parsedInput.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    try {
      await prisma.project.create({
        data: {
          order: parsedInput.order,
          name: parsedInput.name,
          description: parsedInput.description ?? "",
          url:
            parsedInput.url && parsedInput.url !== "" ? parsedInput.url : null,
          github:
            parsedInput.github && parsedInput.github !== ""
              ? parsedInput.github
              : null,
          technologies: technologiesArray,
          startDate: parsedInput.startDate ?? null,
          endDate: parsedInput.isCurrent
            ? null
            : parsedInput.endDate && parsedInput.endDate !== ""
            ? parsedInput.endDate
            : null,
          isCurrent: parsedInput.isCurrent,
          resumeId: parsedInput.resumeId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to create project", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Project created successfully",
      statusCode: 201,
    };
  });

export const editProjectAction = safeAction
  .inputSchema(
    projectSchema.safeExtend({
      id: objectIdSchemaFn("Invalid project ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    try {
      const project = await prisma.project.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!project) {
        throw new ActionError("Project not found", 404);
      }

      if (project.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to edit this project",
          403
        );
      }

      const technologiesArray = parsedInput.technologies
        ? parsedInput.technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      await prisma.project.update({
        where: { id: parsedInput.id },
        data: {
          order: parsedInput.order,
          name: parsedInput.name,
          description: parsedInput.description ?? "",
          url:
            parsedInput.url && parsedInput.url !== "" ? parsedInput.url : null,
          github:
            parsedInput.github && parsedInput.github !== ""
              ? parsedInput.github
              : null,
          technologies: technologiesArray,
          startDate: parsedInput.startDate ?? null,
          endDate: parsedInput.isCurrent
            ? null
            : parsedInput.endDate && parsedInput.endDate !== ""
            ? parsedInput.endDate
            : null,
          isCurrent: parsedInput.isCurrent,
        },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to update project", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Project updated successfully",
      statusCode: 200,
    };
  });

export const deleteProjectAction = safeAction
  .inputSchema(
    z.object({
      id: objectIdSchemaFn("Invalid project ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    const user = await validateUser();

    try {
      const project = await prisma.project.findUnique({
        where: { id: parsedInput.id },
        include: { resume: { select: { userId: true } } },
      });

      if (!project) {
        throw new ActionError("Project not found", 404);
      }

      if (project.resume.userId !== user.id) {
        throw new ActionError(
          "You do not have permission to delete this project",
          403
        );
      }

      await prisma.project.delete({
        where: { id: parsedInput.id },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ActionError("Failed to delete project", 500);
      }
      throw error;
    }

    return {
      success: true,
      message: "Project deleted successfully",
      statusCode: 200,
    };
  });
