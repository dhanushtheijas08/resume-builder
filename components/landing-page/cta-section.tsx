"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Download, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const CTASection = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      text: "ATS-optimized templates",
    },
    {
      icon: <Download className="w-5 h-5" />,
      text: "Instant download",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      text: "100% Free",
    },
  ];

  return (
    <section className="py-14 sm:py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl bg-card backdrop-blur-sm  border border-white/5 "
        >
          <div className="relative flex flex-col lg:flex-row gap-12">
            <div className="flex flex-col gap-6 sm:gap-8 px-6 sm:px-8 py-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
              <div className="flex flex-col gap-4 md:gap-6 md:items-center lg:items-start">
                <motion.span className="text-primary-foreground/80 font-semibold tracking-wider text-xs sm:text-sm">
                  READY TO GET HIRED?
                </motion.span>
                <motion.h2 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl text-nowrap font-bold text-primary-foreground leading-[1.1]">
                  Your next job starts
                  <br className="block" />
                  with the right resume.
                </motion.h2>
                <motion.p className="text-base sm:text-lg md:text-xl md:text-center lg:text-left  text-primary-foreground/80 max-w-xl">
                  Join thousands who have already created stunning resumes. No
                  experience needed, free forever.
                </motion.p>
              </div>

              <motion.div className="flex flex-wrap gap-4 md:items-center md:justify-center lg:justify-start">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 text-primary-foreground"
                  >
                    <div className="shrink-0 size-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="size-2.5 text-green-600" />
                    </div>
                    <span className="text-xs sm:text-sm">{feature.text}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div className="pt-4">
                <Button
                  size="lg"
                  className="h-12.5 sm:h-14 px-6 sm:px-8 text-base md:text-xl font-semibold sm:font-bold w-full"
                  asChild
                >
                  <Link href="/register">
                    Build Your Resume Now
                    <ArrowRight className="size-5 ml-2 mt-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="max-h-[480px] hidden lg:block overflow-y-hidden rounded-t-xl shadow-2xl mt-18 max-w-4xl translate-x-5 w-full mx-auto">
              <ResumePreview />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const data = {
  personal: {
    name: "Dhanush Theijas",
    role: "Software Development Engineer I",
    email: "test@gmail.com",
    phone: "+1-555-0123",
    links: ["linkedin.com/in/dhanush-theijas"],
  },
  skills: {
    languages: "Java, TypeScript, Go, Python, SQL",
    frameworks: "React, Node.js, Spring Boot, Next.js",
    infrastructure: "AWS (Lambda, S3, EC2), Docker, Kubernetes, CI/CD",
    databases: "PostgreSQL, Redis, MongoDB, DynamoDB",
  },
  experience: [
    {
      company: "Global Tech Corp",
      role: "Software Engineer II",
      location: "Seattle, WA",
      period: "Jan 2022 - Present",
      bullets: [
        "Architected and deployed a distributed microservices layer using Node.js and AWS Lambda, reducing API latency by 35% for 2M+ monthly active users.",
        "Lead the migration from a monolithic frontend to a Module Federation architecture, improving deployment frequency by 3x.",
        "Mentored 4 junior developers and conducted 50+ technical interviews for the engineering org.",
        "Implemented automated integration testing using Jest and Cypress, increasing code coverage from 65% to 92%.",
      ],
    },
    {
      company: "Innovate Startup",
      role: "Software Engineer",
      location: "Remote",
      period: "June 2019 – Dec 2021",
      bullets: [
        "Developed a real-time analytics dashboard using React and WebSockets, handling 10k concurrent events per second.",
        "Optimized PostgreSQL queries and implemented Redis caching, reducing database load by 50% during peak traffic.",
        "Collaborated with UX/UI teams to build a reusable component library, cutting down development time for new features by 20%.",
      ],
    },
  ],
  projects: [
    {
      name: "Open Source Contributor (React Router)",
      desc: "Optimized hydration logic for Server-Side Rendering (SSR) affecting millions of applications.",
      link: "github.com/remix-run/react-router",
    },
    {
      name: "Distributed Task Scheduler",
      desc: "Built a high-availability task runner in Go using Raft consensus algorithm for fault tolerance.",
      link: "github.com/jdoe/scheduler",
    },
  ],
  education: {
    school: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    honors: "GPA: 3.9/4.0, Dean's List",
    year: "2019",
  },
};

const ResumePreview = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-8  leading-tight text-slate-900 max-w-4xl mx-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header - Centered for SDE 2 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-light tracking-tighter mb-2">
            {data.personal.name}
          </h1>
          <div className="flex justify-center flex-nowrap overflow-x-hidden gap-x-4 text-sm text-slate-600">
            <span>{data.personal.phone}</span>
            <span>•</span>
            <span className="font-semibold underline uppercase tracking-tight">
              {data.personal.email}
            </span>
            {data.personal.links.map((link, i) => (
              <React.Fragment key={i}>
                <span>•</span>
                <span className="hover:text-blue-600 cursor-pointer">
                  {link}
                </span>
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* Skills Section - Concise Grid */}
        <section className="mb-8">
          <h2 className="text-sm font-bold border-b border-slate-800 mb-3 uppercase tracking-widest">
            Technical Skills
          </h2>
          <div className="text-sm space-y-1">
            <p>
              <strong>Languages:</strong> {data.skills.languages}
            </p>
            <p>
              <strong>Frameworks/Libraries:</strong> {data.skills.frameworks}
            </p>
            <p>
              <strong>Cloud/DevOps:</strong> {data.skills.infrastructure}
            </p>
            <p>
              <strong>Databases:</strong> {data.skills.databases}
            </p>
          </div>
        </section>

        {/* Experience Section - Focus on Metrics */}
        <section className="mb-8">
          <h2 className="text-sm font-bold border-b border-slate-800 mb-4 uppercase tracking-widest">
            Professional Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-end mb-1">
                <h3 className="text-lg font-bold">{exp.company}</h3>
                <span className="text-sm font-medium italic">{exp.period}</span>
              </div>
              <div className="flex justify-between items-baseline mb-2 text-slate-700">
                <span className="font-medium italic">{exp.role}</span>
                <span className="text-xs uppercase">{exp.location}</span>
              </div>
              <ul className="list-disc ml-5 text-[14px] space-y-1.5 text-slate-700">
                {exp.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section className="mb-8">
          <h2 className="text-sm font-bold border-b border-slate-800 mb-4 uppercase tracking-widest">
            Selected Projects
          </h2>
          <div className="grid gap-4">
            {data.projects.map((proj, i) => (
              <div key={i} className="text-sm">
                <span className="font-bold">{proj.name}</span> |{" "}
                <span className="text-slate-600 italic">{proj.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-sm font-bold border-b border-slate-800 mb-3 uppercase tracking-widest">
            Education
          </h2>
          <div className="flex justify-between items-baseline">
            <div>
              <span className="font-bold">{data.education.school}</span>
              <p className="text-sm">{data.education.degree}</p>
            </div>
            <span className="text-sm italic">{data.education.year}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">{data.education.honors}</p>
        </section>
      </div>
    </div>
  );
};
