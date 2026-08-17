"use client";
import { useEffect, useMemo, useState } from "react";
import { UserState } from "@/lib/types";

function toneStyle(tone: string) {
  if (tone === "orgulloso") return { emoji: "😤🔥", color: "text-lime" };
  if (tone === "neutral") return { emoji: "🙂", color: "text-water" };
  return { emoji: "😕", color: "text-danger" };
}

export default function CalendarPage() {
  const [state, setState] = useState<UserState | null>(null);
  const [tone, setTone] = useState<{ tone: string; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/state")
      .then((r) => {
        if (!r.ok) throw new Error(`El servidor respondió ${r.status}`);
        return r.json();
      })
      .then((s) => {
      setState(s);
      const count = s.history.filter((h: any) => {
        const d = new Date(h.date + "T00:00:00");
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 7);
        return h.type === "workout" && d >= cutoff;
      }).length;
      const msg =
        count >= 4
          ? { tone: "orgulloso", message: `${count} entrenamientos esta semana. Así se hace.` }
          : count >= 2
          ? { tone: "neutral", message: `${count} entrenamientos esta semana. Se puede más.` }
          : {
              tone: "decepcionado",
              message:
                count === 0
                  ? "Esta semana no entrenaste ni un día. Esperaba más — pero hoy es un buen día para empezar de nuevo."
                  : `Solo ${count} entrenamiento esta semana. Sé que podés más.`,
            };
      setTone(msg);
      })
      .catch((e) => setError(e.message || "No se pudo cargar tu progreso."));
  }, []);

  const grid = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const first = new Date(year, month, 1);
    const startOffset = first.getDay(); // 0=domingo
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(startOffset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return { cells, year, month };
  }, []);

  if (error) return <div className="pt-16 text-center text-danger text-sm">⚠️ {error}</div>;
  if (!state || !tone) return <div className="pt-16 text-center text-muted">Cargando…</div>;

  const byDate = new Map(state.history.map((h) => [h.date, h.type]));
  const ts = toneStyle(tone.tone);
  const monthName = new Date(grid.year, grid.month).toLocaleDateString("es-HN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-5 pt-4">
      <div>
        <h1 className="font-display text-3xl tracking-wide text-paper">Calendario</h1>
        <p className="text-sm text-muted capitalize">{monthName}</p>
      </div>

      <div className={`bg-surface border border-line rounded-2xl p-4 flex items-center gap-3`}>
        <span className="text-2xl">{ts.emoji}</span>
        <p className={`text-sm ${ts.color}`}>{tone.message}</p>
      </div>

      <div className="bg-surface border border-line rounded-2xl p-4">
        <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
          {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
            <div key={i} className="text-[11px] text-muted">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {grid.cells.map((day, i) => {
            if (day === null) return <div key={i} />;
            const dateStr = `${grid.year}-${String(grid.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const type = byDate.get(dateStr);
            const bg =
              type === "workout"
                ? "bg-flame text-ink font-semibold"
                : type === "cheat"
                ? "bg-danger/30 text-danger"
                : "bg-surface2 text-muted";
            return (
              <div
                key={i}
                className={`aspect-square rounded-md flex items-center justify-center text-xs ${bg}`}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-muted">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-flame inline-block" /> entrené</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-danger/30 inline-block" /> caí</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-surface2 border border-line inline-block" /> nada</span>
        </div>
      </div>

      <div className="bg-surface border border-line rounded-2xl p-4 flex justify-between font-mono text-sm">
        <div>
          <div className="text-muted text-xs">Racha actual</div>
          <div className="text-paper text-lg">{state.streak} 🔥</div>
        </div>
        <div>
          <div className="text-muted text-xs">Récord</div>
          <div className="text-paper text-lg">{state.longestStreak} 🏆</div>
        </div>
      </div>
    </div>
  );
}
