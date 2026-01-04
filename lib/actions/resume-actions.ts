"use server";
import { APIError } from "better-auth";
import prisma from "../prisma";
import { ActionError, safeAction } from "../safe-action";
import { ResponseData } from "../validations/auth";
import { createResumeSchema, updatedOrderSchema } from "../validations/resume";
import { validateUser } from "./validate-user";
import { revalidatePath } from "next/cache";

export const createResumeAction = safeAction
  .inputSchema(createResumeSchema)
  .action(
    async ({ parsedInput: { title, templateId } }): Promise<ResponseData> => {
      try {
        const user = await validateUser();
        if (!user) {
          throw new ActionError("User not found", 404);
        }
        const resume = await prisma.resume.create({
          data: {
            title,
            templateId,
            userId: user.id,
          },
        });
        return {
          message: "Resume created successfully",
          statusCode: 200,
          success: true,
          redirectUrl: `/resume/${resume.id}`,
        };
      } catch (error) {
        if (error instanceof APIError) {
          throw new ActionError(error.message, error.statusCode);
        }
        if (error instanceof ActionError) {
          throw error;
        }
        throw new ActionError("Failed to create resume", 500);
      }
    }
  );

export const updateOrderAction = safeAction
  .inputSchema(updatedOrderSchema)
  .action(
    async ({ parsedInput: { type, updatedOrder } }): Promise<ResponseData> => {
      let resumeId: string | null = null;
      try {
        const user = await validateUser();
        if (!user) {
          throw new ActionError("User not found", 404);
        }

        switch (type) {
          case "EDUCATION": {
            const eduTransactions = updatedOrder.map((ord) =>
              prisma.education.update({
                where: { id: ord.id },
                data: { order: ord.order },
              })
            );

            const updatedEducations = await prisma.$transaction(
              eduTransactions
            );
            if (updatedEducations.length > 0) {
              resumeId = updatedEducations[0].resumeId ?? null;
            }
            break;
          }

          case "EXPERIENCE": {
            const expTransactions = updatedOrder.map((ord) =>
              prisma.workExperience.update({
                where: { id: ord.id },
                data: { order: ord.order },
              })
            );

            const updatedExperiences = await prisma.$transaction(
              expTransactions
            );
            if (updatedExperiences.length > 0) {
              resumeId = updatedExperiences[0].resumeId ?? null;
            }
            break;
          }

          case "PROJECT": {
            const projectTransactions = updatedOrder.map((ord) =>
              prisma.project.update({
                where: { id: ord.id },
                data: { order: ord.order },
              })
            );

            const updatedProjects = await prisma.$transaction(
              projectTransactions
            );
            if (updatedProjects.length > 0) {
              resumeId = updatedProjects[0].resumeId ?? null;
            }
            break;
          }

          case "CERTIFICATION": {
            const certTransactions = updatedOrder.map((ord) =>
              prisma.certification.update({
                where: { id: ord.id },
                data: { order: ord.order },
              })
            );

            const updatedCertifications = await prisma.$transaction(
              certTransactions
            );
            if (updatedCertifications.length > 0) {
              resumeId = updatedCertifications[0].resumeId ?? null;
            }
            break;
          }

          case "PUBLICATION": {
            const pubTransactions = updatedOrder.map((ord) =>
              prisma.publication.update({
                where: { id: ord.id },
                data: { order: ord.order },
              })
            );

            const updatedPublications = await prisma.$transaction(
              pubTransactions
            );
            if (updatedPublications.length > 0) {
              resumeId = updatedPublications[0].resumeId ?? null;
            }
            break;
          }

          case "CUSTOM_SECTION": {
            const customTransactions = updatedOrder.map((ord) =>
              prisma.customSection.update({
                where: { id: ord.id },
                data: { order: ord.order },
              })
            );

            const updatedCustomSections = await prisma.$transaction(
              customTransactions
            );
            if (updatedCustomSections.length > 0) {
              resumeId = updatedCustomSections[0].resumeId ?? null;
            }
            break;
          }

          default:
            throw new ActionError("Invalid section type", 400);
        }
      } catch (error) {
        if (error instanceof APIError) {
          throw new ActionError(error.message, error.statusCode);
        }
        throw error;
      }

      if (resumeId) {
        revalidatePath(`/resume/${resumeId}`);
      }

      const sectionMessages: Record<string, string> = {
        EDUCATION: "Education order updated successfully",
        EXPERIENCE: "Work experience order updated successfully",
        PROJECT: "Project order updated successfully",
        CERTIFICATION: "Certification order updated successfully",
        PUBLICATION: "Publication order updated successfully",
        CUSTOM_SECTION: "Custom section order updated successfully",
      };

      return {
        success: true,
        message: sectionMessages[type] || "Order updated successfully",
        statusCode: 200,
      };
    }
  );
