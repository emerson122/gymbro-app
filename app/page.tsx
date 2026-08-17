"use client";
import { useEffect, useState } from "react";
import { UserState } from "@/lib/types";
import { buildTodayWorkout } from "@/lib/exercises";
import StreakFlame from "@/components/StreakFlame";
import XPBar from "@/components/XPBar";
import MuscleDiagram from "@/components/MuscleDiagram";
import ExerciseCard from "@/components/ExerciseCard";

function daysSince(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const then = new Date(dateStr + "T00:00:00Z").getTime();
  return Math.floor((Date.now() - then) / 86400000);
}

export default function DashboardPage() {
  const [state, setState] = useState<UserState | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const res = await fetch("/api/state");
      if (!res.ok) throw new Error(`El servidor respondió ${res.status}`);
      setState(await res.json());
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo cargar tu progreso. Revisá la terminal donde corre `npm run dev`."
      );
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (error) {
    return (
      <div className="pt-16 text-center space-y-3">
        <p className="text-danger text-sm">⚠️ {error}</p>
        <p className="text-muted text-xs">
          Revisá la terminal: si dice que falta Upstash, es normal en desarrollo —
          la app ya guarda tu progreso en <span className="font-mono">.data/state.local.json</span> mientras tanto.
        </p>
        <button onClick={load} className="text-sm bg-surface2 border border-line rounded-lg px-4 py-2 text-paper">
          Reintentar
        </button>
      </div>
    );
  }

  if (!state) {
    return <div className="pt-16 text-center text-muted animate-pulseSlow">Cargando tu progreso…</div>;
  }

  const cheatDays = daysSince(state.lastCheatDate);
  const workout = buildTodayWorkout(state.level, state.streak, cheatDays);
  const focusMuscles = Array.from(new Set(workout.flatMap((e) => e.muscles)));
  const view = workout[0]?.view || "front";
  const lostLb = state.startWeightLb - state.currentWeightLb;
  const goalLb = state.startWeightLb - state.goalWeightLb;
  const progressPct = goalLb > 0 ? Math.max(0, Math.min(100, Math.round((lostLb / goalLb) * 100))) : 0;

  async function markDone() {
    setBusy(true);
    const ids = workout.map((e) => e.id);
    const res = await fetch("/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exerciseIds: ids }),
    });
    setState(await res.json());
    setBusy(false);
  }

  async function logCheat() {
    setBusy(true);
    const res = await fetch("/api/cheatday", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: "reportado desde la app" }),
    });
    setState(await res.json());
    setBusy(false);
  }

  return (
    <div className="space-y-5 pt-4">
      <div className="bg-surface border border-line rounded-2xl p-5 flex items-center justify-between">
        <StreakFlame streak={state.streak} done={state.todayDone} />
        <div className="w-32">
          <XPBar level={state.level} xp={state.xp} xpToNext={state.xpToNext} />
        </div>
      </div>

      <div className="bg-surface border border-line rounded-2xl p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted uppercase tracking-wide">Progreso de peso</span>
          <span className="font-mono text-sm text-lime">{lostLb > 0 ? `-${lostLb} lb` : "arrancando"}</span>
        </div>
        <div className="h-2.5 rounded-full bg-surface2 border border-line overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-water to-lime" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="flex justify-between font-mono text-xs text-muted">
          <span>{state.startWeightLb} lb</span>
          <span className="text-paper">{state.currentWeightLb} lb</span>
          <span>{state.goalWeightLb} lb meta</span>
        </div>
      </div>

      <div className="bg-surface border border-line rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <div className="bg-surface2 rounded-xl p-1 shrink-0">
            <MuscleDiagram active={focusMuscles} view={view} size={90} />
          </div>
          <div>
            <div className="font-display text-2xl text-paper tracking-wide">Misión de hoy</div>
            <p className="text-sm text-muted">
              {cheatDays !== null && cheatDays <= 1
                ? "Ayer se te fue la mano — hoy vamos suave, con más cardio y menos volumen. Sin culpa, solo seguimos."
                : `${workout.length} ejercicios pensados para tu equipo y tu nivel actual.`}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {workout.map((e) => (
          <ExerciseCard key={e.id} exercise={e} />
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          disabled={busy || state.todayDone}
          onClick={markDone}
          className="flex-1 bg-flame hover:bg-flame2 disabled:opacity-40 disabled:cursor-not-allowed text-ink font-semibold rounded-xl py-3.5 transition-colors shadow-glow"
        >
          {state.todayDone ? "✅ Ya entrenaste hoy" : "Marcar entrenamiento hecho"}
        </button>
        <button
          disabled={busy}
          onClick={logCheat}
          className="px-4 border border-line rounded-xl text-sm text-muted hover:text-paper hover:border-danger/60 transition-colors"
        >
          Caí en tentación
        </button>
      </div>
    </div>
  );
}
