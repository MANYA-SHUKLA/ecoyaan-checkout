const COUPONS: Record<string, number> = {
  ECO10: 50,
  GREEN20: 100,
  SAVE30: 75,
};

export function getCouponDiscount(code: string, subtotal: number): number {
  const normalized = code.trim().toUpperCase();
  const fixed = COUPONS[normalized];
  if (fixed != null) return Math.min(fixed, subtotal);
  return 0;
}

export function isValidCouponCode(code: string): boolean {
  return code.trim().toUpperCase() in COUPONS;
}
