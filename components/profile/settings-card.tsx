import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description?: string;
  danger?: boolean;
  children: ReactNode;
}

export function SettingsCard({
  title,
  description,
  danger,
  children,
}: SettingsCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6",
        danger ? "border-destructive/30 bg-destructive/5" : "border-border",
      )}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
