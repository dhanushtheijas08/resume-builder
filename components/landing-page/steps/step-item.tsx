"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
  FileText,
  GraduationCap,
  Link as LinkIcon,
  LucideIcon,
  Trophy,
  User,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

type StepProps = {
  id: number;
  title: string;
  description: string;
  cta: string;
  icon: LucideIcon;
  color: string;
  visual: string;
};

export const StepItem = ({
  step,
  setActiveStep,
}: {
  step: StepProps;
  setActiveStep: (id: number) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveStep(step.id);
    }
  }, [isInView, step.id, setActiveStep]);

  return (
    <div
      ref={ref}
      className={cn(
        "lg:min-h-screen flex flex-col snap-start transition-all duration-700",
        step.id < 3 ? "justify-center" : "justify-end",
      )}
    >
      {step.id === 1 && (
        <motion.h2
          className={cn(
            "text-3xl sm:text-3xl text-center md:text-5xl -translate-y-10 sm:-translate-y-16 lg:-translate-y-20 leading-tight sm:leading-tight lg:leading-[1.15] font-bold tracking-normal",
          )}
        >
          <span className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70">
            Build your professional <br className="hidden md:block lg:hidden" />{" "}
            resume in
          </span>{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
            3 Steps
          </span>
        </motion.h2>
      )}

      <div className="pl-0 sm:pl-2 lg:pl-0">
        <div className="flex items-center max-w-xl gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div
            className={`size-9 sm:size-10 rounded-lg sm:rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0`}
          >
            <step.icon className="size-4 sm:size-5" />
          </div>
          <div className="h-8 sm:h-10 w-px bg-border/60" />{" "}
          {/* Vertical Divider */}
          <div className="font-mono text-base sm:text-lg font-medium text-muted-foreground/60 tracking-wider">
            STEP 0{step.id}
          </div>
        </div>

        <h3 className="text-2xl max-w-xl sm:text-3xl font-bold mb-4 sm:mb-6 tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="text-base max-w-xl sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
          {step.description}
        </p>

        {step.id === 2 && (
          <Card className="mb-8 sm:mb-10 rounded-lg bg-background border-border/50 shadow-xl shadow-primary/5 relative overflow-hidden h-auto">
            {/* Decorative background element */}
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Smart Modules
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {[
                  { icon: User, label: "Personal Info", required: true },
                  { icon: Briefcase, label: "Experience", required: true },
                  { icon: GraduationCap, label: "Education", required: true },
                  { icon: Wrench, label: "Skills", required: true },
                  { icon: FileText, label: "Projects", required: false },
                  { icon: Trophy, label: "Awards", required: false },
                ].map((section, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border border-border/40 bg-background hover:border-primary/20 hover:bg-muted/30 transition-all duration-300 group cursor-default"
                  >
                    <div className="flex items-start justify-between">
                      <div className="size-7 sm:size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <section.icon className="size-3.5 sm:size-4" />
                      </div>
                      {section.required && (
                        <span className="text-[9px] sm:text-[10px] font-bold text-primary/60 bg-primary/5 px-1.5 sm:px-2 py-0.5 rounded-full">
                          Req
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] sm:text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors">
                      {section.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {step.id === 3 && (
          <div className="mb-8 sm:mb-10 p-4 sm:p-5 md:p-6 rounded-lg bg-background border border-border/50 shadow-xl shadow-primary/5 space-y-4 sm:space-y-6 relative overflow-hidden">
            {/* Decorative background element */}

            <div className="relative">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 sm:mb-4">
                Export Options
              </h4>

              <div className="space-y-2 sm:space-y-3">
                {[
                  {
                    icon: FileText,
                    label: "PDF Document",
                    sub: "Best for sharing & printing",
                    recommended: true,
                  },
                  {
                    icon: FileText,
                    label: "Plain Text",
                    sub: "For ATS systems",
                    recommended: false,
                  },
                  {
                    icon: LinkIcon,
                    label: "Web Link",
                    sub: "Public profile URL",
                    recommended: false,
                  },
                ].map((format, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-between p-2.5 sm:p-3 rounded-lg border transition-all duration-300",
                      format.recommended
                        ? "bg-primary/5 border-primary/20 shadow-sm"
                        : "bg-background border-border/40 hover:border-primary/20 hover:bg-muted/30",
                    )}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div
                        className={cn(
                          "size-8 sm:size-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          format.recommended
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <format.icon className="size-4 sm:size-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            {format.label}
                          </span>
                          {format.recommended && (
                            <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              Recommended
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground/80">
                          {format.sub}
                        </span>
                      </div>
                    </div>

                    {format.recommended && (
                      <div className="size-5 sm:size-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Check className="size-3 sm:size-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-start md:justify-center lg:justify-start">
          {step.id === 3 && (
            <Button
              asChild
              className="group px-8 sm:px-14 h-9 sm:h-12 text-base sm:text-lg w-full sm:w-64 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link href="/register">
                <span>Try For Free</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
