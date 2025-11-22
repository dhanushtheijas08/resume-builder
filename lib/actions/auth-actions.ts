"use server";
import { auth } from "@/lib/auth";
import { ActionError, safeAction } from "../safe-action";
import {
  loginSchema,
  registerSchema,
  ResponseData,
  socialLoginSchema,
} from "../validations/auth";
import { APIError } from "better-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

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