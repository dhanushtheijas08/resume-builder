import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const exportPdf = async (resumeId: string): Promise<{ url: string }> => {
  if (!resumeId) {
    throw new Error("Resume ID is missing");
  }

  const response = await fetch("/api/export-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resumeId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to export PDF");
  }

  return response.json();
};

export const useExportResumeMutation = ({
  isToastLoading = true,
}: { isToastLoading?: boolean } = {}) => {
  return useMutation({
    mutationFn: async (resumeId: string) => {
      const toastId = isToastLoading ? toast.loading("Exporting PDF...") : null;
      try {
        const data = await exportPdf(resumeId);
        if (isToastLoading) {
          toast.success("PDF exported successfully!", {
            id: toastId ?? undefined,
            duration: 500,
          });
        }
        return data;
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to export PDF",
          { id: toastId ?? undefined },
        );
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.url) {
        const link = document.createElement("a");
        link.href = data.url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    onError: (error) => {
      console.error("Error exporting PDF:", error);
    },
  });
};
