import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getJoinedYear } from "../lib/utils";

interface ProfileOverviewProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  joinedYear: string;
}

interface ProfileMetaItemProps {
  label: string;
  value: string;
}

function ProfileMetaItem({ label, value }: ProfileMetaItemProps) {
  return (
    <div className="space-y-1 rounded-lg border border-border/70 bg-muted/30 p-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="truncate text-sm text-foreground">{value}</dd>
    </div>
  );
}

export function ProfileOverview({
  name,
  email,
  image,
  joinedYear,
}: ProfileOverviewProps) {
  const displayName = name || "User";
  const displayEmail = email || "No email available";
  const initials = displayName.slice(0, 1).toUpperCase();

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar className="h-20 w-20 border border-border sm:h-24 sm:w-24">
            <AvatarImage src={image || ""} alt={`${displayName} avatar`} />
            <AvatarFallback className="text-2xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-semibold text-foreground">
              {displayName}
            </h2>
            <p className="truncate text-sm text-muted-foreground sm:text-base">
              {displayEmail}
            </p>
          </div>
        </div>

        <dl className="grid flex-1 gap-4 sm:grid-cols-3">
          <ProfileMetaItem label="Email" value={displayEmail} />
          <ProfileMetaItem label="Status" value="Active Member" />
          <ProfileMetaItem label="Member Since" value={joinedYear} />
        </dl>
      </div>
    </section>
  );
}

