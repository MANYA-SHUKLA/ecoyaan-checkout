"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import type { ApiCartItem } from "@/types/cart";
import { formatPrice } from "@/lib/calculateTotal";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: ApiCartItem;
  showEcoBadge?: boolean;
  staggerIndex?: number;
}

function EcoBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-ecoyaan-mint/20 px-2 py-0.5 text-xs font-medium text-ecoyaan-green"
      title="Eco-friendly product"
    >
      <svg
        className="h-3.5 w-3.5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M12 2c-4 4-6 8-6 12 0 4 2 6 4 8 2-2 4-4 4-8 0-4-2-8-6-12zm0 2c2 3 3 6 3 9 0 2-.5 4-1.5 6-1-2-1.5-4-1.5-6 0-3 1-6 3-9z" />
      </svg>
      Eco
    </span>
  );
}

export function CartItem({ item, showEcoBadge = true, staggerIndex = 0 }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const lineTotal = item.product_price * item.quantity;

  const handleDecrement = () => {
    if (item.quantity <= 1) {
      removeItem(item.product_id);
      toast.success("Product removed");
    } else {
      updateQuantity(item.product_id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.product_id, item.quantity + 1);
  };

  const qtyControls = (
    <div className="flex shrink-0 items-center rounded-lg border border-stone-200 bg-stone-50/50 dark:border-gray-600 dark:bg-gray-700/50">
      <button
        type="button"
        onClick={handleDecrement}
        className="flex h-11 w-11 min-w-[2.75rem] items-center justify-center rounded-l-md text-stone-600 transition-colors hover:bg-stone-200/80 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-ecoyaan-green focus:ring-inset disabled:opacity-50 touch-manipulation dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white sm:h-9 sm:w-9 sm:min-w-[2.25rem]"
        aria-label="Decrease quantity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </button>
      <span className="min-w-[2.75rem] text-center text-sm font-medium tabular-nums text-stone-800 dark:text-gray-200 sm:min-w-[2.25rem]" aria-live="polite">
        {item.quantity}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        className="flex h-11 w-11 min-w-[2.75rem] items-center justify-center rounded-r-md text-stone-600 transition-colors hover:bg-stone-200/80 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-ecoyaan-green focus:ring-inset touch-manipulation dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white sm:h-9 sm:w-9 sm:min-w-[2.25rem]"
        aria-label="Increase quantity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );

  const removeButton = (
    <button
      type="button"
      onClick={() => {
        removeItem(item.product_id);
        toast.success("Product removed");
      }}
      className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-1.5 rounded-lg text-sm text-stone-500 transition-colors hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 touch-manipulation dark:text-gray-400 dark:hover:text-red-400 dark:focus:ring-offset-gray-800 sm:min-h-0 sm:min-w-0 sm:justify-start"
      aria-label={`Remove ${item.product_name} from cart`}
    >
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      <span className="hidden sm:inline">Remove</span>
    </button>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: staggerIndex * 0.06 }}
      className="flex min-w-0 flex-col gap-4 rounded-xl border border-ecoyaan-sage/40 bg-white p-3 shadow-soft transition-all duration-300 hover:shadow-soft-hover dark:border-slate-600/50 dark:bg-slate-800/90 sm:gap-4 sm:p-4 md:flex-row md:items-center md:gap-6"
    >
      {/* Product: image + name, badge, unit price */}
      <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-ecoyaan-sage/30 dark:bg-slate-700 sm:h-24 sm:w-24 sm:rounded-xl">
          <Image
            src={item.image}
            alt={item.product_name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="break-words font-semibold text-stone-900 dark:text-gray-100">{item.product_name}</h3>
          {showEcoBadge && (
            <div className="mt-1">
              <EcoBadge />
            </div>
          )}
          <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
            {formatPrice(item.product_price)} each
          </p>
        </div>
      </div>

      {/* Qty, line total, remove — single flexible row that wraps on small screens */}
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-3 dark:border-gray-600 md:justify-end md:border-0 md:pt-0 md:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-stone-600 dark:text-gray-400">Qty</span>
          {qtyControls}
        </div>
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold tabular-nums text-ecoyaan-green dark:text-ecoyaan-mint">
            {formatPrice(lineTotal)}
          </p>
          {removeButton}
        </div>
      </div>
    </motion.li>
  );
}
