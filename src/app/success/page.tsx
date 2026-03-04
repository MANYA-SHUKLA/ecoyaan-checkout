"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCheckout } from "@/context/CheckoutContext";
import { CheckoutStepper } from "@/components/CheckoutStepper";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useConfetti } from "@/hooks/useConfetti";

export default function SuccessPage() {
  const router = useRouter();
  const { orderComplete, orderId, resetCheckout } = useCheckout();

  useConfetti();

  useEffect(() => {
    if (!orderComplete) router.replace("/cart");
  }, [orderComplete, router]);

  if (!orderComplete) return null;

  const handleContinue = () => {
    resetCheckout();
    router.push("/cart");
  };

  return (
    <>
      <CheckoutStepper />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto w-full min-w-0 max-w-md rounded-2xl border border-ecoyaan-sage/40 bg-white p-6 text-center shadow-soft dark:border-slate-600/50 dark:bg-slate-800/90 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-ecoyaan-sage text-ecoyaan-green dark:bg-ecoyaan-mint/30 dark:text-ecoyaan-mint sm:mb-6 sm:h-24 sm:w-24"
          aria-hidden
        >
          <svg
            className="h-12 w-12 sm:h-14 sm:w-14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-slate-100 sm:text-2xl md:text-3xl">
          🎉 Order Successful!
        </h1>
        <p className="mt-3 text-sm text-stone-600 dark:text-slate-300 sm:text-base">
          Your eco-friendly order is on the way.
        </p>
        {orderId && (
          <p className="mt-4 break-all rounded-xl bg-ecoyaan-cream px-4 py-2 font-mono text-sm font-medium text-ecoyaan-green dark:bg-slate-700 dark:text-ecoyaan-mint">
            Order ID: {orderId}
          </p>
        )}
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-stone-500 dark:text-slate-400" aria-label="Eco friendly order">
          <span aria-hidden>🌿</span>
          <span aria-hidden>♻</span>
          <span aria-hidden>🌎</span>
          <span className="ml-1">Eco-friendly delivery</span>
        </p>
        <AnimatedButton
          variant="primary"
          onClick={handleContinue}
          className="mt-6 w-full py-3 sm:mt-8 sm:w-auto"
          aria-label="Continue shopping"
        >
          Continue Shopping
        </AnimatedButton>
      </motion.div>
    </>
  );
}
