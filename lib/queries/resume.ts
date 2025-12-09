import "server-only";
import { validateUser } from "../actions/validate-user";
import { OBJECT_ID_REGEX } from "../const";
import prisma from "../prisma";
import { ActionError } from "../safe-action";

export const fetchUserResume = async (resumeId: string) => {
  try {
    await validateUser();

    if (!resumeId || !OBJECT_ID_REGEX.test(resumeId))
      throw new ActionError("Invalid resume ID format", 400);

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
      include: {
        profile: true,
        user: true,
        workExperiences: {
          orderBy: {
            startDate: "desc",
          },
        },
        educations: {
          orderBy: {
            startDate: "desc",
          },
        },
        skills: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!resume) {
      throw new ActionError("Resume not found or access denied", 404);
    }

    return resume;
  } catch (error) {
    console.log({ error });

    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError(
      "Failed to fetch resume. Please try again later.",
      500
    );
  }
};
