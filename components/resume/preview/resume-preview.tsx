"use client";

import { useResumeStore } from "@/lib/store/resume-store";
import { RichTextRenderer } from "./rich-text-renderer";

export function ResumePreview() {
  const { resumeData } = useResumeStore();
  const { personalInfo, experiences, education, skills, projects } = resumeData;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const [year, month] = dateString.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${monthNames[date.getMonth()]} ${year}`;
    } catch {
      return dateString;
    }
  };

  const formatDateRange = (start: string, end: string, current: boolean) => {
    const startFormatted = formatDate(start);
    const endFormatted = current ? "Present" : formatDate(end);
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-900 p-8 shadow-lg print:shadow-none">
      {/* Header */}
      <header className="mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedin && (
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          )}
          {personalInfo.website && (
            <a
              href={`https://${personalInfo.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Website
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <div className="prose prose-sm max-w-none">
            <RichTextRenderer content={personalInfo.summary} />
          </div>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{exp.location}</p>
                    <p>
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none mt-2">
                  <RichTextRenderer content={exp.description} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.location}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="space-y-3">
            {Object.entries(skillsByCategory).map(([category, skillNames]) => (
              <div key={category}>
                <h3 className="font-medium text-gray-800 mb-1">{category}</h3>
                <p className="text-sm text-gray-700">{skillNames.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <div className="flex gap-2 text-sm">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                <div className="prose prose-sm max-w-none mb-2">
                  <RichTextRenderer content={project.description} />
                </div>
                {project.technologies.length > 0 && (
                  <p className="text-sm text-gray-600 italic">
                    Technologies: {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
