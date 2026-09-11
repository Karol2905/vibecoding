import { calculateFootprint } from "@/lib/calculate";
import type { CalculateRequest } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as CalculateRequest;
  const text = typeof body.text === "string" ? body.text : "";

  if (!text.trim()) {
    return NextResponse.json(
      { error: "Escribe cómo fue tu día para estimar el CO2." },
      { status: 400 }
    );
  }

  return NextResponse.json(calculateFootprint(text));
}
