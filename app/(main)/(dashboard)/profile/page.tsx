"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getJoinedYear } from "@/lib/utils";
import { PageHeader } from "@/components/profile/page-header";
import { ProfileOverview } from "@/components/profile/profile-overview";
import { AccountSettings } from "@/components/profile/account-settings";
import { DeleteAccount } from "@/components/profile/delete-account";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="bg-background">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-10">
          <div className="space-y-2">
            <div className="h-9 w-48 animate-pulse rounded bg-muted" />
            <div className="h-4 w-64 animate-pulse rounded bg-muted" />
          </div>
          <div className="flex h-40 animate-pulse items-center gap-4 rounded-xl border border-border bg-card p-6" />
          <div className="h-64 animate-pulse rounded-lg border border-border bg-card p-6" />
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;
  const joinedYear = getJoinedYear(user?.createdAt);

  return (
    <div className="bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-10">
        <PageHeader />

        <ProfileOverview
          name={user?.name}
          email={user?.email}
          image={user?.image}
          joinedYear={joinedYear}
        />

        <AccountSettings />
        <DeleteAccount />
      </div>
    </div>
  );
}
