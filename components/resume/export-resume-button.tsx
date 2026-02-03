"use client";
import { useExportResumeMutation } from "@/lib/mutations/export-resume";
import { Download, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";

export const ExportResumeButton = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { mutate: exportPdfMutation, isPending } = useExportResumeMutation({
    isToastLoading: false,
  });

  return (
    <Button
      variant="primary"
      className="w-fit h-8.5"
      onClick={() => exportPdfMutation(resumeId)}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="size-4 mr-0.5 animate-spin" />
      ) : (
        <Download className="size-4 mr-0.5" />
      )}
      {isPending ? "Exporting..." : "Export PDF"}
    </Button>
  );
};
