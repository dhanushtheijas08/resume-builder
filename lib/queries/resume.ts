import "server-only";
import { validateUser } from "../actions/validate-user";
import { OBJECT_ID_REGEX } from "../const";
import prisma from "../prisma";
import { ActionError } from "../safe-action";

export const fetchResumeById = async (resumeId: string) => {
  try {
    const user = await validateUser();

    if (!resumeId || !OBJECT_ID_REGEX.test(resumeId))
      throw new ActionError("Invalid resume ID format", 400);

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
      include: {
        template: {
          select: {
            metaData: true,
          },
        },
        profile: true,
        user: true,
        workExperiences: {
          orderBy: {
            order: "asc",
          },
        },
        educations: {
          orderBy: {
            order: "asc",
          },
        },
        skills: {
          orderBy: {
            createdAt: "asc",
          },
        },
        projects: {
          orderBy: {
            order: "asc",
          },
        },
        certifications: {
          orderBy: {
            order: "asc",
          },
        },
        publications: {
          orderBy: {
            order: "asc",
          },
        },
        customSection: {
          orderBy: {
            order: "asc",
          },
        },
        awards: true,
      },
    });

    if (!resume || resume.userId !== user.id) {
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
      500,
    );
  }
};

export const fetchUserResumes = async () => {
  try {
    const user = await validateUser();

    const resumes = await prisma.resume.findMany({
      where: {
        userId: user.id,
      },
      include: {
        template: {
          select: {
            title: true,
            previewImageUrl: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return resumes;
  } catch (error) {
    console.log({ error });

    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError(
      "Failed to fetch resumes. Please try again later.",
      500,
    );
  }
};

export const updateResumeExportedUrl = async (
  resumeId: string,
  url: string,
) => {
  try {
    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        exportedResumeUrl: url,
        lastExportedAt: new Date(),
      },
    });
  } catch (error) {
    console.log({ error });
    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError(
      "Failed to update resume exported URL. Please try again later.",
      500,
    );
  }
};
