"use client";

import { motion } from "framer-motion";

type ButtonAttrs = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
>;

interface AnimatedButtonProps extends ButtonAttrs {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  asChild?: false;
}

const base =
  "inline-flex items-center justify-center rounded-xl font-semibold outline-none transition-all duration-300 focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-900";

const variants = {
  primary:
    "btn-shine bg-ecoyaan-green px-6 py-2.5 text-white shadow-soft hover:bg-ecoyaan-green-light hover:shadow-soft-hover focus:ring-ecoyaan-green dark:bg-ecoyaan-green-light dark:hover:bg-ecoyaan-mint",
  secondary:
    "border border-ecoyaan-sage bg-white px-5 py-2.5 font-medium text-stone-700 hover:bg-ecoyaan-cream focus:ring-stone-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:focus:ring-ecoyaan-mint",
};

export function AnimatedButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
