"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ecoyaan-sage/60 bg-white/70 py-6 backdrop-blur-sm dark:border-ecoyaan-mint/20 dark:bg-slate-900/70 sm:py-8">
      <div className="fluid-container min-w-0 px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-xs text-stone-600 dark:text-slate-400 sm:gap-x-8 sm:text-sm">
          <motion.span
            className="flex items-center gap-1.5 transition-colors hover:text-ecoyaan-green dark:hover:text-ecoyaan-mint"
            whileHover={{ scale: 1.05 }}
            title="Sustainable"
          >
            <span aria-hidden>🌿</span>
            Sustainable
          </motion.span>
          <motion.span
            className="flex items-center gap-1.5 transition-colors hover:text-ecoyaan-green dark:hover:text-ecoyaan-mint"
            whileHover={{ scale: 1.05 }}
            title="Recyclable"
          >
            <span aria-hidden>♻</span>
            Recyclable
          </motion.span>
          <motion.span
            className="flex items-center gap-1.5 transition-colors hover:text-ecoyaan-green dark:hover:text-ecoyaan-mint"
            whileHover={{ scale: 1.05 }}
            title="Eco friendly"
          >
            <span aria-hidden>🌎</span>
            Eco friendly
          </motion.span>
        </div>
        <p className="mt-4 text-center text-xs text-stone-500 dark:text-slate-500 sm:text-sm">
          © {new Date().getFullYear()} Ecoyaan. Checkout flow assignment.
        </p>
        <motion.p
          className="mt-2 flex flex-wrap items-center justify-center gap-1.5 px-2 text-center text-xs font-medium text-ecoyaan-green dark:text-ecoyaan-mint sm:text-sm"
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
        >
          <span aria-hidden className="text-red-500">♥</span>
          Made with love by Manya Shukla 2026
        </motion.p>
      </div>
    </footer>
  );
}
