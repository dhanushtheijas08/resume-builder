"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import { ActionError, safeAction } from "@/lib/safe-action";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";
import { ResponseData } from "@/lib/validations/auth";
import { objectIdSchemaFn, personalInfoSchme } from "@/lib/validations/resume";
import { validateUser } from "../validate-user";
import { revalidatePath } from "next/cache";

export const createProfileAction = safeAction
  .inputSchema(
    personalInfoSchme.extend({
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
          profile: {
            create: {
              name: parsedInput.name,
              email: parsedInput.email,
              phoneNumber: parsedInput.phoneNumber,
              bio: parsedInput.bio ? sanitizeServerHtml(parsedInput.bio) : "",
              designation: parsedInput.designation ?? "",
              location: parsedInput.location ?? "",
              profileImage: parsedInput.profileImage ?? "",
              github: parsedInput.github ?? "",
              linkedin: parsedInput.linkedin ?? "",
              portfolio: parsedInput.portfolio ?? "",
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ActionError("Profile already exists for this resume", 409);
        } else {
          throw new ActionError("Failed to create profile", 500);
        }
      }
    }

    revalidatePath(`/resume/${parsedInput.resumeId}`);

    return {
      success: true,
      message: "Profile created successfully",
      statusCode: 201,
    };
  });
export const editProfileAction = safeAction
  .inputSchema(
    personalInfoSchme.extend({
      id: objectIdSchemaFn("Invalid profile ID"),
    })
  )
  .action(async ({ parsedInput }): Promise<ResponseData> => {
    await validateUser();

    let resumeId: string | null = null;

    try {
      const profile = await prisma.profile.findUnique({
        where: { id: parsedInput.id },
        include: { resumes: { select: { id: true }, take: 1 } },
      });

      if (!profile) {
        throw new ActionError("Profile not found", 404);
      }

      if (profile.resumes[0]) {
        resumeId = profile.resumes[0].id;
      }

      await prisma.profile.update({
        where: { id: parsedInput.id },
        data: {
          name: parsedInput.name,
          email: parsedInput.email,
          phoneNumber: parsedInput.phoneNumber,
          bio: parsedInput.bio ? sanitizeServerHtml(parsedInput.bio) : "",
          designation: parsedInput.designation ?? "",
          location: parsedInput.location ?? "",
          profileImage: parsedInput.profileImage ?? "",
          github: parsedInput.github ?? "",
          linkedin: parsedInput.linkedin ?? "",
          portfolio: parsedInput.portfolio ?? "",
        },
      });
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ActionError("Profile already exists for this resume", 409);
        } else {
          throw new ActionError("Failed to update profile", 500);
        }
      }
    }

    if (resumeId) {
      revalidatePath(`/resume/${resumeId}`);
    }

    return {
      success: true,
      message: "Profile updated successfully",
      statusCode: 201,
    };
  });
