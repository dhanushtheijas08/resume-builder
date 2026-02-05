import { EyeIcon } from "@/components/ui/eye";
import { motion } from "framer-motion";
import { BaseFeatureCard } from "./base-feature-card";

export const LivePreviewCard = () => {
  return (
    <BaseFeatureCard delay={0.7} className="min-h-[320px]">
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-500">
            <EyeIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Live Preview
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            Preview your resume in real time as you update your details.
          </p>
        </div>

        {/* Split-Screen Visualization */}
        <div className="mt-auto translate-y-full translate-x-[55%] md:translate-x-[35%] absolute">
          <div className="w-[220px] md:w-[250px] mx-auto bg-background rounded-lg border-2 border-border/50 overflow-hidden shadow-lg">
            <div className="bg-background/50 px-2 py-1 border-t border-border/30 flex items-center justify-center">
              <div className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-primary">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2 }}
                  className="w-1 h-1 rounded-full bg-primary"
                />
                Updates in Real-Time
              </div>
            </div>
            <div className="flex gap-px bg-border/50">
              {/* Left Side - Form Inputs */}
              <div className="flex-1 bg-background p-3 space-y-2">
                {/* Name Field */}
                <div className="space-y-1">
                  <div className="text-[7px] text-muted-foreground font-medium">
                    Name
                  </div>
                  <div className="h-5 w-full bg-muted/50 rounded border border-border/30 px-1.5 flex items-center overflow-hidden">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="text-[8px] font-medium text-foreground"
                    >
                      {["J", "o", "h", "n", " ", "D", "o", "e"].map(
                        (char, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: 0.5 + i * 0.1,
                              duration: 0.1,
                            }}
                          >
                            {char}
                          </motion.span>
                        ),
                      )}
                    </motion.span>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <div className="text-[7px] text-muted-foreground font-medium">
                    Email
                  </div>
                  <div className="h-5 w-full bg-muted/50 rounded border border-border/30 px-1.5 flex items-center overflow-hidden">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8, duration: 0.3 }}
                      className="text-[7px] text-foreground"
                    >
                      {[
                        "j",
                        "o",
                        "h",
                        "n",
                        "@",
                        "e",
                        "m",
                        "a",
                        "i",
                        "l",
                        ".",
                        "c",
                        "o",
                        "m",
                      ].map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            delay: 1.8 + i * 0.08,
                            duration: 0.1,
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.span>
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-1">
                  <div className="text-[7px] text-muted-foreground font-medium">
                    Phone
                  </div>
                  <div className="h-5 w-full bg-muted/50 rounded border border-border/30 px-1.5 flex items-center overflow-hidden">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.2, duration: 0.3 }}
                      className="text-[7px] text-foreground"
                    >
                      {[
                        "+",
                        "1",
                        " ",
                        "5",
                        "5",
                        "5",
                        "-",
                        "0",
                        "1",
                        "0",
                        "0",
                      ].map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            delay: 3.2 + i * 0.08,
                            duration: 0.1,
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Right Side - Resume Preview */}
              <div className="flex-1 bg-muted/30 p-3 space-y-1.5">
                {/* Name (appears after being typed on left) */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.4 }}
                    className="text-[9px] font-bold text-foreground"
                  >
                    {["J", "o", "h", "n", " ", "D", "o", "e"].map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          delay: 1.3 + i * 0.08,
                          duration: 0.1,
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8, duration: 0.3 }}
                  className="text-[6px] text-muted-foreground space-y-0.5"
                >
                  <div>john@email.com</div>
                  <div>+1 555-0100</div>
                </motion.div>

                <div className="h-px bg-border/30 my-1.5" />

                {/* Experience Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.2, duration: 0.3 }}
                  className="space-y-1"
                >
                  <div className="text-[7px] font-semibold text-foreground">
                    Experience
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[6px] font-medium text-foreground/80">
                      Senior Developer
                    </div>
                    <div className="text-[5px] text-muted-foreground">
                      Tech Corp • 2020-Present
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseFeatureCard>
  );
};
