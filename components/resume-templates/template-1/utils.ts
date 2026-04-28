import type { ResumeData } from "@/components/resume/resume-preview";
export {
  DEFAULT_SECTION_ORDER,
  normalizeSectionOrder,
} from "@/lib/resume-section-order";

export const formatDateRange = (
  startDate: string,
  endDate: string | null,
  isCurrent: boolean,
): string => {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}$/.test(dateStr)) {
      const [year, month] = dateStr.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
    return dateStr;
  };

  const start = formatDate(startDate);
  const end = isCurrent ? "Present" : endDate ? formatDate(endDate) : "Present";
  return `${start} - ${end}`;
};

export const groupSkillsByCategory = (skills: ResumeData["skills"]) => {
  const grouped: Record<string, string[]> = {};

  skills.forEach((skill) => {
    const category = skill.category || "Others";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(skill.name);
  });

  return Object.entries(grouped).map(([label, values]) => ({
    label,
    values,
  }));
};
