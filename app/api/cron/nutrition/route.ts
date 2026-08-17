import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";
import { getState } from "@/lib/state";
import { randomSnack, formatSnackMessage } from "@/lib/snacks";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const state = await getState();
  if (!state.telegramChatId) {
    return NextResponse.json({ ok: true, skipped: "no chat linked" });
  }

  const snack = randomSnack();
  await sendTelegramMessage(
    state.telegramChatId,
    `✨ Recordatorio nocturno de piel y músculo:\n` +
      `1 porción de colágeno (gelatina sin azúcar sirve) + algo de proteína si aún no llegaste a tu meta del día.\n\n` +
      `Y si te da hambre antes de dormir, mejor esto que otra cosa:\n\n${formatSnackMessage(snack)}`
  );

  return NextResponse.json({ ok: true, sent: true });
}
