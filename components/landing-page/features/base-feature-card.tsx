import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface BaseFeatureCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  colSpan?: "1" | "2";
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const BaseFeatureCard = ({
  children,
  className = "",
  delay = 0,
  colSpan = "1",
  ...motionProps
}: BaseFeatureCardProps) => {
  const colSpanClass =
    colSpan === "2" ? "col-span-1 md:col-span-2" : "col-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={cn(
        colSpanClass,
        "rounded-3xl bg-secondary/30 border border-border/50 p-6 md:p-8 relative overflow-hidden group hover:border-primary/20 transition-colors",
        className,
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
