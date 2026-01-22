"use client";

import { EyeIcon } from "@/components/ui/eye";
import { ShieldCheckIcon } from "@/components/ui/shield-check";
import { LayersIcon } from "@/components/ui/layers";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Ban, ChevronRight, Download, Infinity as InfinityIcon, User } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export const FeatureSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section className="py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70 mb-6 tracking-tight"
          >
            Everything you need to build a{" "}
            <span className="text-primary">winning resume</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Powerful features designed to get you hired faster. Completely free,
            no hidden catches.
          </motion.p>
        </div>

        {/* Bento Grid - 6 Items Pattern */}
        {/* Row 1: Wide (2) | Narrow (1) */}
        {/* Row 2: Narrow (1) | Wide (2) */}
        {/* Row 3: Wide (2) | Narrow (1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          {/* --- ROW 1 --- */}

          {/* Item 1: Real Templates (Wide - Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`col-span-1 md:col-span-2 max-h-[325px] rounded-3xl bg-secondary/30 border border-border/50 p-8 overflow-hidden relative group hover:border-primary/20 transition-colors ${isHovered ? "cursor-none" : ""
              }`}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{
                    left: cursorX,
                    top: cursorY,
                    translateX: "-2px",
                    translateY: "-2px",
                  }}
                  className="pointer-events-none absolute z-50 flex items-center gap-2"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    className="text-primary drop-shadow-sm"
                  >
                    <path
                      d="M4.75 3.75L13.25 8.25L8.25 9.25L7.25 14.25L4.75 3.75Z"
                      fill="currentColor"
                    />
                    <path
                      d="M4.75 3.75L13.25 8.25L8.25 9.25L7.25 14.25L4.75 3.75Z"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-sm font-semibold shadow-sm whitespace-nowrap"
                  >
                    Success Stories
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                  <User className="w-3 h-3" /> Real Examples
                </span>
                <h3 className="text-2xl font-semibold mb-2">
                  Templates from Success Stories
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Use templates modeled after resumes that actually got people
                  hired at top companies.
                </p>
              </div>

              {/* Visual Mockup Area */}
              <div className="mt-auto w-full bg-background rounded-tl-xl border border-border/50 shadow-2xl relative translate-x-10  group-hover:-translate-y-6 transition-transform duration-500 ease-out p-4 h-[200px]">
                <div className="flex gap-4">
                  <div className="w-1/2 aspect-3/4 bg-muted/50 rounded-lg p-3 space-y-2 shrink-0">
                    <div className="w-1/3 h-1.5 bg-muted-foreground/20 rounded" />
                    <div className="w-full h-1 bg-muted-foreground/10 rounded" />
                    <div className="w-full h-1 bg-muted-foreground/10 rounded" />
                    <div className="w-3/4 h-1 bg-muted-foreground/10 rounded" />
                    <div className="mt-4 w-1/4 h-1.5 bg-muted-foreground/20 rounded" />
                    <div className="w-full h-12 bg-muted-foreground/5 rounded-md" />
                  </div>
                  <div className="w-1/2 aspect-3/4 bg-muted/50 rounded-lg p-3 space-y-2 mt-8 shrink-0">
                    <div className="w-1/3 h-1.5 bg-muted-foreground/20 rounded" />
                    <div className="w-full h-1 bg-muted-foreground/10 rounded" />
                    <div className="w-full h-1 bg-muted-foreground/10 rounded" />
                    <div className="w-3/4 h-1 bg-muted-foreground/10 rounded" />
                    <div className="mt-4 w-1/4 h-1.5 bg-muted-foreground/20 rounded" />
                    <div className="w-full h-12 bg-muted-foreground/5 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-1 min-h-[320px] rounded-3xl bg-linear-to-bl from-primary/10 to-background border border-border/50 p-8 relative overflow-hidden group hover:border-primary/20 transition-colors"
          >
            {/* Animated Background Infinity Symbol */}

            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary relative">
                  <InfinityIcon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-semibold mb-2">Free Forever</h3>
                <p className="text-muted-foreground mb-4">
                  No credit card required. No paywalls. Just build your resume.
                </p>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden w-full">
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />

                  <div className="relative flex items-baseline gap-1 mx-auto">
                    <motion.span
                      initial={{ scale: 1.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                      className="text-4xl font-bold text-primary"
                    >
                      $0
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      / forever
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- ROW 2 --- */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="col-span-1 md:col-span-1 min-h-[320px] rounded-3xl bg-secondary/30 border border-border/50 p-8 relative overflow-hidden group hover:border-primary/20 transition-colors"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 relative">
                  <span className="absolute text-xs text-blue-500">W</span>
                  <Ban className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Watermarks</h3>
                <p className="text-muted-foreground">
                  Your data is yours. Download clean, professional PDFs without
                  any branding.
                </p>
              </div>

              {/* Static Long CTA */}
              {/* <Button variant="ghost" className="max-w-fit hover:bg-transparent hover:text-green-500/70 transition-colors">
                  <span>Start Building Now</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover/cta:text-green-500 transition-colors" />
              </Button> */}
              <div className="mt-auto pt-6">
                <button className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-secondary/50 border border-border/50 text-sm font-medium hover:bg-secondary hover:border-blue-500/20 transition-all text-muted-foreground hover:text-foreground group/cta">
                  <span>Start Building Now</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover/cta:text-blue-500 transition-colors" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Item 4: Smart Filters (Wide - Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="col-span-1 md:col-span-2 rounded-3xl bg-secondary/30 border border-border/50 p-8 overflow-hidden relative group hover:border-primary/20 transition-colors"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center h-full">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500">
                  <LayersIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">
                  Tailored to Your Level
                </h3>
                <p className="text-muted-foreground">
                  Smart filters help you find templates by experience level and
                  job role to match your career stage.
                </p>
              </div>

              {/* Abstract Filter UI Visualization */}
              <div className="relative bg-background rounded-xl border border-border/50 shadow-lg p-5 rotate-1 group-hover:rotate-0 transition-all duration-500">
                <div className="flex gap-2 mb-4">
                  <div className="px-3 py-1 rounded-md bg-secondary text-xs border border-border font-mono max-w-fit">
                    Matches: 12
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium">
                      Role: Software Engineer
                    </span>
                    <div className="flex gap-1">
                      <span className="w-10 h-2 bg-blue-500/20 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium">
                      Experience: 2 years
                    </span>
                    <div className="flex gap-1">
                      <span className="w-8 h-2 bg-primary/20 rounded" />
                      <span className="w-4 h-2 bg-primary/40 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- ROW 3 --- */}

          {/* Item 5: ATS Friendly (Wide - Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="col-span-1 md:col-span-2 rounded-3xl bg-linear-to-r from-secondary/50 to-background border border-border/50 p-8 overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-green-500/5 to-transparent pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10 h-full">
              <div className="max-w-md">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 text-green-500">
                  <ShieldCheckIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">ATS Friendly</h3>
                <p className="text-muted-foreground">
                  Rigorously tested against major Applicant Tracking Systems to
                  ensure your resume gets parsed correctly.
                </p>
              </div>

              <div className="flex flex-col gap-5 relative">
                {/* Check item 1 - Clean Layout */}
                <motion.div
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-xs relative overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-lg border border-border/50" />

                  {/* Animated check icon and border */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 absolute inset-0 -rotate-90"
                    >
                      <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 1.3,
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-3 h-3 relative z-10"
                    >
                      <motion.path
                        d="M4 12L9 17L20 6"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.8,
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium relative z-10 text-foreground">
                    Clean Layout
                  </span>
                </motion.div>

                {/* Connecting Line 1 */}
                <div className="absolute left-[26px] top-[36px] w-0.5 h-[20px] -z-10 bg-border/30">
                  <motion.div
                    className="w-full bg-green-500"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 1.7,
                      duration: 0.4,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* Check item 2 - Standard Fonts */}
                <motion.div
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-xs relative overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-lg border border-border/50" />

                  {/* Animated check icon and border */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 absolute inset-0 -rotate-90"
                    >
                      <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 2.6,
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-3 h-3 relative z-10"
                    >
                      <motion.path
                        d="M4 12L9 17L20 6"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 2.1,
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium relative z-10 text-foreground">
                    Standard Fonts
                  </span>
                </motion.div>

                {/* Connecting Line 2 */}
                <div className="absolute left-[26px] top-[92px] w-0.5 h-[20px] -z-10 bg-border/30">
                  <motion.div
                    className="w-full bg-green-500"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 3.0,
                      duration: 0.4,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* Check item 3 - Consistent Spacing */}
                <motion.div
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-xs relative overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-lg border border-border/50" />

                  {/* Animated check icon and border */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 absolute inset-0 -rotate-90"
                    >
                      <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 3.9,
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-3 h-3 relative z-10"
                    >
                      <motion.path
                        d="M4 12L9 17L20 6"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 3.4,
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium relative z-10 text-foreground">
                    Consistent Spacing
                  </span>
                </motion.div>

                {/* Connecting Line 3 */}
                <div className="absolute left-[26px] top-[148px] w-0.5 h-[20px] -z-10 bg-border/30">
                  <motion.div
                    className="w-full bg-green-500"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 4.3,
                      duration: 0.4,
                      ease: "linear",
                    }}
                  />
                </div>
                {/* Check item 4 - Job Ready Resume */}
                <motion.div
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-xs relative overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-lg border border-border/50" />

                  {/* Animated check icon and border */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 absolute inset-0 -rotate-90"
                    >
                      <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 5.2,
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-3 h-3 relative z-10"
                    >
                      <motion.path
                        d="M4 12L9 17L20 6"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 4.7,
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium relative z-10 text-foreground">
                    Job Ready Resume
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="col-span-1 md:col-span-1 min-h-[320px] rounded-3xl bg-secondary/30 border border-border/50 p-8 relative overflow-hidden group hover:border-primary/20 transition-colors"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-500">
                  <EyeIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
                <p className="text-muted-foreground mb-4">
                  Share your resume with a permanent link. Updates reflect
                  instantly around the globe.
                </p>
              </div>

              {/* Split-Screen Visualization */}
              <div className="mt-auto translate-y-full translate-x-[35%] absolute">
                <div className="w-[250px] mx-auto bg-background rounded-lg border-2 border-border/50 overflow-hidden shadow-lg">
                  <div className="bg-background/50 px-2 py-1 border-t border-border/30 flex items-center justify-center">
                    <div className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-primary">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2 }}
                        className="w-1 h-1 rounded-full bg-primary"
                      />
                      Updates in Real-Time
                    </div>
                  </div>
                  <div className="flex gap-px bg-border/50">
                    {/* Left Side - Form Inputs */}
                    <div className="flex-1 bg-background p-3 space-y-2">
                      {/* Name Field */}
                      <div className="space-y-1">
                        <div className="text-[7px] text-muted-foreground font-medium">
                          Name
                        </div>
                        <div className="h-5 w-full bg-muted/50 rounded border border-border/30 px-1.5 flex items-center overflow-hidden">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="text-[8px] font-medium text-foreground"
                          >
                            {["J", "o", "h", "n", " ", "D", "o", "e"].map(
                              (char, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{
                                    delay: 0.5 + i * 0.1,
                                    duration: 0.1,
                                  }}
                                >
                                  {char}
                                </motion.span>
                              )
                            )}
                          </motion.span>
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-1">
                        <div className="text-[7px] text-muted-foreground font-medium">
                          Email
                        </div>
                        <div className="h-5 w-full bg-muted/50 rounded border border-border/30 px-1.5 flex items-center overflow-hidden">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8, duration: 0.3 }}
                            className="text-[7px] text-foreground"
                          >
                            {[
                              "j",
                              "o",
                              "h",
                              "n",
                              "@",
                              "e",
                              "m",
                              "a",
                              "i",
                              "l",
                              ".",
                              "c",
                              "o",
                              "m",
                            ].map((char, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  delay: 1.8 + i * 0.08,
                                  duration: 0.1,
                                }}
                              >
                                {char}
                              </motion.span>
                            ))}
                          </motion.span>
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-1">
                        <div className="text-[7px] text-muted-foreground font-medium">
                          Phone
                        </div>
                        <div className="h-5 w-full bg-muted/50 rounded border border-border/30 px-1.5 flex items-center overflow-hidden">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3.2, duration: 0.3 }}
                            className="text-[7px] text-foreground"
                          >
                            {[
                              "+",
                              "1",
                              " ",
                              "5",
                              "5",
                              "5",
                              "-",
                              "0",
                              "1",
                              "0",
                              "0",
                            ].map((char, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  delay: 3.2 + i * 0.08,
                                  duration: 0.1,
                                }}
                              >
                                {char}
                              </motion.span>
                            ))}
                          </motion.span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Resume Preview */}
                    <div className="flex-1 bg-muted/30 p-3 space-y-1.5">
                      {/* Name (appears after being typed on left) */}
                      <div className="overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.3, duration: 0.4 }}
                          className="text-[9px] font-bold text-foreground"
                        >
                          {["J", "o", "h", "n", " ", "D", "o", "e"].map(
                            (char, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  delay: 1.3 + i * 0.08,
                                  duration: 0.1,
                                }}
                              >
                                {char}
                              </motion.span>
                            )
                          )}
                        </motion.div>
                      </div>

                      {/* Contact Info */}
                      <motion.div
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.8, duration: 0.3 }}
                        className="text-[6px] text-muted-foreground space-y-0.5"
                      >
                        <div>john@email.com</div>
                        <div>+1 555-0100</div>
                      </motion.div>

                      <div className="h-px bg-border/30 my-1.5" />

                      {/* Experience Section */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4.2, duration: 0.3 }}
                        className="space-y-1"
                      >
                        <div className="text-[7px] font-semibold text-foreground">
                          Experience
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-[6px] font-medium text-foreground/80">
                            Senior Developer
                          </div>
                          <div className="text-[5px] text-muted-foreground">
                            Tech Corp • 2020-Present
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
