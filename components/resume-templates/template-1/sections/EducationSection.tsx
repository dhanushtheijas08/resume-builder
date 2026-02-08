import type { Education } from "@prisma/client";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";

interface EducationSectionProps {
  educations: Education[];
}

export const EducationSection = ({ educations }: EducationSectionProps) => {
  if (educations.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
        Education
      </h2>

      {educations.map((education, index) => (
        <div key={education.id || index} className={index > 0 ? "mt-4" : ""}>
          <div className="flex justify-between items-center text-sm">
            <h3 className="font-semibold">{education.degree}</h3>
            {education.timePeriod && (
              <span className="text-xs text-gray-600">
                {education.timePeriod}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600">
            {education.institution}
            {education.location && `, ${education.location}`}
          </p>
          {education.description && (
            <div
              className="resume mt-1"
              dangerouslySetInnerHTML={{
                __html: sanitizeServerHtml(education.description),
              }}
            />
          )}
        </div>
      ))}
    </section>
  );
};
