import { Button } from "@/components/ui/button";
import * as motion from "framer-motion/client";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-primary to-primary/50 select-none">
          404
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 space-y-4"
      >
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h2>
        <p className="max-w-md text-lg text-muted-foreground mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved, deleted, or never existed.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-5 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button asChild>
          <Link href="/">
            <Home />
            Go Home
          </Link>
        </Button>
      </motion.div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>
    </div>
  );
}
