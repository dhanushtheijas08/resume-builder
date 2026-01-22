"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const TemplateSelectionVisual = () => {
  const [selected, setSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true});

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setSelected(true), 1000);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden"
    >
      <div
        className={`w-full max-w-md ${
          selected ? "aspect-3/4" : "grid grid-cols-2 gap-4"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {[1, 2, 3, 4].map(
            (i) =>
              (!selected || i === 2) && (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    layout: { type: "spring", stiffness: 80, damping: 14 },
                    opacity: { duration: 0.3 },
                  }}
                  className={`relative overflow-hidden ${
                    i === 2 && selected
                      ? "w-full h-full rounded-xl bg-background border border-border shadow-2xl flex flex-col"
                      : "aspect-3/4 rounded-xl border-2 bg-muted/30 p-4 border-border/50"
                  } ${
                    i === 2 && !selected
                      ? "border-primary ring-2 ring-primary/20"
                      : ""
                  }`}
                >
                  {!selected ? (
                    <div>
                      {i == 2 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-full flex flex-col"
                        >
                          {/* Header */}
                          <div className="bg-muted/30 p-2 flex items-center gap-4 border-b border-border/50">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring" }}
                              className="size-5 rounded-full bg-primary/20 shrink-0"
                            />
                            <div className="space-y-1 w-full">
                              <motion.div className="h-1 bg-foreground/20 rounded-md" />
                              <motion.div className="h-1 bg-foreground/10 rounded-md" />
                            </div>
                          </div>

                          {/* Body */}
                          <div className="flex-1 p-2 space-y-3">
                            {/* Experience */}
                            <div className="h-2 w-20 bg-primary/20 rounded" />
                            <div className="space-y-2">
                              <div className="flex justify-between w-full">
                                <div className="h-2 w-1/3 bg-foreground/10 rounded" />
                                <div className="h-2 w-1/6 bg-foreground/5 rounded" />
                              </div>
                              <div className="h-1.5 w-full bg-foreground/5 rounded" />
                              <div className="h-1.5 w-5/6 bg-foreground/5 rounded" />
                            </div>

                            {/* Education & Skills Split or Stacked */}
                            <div className="space-y-5">
                              {/* Education */}
                              <div className="space-y-3">
                                <div className="h-2 w-16 bg-primary/20 rounded" />
                                <div className="space-y-2">
                                  <div className="flex justify-between w-full">
                                    <div className="h-2 w-1/4 bg-foreground/10 rounded" />
                                    <div className="h-2 w-1/6 bg-foreground/5 rounded" />
                                  </div>
                                  <div className="h-1.5 w-1/2 bg-foreground/5 rounded" />
                                </div>
                              </div>

                              {/* Skills */}
                              <div className="space-y-2">
                                <div className="h-2 w-12 bg-primary/20 rounded mb-2" />
                                <div className="flex flex-wrap gap-1.5">
                                  {[1, 2, 3, 4, 5].map((k) => (
                                    <div
                                      key={k}
                                      className="h-2.5 w-6 bg-foreground/5 rounded-full"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="space-y-2">
                          <motion.div
                            layout
                            className="w-1/2 h-1.5 bg-foreground/20 rounded"
                          />
                          <motion.div
                            layout
                            className="w-full h-1 bg-foreground/10 rounded"
                          />
                          <motion.div
                            layout
                            className="w-full h-1 bg-foreground/10 rounded"
                          />
                          <motion.div
                            layout
                            className="w-3/4 h-1 bg-foreground/10 rounded"
                          />

                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <motion.div
                              layout
                              className="h-10 bg-foreground/5 rounded"
                            />
                            <motion.div
                              layout
                              className="h-10 bg-foreground/5 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full flex flex-col"
                    >
                      {/* Header */}
                      <div className="bg-muted/30 p-5 flex items-center gap-4 border-b border-border/50">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="size-12 rounded-full bg-primary/20 shrink-0"
                        />
                        <div className="space-y-2 w-full">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "50%" }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="h-3 bg-foreground/20 rounded-md"
                          />
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "30%" }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="h-2 bg-foreground/10 rounded-md"
                          />
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex-1 p-5 space-y-6">
                        {/* Contact Info - Horizontal Row */}
                        <div className="flex gap-3 flex-wrap">
                          {[1, 2, 3].map((k) => (
                            <motion.div
                              key={k}
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              transition={{ delay: 0.5 + k * 0.1 }}
                              className="h-1.5 w-16 bg-foreground/5 rounded"
                            />
                          ))}
                        </div>

                        {/* Experience */}
                        <div className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="h-2 w-20 bg-primary/20 rounded"
                          />
                          {[1, 2].map((k) => (
                            <motion.div
                              key={k}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.7 + k * 0.2 }}
                              className="space-y-2"
                            >
                              <div className="flex justify-between w-full">
                                <div className="h-2 w-1/3 bg-foreground/10 rounded" />
                                <div className="h-2 w-1/6 bg-foreground/5 rounded" />
                              </div>
                              <div className="h-1.5 w-full bg-foreground/5 rounded" />
                              <div className="h-1.5 w-5/6 bg-foreground/5 rounded" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Education & Skills Split or Stacked */}
                        <div className="space-y-5">
                          {/* Education */}
                          <div className="space-y-3">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1 }}
                              className="h-2 w-16 bg-primary/20 rounded"
                            />
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.1 }}
                              className="space-y-2"
                            >
                              <div className="flex justify-between w-full">
                                <div className="h-2 w-1/4 bg-foreground/10 rounded" />
                                <div className="h-2 w-1/6 bg-foreground/5 rounded" />
                              </div>
                              <div className="h-1.5 w-1/2 bg-foreground/5 rounded" />
                            </motion.div>
                          </div>

                          {/* Skills */}
                          <div className="space-y-2">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.2 }}
                              className="h-2 w-12 bg-primary/20 rounded mb-2"
                            />
                            <div className="flex flex-wrap gap-1.5">
                              {[1, 2, 3, 4, 5].map((k) => (
                                <motion.div
                                  key={k}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 1.3 + k * 0.05 }}
                                  className="h-4 w-8 bg-foreground/5 rounded-full"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {i === 2 && !selected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0, 1, 1] }}
                      transition={{ delay: 2, times: [0, 0.75, 0.8, 1] }}
                      className="absolute inset-0 bg-primary/5 pointer-events-none"
                    />
                  )}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Floating Animated Cursor - Moved outside layout container for reliable removal */}
      <AnimatePresence>
        {!selected && (
          <motion.div
            key="selection-cursor"
            initial={{ opacity: 0, x: 100, y: 100 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              x: [100, 60, 60, 60, 60],
              y: [100, -60, -60, -60, -60],
            }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{
              duration: 3.5,
              times: [0, 0.2, 0.7, 0.8, 0.95],
            }}
            className="absolute top-1/2 left-1/2 z-20 pointer-events-none text-primary"
          >
            <MousePointer2 className="size-6 fill-primary stroke-white stroke-[2px]" />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 0, 1.5, 0], opacity: [0, 0, 0.5, 0] }}
              transition={{
                duration: 2.5,
                times: [0, 0.7, 0.75, 0.85],
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute top-0 left-0 size-4.5 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
