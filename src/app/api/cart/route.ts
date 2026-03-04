import { NextResponse } from "next/server";
import cartData from "@/data/cart.json";
import type { CartData } from "@/types/cart";

export async function GET() {
  await new Promise((r) => setTimeout(r, 100));
  return NextResponse.json(cartData as CartData, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
