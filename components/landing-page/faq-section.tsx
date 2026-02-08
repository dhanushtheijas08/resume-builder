"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Why should I choose this resume builder?",
    answer:
      "Unlike many generic builders, our templates are based on real resumes from candidates who got hired at top companies. We don't just give you a design — we give you a proven resume structure. You can also use smart filters to quickly find templates based on your job role and experience level.",
  },
  {
    question: "Is it really free to use?",
    answer:
      "Yes! You can create, customize, and download your resume completely free. We believe everyone deserves a fair chance to get their dream job without paying anything.",
  },
  {
    question: "Are the templates ATS-friendly?",
    answer:
      "Yes. Every template is built with Applicant Tracking Systems (ATS) in mind. We use standard fonts, clear headings, and clean formatting so your resume is easy for hiring software to read.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes. You can download your resume as a high-quality PDF with just one click. Your formatting will stay the same wherever you send it.",
  },
  {
    question: "How long does it take to build a resume?",
    answer:
      "Most users can create a complete resume in just a few minutes. The editor is simple and guides you step by step.",
  },
];

export const FAQSection = () => {
  const [openItems, setOpenItems] = useState<string | undefined>(undefined);

  return (
    <section
      className="py-0 pt-8 sm:py-20 md:pb-5 lg:py-24 relative overflow-hidden"
      id="faq"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-10 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70 mb-4 sm:mb-6 tracking-tight"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-lg text-muted-foreground"
          >
            Everything you need to know about building your perfect resume.
          </motion.p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-3 sm:space-y-4"
          value={openItems}
          onValueChange={setOpenItems}
        >
          {faqs.map((faq, index) => {
            const isOpen = openItems === `item-${index}`;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <AccordionItem value={`item-${index}`} className="relative">
                  <AccordionTrigger className="text-left text-sm sm:text-base md:text-lg font-medium hover:no-underline hover:bg-muted/50 transition-all rounded-lg px-3 sm:px-4 py-4 sm:py-5 pr-12 sm:pr-14 border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden data-[state=open]:rounded-b-none duration-500 [&>svg]:hidden">
                    {faq.question}
                    <motion.div
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <motion.div
                        className="h-[1.5px] w-3.5 sm:w-4 bg-primary absolute"
                        animate={{
                          rotate: isOpen ? 180 : 0,
                          scaleX: isOpen ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      />
                      <motion.div
                        className="h-[1.5px] w-3.5 sm:w-4 bg-primary absolute"
                        animate={{
                          rotate: isOpen ? 180 : 90,
                          scaleX: isOpen ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </motion.div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed px-3 sm:px-4 pb-4 sm:pb-5 pt-2 border border-t-0 border-border/50 bg-card/50 backdrop-blur-sm rounded-b-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};
