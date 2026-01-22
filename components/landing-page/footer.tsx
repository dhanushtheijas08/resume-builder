"use client";

import { motion } from "framer-motion";
import {
  Heart
} from "lucide-react";
import { GitHubIcon, LinkedinIcon, XIcon } from "../icons";
import { cn } from "@/lib/utils";

const socialLinks = [
  { name: "GitHub", icon: GitHubIcon, href: "#", className: "" },
  { name: "Twitter", icon: XIcon, href: "#", className: "fill-white/40 hover:fill-white size-4" }, // Using X for modern feel
  { name: "LinkedIn", icon: LinkedinIcon, href: "#", },
];

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <footer className="w-full bg-background overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto w-full rounded-t-[2.5rem]  bg-card text-white py-12 px-12 md:px-20 relative overflow-hidden group border border-white/5"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <p className="text-white/40 text-sm">
            Copyright © {new Date().getFullYear()} Coders CV
          </p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> by
            <span className="text-white/60"> Dhanush Theijas</span>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ y: -5, opacity: 1 }}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
                title={social.name}
              >
                <social.icon className={cn("size-5", social.className)} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
