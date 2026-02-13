"use client";

import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { cn } from "@/lib/utils";

interface ResumeEditorLayoutProps {
  contentPanel: React.ReactNode;
  previewPanel: React.ReactNode;
}

export function ResumeEditorLayout({
  contentPanel,
  previewPanel,
}: ResumeEditorLayoutProps) {
  const [mobileView, setMobileView] = useState<"content" | "preview">(
    "content",
  );

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          minSize={40}
          defaultSize={42}
          className={cn(
            "md:block",
            mobileView === "preview" ? "hidden" : "block",
          )}
        >
          {contentPanel}
        </ResizablePanel>
        <ResizableHandle withHandle={true} className="hidden md:flex" />
        <ResizablePanel
          minSize={50}
          defaultSize={58}
          className={cn("hidden md:block", mobileView === "preview" && "block")}
        >
          {previewPanel}
        </ResizablePanel>
      </ResizablePanelGroup>

      <MobileBottomNav currentView={mobileView} onViewChange={setMobileView} />
    </>
  );
}
