"use client";

import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type { CartData } from "@/types/cart";

export function LayoutClient({
  children,
  initialCart,
}: {
  children: React.ReactNode;
  initialCart: CartData | null;
}) {
  return (
    <ThemeProvider>
      <CartProvider initialCart={initialCart}>
        <CheckoutProvider>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#2E7D32",
              color: "#fff",
              borderRadius: "12px",
            },
            success: {
              iconTheme: { primary: "#A5D6A7", secondary: "#2E7D32" },
            },
          }}
        />
        </CheckoutProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
