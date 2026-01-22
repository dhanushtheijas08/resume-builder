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
    question: "Why should I choose this builder over others?",
    answer:
      "Unlike generic builders, our templates are modeled after real successful resumes from candidates who actually got hired at top companies. We don't just give you a layout; we give you a proven structure. Plus, our smart filters let you instantly find templates tailored to your specific job role and experience level.",
  },
  {
    question: "Is it really free to use?",
    answer:
      "Yes! You can build, customize, and download your resume completely for free. We believe everyone deserves a fair shot at their dream job without hitting a paywall.",
  },
  {
    question: "Are the templates ATS friendly?",
    answer:
      "Absolutely. deep layout is built with Applicant Tracking Systems in mind. We use standard fonts, proper heading structures, and clean formatting to ensure your resume is parsed correctly by hiring software.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes, you can export your resume as a high-quality PDF in a single click. This ensures your formatting stays perfect no matter where you send it.",
  },
  {
    question: "How customizable are the templates?",
    answer:
      "Very! You can easily change theme colors, fonts, section order, and layout styles. Our smart editor handles the heavy lifting so you can focus on the content.",
  }
];

export const FAQSection = () => {
  const [openItems, setOpenItems] = useState<string | undefined>(undefined);

  return (
    <section className="py-24 relative overflow-hidden" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70 mb-6 tracking-tight"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to know about building your perfect resume.
          </motion.p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4" value={openItems} onValueChange={setOpenItems}>
          {faqs.map((faq, index) => {
            const isOpen = openItems === `item-${index}`;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="relative">
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline hover:bg-muted/50 transition-all rounded-lg px-4 py-5 pr-14 border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden data-[state=open]:rounded-b-none duration-500 [&>svg]:hidden">
                    {faq.question}
                    <motion.div
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <motion.div
                        className="h-[1.5px] w-4 bg-primary absolute"
                        animate={{
                          rotate: isOpen ? 180 : 0,
                          scaleX: isOpen ? 1.1 : 1
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      />
                      <motion.div
                        className="h-[1.5px] w-4 bg-primary absolute"
                        animate={{
                          rotate: isOpen ? 180 : 90,
                          scaleX: isOpen ? 1.1 : 1
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </motion.div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed px-4 pb-5 pt-2 border border-t-0 border-border/50 bg-card/50 backdrop-blur-sm rounded-b-lg">
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
