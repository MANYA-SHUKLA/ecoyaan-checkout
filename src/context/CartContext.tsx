"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import type { CartData } from "@/types/cart";
import { getCouponDiscount } from "@/lib/coupons";

interface CartState {
  cart: CartData | null;
  setCart: (cart: CartData) => void;
  cartError: string | null;
  cartLoading: boolean;
  retryCart: () => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeItem: (productId: number) => void;
  couponCode: string | null;
  couponDiscount: number;
  applyCoupon: (code: string, subtotal: number) => boolean;
  clearCoupon: () => void;
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({
  children,
  initialCart,
}: {
  children: React.ReactNode;
  initialCart: CartData | null;
}) {
  const [cart, setCartState] = useState<CartData | null>(initialCart);
  const [cartError, setCartError] = useState<string | null>(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const setCart = useCallback((next: CartData) => {
    setCartState(next);
    setCartError(null);
  }, []);

  const retryCart = useCallback(async () => {
    setCartError(null);
    setCartLoading(true);
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to load cart");
      const data: CartData = await res.json();
      setCartState(data);
    } catch {
      setCartError("Failed to load cart");
    } finally {
      setCartLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialCart === null && !cart && !cartError && !cartLoading) {
      retryCart();
    }
  }, [initialCart, cart, cartError, cartLoading, retryCart]);

  const updateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCartState((prev) => {
      if (!prev) return prev;
      if (newQuantity < 1) {
        return {
          ...prev,
          cartItems: prev.cartItems.filter((i) => i.product_id !== productId),
        };
      }
      return {
        ...prev,
        cartItems: prev.cartItems.map((item) =>
          item.product_id === productId ? { ...item, quantity: newQuantity } : item
        ),
      };
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setCartState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cartItems: prev.cartItems.filter((i) => i.product_id !== productId),
      };
    });
  }, []);

  const applyCoupon = useCallback((code: string, subtotal: number): boolean => {
    const discount = getCouponDiscount(code, subtotal);
    if (discount <= 0) return false;
    setCouponCode(code.trim().toUpperCase());
    setCouponDiscount(discount);
    return true;
  }, []);

  const clearCoupon = useCallback(() => {
    setCouponCode(null);
    setCouponDiscount(0);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      setCart,
      cartError,
      cartLoading,
      retryCart,
      updateQuantity,
      removeItem,
      couponCode,
      couponDiscount,
      applyCoupon,
      clearCoupon,
    }),
    [cart, setCart, cartError, cartLoading, retryCart, updateQuantity, removeItem, couponCode, couponDiscount, applyCoupon, clearCoupon]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
