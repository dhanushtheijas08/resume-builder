import { GitHubIcon } from "@/components/icons";
import type { Project } from "@prisma/client";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";
import { Fragment } from "react";

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  if (projects.length === 0) return null;

  return (
    <section className="mb-[8px]">
      <h2 className="mb-[3px] font-normal border-b border-bottom border-black pb-[1.5px] font-serif text-[14pt] uppercase leading-none tracking-[0.02em]">
        Projects
      </h2>

      {projects.map((project, index) => {
        return (
          <Fragment key={project.id || index}>
            <div className="flex items-baseline justify-between gap-4 ml-3.5">
              <div className="flex items-baseline gap-1.5">
                <h3 className="text-[11.5pt] font-bold leading-tight">
                  {project.name}
                </h3>
                {project.github && (
                  <a
                    href={
                      project.github.startsWith("http")
                        ? project.github
                        : `https://${project.github}`
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
              {project.timePeriod && (
                <span className="shrink-0 text-[10.5pt] leading-tight text-black">
                  {project.timePeriod}
                </span>
              )}
            </div>

            {project.description && (
              <div
                className="resume ml-3.5"
                dangerouslySetInnerHTML={{
                  __html: sanitizeServerHtml(project.description),
                }}
              />
            )}
          </Fragment>
        );
      })}
    </section>
  );
};
