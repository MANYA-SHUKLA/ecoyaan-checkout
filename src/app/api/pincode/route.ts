import { NextResponse } from "next/server";
import pincodes from "@/data/pincodes.json";

type PincodeEntry = { city: string; state: string };
const map = pincodes as Record<string, PincodeEntry>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.trim().replace(/\D/g, "").slice(0, 6);
  if (!code || code.length !== 6) {
    return NextResponse.json({ city: null, state: null });
  }
  const entry = map[code];
  if (!entry) {
    return NextResponse.json({ city: null, state: null });
  }
  return NextResponse.json(entry);
}
