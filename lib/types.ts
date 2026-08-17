export type MuscleId =
  | "chest"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "back"
  | "abs"
  | "quads"
  | "glutes"
  | "hamstrings"
  | "calves"
  | "cardio";

export type Equipment = "banda" | "mancuerna10" | "mancuerna30" | "bici" | "peso_corporal";

export interface Exercise {
  id: string;
  name: string;
  equipment: Equipment;
  muscles: MuscleId[];
  view: "front" | "back";
  minLevel: number; // nivel del usuario en el que se desbloquea
  baseSets: number;
  baseReps: string; // string porque a veces es "12" y a veces "30s"
  progressionNote: string;
  howTo: string;
}

export interface WorkoutLogEntry {
  date: string; // YYYY-MM-DD
  type: "workout" | "cheat" | "rest";
  exerciseIds?: string[];
  note?: string;
  xpEarned?: number;
}

export interface WeightEntry {
  date: string;
  weightLb: number;
}

export interface UserState {
  createdAt: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  longestStreak: number;
  lastCheckInDate: string | null; // YYYY-MM-DD
  lastCheatDate: string | null;
  telegramChatId: string | null;
  startWeightLb: number;
  currentWeightLb: number;
  goalWeightLb: number;
  weightLog: WeightEntry[];
  history: WorkoutLogEntry[];
  todayDone: boolean;
  lastNutritionAckDate: string | null;
}

export const DEFAULT_STATE: UserState = {
  createdAt: new Date().toISOString(),
  level: 1,
  xp: 0,
  xpToNext: 100,
  streak: 0,
  longestStreak: 0,
  lastCheckInDate: null,
  lastCheatDate: null,
  telegramChatId: null,
  startWeightLb: 240,
  currentWeightLb: 240,
  goalWeightLb: 200,
  weightLog: [],
  history: [],
  todayDone: false,
  lastNutritionAckDate: null,
};
