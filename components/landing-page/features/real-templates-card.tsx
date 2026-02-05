"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { User } from "lucide-react";
import { useState } from "react";
import { BaseFeatureCard } from "./base-feature-card";

export const RealTemplatesCard = () => {
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
    <BaseFeatureCard
      delay={0.2}
      colSpan="2"
      className={`max-h-[325px] ${isHovered ? "cursor-none" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <div className="mb-4 md:mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <User className="w-3 h-3" /> Real Examples
          </span>
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            Templates from Success Stories
          </h3>
          <p className="text-sm md:text-base text-muted-foreground max-w-md">
            Use templates modeled after resumes that helped people get hired at
            top companies.
          </p>
        </div>

        {/* Visual Mockup Area */}
        <div className="mt-auto w-full bg-background rounded-tl-xl border border-border/50 shadow-2xl relative md:translate-x-10 group-hover:-translate-y-6 transition-transform duration-500 ease-out p-3 md:p-4 h-[180px] md:h-[200px]">
          <div className="flex gap-2 md:gap-4">
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
    </BaseFeatureCard>
  );
};
