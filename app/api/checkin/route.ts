import { NextRequest, NextResponse } from "next/server";
import { updateState } from "@/lib/state";
import { registerWorkout } from "@/lib/gamification";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const exerciseIds: string[] = Array.isArray(body?.exerciseIds) ? body.exerciseIds : [];
  const state = await updateState((s) => registerWorkout(s, exerciseIds));
  return NextResponse.json(state);
}
