import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage, TelegramUpdate } from "@/lib/telegram";
import { getState, updateState, rolloverStreakIfNewDay } from "@/lib/state";
import { registerWorkout, registerCheatDay, weeklyToneMessage } from "@/lib/gamification";
import { buildTodayWorkout } from "@/lib/exercises";
import { randomSnack, formatSnackMessage } from "@/lib/snacks";

export const dynamic = "force-dynamic";

function daysSince(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const then = new Date(dateStr + "T00:00:00Z").getTime();
  const now = Date.now();
  return Math.floor((now - then) / 86400000);
}

export async function POST(req: NextRequest) {
  // seguridad: el secreto va en la URL del webhook (?secret=...)
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = (await req.json()) as TelegramUpdate;
  const msg = update.message;
  if (!msg?.text) return NextResponse.json({ ok: true });

  const chatId = msg.chat.id;
  const text = msg.text.trim().toLowerCase();
  const name = msg.from?.first_name || "campeón";

  let state = await updateState((s) => rolloverStreakIfNewDay(s));

  if (text === "/start") {
    state = await updateState((s) => ({ ...s, telegramChatId: String(chatId) }));
    await sendTelegramMessage(
      chatId,
      `¡Qué tal, ${name}! 💪 Soy tu GymBro. Te voy a molestar todos los días para que no perdás tu racha.\n\n` +
        `Comandos:\n` +
        `/hoy — tu rutina de hoy\n` +
        `/entrene — marca el entrenamiento de hoy como hecho\n` +
        `/cai — registra que caíste en tentación (sin drama, seguimos)\n` +
        `/snack — una opción saludable para el antojo nocturno\n` +
        `/racha — cómo va tu racha\n\n` +
        `Abrí la app y vinculá esta cuenta para ver todo con gráficos.`
    );
    return NextResponse.json({ ok: true });
  }

  if (text === "/hoy") {
    const cheatDays = daysSince(state.lastCheatDate);
    const workout = buildTodayWorkout(state.level, state.streak, cheatDays);
    const lines = workout
      .map((e) => `• ${e.name} — ${e.baseSets}x${e.baseReps}`)
      .join("\n");
    await sendTelegramMessage(
      chatId,
      `🔥 Rutina de hoy (nivel ${state.level}):\n\n${lines}\n\nCuando termines, mandá /entrene.`
    );
    return NextResponse.json({ ok: true });
  }

  if (text === "/entrene") {
    const before = state.streak;
    state = await updateState((s) => registerWorkout(s, []));
    const gained = state.streak > before || before === 0;
    await sendTelegramMessage(
      chatId,
      `✅ ¡Entrenamiento registrado! Racha: ${state.streak} 🔥 día(s). Nivel ${state.level} (${state.xp}/${state.xpToNext} XP).\n` +
        (gained ? "Seguí así, esto se está acumulando de verdad." : "")
    );
    return NextResponse.json({ ok: true });
  }

  if (text === "/cai" || text === "/caí") {
    state = await updateState((s) => registerCheatDay(s, "reportado por Telegram"));
    await sendTelegramMessage(
      chatId,
      `Gracias por avisarme, eso también cuenta. Un día no arruina nada — mañana ajusto tu rutina con más cardio suave para retomar. No te castigues, seguí adelante.`
    );
    return NextResponse.json({ ok: true });
  }

  if (text === "/snack") {
    const snack = randomSnack();
    await sendTelegramMessage(chatId, formatSnackMessage(snack), { parse_mode: "Markdown" });
    return NextResponse.json({ ok: true });
  }

  if (text === "/racha") {
    const tone = weeklyToneMessage(state);
    await sendTelegramMessage(
      chatId,
      `🔥 Racha actual: ${state.streak} día(s)\n🏆 Récord: ${state.longestStreak} día(s)\n\n${tone.message}`
    );
    return NextResponse.json({ ok: true });
  }

  await sendTelegramMessage(
    chatId,
    "No reconozco ese comando. Probá /hoy, /entrene, /cai, /snack o /racha."
  );
  return NextResponse.json({ ok: true });
}
