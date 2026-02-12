"use client";
import { Button } from "@/components/ui/button";
import { GitHubIcon, GoogleIcon } from "@/components/icons";
import { socialLoginAction } from "@/lib/actions/auth-actions";
import { useAction } from "next-safe-action/hooks";

export const SocialProvider = () => {
  const { execute, status } = useAction(socialLoginAction);
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline-2"
        className="flex-1 font-semibold bg-secondary/80 hover:bg-secondary/80 sm:bg-background"
        onClick={() => execute({ provider: "github" })}
        disabled={status === "executing"}
      >
        <GitHubIcon />
        GitHub
      </Button>
      <Button
        type="button"
        variant="outline-2"
        className="flex-1 font-semibold bg-secondary/80 hover:bg-secondary/80 sm:bg-background"
        onClick={() => execute({ provider: "google" })}
        disabled={status === "executing"}
      >
        <GoogleIcon />
        Google
      </Button>
    </div>
  );
};
