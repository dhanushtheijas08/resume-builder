export const DEFAULT_SECTION_ORDER = [
  "personal",
  "workExperiences",
  "educations",
  "skills",
  "projects",
  "certifications",
  "awards",
  "publications",
  "customSection",
] as const;

export type ResumeSectionKey = (typeof DEFAULT_SECTION_ORDER)[number];

export const normalizeSectionOrder = (
  sectionOrder?: string[] | null,
): ResumeSectionKey[] => {
  const orderedSections = sectionOrder?.length
    ? sectionOrder
    : DEFAULT_SECTION_ORDER;
  const validSections = new Set<ResumeSectionKey>(DEFAULT_SECTION_ORDER);
  const seenSections = new Set<ResumeSectionKey>();

  const normalizedSections = orderedSections.filter(
    (section): section is ResumeSectionKey => {
      if (!validSections.has(section as ResumeSectionKey)) {
        return false;
      }

      const validSection = section as ResumeSectionKey;
      if (seenSections.has(validSection)) {
        return false;
      }

      seenSections.add(validSection);
      return true;
    },
  );

  return [
    ...normalizedSections,
    ...DEFAULT_SECTION_ORDER.filter((section) => !seenSections.has(section)),
  ];
};
