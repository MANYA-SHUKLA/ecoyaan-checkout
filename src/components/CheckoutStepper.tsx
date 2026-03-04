"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CHECKOUT_STEPS } from "@/constants/checkout";

const STEP_ICONS = {
  cart: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  checkout: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  payment: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
} as const;

export function CheckoutStepper() {
  const pathname = usePathname();
  const currentIndex = CHECKOUT_STEPS.findIndex(
    (s) => s.path === pathname || pathname.startsWith(s.path + "/")
  );
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const progressPercent = CHECKOUT_STEPS.length <= 1 ? 0 : (activeIndex / (CHECKOUT_STEPS.length - 1)) * 100;

  return (
    <nav className="mb-6 min-w-0 w-full sm:mb-10" aria-label="Checkout progress">
      <div className="relative mb-6 sm:mb-8">
        <div
          className="h-2 min-w-0 w-full overflow-hidden rounded-full bg-ecoyaan-sage/60 dark:bg-slate-700"
          role="progressbar"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Checkout progress"
        >
          <motion.div
            className="h-full rounded-full bg-ecoyaan-green"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "tween", duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
      </div>

      <ol className="flex min-w-0 justify-between gap-0 sm:gap-2">
        {CHECKOUT_STEPS.map((step, i) => {
          const isActive = pathname === step.path;
          const isPast = i < activeIndex;
          const isComplete = isPast || (i === activeIndex && step.id === "success");
          const isClickable = i <= activeIndex && step.path !== "/success";

          const stepContent = (
            <span
              className={`flex flex-col items-center gap-1.5 sm:gap-2 transition-colors duration-300 ${
                isActive ? "text-ecoyaan-green" : isPast ? "text-ecoyaan-green" : "text-stone-400 dark:text-gray-500"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-12 sm:w-12 ${
                  isPast || (isActive && step.id === "success")
                    ? "border-ecoyaan-green bg-ecoyaan-green text-white"
                    : isActive
                      ? "border-ecoyaan-green bg-white text-ecoyaan-green ring-2 ring-ecoyaan-green ring-offset-2 dark:bg-slate-800 dark:ring-offset-slate-900 scale-105"
                      : "border-ecoyaan-sage/60 bg-white text-stone-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-500"
                }`}
              >
                {isPast || (step.id === "success" && isActive) ? (
                  STEP_ICONS.success
                ) : (
                  STEP_ICONS[step.id as keyof typeof STEP_ICONS]
                )}
              </span>
              <span
                className={`truncate text-center text-[10px] font-medium leading-tight max-w-[3.5rem] sm:max-w-none sm:text-sm sm:leading-normal ${
                  isActive ? "text-stone-900 dark:text-gray-100" : isPast ? "text-stone-700 dark:text-gray-300" : "text-stone-400 dark:text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </span>
          );

          return (
            <li
              key={step.id}
              className="flex flex-1 justify-center first:justify-start last:justify-end"
              aria-current={isActive ? "step" : undefined}
            >
              {isClickable ? (
                <Link
                  href={step.path}
                  className="flex flex-col items-center gap-1.5 sm:gap-2 no-underline outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-ecoyaan-green focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                >
                  {stepContent}
                </Link>
              ) : (
                <span className="flex flex-col items-center gap-1.5 sm:gap-2">{stepContent}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
