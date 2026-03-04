"use client";

import type { ApiCartItem } from "@/types/cart";
import { calculateTotal, formatPrice } from "@/lib/calculateTotal";
import { apiCartItemToCartItem } from "@/lib/cartMappers";
import { CartItem as CartItemComponent } from "./CartItem";

interface OrderSummaryProps {
  items: ApiCartItem[];
  shippingFee: number;
  discountApplied: number;
  totalsOnly?: boolean;
  layout?: "single" | "split";
  checkoutAction?: React.ReactNode;
  couponSlot?: React.ReactNode;
  estimatedDelivery?: string;
}

export function OrderSummary({
  items,
  shippingFee,
  discountApplied,
  totalsOnly = false,
  layout = "single",
  checkoutAction,
  couponSlot,
  estimatedDelivery,
}: OrderSummaryProps) {
  const lineItems = items.map(apiCartItemToCartItem);
  const { subtotal, grandTotal } = calculateTotal(
    lineItems,
    shippingFee,
    discountApplied
  );

  const itemsList = !totalsOnly && (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <CartItemComponent
          key={item.product_id}
          item={item}
          showEcoBadge={true}
          staggerIndex={index}
        />
      ))}
    </ul>
  );

  const totalsBlock = (
    <>
      <dl className="space-y-3">
        <div className="flex justify-between text-sm">
          <dt className="text-stone-600 dark:text-gray-400">Subtotal</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-stone-600 dark:text-gray-400">Shipping</dt>
          <dd className="font-medium">{formatPrice(shippingFee)}</dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-stone-600 dark:text-gray-400">Discount</dt>
          <dd className="font-medium">
            {discountApplied > 0 ? `-${formatPrice(discountApplied)}` : formatPrice(0)}
          </dd>
        </div>
      </dl>
      <div className="my-4 border-t border-ecoyaan-sage/50 pt-3 dark:border-slate-600">
        <div className="flex justify-between text-base font-semibold">
          <dt>Total</dt>
          <dd className="text-ecoyaan-green dark:text-ecoyaan-mint">{formatPrice(grandTotal)}</dd>
        </div>
      </div>
    </>
  );

  const cardClass =
    "rounded-2xl border border-ecoyaan-sage/40 bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-soft-hover dark:border-slate-600/50 dark:bg-slate-800/90 dark:shadow-none sm:p-5 md:p-6";

  if (totalsOnly) {
    return (
      <div className={cardClass}>
        <h2 className="mb-4 text-lg font-semibold text-stone-800 dark:text-slate-100 sm:text-xl">
          Order Summary
        </h2>
        {totalsBlock}
      </div>
    );
  }

  if (layout === "split") {
    return (
      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className={`card-hover min-w-0 ${cardClass}`}>
          <h2 className="mb-4 text-lg font-semibold text-stone-800 dark:text-slate-100 sm:text-xl">
            Cart items
          </h2>
          {itemsList}
        </div>
        <div className="min-w-0 md:sticky md:top-24 md:self-start">
          <div className={cardClass}>
            <h2 className="mb-4 text-lg font-semibold text-stone-800 dark:text-slate-100 sm:text-xl">
              Order Summary
            </h2>
            <hr className="mb-4 border-ecoyaan-sage/50 dark:border-slate-600" aria-hidden />
            {couponSlot && <div className="mb-4">{couponSlot}</div>}
            {totalsBlock}
            {estimatedDelivery && (
              <p className="mt-3 text-sm text-stone-500 dark:text-gray-400" aria-label="Estimated delivery">
                Estimated delivery: {estimatedDelivery}
              </p>
            )}
            {checkoutAction && (
              <div className="mt-6">
                {checkoutAction}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-hover ${cardClass}`}>
      <h2 className="mb-4 text-lg font-semibold text-stone-800 dark:text-slate-100 sm:text-xl">
        Order Summary
      </h2>
      {itemsList}
      <div className="mt-4 border-t border-ecoyaan-sage/50 pt-4 dark:border-slate-600">
        {totalsBlock}
      </div>
    </div>
  );
}
