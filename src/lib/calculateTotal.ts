import type { CartItem } from "@/types/cart";

type LineItem = Pick<CartItem, "price" | "quantity">;

export interface CartTotals {
  subtotal: number;
  grandTotal: number;
}

export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateTotal(
  items: LineItem[],
  shippingFee: number,
  discountApplied: number
): CartTotals {
  const subtotal = calculateSubtotal(items);
  const grandTotal = subtotal + shippingFee - discountApplied;
  return { subtotal, grandTotal };
}

export function formatPrice(rupees: number): string {
  return `₹${rupees}`;
}
