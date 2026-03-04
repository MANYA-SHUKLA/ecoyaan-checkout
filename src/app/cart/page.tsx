"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { OrderSummary } from "@/components/OrderSummary";
import { CouponInput } from "@/components/CouponInput";
import { CheckoutStepper } from "@/components/CheckoutStepper";
import { CartErrorFallback } from "@/components/CartErrorFallback";
import { CartPageSkeleton } from "@/components/ui/Skeleton";
import { calculateSubtotal } from "@/lib/calculateTotal";
import { apiCartItemToCartItem } from "@/lib/cartMappers";
import { getEstimatedDeliveryDate } from "@/lib/delivery";

export default function CartPage() {
  const { cart, cartError, cartLoading, retryCart, couponDiscount } = useCart();

  if (cartError) {
    return (
      <>
        <CheckoutStepper />
        <section aria-label="Cart error">
          <CartErrorFallback onRetry={retryCart} />
        </section>
      </>
    );
  }

  if (cartLoading || !cart) {
    return <CartPageSkeleton />;
  }

  const isEmpty = cart.cartItems.length === 0;
  const lineItems = cart.cartItems.map(apiCartItemToCartItem);
  const subtotal = calculateSubtotal(lineItems);
  const totalDiscount = cart.discount_applied + couponDiscount;
  const estimatedDelivery = getEstimatedDeliveryDate();

  return (
    <>
      <CheckoutStepper />
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="space-y-4 sm:space-y-6"
        aria-label="Shopping cart"
      >
        {isEmpty ? (
          <div
            className="rounded-2xl border border-ecoyaan-sage/40 bg-white p-6 text-center shadow-soft dark:border-slate-600/50 dark:bg-slate-800/90 sm:p-12"
            role="status"
          >
            <p className="text-sm text-stone-600 dark:text-slate-300 sm:text-base">Your cart is empty.</p>
            <p className="mt-1 text-xs text-stone-500 dark:text-slate-400 sm:text-sm">
              Add items from the shop to get started.
            </p>
          </div>
        ) : (
          <OrderSummary
            items={cart.cartItems}
            shippingFee={cart.shipping_fee}
            discountApplied={totalDiscount}
            layout="split"
            couponSlot={<CouponInput subtotal={subtotal} />}
            estimatedDelivery={estimatedDelivery}
            checkoutAction={
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Link
                  href="/checkout"
                  className="btn-shine inline-block w-full rounded-xl bg-ecoyaan-green px-6 py-3.5 text-center font-semibold text-white shadow-soft transition-all duration-300 hover:bg-ecoyaan-green-light hover:shadow-soft-hover focus:outline-none focus:ring-2 focus:ring-ecoyaan-green focus:ring-offset-2 dark:bg-ecoyaan-green-light dark:hover:bg-ecoyaan-mint dark:focus:ring-offset-slate-900"
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </Link>
              </motion.div>
            }
          />
        )}
      </motion.section>
    </>
  );
}
