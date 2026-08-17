import { storeGet, storeSet, STATE_KEY } from "./redis";
import { DEFAULT_STATE, UserState } from "./types";

const HN_OFFSET_HOURS = -6; // Honduras es UTC-6 todo el año, sin horario de verano

export function hnNow(): Date {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + HN_OFFSET_HOURS * 3600000);
}

export function hnDateStr(d: Date = hnNow()): string {
  return d.toISOString().slice(0, 10);
}

export function yesterdayStr(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

export async function getState(): Promise<UserState> {
  const raw = await storeGet<UserState>(STATE_KEY);
  if (!raw) return { ...DEFAULT_STATE };
  // merge para tolerar campos nuevos que se agreguen después
  return { ...DEFAULT_STATE, ...raw };
}

export async function setState(state: UserState): Promise<void> {
  await storeSet(STATE_KEY, state);
}

export async function updateState(
  mutator: (s: UserState) => UserState
): Promise<UserState> {
  const current = await getState();
  const next = mutator(current);
  await setState(next);
  return next;
}

/** Recalcula la racha si cambió el día, sin registrar nada todavía. */
export function rolloverStreakIfNewDay(s: UserState): UserState {
  const today = hnDateStr();
  if (s.lastCheckInDate === today) return s; // ya se evaluó hoy
  if (s.lastCheckInDate === null) return { ...s, todayDone: false };

  const wasYesterday = s.lastCheckInDate === yesterdayStr(today);
  if (!wasYesterday && s.lastCheckInDate !== today) {
    // se rompió la racha
    return { ...s, streak: 0, todayDone: false };
  }
  return { ...s, todayDone: false };
}
