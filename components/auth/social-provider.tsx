"use client";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import { socialLoginAction } from "@/lib/actions/auth-action";
import { useAction } from "next-safe-action/hooks";

export const SocialProvider = () => {
  const { execute, status } = useAction(socialLoginAction);
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline-2"
        className="flex-1 font-semibold"
        onClick={() => execute({ provider: "github" })}
        disabled={status === "executing"}
      >
        <GitHubIcon />
        GitHub
      </Button>
      <Button
        type="button"
        variant="outline-2"
        className="flex-1 font-semibold"
        onClick={() => execute({ provider: "google" })}
        disabled={status === "executing"}
      >
        <GoogleIcon />
        Google
      </Button>
    </div>
  );
};
