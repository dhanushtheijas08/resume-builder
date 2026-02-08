import type { WorkExperience } from "@prisma/client";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";

interface ExperienceSectionProps {
  workExperiences: WorkExperience[];
}

export const ExperienceSection = ({
  workExperiences,
}: ExperienceSectionProps) => {
  if (workExperiences.length === 0) return null;

  return (
    <section className="">
      <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
        Experience
      </h2>

      {workExperiences.map((exp, index) => {
        return (
          <div key={exp.id || index} className="mb-4 resume">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm">{exp.jobTitle}</h3>
              {exp.timePeriod && (
                <span className="text-xs text-gray-600">{exp.timePeriod}</span>
              )}
            </div>
            <p className="text-xs text-gray-600">
              {exp.company}
              {exp.location && `, ${exp.location}`}
            </p>

            {exp.description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeServerHtml(exp.description),
                }}
              />
            )}
          </div>
        );
      })}
    </section>
  );
};
