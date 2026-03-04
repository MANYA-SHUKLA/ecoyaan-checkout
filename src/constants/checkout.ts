export const CHECKOUT_STEPS = [
  { id: "cart", label: "Cart", path: "/cart" },
  { id: "checkout", label: "Shipping Address", path: "/checkout" },
  { id: "payment", label: "Payment", path: "/payment" },
  { id: "success", label: "Done", path: "/success" },
] as const;

export const PAYMENT_SIMULATION_DELAY_MS = 1500;
