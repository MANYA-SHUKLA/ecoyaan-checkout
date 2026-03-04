export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export interface ApiCartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface CartData {
  cartItems: ApiCartItem[];
  shipping_fee: number;
  discount_applied: number;
}
