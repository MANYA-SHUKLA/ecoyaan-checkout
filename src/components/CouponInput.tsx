"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { getCouponDiscount, isValidCouponCode } from "@/lib/coupons";

interface CouponInputProps {
  subtotal: number;
  onApplied?: () => void;
}

export function CouponInput({ subtotal, onApplied }: CouponInputProps) {
  const { couponCode, couponDiscount, applyCoupon, clearCoupon } = useCart();
  const [input, setInput] = useState("");

  const handleApply = () => {
    const code = input.trim();
    if (!code) {
      toast.error("Enter a coupon code");
      return;
    }
    if (!isValidCouponCode(code)) {
      toast.error("Invalid coupon code");
      return;
    }
    const discount = getCouponDiscount(code, subtotal);
    if (applyCoupon(code, subtotal)) {
      toast.success(`Coupon applied! You save ₹${discount}`);
      setInput("");
      onApplied?.();
    } else {
      toast.error("Could not apply coupon");
    }
  };

  if (couponCode) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-ecoyaan-sage bg-ecoyaan-sage/30 px-3 py-2.5 dark:border-ecoyaan-mint/30 dark:bg-ecoyaan-mint/10 sm:py-2">
        <span className="min-w-0 truncate text-xs font-medium text-ecoyaan-green dark:text-ecoyaan-mint sm:text-sm">
          {couponCode} applied (−₹{couponDiscount})
        </span>
        <button
          type="button"
          onClick={() => {
            clearCoupon();
            toast.success("Coupon removed");
          }}
          className="text-sm font-medium text-stone-600 underline hover:text-stone-900 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Remove coupon"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleApply())}
        placeholder="Coupon code"
        className="min-w-0 flex-1 rounded-lg border border-ecoyaan-sage/60 bg-white/80 px-3 py-2.5 text-base placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-ecoyaan-green dark:border-slate-600 dark:bg-slate-800/50 dark:placeholder:text-slate-500 sm:py-2 sm:text-sm [touch-action:manipulation]"
        aria-label="Coupon code"
      />
      <button
        type="button"
        onClick={handleApply}
        className="shrink-0 rounded-lg border border-ecoyaan-sage bg-ecoyaan-cream px-4 py-2.5 text-sm font-medium text-ecoyaan-green transition-colors hover:bg-ecoyaan-sage focus:outline-none focus:ring-2 focus:ring-ecoyaan-green dark:border-slate-600 dark:bg-slate-700 dark:text-ecoyaan-mint dark:hover:bg-slate-600 sm:py-2 [touch-action:manipulation]"
        aria-label="Apply coupon"
      >
        Apply
      </button>
    </div>
  );
}
