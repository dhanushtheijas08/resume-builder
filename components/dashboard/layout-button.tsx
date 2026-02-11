"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export const LayoutButton = ({
  active,
  onClick,
  icon,
  label,
}: LayoutButtonProps) => (
  <Button
    onClick={onClick}
    variant="ghost"
    size="sm"
    className={cn(
      active
        ? "text-foreground bg-background shadow-sm"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
    )}
  >
    <span className="relative z-10">{icon}</span>
    <span className="relative z-10 hidden md:inline">{label}</span>
  </Button>
);
