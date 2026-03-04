"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useCheckout } from "@/context/CheckoutContext";
import { AddressForm } from "@/components/AddressForm";
import { CheckoutStepper } from "@/components/CheckoutStepper";

export default function CheckoutPage() {
  const router = useRouter();
  const { address, setAddress } = useCheckout();

  const handleSubmit = (values: {
    fullName: string;
    email: string;
    phone: string;
    pinCode: string;
    city: string;
    state: string;
  }) => {
    setAddress(values);
    toast.success("Address saved");
    router.push("/payment");
  };

  return (
    <>
      <CheckoutStepper />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <AddressForm
          initialValues={address ?? undefined}
          onSubmit={handleSubmit}
          onBack={() => router.push("/cart")}
          submitLabel="Continue to Payment"
          backLabel="Back to Cart"
        />
      </motion.div>
    </>
  );
}
