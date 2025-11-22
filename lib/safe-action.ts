import { createSafeActionClient } from "next-safe-action";
import { ResponseData } from "./validations/auth";
export class ActionError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public redirectUrl?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.redirectUrl = redirectUrl;
  }
}
export const safeAction = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
  handleServerError: (error): ResponseData => {
    console.log(error);
    if (error instanceof ActionError) {
      return {
        message: error.message,
        statusCode: error.statusCode,
        success: false,
        redirectUrl: error.redirectUrl,
      };
    }
    return {
      message: "An unknown error occurred",
      statusCode: 500,
      success: false,
    };
  },
});
