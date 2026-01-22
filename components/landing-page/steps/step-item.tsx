"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Briefcase,
  Check,
  Download,
  FileText,
  GraduationCap,
  Link,
  Trophy,
  User,
  Wrench,
} from "lucide-react";
import { useEffect, useRef } from "react";

export const StepItem = ({
  step,
  setActiveStep,
}: {
  step: any;
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
        "min-h-screen flex flex-col  snap-start transition-all duration-700",
        step.id < 3 ? "justify-center" : "justify-end",
      )}
    >
      {step.id === 1 && (
        <motion.h2
          className={cn(
            "text-3xl md:text-5xl -translate-y-20  lg:text-5xl leading-14  font-bold tracking-normal ",
          )}
        >
          Build your professional Resume in{" "}
          <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            3 Steps
          </span>
        </motion.h2>
      )}

      <div className="max-w-xl pl-4 md:pl-0">
        {/* Header Row: Icon + Step Indicator */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className={`size-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0`}
          >
            <step.icon className="size-5" />
          </div>
          <div className="h-10 w-px bg-border/60" /> {/* Vertical Divider */}
          <div className="font-mono text-lg font-medium text-muted-foreground/60 tracking-wider">
            STEP 0{step.id}
          </div>
        </div>

        <h3 className="text-3xl font-bold mb-6 tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          {step.description}
        </p>

        {/* Pre-defined Sections for Step 2 - Added based on user request */}
        {step.id === 2 && (
          <Card className="mb-10 rounded-lg bg-background border-border/50 shadow-xl shadow-primary/5 relative overflow-hidden h-auto">
            {/* Decorative background element */}
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Smart Modules
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-3">
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
                    className="flex flex-col gap-3 p-3 rounded-lg border border-border/40 bg-background hover:border-primary/20 hover:bg-muted/30 transition-all duration-300 group cursor-default"
                  >
                    <div className="flex items-start justify-between">
                      <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <section.icon className="size-4" />
                      </div>
                      {section.required && (
                        <span className="text-[10px] font-bold text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full">
                          Req
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors">
                      {section.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* File Formats Section for Step 3 - Added based on user request */}
        {step.id === 3 && (
          <div className="mb-10 p-5 md:p-6 rounded-lg bg-background border border-border/50 shadow-xl shadow-primary/5 space-y-6 relative overflow-hidden">
            {/* Decorative background element */}

            <div className="relative">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Export Options
              </h4>

              <div className="space-y-3">
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
                    icon: Link,
                    label: "Web Link",
                    sub: "Public profile URL",
                    recommended: false,
                  },
                ].map((format, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-all duration-300",
                      format.recommended
                        ? "bg-primary/5 border-primary/20 shadow-sm"
                        : "bg-background border-border/40 hover:border-primary/20 hover:bg-muted/30",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "size-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          format.recommended
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <format.icon className="size-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">
                            {format.label}
                          </span>
                          {format.recommended && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              Recommended
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] font-medium text-muted-foreground/80">
                          {format.sub}
                        </span>
                      </div>
                    </div>

                    {format.recommended && (
                      <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Check className="size-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>


            </div>
          </div>
        )}
        {step.id === 3 && (
          <Button
            // variant="primary"
            // size="sm"
            // className="group px-12 h-10 text-lg  w-64  shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            className="group px-12 h-10 text-lg  w-64  shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Try For Free
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
