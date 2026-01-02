"use client";
import { LinkedinIcon } from "@/components/icons/linkedin";
import type { ResumeData } from "@/components/resume/resume-preview";
import { sanitizeServerHtml } from "@/lib/sanitize-html-input";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GitHubIcon } from "../icons/github";

const formatDateRange = (
  startDate: string,
  endDate: string | null,
  isCurrent: boolean
): string => {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    // Try to parse date string (could be "2024-01", "2024-01-15", or "Jan 2024" format)
    // Handle YYYY-MM format
    if (/^\d{4}-\d{2}$/.test(dateStr)) {
      const [year, month] = dateStr.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
    // Try standard date parsing
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
    // If not a valid date, return as is
    return dateStr;
  };

  const start = formatDate(startDate);
  const end = isCurrent ? "Present" : endDate ? formatDate(endDate) : "Present";
  return `${start} - ${end}`;
};

const groupSkillsByCategory = (skills: ResumeData["skills"]) => {
  const grouped: Record<string, string[]> = {};

  skills.forEach((skill) => {
    const category = skill.category || "Others";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(skill.name);
  });

  return Object.entries(grouped).map(([label, values]) => ({
    label,
    values,
  }));
};

interface Template1Props {
  resumeData: ResumeData;
}

const Template1 = ({ resumeData }: Template1Props) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [resumePage, setResumePage] = useState<HTMLElement[][]>([]);

  const renderResumeContent = () => {
    const profile = resumeData.profile;
    const groupedSkills = groupSkillsByCategory(resumeData.skills);
    // Sort educations by order field
    const sortedEducations = [...resumeData.educations].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );
    // Sort work experiences by order field
    const sortedWorkExperiences = [...resumeData.workExperiences].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );
    // Sort projects by order field
    const sortedProjects = [...resumeData.projects].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );

    return (
      <div
        ref={resumeRef}
        className="w-[210mm] min-h-[297mm] p-8 bg-white text-gray-900 shadow-lg "
      >
        {/* Header */}
        <section className="mb-3.5">
          <h1 className="text-3xl font-bold tracking-tight">
            {profile?.name || "Your Name"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {profile?.designation || "Your Title"}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-3 items-center">
            {profile?.portfolio && (
              <a
                href={
                  profile.portfolio.startsWith("http")
                    ? profile.portfolio
                    : `https://${profile.portfolio}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Portfolio</span>
              </a>
            )}
            {profile?.phoneNumber && (
              <a
                href={`tel:${profile.phoneNumber.replace(/\s+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{profile.phoneNumber}</span>
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.github && (
              <a
                href={
                  profile.github.startsWith("http")
                    ? profile.github
                    : `https://${profile.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {profile?.linkedin && (
              <a
                href={
                  profile.linkedin.startsWith("http")
                    ? profile.linkedin
                    : `https://${profile.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
            {profile?.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </section>

        {/* Experience */}
        {sortedWorkExperiences.length > 0 && (
          <section className="">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
              Experience
            </h2>

            {sortedWorkExperiences.map((exp, index) => {
              const duration = formatDateRange(
                exp.startDate,
                exp.endDate,
                exp.isCurrent
              );

              return (
                <div key={exp.id || index} className="mb-4 resume">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm">{exp.jobTitle}</h3>
                    <span className="text-xs text-gray-600">{duration}</span>
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
        )}

        {/* Projects */}
        {sortedProjects.length > 0 && (
          <section className="">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
              Projects
            </h2>

            {sortedProjects.map((project, index) => {
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
        )}

        {/* Skills */}
        {groupedSkills.length > 0 && (
          <section className="mb-3.5">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
              Skills
            </h2>
            <div className="text-sm grid grid-cols-2 gap-y-2">
              {groupedSkills.map((skill, index) => (
                <div key={`${skill.label}-${index}`}>
                  <span className="font-medium">{skill.label}:</span>{" "}
                  {skill.values.join(", ")}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {sortedEducations.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
              Education
            </h2>

            {sortedEducations.map((education, index) => (
              <div
                key={education.id || index}
                className={index > 0 ? "mt-4" : ""}
              >
                <div className="flex justify-between items-center text-sm">
                  <h3 className="font-semibold">{education.degree}</h3>
                  <span className="text-xs text-gray-600">
                    {formatDateRange(
                      education.startDate,
                      education.endDate,
                      education.isCurrent
                    )}
                  </span>
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
        )}

        {/* Custom Sections */}
        {resumeData.customSections
          .sort((a, b) => a.order - b.order)
          .map((customSection) => {
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
                        typeof content === "string" ? content : ""
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
                startDate?: string;
                endDate?: string;
                isCurrent?: boolean;
                description?: string;
              };
              const duration = formatDateRange(
                exp.startDate || "",
                exp.endDate || null,
                exp.isCurrent || false
              );

              return (
                <section key={customSection.id} className="mb-3.5">
                  <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
                    {customSection.title}
                  </h2>
                  <div className="mb-4 resume">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-sm">{exp.jobTitle}</h3>
                      <span className="text-xs text-gray-600">{duration}</span>
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
              // EDUCATION uses Education structure
              const edu = content as {
                degree?: string;
                institution?: string;
                location?: string;
                startDate?: string;
                endDate?: string;
                isCurrent?: boolean;
                description?: string;
              };
              const duration = formatDateRange(
                edu.startDate || "",
                edu.endDate || null,
                edu.isCurrent || false
              );

              return (
                <section key={customSection.id} className="mb-3.5">
                  <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
                    {customSection.title}
                  </h2>
                  <div className="flex justify-between items-center text-sm">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <span className="text-xs text-gray-600">{duration}</span>
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
              // PROJECT uses Project structure
              const proj = content as {
                name?: string;
                description?: string;
                url?: string;
                github?: string;
                technologies?: string;
                startDate?: string;
                endDate?: string;
                isCurrent?: boolean;
              };
              const year = proj.endDate
                ? new Date(proj.endDate).getFullYear().toString()
                : proj.startDate
                ? new Date(proj.startDate).getFullYear().toString()
                : "";

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
                    {year && (
                      <span className="text-xs text-gray-600">{year}</span>
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
              // SKILL uses Skill structure
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
                      <span className="text-gray-600">
                        {" "}
                        - {skill.proficiency}%
                      </span>
                    )}
                  </div>
                </section>
              );
            }

            return null;
          })}
      </div>
    );
  };

  const getFullHeight = (element: HTMLElement) => {
    const styles = window.getComputedStyle(element);
    const marginTop = parseFloat(styles.marginTop);
    const marginBottom = parseFloat(styles.marginBottom);
    return element.offsetHeight + marginTop + marginBottom;
  };

  // Create a stable key from resumeData to detect changes
  const resumeDataKey = useMemo(() => {
    return JSON.stringify({
      profileId: resumeData.profile?.id,
      workExpCount: resumeData.workExperiences.length,
      eduCount: resumeData.educations.length,
      projectCount: resumeData.projects.length,
      skillCount: resumeData.skills.length,
      certCount: resumeData.certifications.length,
      pubCount: resumeData.publications.length,
      customSectionCount: resumeData.customSections.length,
      workExpOrders: resumeData.workExperiences.map((e) => e.order),
      eduOrders: resumeData.educations.map((e) => e.order),
      projectOrders: resumeData.projects.map((p) => p.order),
    });
  }, [resumeData]);

  const pageSplit = useCallback(() => {
    const A4_HEIGHT_PX = 1123;
    const PADDING_PX = 40;
    const USABLE_HEIGHT = A4_HEIGHT_PX - PADDING_PX * 2;

    if (!resumeRef.current) return;

    const sections = Array.from(
      (resumeRef.current as HTMLElement).querySelectorAll("section")
    );

    const pages: HTMLElement[][] = [];
    let currentPage: HTMLElement[] = [];
    let usedHeight = 0;

    for (const section of sections) {
      const sectionHeight = getFullHeight(section);

      if (usedHeight + sectionHeight <= USABLE_HEIGHT) {
        currentPage.push(section);
        usedHeight += sectionHeight;
        continue;
      }

      for (const child of Array.from(section.children) as HTMLElement[]) {
        const h = getFullHeight(child);

        if (usedHeight + h > USABLE_HEIGHT) {
          pages.push([...currentPage]);
          currentPage = [];
          usedHeight = 0;
        }

        currentPage.push(child);
        usedHeight += h;
      }
    }

    if (currentPage.length) pages.push([...currentPage]);

    requestAnimationFrame(() => {
      setResumePage(pages);
    });
  }, []);

  useLayoutEffect(() => {
    if (resumeRef.current) {
      pageSplit();
    }
  }, [pageSplit, resumeDataKey]);

  return (
    <>
      <div
        className="absolute opacity-0 pointer-events-none"
        style={{ width: "210mm" }}
      >
        {renderResumeContent()}
      </div>

      {resumePage.map((page, index) => (
        <div
          key={index}
          className="mx-auto bg-white p-8 mb-8"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          {page.map((section, idx) => (
            <div
              key={idx}
              className=" bg-white text-black"
              dangerouslySetInnerHTML={{ __html: section.outerHTML }}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Template1;
