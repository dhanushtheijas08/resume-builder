"use client";

import { BlurEffect } from "@/components/animations/blur-effect";
import { HeroSectionResumePreview } from "@/components/landing-page/resume-preview";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[95vh] overflow-hidden pt-32">
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
            <BlurEffect
              word="Build professional job ready"
              className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70"
            />
            <BlurEffect
              word="resumes in 3 simple steps"
              delay={0.25}
              className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70"
            />
          </motion.h1>

          <motion.p className="text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed md:leading-7">
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
              className="max-w-fit text-base font-medium"
              variant="primary"
              asChild
            >
              <Link href="/register">Start building</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="relative h-[600px] w-full sm:h-[850px] pointer-events-none select-none -mt-24 ">
        <HeroSectionResumePreview />
      </div>
    </section>
  );
};
