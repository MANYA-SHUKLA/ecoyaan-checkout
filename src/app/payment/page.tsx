"use client";

import { motion } from "framer-motion";
import { PaymentCard } from "@/components/PaymentCard";
import { CheckoutStepper } from "@/components/CheckoutStepper";

export default function PaymentPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <CheckoutStepper />
      <PaymentCard />
    </motion.div>
  );
}
