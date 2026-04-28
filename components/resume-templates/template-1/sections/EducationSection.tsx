import type { Education } from "@prisma/client";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";

interface EducationSectionProps {
  educations: Education[];
}

export const EducationSection = ({ educations }: EducationSectionProps) => {
  if (educations.length === 0) return null;

  return (
    <section className="mb-[8px]">
      <h2 className="mb-[3px] border-b border-black pb-0 font-serif text-[14pt] font-normal uppercase leading-none tracking-[0.02em]">
        Education
      </h2>

      {educations.map((education, index) => (
        <div
          key={education.id || index}
          className={index > 0 ? "mt-[3px] ml-3.5" : "ml-3.5"}
        >
          <div className="flex items-baseline justify-between gap-4 text-[11.5pt]">
            <h3 className="font-bold leading-tight">{education.degree}</h3>
            {education.timePeriod && (
              <span className="shrink-0 text-[10.5pt] italic leading-tight text-black">
                {education.timePeriod}
              </span>
            )}
          </div>
          <p className="text-[10.5pt] italic leading-tight text-black">
            {education.institution}
            {education.location && `, ${education.location}`}
          </p>
          {education.description && (
            <div
              className="resume mt-[2px]"
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
