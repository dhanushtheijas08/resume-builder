"use client";
import { GitHubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Building2,
  Calendar,
  Globe,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  Phone,
  RefreshCcw,
  RotateCcwIcon,
  Share2,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";

const dummyResume = {
  id: "1",
  userId: "user-1",
  title: "Software Engineer Resume",
  awards: "<p>Best Employee Award 2023</p><p>Hackathon Winner 2022</p>",
  createdAt: new Date(),
  updatedAt: new Date(),
  profile: {
    id: "profile-1",
    resumeId: "1",
    name: "John Doe",
    designation: "Senior Software Engineer",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.dev",
    profileImage: "",
    bio: "<p>Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about building scalable applications and leading technical teams.</p>",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  workExperiences: [
    {
      id: "exp-1",
      resumeId: "1",
      jobTitle: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "2021-01",
      endDate: null,
      isCurrent: true,
      description:
        "<ul><li>Led a team of 5 developers in building scalable microservices</li><li>Improved application performance by 40% through optimization</li><li>Mentored junior developers and conducted code reviews</li></ul>",
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "exp-2",
      resumeId: "1",
      jobTitle: "Software Engineer",
      company: "StartupXYZ",
      location: "Remote",
      startDate: "2019-06",
      endDate: "2020-12",
      isCurrent: false,
      description:
        "<ul><li>Developed RESTful APIs using Node.js and Express</li><li>Built responsive frontend components with React</li><li>Collaborated with cross-functional teams in agile environment</li></ul>",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  educations: [
    {
      id: "edu-1",
      resumeId: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California",
      location: "Berkeley, CA",
      startDate: "2015-09",
      endDate: "2019-05",
      isCurrent: false,
      description:
        "<p>Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering.</p>",
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  skills: [
    {
      id: "skill-1",
      resumeId: "1",
      name: "JavaScript",
      proficiency: 90,
      category: "Programming Languages",
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "skill-2",
      resumeId: "1",
      name: "TypeScript",
      proficiency: 85,
      category: "Programming Languages",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "skill-3",
      resumeId: "1",
      name: "React",
      proficiency: 88,
      category: "Frontend",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "skill-4",
      resumeId: "1",
      name: "Node.js",
      proficiency: 82,
      category: "Backend",
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "skill-5",
      resumeId: "1",
      name: "PostgreSQL",
      proficiency: 75,
      category: "Database",
      order: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  projects: [
    {
      id: "proj-1",
      resumeId: "1",
      name: "E-Commerce Platform",
      description:
        "<p>Built a full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.</p>",
      startDate: "2022-03",
      endDate: "2022-08",
      isCurrent: false,
      url: "https://example.com/ecommerce",
      github: "https://github.com/johndoe/ecommerce",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "proj-2",
      resumeId: "1",
      name: "Task Management App",
      description:
        "<p>Developed a collaborative task management application with real-time updates and team collaboration features.</p>",
      startDate: "2023-01",
      endDate: null,
      isCurrent: true,
      url: "https://example.com/tasks",
      github: "https://github.com/johndoe/tasks",
      technologies: ["Next.js", "TypeScript", "Prisma", "WebSockets"],
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  certifications: [
    {
      id: "cert-1",
      resumeId: "1",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      credentialUrl: "https://aws.amazon.com/certification",
      description:
        "<p>Validated expertise in designing distributed systems on AWS.</p>",
      issueDate: "2022-06",
      expiryDate: "2025-06",
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cert-2",
      resumeId: "1",
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      credentialUrl: "https://cloud.google.com/certification",
      description:
        "<p>Demonstrated ability to build and deploy applications on Google Cloud Platform.</p>",
      issueDate: "2021-09",
      expiryDate: null,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  publications: [
    {
      id: "pub-1",
      resumeId: "1",
      title: "Scalable Microservices Architecture",
      publisher: "Tech Journal",
      url: "https://example.com/publication",
      summary:
        "<p>An in-depth analysis of microservices patterns and best practices for building scalable systems.</p>",
      publishedDate: "2023-03",
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

const dummyTemplateMeta = {
  showProfileImage: true,
  skillType: "badge" as "badge" | "progress" | "category",
  showProjectTech: true,
};

const processResumeData = (
  resume: typeof dummyResume,
  templateMeta: typeof dummyTemplateMeta
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
        }, {} as Record<string, typeof skills>)
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

const ClassicTemplate = () => {
  const resume = dummyResume;
  const templateMeta = dummyTemplateMeta;
  const data = processResumeData(resume, templateMeta);
  return (
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg min-h-[297mm] print:p-8 print:shadow-none">
      <div className="grid grid-cols-12 gap-0 w-[210mm] h-[297mm] mx-auto p-8 bg-white text-black shadow-lg overflow-hidden  leading-tight print:shadow-none">
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

const ResumeToolbar = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <ButtonGroup className="[--radius:1.05rem]">
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => zoomIn(0.1)}>
            <ZoomInIcon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Zoom In</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => zoomOut(0.1)}>
            <ZoomOutIcon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Zoom Out</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => resetTransform()}>
            <RefreshCcw className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reset View</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Share2 className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share</p>
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  );
};

export const ResumePreview = () => {
  const resumeRef = useRef(null);

  return (
    <div className="relative">
      <TransformWrapper
        ref={resumeRef}
        smooth={false}
        maxScale={2}
        centerOnInit={true}
        minScale={0.5}
        limitToBounds={false}
      >
        <div className="absolute top-2.5 right-1/2 z-10">
          <ResumeToolbar />
        </div>
        <TransformComponent>
          <ClassicTemplate />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
