"use client";

import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";

export const UserWelcomeMessge = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  return (
    <div>
      {isPending ? (
        <Skeleton className="h-10 w-full rounded-lg max-w-68" />
      ) : (
        <h3 className="text-3xl font-bold tracking-tight">
          Hello, {user?.name || "Test User"}! 👋
        </h3>
      )}

      <p className="text-muted-foreground mt-1">
        Welcome back. Lets create something amazing today.
      </p>
    </div>
  );
};
