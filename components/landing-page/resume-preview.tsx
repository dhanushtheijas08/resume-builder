"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  Code,
  Download,
  FolderKanban,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Plus,
  User,
} from "lucide-react";
import {
  OpacityAnimation,
  ResumePreviewAnimation,
} from "../animations/resume-preview-animations";
import { GitHubIcon, LinkedinIcon } from "../icons";

export const HeroSectionResumePreview = () => {
  return (
    <>
      <div className="absolute w-screen pointer-events-none select-none">
        <div className="h-[600px] w-full pointer-events-none sm:h-[820px]">
          <div className="absolute inset-0 z-30 bg-linear-to-b from-transparent to-background w-full h-full" />
          <div className="absolute inset-0  z-30 bg-linear-to-r from-transparent from-70% via-transparent to-background w-full h-full" />
          <div
            className=" w-full h-full"
            style={{
              perspective: "4000px",
              perspectiveOrigin: "100% 0",
              transformStyle: "preserve-3d",
              contain: "strict",
            }}
          >
            <div className="absolute translate-x-140 sm:translate-x-0 inset-0 w-[1000px] sm:w-[1600px] h-[900px] bg-background border rounded-xl mt-[220px] ml-auto sm:mt-[200px] sm:ml-[1%] sm:mr-auto sm:mb-auto pointer-events-auto overflow-hidden flex flex-col text-foreground transition-all duration-500 ease-in-out origin-top-left transform-3d backface-hidden transform-[translateX(2%)_scale(0.6)_rotateX(47deg)_rotateY(21deg)_rotate(330deg)] sm:transform-[translateX(1%)_scale(1.15)_rotateX(47deg)_rotateY(31deg)_rotate(326deg)]">
              <nav className="flex items-center justify-between px-6 py-4  bg-card/50 backdrop-blur-sm">
                <ResumePreviewAnimation duration={0.5} delay={1.5}>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="size-2.5 rounded-full bg-red-500/80 border border-red-600/20" />
                      <div className="size-2.5 rounded-full bg-amber-500/80 border border-amber-600/20" />
                      <div className="size-2.5 rounded-full bg-emerald-500/80 border border-emerald-600/20" />
                    </div>
                    <h1 className="text-sm font-medium ml-2 text-muted-foreground/80">
                      Coder CV Preview
                    </h1>
                  </div>
                </ResumePreviewAnimation>
                <ResumePreviewAnimation duration={0.5} delay={1.6}>
                  <Button variant="primary" size="sm" className="max-w-fit h-7">
                    <Download className="size-3 mr-2" />
                    Export PDF
                  </Button>
                </ResumePreviewAnimation>
              </nav>

              <div className="flex flex-1 overflow-hidden">
                <aside className="w-[850px] md:w-[650px] border-r bg-muted/5 flex flex-col">
                  <div className="flex-1 overflow-hidden p-6 pointer-events-none select-none">
                    <div className="w-full space-y-4">
                      {/* Personal Information */}
                      <ResumePreviewAnimation delay={1.8} duration={0.6}>
                        <div className="border rounded-xl bg-card shadow-sm overflow-hidden group">
                          <div className="px-5 py-4 flex items-center justify-between transition-colors group-hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                <User className="size-5 text-blue-500" />
                              </div>
                              <div className="text-left">
                                <span className="font-medium">
                                  Personal Information
                                </span>
                                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                                  Contact details and summary
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ResumePreviewAnimation>

                      {/* Work Experience */}
                      <ResumePreviewAnimation delay={1.9} duration={0.6}>
                        <div className="border rounded-xl bg-card shadow-sm overflow-hidden group">
                          <div className="px-5 py-4 flex items-center justify-between transition-colors group-hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                <Briefcase className="size-5 text-purple-500" />
                              </div>
                              <div className="text-left">
                                <span className="font-medium">
                                  Work Experience
                                </span>
                                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                                  Your professional history
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="px-5 pb-5 pt-2">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">
                                  1 experience
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs"
                                >
                                  <Plus className="size-3" />
                                  Add Experience
                                </Button>
                              </div>

                              <div className="border rounded-lg p-4 bg-background/50 hover:bg-background/80 transition-colors group border-dashed border-primary/20">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-3">
                                    <h3 className="text-base font-semibold">
                                      Software Engineer
                                    </h3>
                                    <Badge
                                      variant="secondary"
                                      className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] px-2 py-0.5 h-auto lowercase"
                                    >
                                      current
                                    </Badge>
                                  </div>

                                  <div className="grid gap-2 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                      <Building2 className="size-3.5 shrink-0" />
                                      <span className="truncate">
                                        TechNova Solutions Pvt Ltd
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="size-3.5 shrink-0" />
                                      <span className="truncate">
                                        Bengaluru, India
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="size-3.5 shrink-0" />
                                      <span>August 2023 - Present</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ResumePreviewAnimation>

                      {/* Education */}
                      <ResumePreviewAnimation delay={1.9} duration={0.6}>
                        <div className="border rounded-xl bg-card shadow-sm overflow-hidden group">
                          <div className="px-5 py-4 flex items-center justify-between transition-colors group-hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <GraduationCap className="size-5 text-emerald-500" />
                              </div>
                              <div className="text-left">
                                <span className="font-medium">Education</span>
                                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                                  Academic background
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ResumePreviewAnimation>

                      {/* Skills */}
                      <ResumePreviewAnimation delay={2.0} duration={0.6}>
                        <div className="border rounded-xl bg-card shadow-sm overflow-hidden group">
                          <div className="px-5 py-4 flex items-center justify-between transition-colors group-hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                <Code className="size-5 text-orange-500" />
                              </div>
                              <div className="text-left">
                                <span className="font-medium">Skills</span>
                                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                                  Technical expertise
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ResumePreviewAnimation>

                      {/* Projects */}
                      <ResumePreviewAnimation delay={2.1} duration={0.6}>
                        <div className="border rounded-xl bg-card shadow-sm overflow-hidden group">
                          <div className="px-5 py-4 flex items-center justify-between transition-colors group-hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                <FolderKanban className="size-5 text-cyan-500" />
                              </div>
                              <div className="text-left">
                                <span className="font-medium">Projects</span>
                                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                                  Showcase your work
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ResumePreviewAnimation>

                      {/* Certifications */}
                      <ResumePreviewAnimation delay={2.2} duration={0.6}>
                        <div className="border rounded-xl bg-card shadow-sm overflow-hidden group">
                          <div className="px-5 py-4 flex items-center justify-between transition-colors group-hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                                <Award className="size-5 text-yellow-500" />
                              </div>
                              <div className="text-left">
                                <span className="font-medium">
                                  Certifications
                                </span>
                                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                                  Professional credentials
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ResumePreviewAnimation>
                    </div>
                  </div>
                </aside>

                <OpacityAnimation delay={1.9}>
                  <main className="flex-1 bg-muted/20 overflow-hidden pt-5 flex justify-center relative">
                    <div className="md:w-[250mm] min-h-[297mm] p-10 bg-white text-gray-900 shadow-2xl origin-top scale-[0.85]">
                      <ResumePreviewAnimation delay={2.1} duration={0.6}>
                        <section className="mb-8">
                          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                            Dhanush
                          </h1>
                          <p className="text-base text-gray-600 font-medium">
                            Software Developer
                          </p>

                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-4 items-center">
                            <div className="flex items-center gap-1.5 transition-colors hover:text-gray-900">
                              <Globe className="w-4 h-4" />
                              <span>dhanush.dev</span>
                            </div>
                            <div className="flex items-center gap-1.5 transition-colors hover:text-gray-900">
                              <Phone className="w-4 h-4" />
                              <span>+91 876 567 6545</span>
                            </div>
                            <div className="flex items-center gap-1.5 transition-colors hover:text-gray-900">
                              <Mail className="w-4 h-4" />
                              <span>dhanush@example.com</span>
                            </div>
                            <div className="flex items-center gap-1.5 transition-colors hover:text-gray-900">
                              <GitHubIcon className="w-4 h-4" />
                              <span>github.com/dhanush</span>
                            </div>
                            <div className="flex items-center gap-1.5 transition-colors hover:text-gray-900">
                              <LinkedinIcon className="w-4 h-4" />
                              <span>linkedin.com/in/dhanush</span>
                            </div>
                          </div>
                        </section>
                      </ResumePreviewAnimation>

                      <ResumePreviewAnimation delay={2.2} duration={0.6}>
                        <section className="mb-8">
                          <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1.5 mb-4 text-gray-900 uppercase tracking-wider">
                            Experience
                          </h2>

                          <div className="mb-6">
                            <div className="flex justify-between items-baseline mb-1">
                              <h3 className="font-bold text-base text-gray-900">
                                Software Engineer
                              </h3>
                              <span className="text-sm text-gray-600 font-semibold bg-gray-100 px-2 py-0.5 rounded">
                                Aug 2023 - Present
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Building2 className="w-3.5 h-3.5 text-gray-500" />
                              <p className="text-sm text-gray-600 font-medium">
                                TechNova Solutions Pvt Ltd, Bengaluru
                              </p>
                            </div>

                            <div className="text-sm text-gray-700 leading-relaxed space-y-2">
                              <p>
                                • Spearheaded the development of scalable web
                                applications using{" "}
                                <span className="font-semibold text-gray-900">
                                  React and Node.js
                                </span>
                                , resulting in a 40% increase in user
                                engagement.
                              </p>
                              <p>
                                • Designed and implemented{" "}
                                <span className="font-semibold text-gray-900">
                                  RESTful APIs
                                </span>{" "}
                                and optimized database queries, reducing latency
                                by 30%.
                              </p>
                              <p>
                                • Collaborated with cross-functional teams to
                                integrate{" "}
                                <span className="font-semibold text-gray-900">
                                  OAuth 2.0 authentication
                                </span>{" "}
                                and role-based access control.
                              </p>
                            </div>
                          </div>
                        </section>
                      </ResumePreviewAnimation>

                      <ResumePreviewAnimation delay={2.4} duration={0.6}>
                        <section className="mb-8">
                          <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1.5 mb-4 text-gray-900 uppercase tracking-wider">
                            Projects
                          </h2>

                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-base text-gray-900">
                                  Online Code Execution Platform
                                </h3>
                                <a
                                  href="#"
                                  className="text-gray-500 hover:text-gray-900"
                                >
                                  <GitHubIcon className="w-4 h-4" />
                                </a>
                              </div>
                              <span className="text-sm text-gray-600 font-medium">
                                2025
                              </span>
                            </div>

                            <div className="text-sm text-gray-700 leading-relaxed mt-2">
                              Built a{" "}
                              <span className="font-semibold text-gray-900">
                                secure code execution engine
                              </span>{" "}
                              supporting multiple languages. Utilized{" "}
                              <span className="font-semibold text-gray-900">
                                Docker
                              </span>{" "}
                              containers for isolation and implemented resource
                              limits to ensure stability. Features include
                              real-time output streaming and automated test case
                              validation.
                            </div>
                          </div>
                        </section>
                      </ResumePreviewAnimation>

                      <ResumePreviewAnimation delay={2.5} duration={0.6}>
                        <section className="mb-8">
                          <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1.5 mb-4 text-gray-900 uppercase tracking-wider">
                            Education
                          </h2>

                          <div className="mb-4">
                            <div className="flex justify-between items-baseline mb-1">
                              <h3 className="font-bold text-base text-gray-900">
                                Bachelor of Technology in Computer Science
                              </h3>
                              <span className="text-sm text-gray-600 font-medium">
                                2021 - 2025
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 font-medium">
                              ABC Institute of Technology, Bengaluru
                            </p>
                            <div className="text-sm text-gray-700 mt-2">
                              Relevant Coursework: Data Structures, Algorithms,
                              DBMS, Operating Systems, Web Development.
                            </div>
                          </div>
                        </section>
                      </ResumePreviewAnimation>

                      <ResumePreviewAnimation delay={2.6} duration={0.6}>
                        <section className="mb-8">
                          <h2 className="text-lg font-bold border-b-2 border-gray-900 pb-1.5 mb-4 text-gray-900 uppercase tracking-wider">
                            Skills
                          </h2>
                          <div className="flex flex-wrap gap-2 text-sm">
                            {[
                              "JavaScript",
                              "TypeScript",
                              "React",
                              "Next.js",
                              "Node.js",
                              "PostgreSQL",
                              "Tailwind CSS",
                              "Docker",
                              "Git",
                            ].map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md font-medium border border-gray-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </section>
                      </ResumePreviewAnimation>
                    </div>
                  </main>
                </OpacityAnimation>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
