"use server";
import { APIError } from "better-auth";
import prisma from "../prisma";
import { ActionError, safeAction } from "../safe-action";
import { ResponseData } from "../validations/auth";
import { createResumeSchema } from "../validations/resume";
import { validateUser } from "./validate-user";

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
