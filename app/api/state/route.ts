import { NextResponse } from "next/server";
import { getState, updateState, rolloverStreakIfNewDay } from "@/lib/state";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = await updateState((s) => rolloverStreakIfNewDay(s));
  return NextResponse.json(state);
}
