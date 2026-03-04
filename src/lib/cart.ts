import { readFile } from "fs/promises";
import path from "path";
import type { CartData } from "@/types/cart";

export async function getCartDataServer(): Promise<CartData> {
  const filePath = path.join(process.cwd(), "src/data/cart.json");
  const json = await readFile(filePath, "utf-8");
  return JSON.parse(json) as CartData;
}
