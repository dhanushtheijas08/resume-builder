"use client";

import { LayoutGrid, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "content" | "preview";

interface MobileBottomNavProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function MobileBottomNav({
  currentView,
  onViewChange,
}: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border/50 md:hidden">
      <div className="flex items-center justify-around px-8 py-1">
        <button
          onClick={() => onViewChange("content")}
          className={cn(
            "flex flex-col items-center relative justify-center gap-1 flex-1 py-1.5 transition-all duration-200 ease-in-out",
            "active:scale-95",
            currentView === "content"
              ? "text-foreground"
              : "text-muted-foreground/60 hover:text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "absolute top-0 h-[1.5px] sm:h-0.5 w-full max-w-18 bg-foreground",
              currentView === "content" ? "max-w-18" : "max-w-0",
            )}
          />
          <LayoutGrid
            className={cn(
              "transition-all duration-200",
              currentView === "content" ? "h-6 w-6" : "h-5 w-5",
            )}
            strokeWidth={currentView === "content" ? 2 : 1.5}
          />
          <span
            className={cn(
              "text-xs tracking-wide transition-all duration-200",
              currentView === "content" ? "font-semibold" : "font-normal",
            )}
          >
            Content
          </span>
        </button>

        <button
          onClick={() => onViewChange("preview")}
          className={cn(
            "flex flex-col items-center relative justify-center gap-1 flex-1 py-1.5 transition-all duration-200 ease-in-out",
            "active:scale-95",
            currentView === "preview"
              ? "text-foreground"
              : "text-muted-foreground/60 hover:text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "absolute top-0 h-[1.5px] sm:h-0.5 w-full max-w-18 bg-foreground",
              currentView === "preview" ? "max-w-18" : "max-w-0",
            )}
          />
          <FileText
            className={cn(
              "transition-all duration-200",
              currentView === "preview" ? "h-6 w-6" : "h-5 w-5",
            )}
            strokeWidth={currentView === "preview" ? 2 : 1.5}
          />
          <span
            className={cn(
              "text-xs tracking-wide transition-all duration-200",
              currentView === "preview" ? "font-semibold" : "font-normal",
            )}
          >
            Preview
          </span>
        </button>
      </div>
    </div>
  );
}
