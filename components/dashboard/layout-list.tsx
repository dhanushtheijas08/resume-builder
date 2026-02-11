"use client";

import { Template } from "./template-data";
import { TemplateCard, TemplateCardSkeleton } from "./template-card";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutListProps {
  templates: Template[];
  isLoading?: boolean;
}

export const LayoutList = ({ templates, isLoading }: LayoutListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 sm:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <TemplateCardSkeleton key={i} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <AnimatePresence mode="popLayout">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <TemplateCard template={template} viewMode="list" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
