import { APIError } from "better-auth";
import { ActionError } from "../safe-action";
import { getUserSession } from "../server-helper";

export const validateUser = async () => {
  try {
    const session = await getUserSession();
    if (session instanceof Error) {
      throw new ActionError(session.message, 401);
    }
    const { user } = session;
    if (!user) {
      throw new ActionError("Unauthorized: No user found", 401);
    }
    return user;
  } catch (error) {
    if (error instanceof APIError) {
      throw new ActionError(error.message, error.statusCode);
    }
    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError("Unauthorized: Failed to validate user", 401);
  }
};
