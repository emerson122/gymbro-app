import { NextRequest, NextResponse } from "next/server";
import { updateState } from "@/lib/state";
import { registerCheatDay } from "@/lib/gamification";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const note: string = typeof body?.note === "string" ? body.note : "";
  const state = await updateState((s) => registerCheatDay(s, note));
  return NextResponse.json(state);
}
