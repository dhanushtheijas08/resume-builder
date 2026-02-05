"use client";

import { motion } from "framer-motion";
import {
  FreeForeverCard,
  LivePreviewCard,
  NoWatermarksCard,
  RealTemplatesCard,
  TailoredToYourLevelCard,
  ATSFriendlyCard,
} from "./features";

export const FeatureSection = () => {
  return (
    <section className="py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-4 md:mb-6 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70">
              Everything you need to build a
            </span>{" "}
            <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
              winning resume
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground"
          >
            Powerful features designed to get you hired faster. Completely free,
            no hidden catches.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(280px,auto)]">
          <RealTemplatesCard />
          <FreeForeverCard />
          <NoWatermarksCard />
          <ATSFriendlyCard />
          <TailoredToYourLevelCard />
          <LivePreviewCard />
        </div>
      </div>
    </section>
  );
};
