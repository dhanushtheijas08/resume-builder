"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BlurEffectProps {
  type?: "word" | "line";
  word: string;
  delay?: number;
  className?: string;
}

export const BlurEffect = ({
  type = "word",
  word,
  delay = 0,
  className = "",
}: BlurEffectProps) => {
  const arrayWords = word.split(" ");

  if (type === "line") {
    return (
      <motion.span
        initial={{ opacity: 0, filter: "blur(10px)", y: 5 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay }}
        viewport={{ once: true }}
        className={cn("text-white inline-block", className)}
      >
        {word}
      </motion.span>
    );
  }

  return (
    <span className="inline-flex flex-wrap gap-1.5">
      {arrayWords.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.1 * i + delay,
          }}
          viewport={{ once: true }}
          className={cn("text-white inline-block", className)}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
};
