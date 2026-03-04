"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { ShippingAddress } from "@/types/checkout";

function generateOrderId(): string {
  const now = new Date();
  const dateStr =
    now.getFullYear() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `ECO-${dateStr}-${random}`;
}

interface CheckoutState {
  address: ShippingAddress | null;
  setAddress: (address: ShippingAddress) => void;
  orderComplete: boolean;
  orderId: string | null;
  completeOrder: () => void;
  resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutState | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddressState] = useState<ShippingAddress | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const setAddress = useCallback((next: ShippingAddress) => setAddressState(next), []);

  const completeOrder = useCallback(() => {
    setOrderId(generateOrderId());
    setOrderComplete(true);
  }, []);

  const resetCheckout = useCallback(() => {
    setOrderComplete(false);
    setOrderId(null);
    setAddressState(null);
  }, []);

  const value = useMemo<CheckoutState>(
    () => ({
      address,
      setAddress,
      orderComplete,
      orderId,
      completeOrder,
      resetCheckout,
    }),
    [address, setAddress, orderComplete, orderId, completeOrder, resetCheckout]
  );

  return (
    <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
