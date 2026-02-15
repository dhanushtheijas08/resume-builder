"use server";
import { auth } from "@/lib/auth";
import { ActionError, safeAction } from "../safe-action";
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
  ResponseData,
  socialLoginSchema,
  updateUserSchema,
} from "../validations/auth";
import { APIError } from "better-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export const loginAction = safeAction
  .inputSchema(loginSchema)
  .action(
    async ({ parsedInput: { email, password } }): Promise<ResponseData> => {
      try {
        await auth.api.signInEmail({
          body: {
            email,
            password,
            callbackURL: "/dashboard",
          },
        });

        return {
          message: "Login successful",
          statusCode: 200,
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
        throw new ActionError("Failed to login", 500);
      }
    }
  );

export const registerAction = safeAction
  .inputSchema(registerSchema)
  .action(
    async ({
      parsedInput: { name, email, password },
    }): Promise<ResponseData> => {
      try {
        await auth.api.signUpEmail({
          body: {
            name,
            email,
            password,
            callbackURL: "/dashboard",
          },
        });

        return {
          success: true,
          redirectUrl: "/dashboard",
          message: "Account created successfully",
          statusCode: 200,
        };
      } catch (error) {
        if (error instanceof APIError) {
          throw new ActionError(error.message, error.statusCode);
        }
        if (error instanceof ActionError) {
          throw error;
        }
        throw new ActionError("Failed to create account", 500);
      }
    }
  );

export const socialLoginAction = safeAction
  .inputSchema(socialLoginSchema)
  .action(async ({ parsedInput: { provider } }) => {
    let url: string | null = null;

    try {
      const response = await auth.api.signInSocial({
        body: { provider, callbackURL: "/dashboard" },
      });
      url = response.url ?? null;
    } catch (error) {
      if (error instanceof APIError) {
        throw new ActionError(error.message, error.statusCode);
      }
      if (error instanceof ActionError) {
        throw error;
      }
      throw new ActionError("Failed to login", 500);
    }

    if (!url) {
      throw new ActionError("Missing redirect URL", 500);
    }

    redirect(url);
  });


export const signOutAction = safeAction.action(async () => {
  try {
    const nextHeaders = await headers();
    await auth.api.signOut({
      headers: nextHeaders,
    });
  } catch (error) {
    if (error instanceof APIError) {
      throw new ActionError(error.message, error.statusCode);
    }
    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError("Failed to sign out", 500);
  }
});

export const updateUserAction = safeAction
  .inputSchema(updateUserSchema)
  .action(async ({ parsedInput: { name } }) => {
    try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session) {
        throw new ActionError("Unauthorized", 401);
      }

      await auth.api.updateUser({
        body: {
          name,
        },
        headers: await headers(),
      });

      return {
        success: true,
        message: "Profile updated successfully",
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof APIError) {
        throw new ActionError(error.message, error.statusCode);
      }
      if (error instanceof ActionError) {
        throw error;
      }
      throw new ActionError("Failed to update profile", 500);
    }
  });

export const changePasswordAction = safeAction
  .inputSchema(changePasswordSchema)
  .action(async ({ parsedInput: { currentPassword, newPassword, confirmPassword } }) => {
    try {
      const nextHeaders = await headers();
      const session = await auth.api.getSession({ headers: nextHeaders });
      if (!session) {
        throw new ActionError("Unauthorized", 401);
      }

      if (newPassword !== confirmPassword) {
        throw new ActionError("Passwords do not match", 400);
      }

      await auth.api.changePassword({
        body: {
          currentPassword,
          newPassword,
          revokeOtherSessions: false,
        },
        headers: nextHeaders,
      });

      await auth.api.revokeSessions({
        headers: nextHeaders,
      });

      return {
        success: true,
        message: "Password updated. You have been logged out on all devices.",
        statusCode: 200,
        redirectUrl: "/login",
      };
    } catch (error) {
      if (error instanceof APIError) {
        throw new ActionError(error.message, error.statusCode);
      }
      if (error instanceof ActionError) {
        throw error;
      }
      throw new ActionError("Failed to change password", 500);
    }
  });

export const deleteUserAction = safeAction.action(async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new ActionError("Unauthorized", 401);
    }

    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    return {
      success: true,
      message: "Account deleted successfully",
      statusCode: 200,
      redirectUrl: "/",
    };
  } catch (error) {
    if (error instanceof ActionError) {
      throw error;
    }
    throw new ActionError("Failed to delete account", 500);
  }
});