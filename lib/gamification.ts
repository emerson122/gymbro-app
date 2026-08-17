import { UserState, WorkoutLogEntry } from "./types";
import { hnDateStr, yesterdayStr } from "./state";

export function xpForNextLevel(level: number): number {
  // curva suave: nivel 1->100, cada nivel pide un poco más
  return Math.round(100 * Math.pow(1.18, level - 1));
}

export function applyXp(s: UserState, amount: number): UserState {
  let xp = s.xp + amount;
  let level = s.level;
  let xpToNext = s.xpToNext;
  while (xp >= xpToNext) {
    xp -= xpToNext;
    level += 1;
    xpToNext = xpForNextLevel(level);
  }
  return { ...s, xp, level, xpToNext };
}

export function registerWorkout(
  s: UserState,
  exerciseIds: string[]
): UserState {
  const today = hnDateStr();
  if (s.lastCheckInDate === today && s.todayDone) {
    return s; // ya se registró hoy, evita XP duplicado
  }

  const yesterday = yesterdayStr(today);
  const continuesStreak = s.lastCheckInDate === yesterday || s.streak === 0;
  const newStreak = s.lastCheckInDate === yesterday ? s.streak + 1 : 1;

  const baseXp = 30;
  const streakBonus = Math.min(newStreak * 2, 40);
  const totalXp = baseXp + streakBonus;

  const entry: WorkoutLogEntry = {
    date: today,
    type: "workout",
    exerciseIds,
    xpEarned: totalXp,
  };

  let next: UserState = {
    ...s,
    lastCheckInDate: today,
    todayDone: true,
    streak: newStreak,
    longestStreak: Math.max(s.longestStreak, newStreak),
    history: [...s.history, entry],
  };
  next = applyXp(next, totalXp);
  return next;
}

export function registerCheatDay(s: UserState, note: string): UserState {
  const today = hnDateStr();
  const entry: WorkoutLogEntry = { date: today, type: "cheat", note };
  return {
    ...s,
    lastCheatDate: today,
    history: [...s.history, entry],
  };
}

/** ¿Cuántos entrenamientos hubo en los últimos 7 días (incluyendo hoy)? */
export function workoutsInLastNDays(s: UserState, n: number): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - n);
  return s.history.filter(
    (h) => h.type === "workout" && new Date(h.date + "T00:00:00") >= cutoff
  ).length;
}

export function weeklyToneMessage(s: UserState): {
  tone: "orgulloso" | "neutral" | "decepcionado";
  message: string;
} {
  const count = workoutsInLastNDays(s, 7);
  if (count >= 4) {
    return {
      tone: "orgulloso",
      message: `${count} entrenamientos esta semana. Así se hace — tu cuerpo ya está notando la diferencia, aunque la báscula todavía no lo diga.`,
    };
  }
  if (count >= 2) {
    return {
      tone: "neutral",
      message: `${count} entrenamientos esta semana. Vas, pero podemos apretar un poco más. Tu meta no se mueve sola.`,
    };
  }
  return {
    tone: "decepcionado",
    message:
      count === 0
        ? "Esta semana no entrenaste ni un día. No te voy a mentir, esperaba más de vos — pero lo que importa es lo que hacés hoy, no lo que pasó. Vamos con algo corto ahorita."
        : `Solo ${count} entrenamiento esta semana. Sé que podés más. Empecemos de nuevo, hoy mismo, con algo pequeño.`,
  };
}
