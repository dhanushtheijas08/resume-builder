import { GitHubIcon } from "@/components/icons";
import type { Project } from "@/app/generated/prisma/client";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";
import { Fragment } from "react";

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  if (projects.length === 0) return null;

  return (
    <section className="">
      <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
        Projects
      </h2>

      {projects.map((project, index) => {
        const year = project.endDate
          ? new Date(project.endDate).getFullYear().toString()
          : project.startDate
            ? new Date(project.startDate).getFullYear().toString()
            : "";

        return (
          <Fragment key={project.id || index}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{project.name}</h3>
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
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
              {year && (
                <span className="text-xs text-gray-600">{year}</span>
              )}
            </div>

            {project.description && (
              <div
                className="resume"
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
