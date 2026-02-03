"use client";
import { Download } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";

export const ExportResume = () => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const handleExport = async () => {
    if (!resumeId) {
      console.error("Resume ID is missing");
      return;
    }

    try {
      const response = await fetch(
        `/api/export-pdf?resumeId=${encodeURIComponent(resumeId)}`,
      );
      if (!response.ok) {
        throw new Error("Failed to export PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };
  return (
    <Button variant="primary" className="w-fit h-8.5" onClick={handleExport}>
      <Download className="size-4 mr-0.5" />
      Export PDF
    </Button>
  );
};
