"use client";

import { motion } from "framer-motion";
import React from "react";

interface ResumePreviewAnimationProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

export const ResumePreviewAnimation = ({
  children,
  duration,
  delay,
}: ResumePreviewAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: -50, z: 300 }}
      animate={{ opacity: 1, x: 0, y: 0, z: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: duration || 0.5,
        ease: "easeOut",
        delay: delay || 0,
      }}
    >
      {children}
    </motion.div>
  );
};

export const OpacityAnimation = ({
  children,
  delay = 0.6,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
