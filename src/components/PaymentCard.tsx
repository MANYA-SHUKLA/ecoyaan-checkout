"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { calculateTotal, formatPrice } from "@/lib/calculateTotal";
import { apiCartItemToCartItem } from "@/lib/cartMappers";
import { AnimatedButton } from "./ui/AnimatedButton";
import { PAYMENT_SIMULATION_DELAY_MS } from "@/constants/checkout";
import { getEstimatedDeliveryDate } from "@/lib/delivery";
import { Loader } from "./Loader";

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  return phone;
}

export function PaymentCard() {
  const router = useRouter();
  const { cart, couponDiscount } = useCart();
  const { address, completeOrder } = useCheckout();
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!cart || cart.cartItems.length === 0) router.replace("/cart");
    else if (!address) router.replace("/checkout");
  }, [cart, address, router]);

  if (!cart || !address || cart.cartItems.length === 0) return null;

  const lineItems = cart.cartItems.map(apiCartItemToCartItem);
  const totalDiscount = cart.discount_applied + couponDiscount;
  const { grandTotal } = calculateTotal(
    lineItems,
    cart.shipping_fee,
    totalDiscount
  );
  const estimatedDelivery = getEstimatedDeliveryDate();

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      completeOrder();
      toast.success("Payment successful");
      router.push("/success");
      setIsPaying(false);
    }, PAYMENT_SIMULATION_DELAY_MS);
  };

  const cardClass =
    "rounded-2xl border border-ecoyaan-sage/40 bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-soft-hover dark:border-slate-600/50 dark:bg-slate-800/90 sm:p-5 md:p-6";

  return (
    <section className="min-w-0 space-y-4 sm:space-y-6" aria-label="Payment confirmation">
      <div className={`card-hover ${cardClass}`}>
        <h2 className="mb-3 text-base font-semibold text-stone-800 dark:text-slate-100 sm:text-lg">
          Shipping Address
        </h2>
        <hr className="mb-4 border-ecoyaan-sage/50 dark:border-slate-600" aria-hidden />
        <address className="not-italic">
          <p className="font-semibold text-stone-900 dark:text-slate-100">{address.fullName}</p>
          <p className="mt-1 text-stone-600 dark:text-slate-400">
            {address.city}, {address.pinCode}
          </p>
          <p className="mt-0.5 text-stone-600 dark:text-slate-400">
            {formatPhone(address.phone)}
          </p>
        </address>
      </div>

      <div className={cardClass}>
        <h2 className="mb-3 text-base font-semibold text-stone-800 dark:text-slate-100 sm:text-lg">
          Order Summary
        </h2>
        <hr className="mb-4 border-ecoyaan-sage/50 dark:border-slate-600" aria-hidden />
        <ul className="space-y-1.5 text-stone-700 dark:text-slate-300">
          {cart.cartItems.map((item) => (
            <li key={item.product_id}>
              {item.product_name} ×{item.quantity}
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-ecoyaan-sage/50 pt-3 text-base font-semibold text-stone-900 dark:border-slate-600 dark:text-slate-100">
          Total: <span className="text-ecoyaan-green dark:text-ecoyaan-mint">{formatPrice(grandTotal)}</span>
        </p>
        <p className="mt-2 text-sm text-stone-500 dark:text-slate-400" aria-label="Estimated delivery">
          Estimated delivery: {estimatedDelivery}
        </p>
      </div>

      <div className="rounded-2xl border border-ecoyaan-sage/40 bg-ecoyaan-cream/80 p-4 dark:border-slate-600/50 dark:bg-slate-800/60 sm:p-5 md:p-6">
        <div className="mb-4 flex items-center justify-center gap-2 text-xs text-stone-600 dark:text-slate-400 sm:text-sm">
          <span className="flex items-center gap-1.5" aria-hidden>
            <svg
              className="h-4 w-4 text-ecoyaan-green dark:text-ecoyaan-mint"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure Payment
          </span>
        </div>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <AnimatedButton
            variant="secondary"
            onClick={() => router.push("/checkout")}
            disabled={isPaying}
            className="w-full sm:w-auto"
            aria-label="Back to shipping address"
          >
            Back to Address
          </AnimatedButton>
          <AnimatedButton
            variant="primary"
            onClick={handlePay}
            disabled={isPaying}
            className="w-full py-3 sm:w-auto sm:min-w-[180px]"
            aria-label={isPaying ? "Processing payment" : "Pay securely"}
          >
            {isPaying ? (
              <>
                <Loader className="h-4 w-4" variant="white" />
                <span>Processing…</span>
              </>
            ) : (
              <span className="inline-flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Pay Securely
              </span>
            )}
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
