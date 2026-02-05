import { motion } from "framer-motion";
import { Infinity as InfinityIcon } from "lucide-react";
import { BaseFeatureCard } from "./base-feature-card";
import Link from "next/link";

export const FreeForeverCard = () => {
  return (
    <BaseFeatureCard
      delay={0.3}
      className="min-h-[320px] bg-linear-to-bl from-primary/10 to-background"
    >
      {/* Animated Background Dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary relative">
            <InfinityIcon className="w-6 h-6" />
          </div>

          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Free Forever
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            No credit card required. No paywalls. Just build your resume.
          </p>
        </div>

        <Link href="/register">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden w-full">
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
              }}
            />

            <div className="relative flex items-baseline gap-1 mx-auto">
              <motion.span
                initial={{ scale: 1.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="text-4xl font-bold text-primary"
              >
                $0
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-sm font-medium text-muted-foreground"
              >
                / forever
              </motion.span>
            </div>
          </div>
        </Link>
      </div>
    </BaseFeatureCard>
  );
};
