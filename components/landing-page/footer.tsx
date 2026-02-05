"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { GitHubIcon, LinkedinIcon, XIcon } from "../icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    icon: GitHubIcon,
    href: "https://github.com/dhanushtheijas08/",
    className: "",
  },
  {
    name: "Twitter",
    icon: XIcon,
    href: "https://x.com/dhanush_theijas",
    className: "fill-white/40 hover:fill-white size-4",
  },
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/dhanush-theijas-tp/",
  },
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
        className="mx-auto w-full rounded-t-2xl  sm:rounded-t-[2.5rem] bg-card text-white py-8 sm:py-10 md:py-12 px-5 sm:px-8 md:px-12 lg:px-20 relative overflow-hidden group border border-white/5"
      >
        <div className="flex flex-col container mx-auto sm:flex-row justify-between items-center gap-5 sm:gap-6 md:gap-8 relative z-10">
          <p className="text-white/40 text-xs sm:text-sm order-3 sm:order-1">
            Copyright © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="text-white/60 hover:text-white duration-300"
            >
              Coder CV
            </Link>
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/40 order-1 sm:order-2">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 fill-red-400" />{" "}
            by
            <Link
              href="https://dhanushtheijas.vercel.app/"
              className="text-white/60 hover:text-white duration-300"
              target="_blank"
              title="Dhanush Theijas"
              prefetch={false}
              rel="noopener noreferrer"
            >
              Dhanush Theijas
            </Link>
          </div>

          <div className="flex gap-4 sm:gap-6 order-2 sm:order-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ y: -5, opacity: 1 }}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
                title={social.name}
                rel="noopener noreferrer"
                target="_blank"
              >
                <social.icon
                  className={cn("size-4 sm:size-5", social.className)}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
