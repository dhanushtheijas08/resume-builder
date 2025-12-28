"use client";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Globe, Mail, Phone } from "lucide-react";
import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { GitHubIcon } from "../icons/github";
import { Skeleton } from "@/components/ui/skeleton";

const resumeData = {
  personal: {
    name: "Arjun Kumar",
    title: "Software Engineer (Frontend)",
    location: "Bengaluru, India",
    phone: "+91 98765 43210",
    email: "arjun.kumar@example.com",
    github: "github.com/arjunkumar-dev",
    linkedin: "linkedin.com/in/arjun-kumar-dev",
    portfolio: "arjunkumar.vercel.app",
  },

  summary:
    "Frontend-focused Software Engineer with experience building modern, responsive web applications using React and Next.js. Comfortable working across the stack, collaborating with backend teams, and translating product requirements into clean, user-friendly interfaces.",

  skills: [
    {
      label: "Languages",
      values: ["JavaScript", "TypeScript"],
    },
    {
      label: "Frontend",
      values: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      label: "Backend",
      values: ["Node.js", "Express"],
    },
    {
      label: "Database",
      values: ["MongoDB", "PostgreSQL"],
    },
    {
      label: "Tools",
      values: ["Git", "Docker", "Vercel"],
    },
  ],

  experience: [
    {
      role: "Software Engineer",
      company: "TechNova Solutions",
      location: "Bengaluru, India",
      duration: "Jul 2024 – Present",
      points: [
        "Built and enhanced customer-facing dashboards using React and Next.js with a strong focus on performance.",
        "Worked closely with designers to implement pixel-perfect UI components using Tailwind CSS.",
        "Collaborated with backend teams to integrate REST APIs and handle async data flows.",
      ],
    },
    {
      role: "Frontend Engineer Intern",
      company: "InnoLabs",
      location: "Remote",
      duration: "Jan 2024 – Jun 2024",
      points: [
        "Developed reusable UI components and layouts for an internal admin portal.",
        "Improved page load times by optimizing component rendering and API usage.",
        "Gained hands-on experience with code reviews, Git workflows, and agile practices.",
      ],
    },
  ],

  projects: [
    {
      title: "Task Management Dashboard",
      year: "2024",
      points: [
        "Built a Kanban-style task management app with drag-and-drop functionality.",
        "Implemented authentication, protected routes, and role-based UI rendering.",
        "Tech Stack: React, TypeScript, Tailwind CSS, Node.js, MongoDB.",
      ],
      repo: "https://github.com/arjunkumar-dev/task-manager",
    },
    {
      title: "E-commerce Storefront",
      year: "2024",
      points: [
        "Developed a responsive e-commerce frontend with product listings, filters, and cart functionality.",
        "Integrated REST APIs for product data, checkout flow, and order history.",
        "Tech Stack: Next.js, React Query, Tailwind CSS.",
      ],
      repo: "https://github.com/arjunkumar-dev/ecommerce-frontend",
    },
  ],

  education: {
    degree: "Bachelor of Engineering in Information Technology",
    duration: "2020 – 2024",
    institution: "Anna University",
    location: "Chennai, India",
  },
};

const Template1 = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [resumePage, setResumePage] = useState<HTMLElement[][]>([]);

  const renderResumeContent = () => {
    return (
      <div
        ref={resumeRef}
        className="w-[210mm] min-h-[297mm] p-8 bg-white text-gray-900 shadow-lg"
      >
        {/* Header */}
        <section className="mb-3.5">
          <h1 className="text-3xl font-bold tracking-tight">
            {resumeData.personal.name}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {resumeData.personal.title}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-3 items-center">
            {/* Location */}

            {/* Coimbatore, India */}
            {/* <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{resumeData.personal.location}</span>
            </div> */}
            <a
              href={resumeData.personal.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </a>
            <a
              href={`tel:${resumeData.personal.phone.replace(/\s+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{resumeData.personal.phone}</span>
            </a>
            {/* <span>•</span> */}
            <a
              href={`mailto:${resumeData.personal.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{resumeData.personal.email}</span>
            </a>
            {/* <span>•</span> */}
            <a
              href={`https://${resumeData.personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            {/* <span>•</span> */}
            <a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            {/* <span>•</span> */}
            {/* <a
              href={resumeData.personal.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </a> */}
          </div>
        </section>

        {/* Summary */}

        {/* Experience */}
        <section className="">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            Experience
          </h2>

          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm">{exp.role}</h3>
                <span className="text-xs text-gray-600">{exp.duration}</span>
              </div>
              <p className="text-xs text-gray-600">
                {exp.company}, {exp.location}
              </p>

              <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            Projects
          </h2>

          {resumeData.projects.map((project, index) => (
            <Fragment key={index}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{project.title}</h3>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-gray-900 transition-colors"
                      title="View Repository"
                    >
                      <GitHubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <span className="text-xs text-gray-600">{project.year}</span>
              </div>

              <ul className="list-disc ml-5 mt-2 text-sm space-y-1 mb-4">
                {project.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </Fragment>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-3.5">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            Skills
          </h2>
          <div className="text-sm grid grid-cols-2 gap-y-2">
            {resumeData.skills.map((skill) => (
              <div key={skill.label}>
                <span className="font-medium">{skill.label}:</span>{" "}
                {skill.values.join(", ")}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>

          <div className="flex justify-between items-center text-sm">
            <h3 className="font-semibold">{resumeData.education.degree}</h3>
            <span className="text-xs text-gray-600">
              {resumeData.education.duration}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            {resumeData.education.institution}
          </p>
        </section>
      </div>
    );
  };

  const getFullHeight = (element: HTMLElement) => {
    const styles = window.getComputedStyle(element);
    const marginTop = parseFloat(styles.marginTop);
    const marginBottom = parseFloat(styles.marginBottom);
    return element.offsetHeight + marginTop + marginBottom;
  };

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

    // Defer state update to avoid synchronous setState warning
    requestAnimationFrame(() => {
      setResumePage(pages);
    });
  }, []);

  useLayoutEffect(() => {
    if (resumeRef.current) {
      pageSplit();
    }
  }, [pageSplit]);

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
