"use client";

import {
  Resume,
  Profile,
  WorkExperience,
  Education,
  Skill,
  Project,
  Certification,
  Publication,
} from "@/app/generated/prisma/client";
import { GitHubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Building2,
  GraduationCap,
  Link2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, FileText } from "lucide-react";

type ResumePreviewProps = {
  resume: Resume & {
    profile: Profile | null;
    workExperiences: WorkExperience[];
    educations: Education[];
    skills: Skill[];
    projects: Project[];
    certifications: Certification[];
    publications: Publication[];
  };
  templateMeta: {
    showProfileImage: boolean;
    skillType: "badge" | "progress" | "category";
    showProjectTech: boolean;
  };
};

type TemplateStyle = "modern" | "classic";

// Shared data processing
const useResumeData = (
  resume: ResumePreviewProps["resume"],
  templateMeta: ResumePreviewProps["templateMeta"]
) => {
  const formatDate = (date: string | null | undefined) => {
    if (!date) return "Present";
    return date;
  };

  const sortedWorkExperiences = (resume.workExperiences || [])
    .filter((exp) => exp != null)
    .sort((a, b) => a.order - b.order);
  const sortedEducations = (resume.educations || [])
    .filter((edu) => edu != null)
    .sort((a, b) => a.order - b.order);
  const sortedProjects = (resume.projects || [])
    .filter((proj) => proj != null)
    .sort((a, b) => a.order - b.order);
  const sortedCertifications = (resume.certifications || [])
    .filter((cert) => cert != null)
    .sort((a, b) => a.order - b.order);
  const sortedPublications = (resume.publications || [])
    .filter((pub) => pub != null)
    .sort((a, b) => a.order - b.order);

  const skills = resume.skills || [];
  const groupedSkills =
    templateMeta.skillType === "category" && skills.length > 0
      ? skills.reduce((acc, skill) => {
          if (!skill) return acc;
          const category = skill.category || "Others";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(skill);
          return acc;
        }, {} as Record<string, Skill[]>)
      : {};

  return {
    formatDate,
    sortedWorkExperiences,
    sortedEducations,
    sortedProjects,
    sortedCertifications,
    sortedPublications,
    skills,
    groupedSkills,
  };
};

// Modern Minimalist Template
const ModernTemplate = ({
  resume,
  templateMeta,
  data,
}: {
  resume: ResumePreviewProps["resume"];
  templateMeta: ResumePreviewProps["templateMeta"];
  data: ReturnType<typeof useResumeData>;
}) => {
  return (
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg min-h-[297mm] p-8 md:p-12 print:p-8 print:shadow-none">
      {/* Header - Personal Information */}
      {resume.profile && (
        <div className="mb-10 pb-8 border-b-2 border-gray-200">
          <div className="flex items-start gap-8">
            {templateMeta.showProfileImage && resume.profile.profileImage && (
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 shrink-0 ring-4 ring-gray-100">
                <Image
                  src={resume.profile.profileImage}
                  alt={resume.profile.name || "Profile"}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                {resume.profile.name || "Your Name"}
              </h1>
              {resume.profile.designation &&
                resume.profile.designation.trim() && (
                  <p className="text-xl text-gray-600 mb-6 font-light">
                    {resume.profile.designation}
                  </p>
                )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                {resume.profile.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                    <span>{resume.profile.email}</span>
                  </div>
                )}
                {resume.profile.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 shrink-0 text-gray-400" />
                    <span>{resume.profile.phoneNumber}</span>
                  </div>
                )}
                {resume.profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0 text-gray-400" />
                    <span>{resume.profile.location}</span>
                  </div>
                )}
                {resume.profile.linkedin && (
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 shrink-0 text-gray-400" />
                    <Link
                      href={resume.profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      LinkedIn
                    </Link>
                  </div>
                )}
                {resume.profile.github && (
                  <div className="flex items-center gap-2">
                    <GitHubIcon className="w-4 h-4 shrink-0 text-gray-400" />
                    <Link
                      href={resume.profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      GitHub
                    </Link>
                  </div>
                )}
                {resume.profile.portfolio && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 shrink-0 text-gray-400" />
                    <Link
                      href={resume.profile.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Portfolio
                    </Link>
                  </div>
                )}
              </div>
              {resume.profile.bio && resume.profile.bio.trim() && (
                <div
                  className="mt-6 text-sm text-gray-700 leading-relaxed rich-text"
                  dangerouslySetInnerHTML={{ __html: resume.profile.bio }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Work Experience */}
        {data.sortedWorkExperiences.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.sortedWorkExperiences.map((experience) => (
                <div key={experience.id}>
                  <div className="mb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {experience.jobTitle}
                      </h3>
                      {experience.isCurrent && (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      {experience.company && experience.company.trim() && (
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">
                            {experience.company}
                          </span>
                        </div>
                      )}
                      {experience.location && experience.location.trim() && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      )}
                      {experience.startDate && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {experience.startDate} -{" "}
                            {data.formatDate(experience.endDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {experience.description && experience.description.trim() && (
                    <div
                      className="text-sm text-gray-700 leading-relaxed rich-text pl-4 border-l-2 border-gray-200"
                      dangerouslySetInnerHTML={{
                        __html: experience.description,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.sortedEducations.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
              Education
            </h2>
            <div className="space-y-6">
              {data.sortedEducations.map((education) => (
                <div key={education.id}>
                  <div className="mb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {education.degree}
                      </h3>
                      {education.isCurrent && (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      {education.institution &&
                        education.institution.trim() && (
                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4" />
                            <span className="font-medium">
                              {education.institution}
                            </span>
                          </div>
                        )}
                      {education.location && education.location.trim() && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{education.location}</span>
                        </div>
                      )}
                      {education.startDate && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {education.startDate} -{" "}
                            {data.formatDate(education.endDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {education.description && education.description.trim() && (
                    <div
                      className="text-sm text-gray-700 leading-relaxed rich-text pl-4 border-l-2 border-gray-200"
                      dangerouslySetInnerHTML={{
                        __html: education.description,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
              Skills
            </h2>
            {templateMeta.skillType === "badge" && (
              <div className="flex flex-wrap gap-2">
                {data.skills
                  .filter((skill) => skill && skill.name)
                  .map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="text-sm py-1.5 px-4 bg-gray-100 text-gray-800 border-0"
                    >
                      {skill.name}
                    </Badge>
                  ))}
              </div>
            )}
            {templateMeta.skillType === "progress" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.skills
                  .filter((skill) => skill && skill.name)
                  .map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-600">
                          {skill.proficiency || 0}%
                        </span>
                      </div>
                      <Progress
                        value={skill.proficiency || 0}
                        className="h-2"
                      />
                    </div>
                  ))}
              </div>
            )}
            {templateMeta.skillType === "category" &&
              Object.keys(data.groupedSkills).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(data.groupedSkills).map(
                    ([category, categorySkills]) => (
                      <div key={category} className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill) => (
                            <Badge
                              key={skill.id}
                              variant="outline"
                              className="text-xs py-0.5 px-2"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
          </section>
        )}

        {/* Projects */}
        {data.sortedProjects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
              Projects
            </h2>
            <div className="space-y-6">
              {data.sortedProjects.map((project) => (
                <div key={project.id}>
                  <div className="mb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {project.name}
                      </h3>
                      {project.isCurrent && (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium">
                          Active
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      {(project.startDate || project.endDate) && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {project.startDate || "N/A"} -{" "}
                            {project.isCurrent
                              ? "Present"
                              : project.endDate || "N/A"}
                          </span>
                        </div>
                      )}
                      {project.url && (
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          <Link2 className="w-4 h-4" />
                          <span>View Project</span>
                        </Link>
                      )}
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          <GitHubIcon className="w-4 h-4" />
                          <span>Source Code</span>
                        </Link>
                      )}
                    </div>
                  </div>
                  {project.description && project.description.trim() && (
                    <div
                      className="text-sm text-gray-700 leading-relaxed rich-text mb-3 pl-4 border-l-2 border-gray-200"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  )}
                  {templateMeta.showProjectTech &&
                    project.technologies &&
                    Array.isArray(project.technologies) &&
                    project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.technologies
                          .filter((tech) => tech && tech.trim())
                          .map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs py-0.5 px-2 bg-gray-50"
                            >
                              {tech}
                            </Badge>
                          ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.sortedCertifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
              Certifications
            </h2>
            <div className="space-y-6">
              {data.sortedCertifications.map((certification) => (
                <div key={certification.id}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {certification.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    {certification.issuer && certification.issuer.trim() && (
                      <span className="font-medium">
                        {certification.issuer}
                      </span>
                    )}
                    {certification.credentialUrl &&
                      certification.credentialUrl.trim() && (
                        <Link
                          href={certification.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          <Link2 className="w-4 h-4" />
                          <span>View Credential</span>
                        </Link>
                      )}
                  </div>
                  {certification.description &&
                    certification.description.trim() && (
                      <div
                        className="text-sm text-gray-700 leading-relaxed rich-text pl-4 border-l-2 border-gray-200"
                        dangerouslySetInnerHTML={{
                          __html: certification.description,
                        }}
                      />
                    )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {resume.awards && resume.awards.trim() && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
              Awards / Achievements
            </h2>
            <div
              className="text-sm text-gray-700 leading-relaxed rich-text pl-4 border-l-2 border-gray-200"
              dangerouslySetInnerHTML={{ __html: resume.awards }}
            />
          </section>
        )}

        {/* Publications */}
        {data.sortedPublications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
              Publications
            </h2>
            <div className="space-y-6">
              {data.sortedPublications.map((publication) => (
                <div key={publication.id}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {publication.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    {publication.publisher && publication.publisher.trim() && (
                      <span className="font-medium">
                        {publication.publisher}
                      </span>
                    )}
                    {publication.url && publication.url.trim() && (
                      <Link
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <Link2 className="w-4 h-4" />
                        <span>View Publication</span>
                      </Link>
                    )}
                  </div>
                  {publication.summary && publication.summary.trim() && (
                    <div
                      className="text-sm text-gray-700 leading-relaxed rich-text pl-4 border-l-2 border-gray-200"
                      dangerouslySetInnerHTML={{ __html: publication.summary }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Classic Professional Template
const ClassicTemplate = ({
  resume,
  templateMeta,
  data,
}: {
  resume: ResumePreviewProps["resume"];
  templateMeta: ResumePreviewProps["templateMeta"];
  data: ReturnType<typeof useResumeData>;
}) => {
  return (
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg min-h-[297mm] print:p-8 print:shadow-none">
      <div className="grid grid-cols-12 gap-0">
        {/* Left Sidebar */}
        <div className="col-span-12 md:col-span-4 bg-slate-800 text-white p-6 md:p-8">
          {/* Profile Section */}
          {resume.profile && (
            <div className="mb-8">
              {templateMeta.showProfileImage && resume.profile.profileImage && (
                <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-700 mx-auto mb-6 ring-4 ring-slate-600">
                  <Image
                    src={resume.profile.profileImage}
                    alt={resume.profile.name || "Profile"}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h1 className="text-2xl font-bold mb-2 text-center">
                {resume.profile.name || "Your Name"}
              </h1>
              {resume.profile.designation &&
                resume.profile.designation.trim() && (
                  <p className="text-sm text-slate-300 text-center mb-6">
                    {resume.profile.designation}
                  </p>
                )}
              <div className="space-y-3 text-sm">
                {resume.profile.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="text-slate-200">
                      {resume.profile.email}
                    </span>
                  </div>
                )}
                {resume.profile.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="text-slate-200">
                      {resume.profile.phoneNumber}
                    </span>
                  </div>
                )}
                {resume.profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="text-slate-200">
                      {resume.profile.location}
                    </span>
                  </div>
                )}
                {resume.profile.linkedin && (
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 shrink-0 text-slate-400" />
                    <Link
                      href={resume.profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-white transition-colors"
                    >
                      LinkedIn
                    </Link>
                  </div>
                )}
                {resume.profile.github && (
                  <div className="flex items-center gap-2">
                    <GitHubIcon className="w-4 h-4 shrink-0 text-slate-400" />
                    <Link
                      href={resume.profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-white transition-colors"
                    >
                      GitHub
                    </Link>
                  </div>
                )}
                {resume.profile.portfolio && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 shrink-0 text-slate-400" />
                    <Link
                      href={resume.profile.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-white transition-colors"
                    >
                      Portfolio
                    </Link>
                  </div>
                )}
              </div>
              {resume.profile.bio && resume.profile.bio.trim() && (
                <div
                  className="mt-6 text-sm text-slate-200 leading-relaxed rich-text"
                  dangerouslySetInnerHTML={{ __html: resume.profile.bio }}
                />
              )}
            </div>
          )}

          {/* Skills Sidebar */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b border-slate-600">
                Skills
              </h2>
              {templateMeta.skillType === "badge" && (
                <div className="flex flex-wrap gap-2">
                  {data.skills
                    .filter((skill) => skill && skill.name)
                    .map((skill) => (
                      <Badge
                        key={skill.id}
                        className="text-xs py-1 px-2 bg-slate-700 text-slate-100 border-0"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                </div>
              )}
              {templateMeta.skillType === "progress" && (
                <div className="space-y-3">
                  {data.skills
                    .filter((skill) => skill && skill.name)
                    .map((skill) => (
                      <div key={skill.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-200">{skill.name}</span>
                          <span className="text-slate-400">
                            {skill.proficiency || 0}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-400"
                            style={{ width: `${skill.proficiency || 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {templateMeta.skillType === "category" &&
                Object.keys(data.groupedSkills).length > 0 && (
                  <div className="space-y-4">
                    {Object.entries(data.groupedSkills).map(
                      ([category, categorySkills]) => (
                        <div key={category}>
                          <h3 className="text-sm font-semibold text-slate-300 mb-2">
                            {category}
                          </h3>
                          <div className="flex flex-wrap gap-1.5">
                            {categorySkills.map((skill) => (
                              <Badge
                                key={skill.id}
                                className="text-xs py-0.5 px-2 bg-slate-700 text-slate-200"
                              >
                                {skill.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-12 md:col-span-8 p-6 md:p-8">
          <div className="space-y-8">
            {/* Work Experience */}
            {data.sortedWorkExperiences.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-800">
                  Work Experience
                </h2>
                <div className="space-y-5">
                  {data.sortedWorkExperiences.map((experience) => (
                    <div key={experience.id}>
                      <div className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {experience.jobTitle}
                          </h3>
                          {experience.isCurrent && (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                          {experience.company && experience.company.trim() && (
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5" />
                              <span className="font-medium">
                                {experience.company}
                              </span>
                            </div>
                          )}
                          {experience.location &&
                            experience.location.trim() && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{experience.location}</span>
                              </div>
                            )}
                          {experience.startDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>
                                {experience.startDate} -{" "}
                                {data.formatDate(experience.endDate)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {experience.description &&
                        experience.description.trim() && (
                          <div
                            className="text-sm text-gray-700 leading-relaxed rich-text"
                            dangerouslySetInnerHTML={{
                              __html: experience.description,
                            }}
                          />
                        )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.sortedEducations.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-800">
                  Education
                </h2>
                <div className="space-y-5">
                  {data.sortedEducations.map((education) => (
                    <div key={education.id}>
                      <div className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {education.degree}
                          </h3>
                          {education.isCurrent && (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                          {education.institution &&
                            education.institution.trim() && (
                              <div className="flex items-center gap-1">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span className="font-medium">
                                  {education.institution}
                                </span>
                              </div>
                            )}
                          {education.location && education.location.trim() && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{education.location}</span>
                            </div>
                          )}
                          {education.startDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>
                                {education.startDate} -{" "}
                                {data.formatDate(education.endDate)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {education.description &&
                        education.description.trim() && (
                          <div
                            className="text-sm text-gray-700 leading-relaxed rich-text"
                            dangerouslySetInnerHTML={{
                              __html: education.description,
                            }}
                          />
                        )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {data.sortedProjects.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-800">
                  Projects
                </h2>
                <div className="space-y-5">
                  {data.sortedProjects.map((project) => (
                    <div key={project.id}>
                      <div className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {project.name}
                          </h3>
                          {project.isCurrent && (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-xs">
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                          {(project.startDate || project.endDate) && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>
                                {project.startDate || "N/A"} -{" "}
                                {project.isCurrent
                                  ? "Present"
                                  : project.endDate || "N/A"}
                              </span>
                            </div>
                          )}
                          {project.url && (
                            <Link
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:underline"
                            >
                              <Link2 className="w-3.5 h-3.5" />
                              <span>View Project</span>
                            </Link>
                          )}
                          {project.github && (
                            <Link
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:underline"
                            >
                              <GitHubIcon className="w-3.5 h-3.5" />
                              <span>Source Code</span>
                            </Link>
                          )}
                        </div>
                      </div>
                      {project.description && project.description.trim() && (
                        <div
                          className="text-sm text-gray-700 leading-relaxed rich-text mb-2"
                          dangerouslySetInnerHTML={{
                            __html: project.description,
                          }}
                        />
                      )}
                      {templateMeta.showProjectTech &&
                        project.technologies &&
                        Array.isArray(project.technologies) &&
                        project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {project.technologies
                              .filter((tech) => tech && tech.trim())
                              .map((tech, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs py-0.5 px-2 bg-gray-50"
                                >
                                  {tech}
                                </Badge>
                              ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {data.sortedCertifications.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-800">
                  Certifications
                </h2>
                <div className="space-y-5">
                  {data.sortedCertifications.map((certification) => (
                    <div key={certification.id}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {certification.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                        {certification.issuer &&
                          certification.issuer.trim() && (
                            <span className="font-medium">
                              {certification.issuer}
                            </span>
                          )}
                        {certification.credentialUrl &&
                          certification.credentialUrl.trim() && (
                            <Link
                              href={certification.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:underline"
                            >
                              <Link2 className="w-3.5 h-3.5" />
                              <span>View Credential</span>
                            </Link>
                          )}
                      </div>
                      {certification.description &&
                        certification.description.trim() && (
                          <div
                            className="text-sm text-gray-700 leading-relaxed rich-text"
                            dangerouslySetInnerHTML={{
                              __html: certification.description,
                            }}
                          />
                        )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Awards */}
            {resume.awards && resume.awards.trim() && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-800">
                  Awards / Achievements
                </h2>
                <div
                  className="text-sm text-gray-700 leading-relaxed rich-text"
                  dangerouslySetInnerHTML={{ __html: resume.awards }}
                />
              </section>
            )}

            {/* Publications */}
            {data.sortedPublications.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-800">
                  Publications
                </h2>
                <div className="space-y-5">
                  {data.sortedPublications.map((publication) => (
                    <div key={publication.id}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {publication.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                        {publication.publisher &&
                          publication.publisher.trim() && (
                            <span className="font-medium">
                              {publication.publisher}
                            </span>
                          )}
                        {publication.url && publication.url.trim() && (
                          <Link
                            href={publication.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Link2 className="w-3.5 h-3.5" />
                            <span>View Publication</span>
                          </Link>
                        )}
                      </div>
                      {publication.summary && publication.summary.trim() && (
                        <div
                          className="text-sm text-gray-700 leading-relaxed rich-text"
                          dangerouslySetInnerHTML={{
                            __html: publication.summary,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResumePreview = ({ resume, templateMeta }: ResumePreviewProps) => {
  const [templateStyle, setTemplateStyle] = useState<TemplateStyle>("modern");
  const data = useResumeData(resume, templateMeta);

  return (
    <div className="h-full w-full overflow-auto p-5 custom-scrollbar">
      {/* Template Selector */}
      <div className="max-w-[210mm] mx-auto mb-4 flex gap-2 justify-end">
        <Button
          variant={templateStyle === "modern" ? "default" : "outline"}
          size="sm"
          onClick={() => setTemplateStyle("modern")}
          className="gap-2"
        >
          <LayoutGrid className="w-4 h-4" />
          Modern
        </Button>
        <Button
          variant={templateStyle === "classic" ? "default" : "outline"}
          size="sm"
          onClick={() => setTemplateStyle("classic")}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Classic
        </Button>
      </div>

      {/* Render Selected Template */}
      {templateStyle === "modern" ? (
        <ModernTemplate
          resume={resume}
          templateMeta={templateMeta}
          data={data}
        />
      ) : (
        <ClassicTemplate
          resume={resume}
          templateMeta={templateMeta}
          data={data}
        />
      )}
    </div>
  );
};
