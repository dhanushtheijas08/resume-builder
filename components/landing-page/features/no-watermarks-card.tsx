import { Ban } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { BaseFeatureCard } from "./base-feature-card";
import Link from "next/link";

export const NoWatermarksCard = () => {
  return (
    <BaseFeatureCard delay={0.4} className="min-h-[320px]">
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 relative">
            <span className="absolute text-xs text-blue-500">W</span>
            <Ban className="w-6 h-6" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            No Watermarks
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Download clean, professional PDFs without any watermarks.
          </p>
        </div>

        <Link href="/register" className="mt-auto pt-6">
          <button className="w-full flex items-center cursor-pointer justify-between px-5 py-3 rounded-xl bg-secondary/50 border border-border/50 text-sm font-medium hover:bg-secondary hover:border-blue-500/20 transition-all text-muted-foreground hover:text-foreground group/cta">
            <span>Start Building Now</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover/cta:text-blue-500 transition-colors" />
          </button>
        </Link>
      </div>
    </BaseFeatureCard>
  );
};
