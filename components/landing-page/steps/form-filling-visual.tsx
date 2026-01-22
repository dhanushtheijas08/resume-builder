"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, GraduationCap, User } from "lucide-react";
import { useEffect, useState } from "react";

export const FormFillingVisual = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 3000); // 3 seconds per section
    return () => clearInterval(timer);
  }, []);

  const sections = [
    {
      icon: User,
      label: "Personal Information",
      sub: "Contact details and summary",
      color: "blue",
      fields: [
        { label: "Full Name", value: "Dhanush Theijas" },
        { label: "Professional Title", value: "Software Engineer" },
      ],
    },
    {
      icon: Briefcase,
      label: "Work Experience",
      sub: "Your professional history",
      color: "purple",
      fields: [
        { label: "Company", value: "Google" },
        { label: "Role", value: "Senior Frontend Developer" },
      ],
      hasAI: true,
    },
    {
      icon: GraduationCap,
      label: "Education",
      sub: "Academic background",
      color: "emerald",
      fields: [
        { label: "Institution", value: "Stanford University" },
        { label: "Degree", value: "Bachelor of Science in CS" },
      ],
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-12">
      <motion.div
        layout
        className="w-full max-w-md bg-background rounded-lg border border-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] overflow-hidden p-5 space-y-4"
      >
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            layout
            initial={false}
            animate={{
              backgroundColor:
                activeTab === idx ? "var(--card)" : "transparent",
              boxShadow:
                activeTab === idx ? "0 4px 20px -2px rgba(0,0,0,0.05)" : "none",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`rounded-lg border transition-all duration-500 overflow-hidden ${activeTab === idx ? "ring-1 ring-primary/5" : ""
              }`}
          >
            {/* Accordion Header */}
            <div className="px-5 py-4 flex items-center justify-between cursor-default">
              <div className="flex items-center gap-4 text-left">
                <motion.div
                  layout
                  className={`size-10 rounded-lg bg-${section.color}-500/10 flex items-center justify-center`}
                >
                  <section.icon
                    className={`size-5 text-${section.color}-500`}
                  />
                </motion.div>
                <div>
                  <motion.div
                    layout
                    className="font-semibold text-sm tracking-tight text-foreground/90"
                  >
                    {section.label}
                  </motion.div>
                  <motion.p
                    layout
                    className="text-[11px] text-muted-foreground/80 font-normal mt-0.5"
                  >
                    {section.sub}
                  </motion.p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === idx && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    height: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 pt-1 space-y-5">
                    {section.fields.map((field, fIdx) => (
                      <div key={fIdx} className="space-y-2">
                        <div className="text-[11px] font-semibold text-muted-foreground/70 px-0.5 uppercase tracking-wider">
                          {field.label}
                        </div>
                        <div className="w-full h-10 border border-border/60 rounded-lg bg-muted/30 flex items-center px-4 relative overflow-hidden group">
                          <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                              duration: 1.2,
                              delay: fIdx * 0.6 + 0.2,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent pointer-events-none"
                          />
                          <motion.span
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: fIdx * 0.6 + 0.4,
                            }}
                            className="text-sm font-medium text-foreground/80 truncate relative z-10"
                          >
                            {field.value}
                          </motion.span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
