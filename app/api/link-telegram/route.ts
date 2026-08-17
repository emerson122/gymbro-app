import { NextRequest, NextResponse } from "next/server";
import { updateState } from "@/lib/state";
import { hnDateStr } from "@/lib/state";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const state = await updateState((s) => {
    const next = { ...s };
    if (typeof body.telegramChatId === "string") next.telegramChatId = body.telegramChatId || null;
    if (typeof body.goalWeightLb === "number") next.goalWeightLb = body.goalWeightLb;
    if (typeof body.currentWeightLb === "number") {
      next.currentWeightLb = body.currentWeightLb;
      next.weightLog = [...next.weightLog, { date: hnDateStr(), weightLb: body.currentWeightLb }];
    }
    return next;
  });
  return NextResponse.json(state);
}
