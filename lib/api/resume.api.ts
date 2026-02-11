import { TEMPLATE_API_ITEMS_PER_PAGE } from "../const";
import { getEnv } from "../env";

type ResumeTemplateApiItem = {
  id: string;
  title: string;
  role: string;
  experience: number;
  company: string;
  location: string;
  previewImageUrl: string;
  tags: string[];
};

type ResumeTemplateApiResponse = {
  data: {
    templates: ResumeTemplateApiItem[];
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
  };
};
export const fetchResumeTemplates = async (params: {
  page: number;
  role: string;
  exp: string;
  company: string;
  location?: string;
  pageSize?: number;
}): Promise<ResumeTemplateApiResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  searchParams.set(
    "pageSize",
    String(params.pageSize ?? TEMPLATE_API_ITEMS_PER_PAGE),
  );

  if (params.role && params.role !== "All") {
    searchParams.set("role", params.role);
  }

  if (params.exp && params.exp !== "All") {
    searchParams.set("experience", params.exp);
  }

  if (params.company && params.company !== "All") {
    searchParams.set("company", params.company);
  }

  if (params.location && params.location !== "All") {
    searchParams.set("location", params.location);
  }

  const url = `${getEnv("NEXT_PUBLIC_RESUME_TEMPLATES_API_URL")}?${searchParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch resume templates");
  }

  return response.json();
};
