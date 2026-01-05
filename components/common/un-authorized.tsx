import { Button } from "@/components/ui/button";
import * as motion from "framer-motion/client";
import { Home, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center gap-6"
      >
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              opacity: { delay: 0.2, duration: 0.4 },
              scale: { delay: 0.2, duration: 0.4 },
            }}
            className="relative z-10 rounded-3xl bg-linear-to-br from-red-50 to-red-100 p-6 shadow-xl shadow-red-500/10 dark:from-red-950/30 dark:to-red-900/10"
          >
            <ShieldAlert className="h-14 w-14 text-red-600 dark:text-red-500 " />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-0 bg-red-500/20 blur-2xl rounded-full"
          />

          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute -right-2 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-4 ring-background shadow-lg"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </motion.div> */}
        </div>

        <div className="space-y-2">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            Access Denied
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="max-w-lg text-lg text-muted-foreground mx-auto"
          >
            You don&apos;t have permission to access this resource. Please
            contact your administrator if you believe this is a mistake.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="-mt-1.5"
        >
          <Button asChild>
            <Link href="/">
              <Home />
              Go Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
