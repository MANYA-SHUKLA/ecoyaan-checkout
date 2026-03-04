import type { CartItem, ApiCartItem } from "@/types/cart";

export function apiCartItemToCartItem(api: ApiCartItem): CartItem {
  return {
    id: api.product_id,
    name: api.product_name,
    price: api.product_price,
    quantity: api.quantity,
  };
}
