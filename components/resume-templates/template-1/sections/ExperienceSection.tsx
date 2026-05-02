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
    <section className="mb-[8px]">
      <h2 className="mb-[3px] title border-b border-black pb-0 font-serif text-[14pt] font-normal uppercase leading-none tracking-[0.02em]">
        Experience
      </h2>
      {workExperiences.map((exp, index) => {
        return (
          <div key={exp.id || index} className="resume mb-[5px] ml-3.5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[11.5pt] font-bold leading-tight">
                {exp.jobTitle}
              </h3>
              {exp.timePeriod && (
                <span className="shrink-0 text-[10.5pt] leading-tight text-black">
                  {exp.timePeriod}
                </span>
              )}
            </div>
            <p className="text-[10.5pt] italic leading-tight text-black">
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
