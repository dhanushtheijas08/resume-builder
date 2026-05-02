"use client";

import { BlurEffect } from "@/components/animations/blur-effect";
import { HeroSectionResumePreview } from "@/components/landing-page/resume-preview";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden pt-12 lg:pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/25 blur-[160px] rounded-full opacity-40 contrast-150 saturate-200" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-accent/20 blur-[130px] rounded-full opacity-30" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 blur-[140px] rounded-full opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="container max-w-7xl relative px-4 sm:px-6 md:px-8 lg:px-6 flex flex-col items-start text-left mx-auto">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-5 lg:gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-8 sm:mt-10 md:mt-16 lg:mt-24 bg-clip-text text-transparent bg-linear-to-b from-foreground via-foreground/90 to-muted-foreground/50 pb-1 md:pb-1.5 lg:pb-2 text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl font-[520] tracking-normal leading-[0.95] sm:leading-[0.95] md:leading-[1.02] lg:leading-14.5"
          >
            <BlurEffect
              word="Build professional job ready"
              className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70 hidden md:block"
            />
            <BlurEffect
              word="resumes in 3 simple steps"
              delay={0.25}
              className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70 hidden md:block"
            />
            <BlurEffect
              word="Build professional resumes in 3 steps"
              className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70 block md:hidden"
            />
          </motion.h1>

          <motion.p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl md:max-w-2xl sm:leading-relaxed md:leading-7">
            <BlurEffect
              word="ATS-friendly resumes using custom templates by role and experience with live preview and smart customization"
              type="line"
              delay={0.75}
              className="text-muted-foreground max-w-xl"
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 5 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
            className="mt-1.5"
          >
            <Button
              size="lg"
              className="max-w-fit text-sm sm:text-base font-medium px-5 sm:px-6"
              variant="primary"
              asChild
            >
              <Link href="/register">Start building</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="relative h-[560px] w-full sm:h-[700px] lg:h-[850px] pointer-events-none select-none -mt-32 sm:-mt-36 md:-mt-28 lg:-mt-24 max-w-7xl mx-auto">
        <HeroSectionResumePreview />
      </div>
    </section>
  );
};
