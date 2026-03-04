"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ecoyaan-sage/50 bg-white/80 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/80">
      <div className="fluid-container flex min-w-0 items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6 sm:py-4">
        <Link href="/cart" className="flex min-h-[44px] min-w-0 flex-1 shrink items-center gap-1.5 sm:min-h-0 sm:flex-initial sm:gap-2" aria-label="Ecoyaan home">
          <motion.span
            className="shrink-0 text-xl sm:text-2xl"
            aria-hidden
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            🌿
          </motion.span>
          <span className="min-w-0 truncate text-lg font-bold tracking-tight text-ecoyaan-green dark:text-ecoyaan-mint sm:text-xl">
            Ecoyaan
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1 sm:gap-3" aria-label="Main navigation">
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="flex">
            <Link
              href="/cart"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-ecoyaan-sage/50 hover:text-ecoyaan-green focus:outline-none focus:ring-2 focus:ring-ecoyaan-green focus:ring-offset-2 dark:text-slate-300 dark:hover:bg-ecoyaan-mint/20 dark:hover:text-ecoyaan-mint dark:focus:ring-offset-slate-900 sm:min-h-0 sm:min-w-0 sm:px-4"
              aria-label="Go to cart"
            >
              Cart
            </Link>
          </motion.div>
        </nav>
      </div>
    </header>
  );
}
