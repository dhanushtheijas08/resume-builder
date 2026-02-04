"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResumeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const getErrorMessage = () => {
    if (error.message.includes("404") || error.message.includes("not found")) {
      return {
        title: "Resume Not Found",
        description:
          "The resume you're looking for doesn't exist or you don't have access to it.",
      };
    }
    if (
      error.message.includes("401") ||
      error.message.includes("Unauthorized")
    ) {
      return {
        title: "Unauthorized",
        description: "Please sign in to access this resume.",
      };
    }
    if (error.message.includes("403") || error.message.includes("permission")) {
      return {
        title: "Access Denied",
        description: "You don't have permission to view this resume.",
      };
    }
    return {
      title: "Something went wrong",
      description:
        error.message || "An unexpected error occurred. Please try again.",
    };
  };

  const { title, description } = getErrorMessage();

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex items-center justify-between px-4 py-2.5 border-b">
        <h1 className="text-xl font-bold">Coder CV</h1>
      </nav>
      <div className="flex items-center justify-center h-[calc(100vh-3.75rem)]">
        <div className="flex flex-col items-center gap-4 max-w-md text-center px-4">
          <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
            <Button onClick={reset}>Try Again</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
