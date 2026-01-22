"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Download,
  FileEdit,
  Search,
} from "lucide-react";
import { useRef, useState } from "react";
import { ExportVisual } from "./steps/export-visual";
import { FormFillingVisual } from "./steps/form-filling-visual";
import { StepItem } from "./steps/step-item";
import { TemplateSelectionVisual } from "./steps/template-selection-visual";

const steps = [
  {
    id: 1,
    title: "Choose a Template",
    description:
      "Pick a professional design that fits your role. Our templates help you stand out to recruiters immediately.",
    cta: "Browse Templates",
    icon: Search,
    color: "blue",
    visual: "templates",
  },
  {
    id: 2,
    title: "Add Your Info",
    description:
      "Enter your details easily. Our tool handles the layout, formatting, and design structure for you instantly.",
    cta: "Start Writing",
    icon: FileEdit,
    color: "purple",
    visual: "filling",
  },
  {
    id: 3,
    title: "Download Resume",
    description:
      "Get your resume in PDF, Word, or Image format. Ready for any job application and ATS-friendly.",
    cta: "Download Now",
    icon: Download,
    color: "green",
    visual: "export",
  },
];

export const Steps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);


  return (
    <section className="py-10 px-4 md:px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <motion.div className="hidden md:block w-1/2 flex-1" ref={sectionRef}>
            <div className="sticky top-28 h-[calc(100vh-10rem)] rounded-lg bg-white/3 border border-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  {activeStep === 1 && <TemplateSelectionVisual />}
                  {activeStep === 2 && <FormFillingVisual />}
                  {activeStep === 3 && <ExportVisual />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="w-full md:w-1/2">
            <div className="">
              {steps.map((step) => (
                <StepItem
                  key={step.id}
                  step={step}
                  setActiveStep={setActiveStep}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
