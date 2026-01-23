"use server";
import { APIError } from "better-auth";
import prisma from "../prisma";
import { ActionError, safeAction } from "../safe-action";
import { ResponseData } from "../validations/auth";
import { createResumeSchema, duplicateResumeSchema, objectIdSchemaFn, updatedOrderSchema } from "../validations/resume";
import { validateUser } from "./validate-user";
import { revalidatePath } from "next/cache";
import { z } from "zod"

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


  const deleteResumeById = async (resumeId: string) => {
     const user = await validateUser();

  try {
    const resume = await prisma.resume.delete({
      where: {
        id: resumeId,
        userId: user.id
      }
    })

    if (!resume) {
      throw new ActionError("Resume not found or access denied", 404);
    }

    
  } catch (error) {
    console.log({ error });

    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError(
      "Failed to delete resume. Please try again later.",
      500
    );
  }
}

export const deleteResumeAction = safeAction
  .inputSchema(z.object({resumeId: objectIdSchemaFn("Invalid resume ID format")}))
  .action(
    async ({ parsedInput: { resumeId } }): Promise<ResponseData> => {
      try {
        await deleteResumeById(resumeId);
        revalidatePath("/dashboard");

        return {
          message: "Resume deleted successfully",
          statusCode: 204,
          success: true,
          redirectUrl: "/dashboard",
        };
      } catch (error) {
        if (error instanceof APIError) {
          throw new ActionError(error.message, error.statusCode);
        }
        if (error instanceof ActionError) {
          throw error;
        }
        throw new ActionError("Failed to delete resume", 500);
      }
    }
  );
export const duplicateResumeAction = safeAction
  .inputSchema(duplicateResumeSchema)
  .action(
    async ({ parsedInput: { resumeId, title } }): Promise<ResponseData> => {
      try {
        const user = await validateUser();
        if (!user) {
          throw new ActionError("User not found", 404);
        }

        const originalResume = await prisma.resume.findUnique({
          where: { id: resumeId },
          include: {
            workExperiences: true,
            educations: true,
            skills: true,
            projects: true,
            certifications: true,
            awards: true,
            publications: true,
            customSection: true,
          },
        });

        if (!originalResume || originalResume.userId !== user.id) {
          throw new ActionError("Resume not found", 404);
        }

        const newResume = await prisma.resume.create({
          data: {
            title,
            templateId: originalResume.templateId,
            userId: user.id,
            profileId: originalResume.profileId,
          },
        });

        if (originalResume.workExperiences.length > 0) {
          await prisma.workExperience.createMany({
            data: originalResume.workExperiences.map(({ id, resumeId, createdAt, updatedAt, ...rest }) => ({
              ...rest,
              resumeId: newResume.id,
            })),
          });
        }

        if (originalResume.educations.length > 0) {
          await prisma.education.createMany({
            data: originalResume.educations.map(({ id, resumeId, createdAt, updatedAt, ...rest }) => ({
              ...rest,
              resumeId: newResume.id,
            })),
          });
        }

        if (originalResume.skills.length > 0) {
          await prisma.skill.createMany({
            data: originalResume.skills.map(({ id, resumeId, createdAt, updatedAt, ...rest }) => ({
              ...rest,
              resumeId: newResume.id,
            })),
          });
        }

        if (originalResume.projects.length > 0) {
          await prisma.project.createMany({
            data: originalResume.projects.map(({ id, resumeId, createdAt, updatedAt, ...rest }) => ({
              ...rest,
              resumeId: newResume.id,
              technologies: rest.technologies || [],
            })),
          });
        }

        if (originalResume.certifications.length > 0) {
          await prisma.certification.createMany({
            data: originalResume.certifications.map(({ id, resumeId, createdAt, updatedAt, ...rest }) => ({
              ...rest,
              resumeId: newResume.id,
            })),
          });
        }

        if (originalResume.publications.length > 0) {
          await prisma.publication.createMany({
            data: originalResume.publications.map(({ id, resumeId, createdAt, updatedAt, ...rest }) => ({
              ...rest,
              resumeId: newResume.id,
            })),
          });
        }

        if (originalResume.awards) {
          const { id, resumeId, createdAt, updatedAt, ...awardRest } = originalResume.awards;
          await prisma.award.create({
            data: {
              ...awardRest,
              resumeId: newResume.id,
            },
          });
        }

        // Handle Custom Sections
        // if (originalResume.customSection.length > 0) {
        //   await prisma.customSection.createMany({
        //     data: originalResume.customSection.map(({ id, resumeId, ...rest }) => ({
        //       ...rest,
        //       resumeId: newResume.id,
        //     })),
        //   });
        // }

        return {
          message: "Resume duplicated successfully",
          statusCode: 201,
          success: true,
          redirectUrl: `/resume/${newResume.id}`,
        };
      } catch (error) {
        if (error instanceof ActionError) throw error;
        console.error("Duplication error:", error);
        throw new ActionError("Failed to duplicate resume", 500);
      }
    }
  );
