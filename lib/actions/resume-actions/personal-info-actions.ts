"use server";
import { PrismaClientKnownRequestError } from "@/app/generated/prisma/internal/prismaNamespace";
import prisma from "@/lib/prisma";
import { ActionError, safeAction } from "@/lib/safe-action";
import { ResponseData } from "@/lib/validations/auth";
import { objectIdSchemaFn, personalInfoSchme } from "@/lib/validations/resume";
import { validateUser } from "../validate-user";

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
      const resume = await prisma.resume.update({
        where: { id: parsedInput.resumeId },
        data: {
          profile: {
            create: {
              name: parsedInput.name,
              email: parsedInput.email,
              phoneNumber: parsedInput.phoneNumber,
              bio: parsedInput.bio ?? "",
              designation: parsedInput.designation ?? "",
              location: parsedInput.location ?? "",
              profileImage: parsedInput.profileImage ?? "",
              github: parsedInput.github ?? "",
              linkedin: parsedInput.linkedin ?? "",
              portfolio: parsedInput.portfolio ?? "",
            },
          },
        },
        include: {
          profile: true,
        },
      });
      console.log({ resume });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ActionError("Profile already exists for this resume", 409);
        } else {
          throw new ActionError("Failed to create profile", 500);
        }
      }
    }
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
    const user = await validateUser();

    try {
      const profile = await prisma.profile.update({
        where: { id: parsedInput.id },
        data: {
          name: parsedInput.name,
          email: parsedInput.email,
          phoneNumber: parsedInput.phoneNumber,
          bio: parsedInput.bio ?? "",
          designation: parsedInput.designation ?? "",
          location: parsedInput.location ?? "",
          profileImage: parsedInput.profileImage ?? "",
          github: parsedInput.github ?? "",
          linkedin: parsedInput.linkedin ?? "",
          portfolio: parsedInput.portfolio ?? "",
        },
      });
      console.log({ profile });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ActionError("Profile already exists for this resume", 409);
        } else {
          throw new ActionError("Failed to create profile", 500);
        }
      }
    }
    return {
      success: true,
      message: "Profile updated successfully",
      statusCode: 201,
    };
  });
