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
      <section key={customSection.id} className="mb-3.5">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
          {customSection.title}
        </h2>
        <div
          className="resume text-sm"
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
      <section key={customSection.id} className="mb-3.5">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
          {customSection.title}
        </h2>
        <div className="mb-4 resume">
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
      <section key={customSection.id} className="mb-3.5">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
          {customSection.title}
        </h2>
        <div className="flex justify-between items-center text-sm">
          <h3 className="font-semibold">{edu.degree}</h3>
          {edu.timePeriod && (
            <span className="text-xs text-gray-600">{edu.timePeriod}</span>
          )}
        </div>
        <p className="text-xs text-gray-600">
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
      <section key={customSection.id} className="mb-3.5">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
          {customSection.title}
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">{proj.name}</h3>
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
                <GitHubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
          {proj.timePeriod && (
            <span className="text-xs text-gray-600">{proj.timePeriod}</span>
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
      <section key={customSection.id} className="mb-3.5">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
          {customSection.title}
        </h2>
        <div className="text-sm">
          <span className="font-medium">{skill.name}</span>
          {skill.category && (
            <span className="text-gray-600"> ({skill.category})</span>
          )}
          {skill.proficiency !== undefined && (
            <span className="text-gray-600"> - {skill.proficiency}%</span>
          )}
        </div>
      </section>
    );
  }

  return null;
};
