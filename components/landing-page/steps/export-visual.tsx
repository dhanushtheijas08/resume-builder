"use client";

import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  Loader2,
  MousePointer2,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const ExportVisual = () => {
  const [status, setStatus] = useState<
    "idle" | "clicking" | "loading" | "success"
  >("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let myConfetti: confetti.CreateTypes | null = null;
    let timer: NodeJS.Timeout | null = null;

    if (status === "success" && canvasRef.current) {
      timer = setTimeout(() => {
        myConfetti = confetti.create(canvasRef.current!, {
          resize: true,
          useWorker: true,
        });
        myConfetti({
          particleCount: 60,
          spread: 50,
          origin: { y: 0.9 },
          colors: ["#3b82f6", "#ffffff", "#93c5fd"],
          gravity: 1.4,
          scalar: 0.6,
          drift: 0,
          ticks: 200,
        });
      }, 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (myConfetti) {
        myConfetti.reset();
      }
    };
  }, [status]);

  useEffect(() => {
    let mounted = true;

    const sequence = async () => {
      if (!mounted) return;
      // 1. Start Idle
      setStatus("idle");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!mounted) return;
      // 2. Simulate Click
      setStatus("clicking");
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (!mounted) return;
      // 3. Start Loading
      setStatus("loading");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!mounted) return;
      // 4. Success
      setStatus("success");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (mounted) sequence();
    };

    sequence();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative w-full h-full flex  justify-center p-4 lg:p-8 overflow-hidden">
      <div className="relative w-full h-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative  w-full h-full bg-background/80 backdrop-blur-xl rounded-xl border-2 border-primary/20 shadow-2xl flex flex-col p-4 overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          />

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
            className="flex-1 relative z-10 space-y-5"
          >
            {/* Resume Header */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              className="flex items-start gap-4 border-b border-border/30 pb-5"
            >
              <div className="size-14 rounded-xl bg-primary/10 shrink-0 flex items-center justify-center">
                <User className="size-7 text-primary/40" />
              </div>
              <div className="space-y-2.5 flex-1 pt-0.5">
                <div className="h-3.5 w-2/3 bg-foreground/15 rounded-md" />
                <div className="h-2 w-1/3 bg-muted-foreground/20 rounded-md" />
                <div className="flex gap-2.5 pt-1">
                  <div className="h-1.5 w-14 bg-muted/40 rounded-full" />
                  <div className="h-1.5 w-14 bg-muted/40 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Summary Section */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              className="space-y-2.5"
            >
              <div className="h-2.5 w-20 bg-primary/20 rounded-md" />
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-muted/40 rounded-full" />
                <div className="h-1.5 w-full bg-muted/40 rounded-full" />
                <div className="h-1.5 w-4/5 bg-muted/40 rounded-full" />
              </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              className="space-y-4 pt-1"
            >
              <div className="h-2.5 w-24 bg-primary/20 rounded-md" />
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <div className="h-2 w-32 bg-foreground/10 rounded-md" />
                      <div className="h-1.5 w-16 bg-muted/30 rounded-full" />
                    </div>
                    <div className="space-y-2 pl-3 border-l-2 border-primary/10">
                      <div className="h-1.5 w-full bg-muted/30 rounded-full" />
                      <div className="h-1.5 w-11/12 bg-muted/30 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              className="space-y-3 pt-1"
            >
              <div className="h-2.5 w-16 bg-primary/20 rounded-md" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      show: { opacity: 1, scale: 1 },
                    }}
                    className="h-5 w-14 bg-primary/5 border border-primary/10 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{
              scale: status === "clicking" ? 0.95 : 1,
              backgroundColor: "var(--primary)",
            }}
            className="mt-auto h-10 w-full rounded-lg flex items-center justify-center text-primary-foreground gap-2 shadow-lg shadow-primary/20 relative overflow-hidden group transition-colors duration-300"
          >
            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Downloading...
                  </span>
                </motion.div>
              ) : status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="size-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Completed
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4 relative z-10" />
                  <span className="text-xs font-bold relative z-10">
                    Download as PDF
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Shimmer on button */}
            {status === "idle" && (
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Simulated Cursor */}
        <AnimatePresence>
          {(status === "idle" || status === "clicking") && (
            <motion.div
              initial={{
                x: 300,
                y: 33,
              }}
              animate={{
                x: 200,
                y: -33,
              }}
              transition={{
                duration: 1.6,
                ease: "easeIn",
              }}
              className="absolute z-50 pointer-events-none text-primary"
            >
              <MousePointer2
                className={cn(
                  "size-6 fill-primary stroke-white stroke-[2px] transition-all scale-100",
                  status === "clicking" && "scale-75",
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
