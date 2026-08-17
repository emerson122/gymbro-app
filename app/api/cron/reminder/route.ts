import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";
import { getState, rolloverStreakIfNewDay, hnDateStr } from "@/lib/state";

export const dynamic = "force-dynamic";

const MESSAGES: Record<string, (streak: number) => string> = {
  "1": (streak) =>
    `⏰ 10pm. Todavía no marcás tu entrenamiento de hoy.\nLlevás ${streak} día(s) de racha 🔥 — escribime /hoy para ver tu rutina, no toma mucho.`,
  "2": (streak) =>
    `⏰ 10:30pm. Sigo sin ver tu entrenamiento de hoy.\nTu racha de ${streak} día(s) está en juego. Aunque sea algo corto — /hoy y vamos.`,
  "3": (streak) =>
    `🚨 11pm. Quedan menos de 2 horas y tu racha de ${streak} día(s) se puede romper.\nNo necesitás una rutina perfecta, solo NO CERO. /hoy`,
  "4": (streak) =>
    `🚨🚨 11:30pm — ÚLTIMA LLAMADA.\nEn 30 minutos perdés tu racha de ${streak} día(s). Aunque sean 5 minutos de banda elástica, mandá /entrene y no la perdás.`,
};

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const stage = req.nextUrl.searchParams.get("stage") || "1";
  const state = rolloverStreakIfNewDay(await getState());

  if (!state.telegramChatId) {
    return NextResponse.json({ ok: true, skipped: "no chat linked" });
  }

  const today = hnDateStr();
  const alreadyDone = state.lastCheckInDate === today && state.todayDone;
  if (alreadyDone) {
    return NextResponse.json({ ok: true, skipped: "already done today" });
  }

  const build = MESSAGES[stage] || MESSAGES["1"];
  await sendTelegramMessage(state.telegramChatId, build(state.streak));

  return NextResponse.json({ ok: true, stage, sent: true });
}
