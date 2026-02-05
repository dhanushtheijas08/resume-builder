import { motion } from "framer-motion";
import { ShieldCheckIcon } from "lucide-react";

export function ATSFriendlyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      className="col-span-1 md:col-span-2 rounded-3xl bg-linear-to-r from-secondary/50 to-background border border-border/50 p-6 md:p-8 overflow-hidden relative group"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-green-500/5 to-transparent pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start lg:items-center justify-between gap-6 md:gap-8 relative z-10 h-full">
        {/* LEFT CONTENT */}
        <div className="max-w-md">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 text-green-500">
            <ShieldCheckIcon className="w-6 h-6" />
          </div>

          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            ATS Friendly
          </h3>

          <p className="text-sm md:text-base text-muted-foreground">
            Tested against major Applicant Tracking Systems to ensure your
            resume gets parsed correctly.
          </p>
        </div>

        {/* RIGHT CHECKLIST */}
        <div
          className="
            relative
            grid grid-cols-2 gap-4
            md:flex md:flex-col md:gap-5
          "
        >
          {/* MOBILE CONNECTORS */}
          <div className="md:hidden pointer-events-none absolute inset-0">
            <div className="absolute top-[22px] left-[25%] right-[25%] h-[1px] bg-border/40" />
            <div className="absolute bottom-[22px] left-[25%] right-[25%] h-[1px] bg-border/40" />
            <div className="absolute left-[25%] top-[22px] bottom-[22px] w-[1px] bg-border/40" />
            <div className="absolute right-[25%] top-[22px] bottom-[22px] w-[1px] bg-border/40" />
          </div>

          {/* ITEM 1 */}
          <ChecklistItem text="Clean Layout" delay={0.8} />

          {/* DESKTOP LINE */}
          <DesktopLine top="36px" delay={1.7} />

          {/* ITEM 2 */}
          <ChecklistItem text="Standard Fonts" delay={2.1} />

          <DesktopLine top="92px" delay={3.0} />

          {/* ITEM 3 */}
          <ChecklistItem text="Consistent Spacing" delay={3.4} />

          <DesktopLine top="148px" delay={4.3} />

          {/* ITEM 4 */}
          <ChecklistItem text="Job Ready Resume" delay={4.7} />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------- */
/* CHECKLIST ITEM */
/* ---------------------------------- */
function ChecklistItem({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/80 backdrop-blur-xs relative overflow-hidden"
    >
      <div className="absolute inset-0 rounded-lg border border-border/50" />

      <div className="relative w-5 h-5 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 absolute inset-0 -rotate-90"
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke="rgb(34, 197, 94)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4, ease: "easeInOut" }}
          />
        </svg>

        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 relative z-10">
          <motion.path
            d="M4 12L9 17L20 6"
            stroke="rgb(34, 197, 94)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay - 0.5, duration: 0.5 }}
          />
        </svg>
      </div>

      <span className="text-xs sm:text-sm font-medium relative z-10 text-foreground text-nowrap">
        {text}
      </span>
    </motion.div>
  );
}

/* ---------------------------------- */
/* DESKTOP CONNECTING LINE */
/* ---------------------------------- */
function DesktopLine({ top, delay }: { top: string; delay: number }) {
  return (
    <div
      className="hidden md:block absolute left-[26px] w-0.5 h-[20px] -z-10 bg-border/30"
      style={{ top }}
    >
      <motion.div
        className="w-full bg-green-500"
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4, ease: "linear" }}
      />
    </div>
  );
}
