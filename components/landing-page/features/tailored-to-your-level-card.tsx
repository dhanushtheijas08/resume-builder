import { LayersIcon } from "@/components/ui/layers";
import { BaseFeatureCard } from "./base-feature-card";

export const TailoredToYourLevelCard = () => {
  return (
    <BaseFeatureCard delay={0.5} colSpan="2" className="p-7 sm:p-8">
      <div className="grid md:grid-cols-2 md:gap-8 gap-4 items-center h-full">
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-2.5 md:mb-6 text-purple-500">
            <LayersIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Tailored to Your Level
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-2">
            Smart filters help you find templates based on your experience level
            and job role.
          </p>
        </div>

        <div
          className="relative bg-background rounded-lg border border-border/50 shadow-md  p-3 sm:p-5 
                rotate-1 group-hover:rotate-0 transition-all duration-500 max-w-[280px] sm:max-w-none w-full mx-auto"
        >
          <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-4">
            <div className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md bg-secondary text-[10px] sm:text-xs border border-border font-mono max-w-fit">
              Matches: 12
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div
              className="flex items-center justify-between 
                    p-1.5 sm:p-2 
                    rounded-md sm:rounded-lg bg-muted/30"
            >
              <span className="text-xs sm:text-sm font-medium">
                Role: Software Engineer
              </span>
              <div className="flex gap-0.5 sm:gap-1">
                <span className="w-8 sm:w-10 h-1.5 sm:h-2 bg-blue-500/20 rounded" />
              </div>
            </div>

            <div
              className="flex items-center justify-between 
                    p-1.5 sm:p-2 
                    rounded-md sm:rounded-lg bg-muted/30"
            >
              <span className="text-xs sm:text-sm font-medium">
                Experience: 2 years
              </span>
              <div className="flex gap-0.5 sm:gap-1">
                <span className="w-6 sm:w-8 h-1.5 sm:h-2 bg-primary/20 rounded" />
                <span className="w-3 sm:w-4 h-1.5 sm:h-2 bg-primary/40 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseFeatureCard>
  );
};
