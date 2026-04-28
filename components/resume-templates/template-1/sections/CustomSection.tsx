import { GitHubIcon } from "@/components/icons";
import type { CustomSection as CustomSectionType } from "@prisma/client";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";

interface CustomSectionProps {
  customSection: CustomSectionType;
}

export const CustomSection = ({ customSection }: CustomSectionProps) => {
  const content = customSection.content;

  if (customSection.type === "SUMMARY") {
    return (
      <section key={customSection.id} className="mb-[8px] ml-3.5">
        <h2 className="mb-[3px] border-b border-black pb-0 font-serif text-[14pt] font-normal uppercase leading-none tracking-[0.02em]">
          {customSection.title}
        </h2>
        <div
          className="resume text-[11pt] leading-[1.16]"
          dangerouslySetInnerHTML={{
            __html: sanitizeServerHtml(
              typeof content === "string" ? content : "",
            ),
          }}
        />
      </section>
    );
  }

  if (customSection.type === "EXPERIENCE") {
    const exp = content as {
      jobTitle?: string;
      company?: string;
      location?: string;
      timePeriod?: string;
      description?: string;
    };

    return (
      <section key={customSection.id} className="mb-[8px]">
        <h2 className="mb-[3px] border-b border-black/60 pb-0 font-serif text-[14pt] font-normal uppercase leading-none tracking-[0.02em]">
          {customSection.title}
        </h2>
        <div className="resume mb-[5px]">
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
      </section>
    );
  }

  if (customSection.type === "EDUCATION") {
    const edu = content as {
      degree?: string;
      institution?: string;
      location?: string;
      timePeriod?: string;
      description?: string;
    };

    return (
      <section key={customSection.id} className="mb-[8px]">
        <h2 className="mb-[3px] border-b border-black/60 pb-0 font-serif text-[14pt] font-normal uppercase leading-none tracking-[0.02em]">
          {customSection.title}
        </h2>
        <div className="flex items-baseline justify-between gap-4 text-[11.5pt]">
          <h3 className="font-bold leading-tight">{edu.degree}</h3>
          {edu.timePeriod && (
            <span className="shrink-0 text-[10.5pt] italic leading-tight text-black">
              {edu.timePeriod}
            </span>
          )}
        </div>
        <p className="text-[10.5pt] italic leading-tight text-black">
          {edu.institution}
          {edu.location && `, ${edu.location}`}
        </p>
        {edu.description && (
          <div
            className="resume"
            dangerouslySetInnerHTML={{
              __html: sanitizeServerHtml(edu.description),
            }}
          />
        )}
      </section>
    );
  }

  if (customSection.type === "PROJECT") {
    const proj = content as {
      name?: string;
      description?: string;
      url?: string;
      github?: string;
      technologies?: string;
      timePeriod?: string;
    };

    return (
      <section key={customSection.id} className="mb-[8px]">
        <h2 className="mb-[3px] border-b border-black/60 pb-0 font-serif text-[14pt] font-normal uppercase leading-none tracking-[0.02em]">
          {customSection.title}
        </h2>
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-[11.5pt] font-bold leading-tight">
              {proj.name}
            </h3>
            {proj.github && (
              <a
                href={
                  proj.github.startsWith("http")
                    ? proj.github
                    : `https://${proj.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-900 transition-colors"
                title="View Repository"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          {proj.timePeriod && (
            <span className="shrink-0 text-[10.5pt] leading-tight text-black">
              {proj.timePeriod}
            </span>
          )}
        </div>
        {proj.description && (
          <div
            className="resume"
            dangerouslySetInnerHTML={{
              __html: sanitizeServerHtml(proj.description),
            }}
          />
        )}
      </section>
    );
  }

  if (customSection.type === "SKILL") {
    const skill = content as {
      name?: string;
      proficiency?: number;
      category?: string;
      displayType?: string;
    };

    return (
      <section key={customSection.id} className="mb-[8px]">
        <h2 className="mb-[3px] border-b border-black/60 pb-0 font-serif text-[14pt] font-normal uppercase leading-none tracking-[0.02em]">
          {customSection.title}
        </h2>
        <div className="text-[11pt] leading-[1.16]">
          <span className="font-bold">{skill.name}</span>
          {skill.category && (
            <span className="text-black"> ({skill.category})</span>
          )}
          {skill.proficiency !== undefined && (
            <span className="text-black"> - {skill.proficiency}%</span>
          )}
        </div>
      </section>
    );
  }

  return null;
};
