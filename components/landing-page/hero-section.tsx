"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[95vh] overflow-hidden pt-32 pb-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/25 blur-[160px] rounded-full opacity-40 contrast-150 saturate-200" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-accent/20 blur-[130px] rounded-full opacity-30" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 blur-[140px] rounded-full opacity-30" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.15] contrast-100 mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="container relative px-4 md:px-6 flex flex-col items-start text-left mx-auto">
        <div className="flex flex-col gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-6xl font-[520] tracking-normal  bg-clip-text text-transparent bg-linear-to-b from-foreground via-foreground/90 to-muted-foreground/50 pb-2 leading-14.5 mt-10"
          >
            Build professional job ready
            <br className="hidden md:block" />
            <span className="text-foreground">resumes in 3 simple steps</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed md:leading-7"
          >
            {/* ATS-friendly resumes using custom templates by role and experience with live preview and smart customization */}
            ATS-friendly resumes using custom templates by role and{" "}
            <br className="hidden md:block" />
            experience with live preview and smart customization
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-1.5"
          >
            <Button
              size="lg"
              className="max-w-fit text-base font-medium"
              variant="primary"
              asChild
            >
              <Link href="/register">Start building</Link>
            </Button>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
            type: "spring",
            bounce: 0.2,
          }}
          style={{ perspective: "1200px" }}
          className="mb-20 w-full max-w-300 mx-auto relative group"
        >
          <Image
            src="/hero-img.svg"
            alt="Resume Builder Interface"
            width={1920}
            height={975}
            className="w-full h-auto rounded-xl shadow-2xl ring-1 ring-white/10 val -translate-y-14"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};
