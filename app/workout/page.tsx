"use client";
import { useEffect, useState } from "react";
import { UserState } from "@/lib/types";
import { exercisesForLevel, nextUnlock } from "@/lib/exercises";
import ExerciseCard from "@/components/ExerciseCard";

export default function WorkoutPage() {
  const [state, setState] = useState<UserState | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/state")
      .then((r) => {
        if (!r.ok) throw new Error(`El servidor respondió ${r.status}`);
        return r.json();
      })
      .then(setState)
      .catch((e) => setError(e.message || "No se pudo cargar tu progreso."));
  }, []);

  if (error) return <div className="pt-16 text-center text-danger text-sm">⚠️ {error}</div>;
  if (!state) return <div className="pt-16 text-center text-muted">Cargando…</div>;

  const exercises = exercisesForLevel(state.level);
  const unlock = nextUnlock(state.level);

  return (
    <div className="space-y-5 pt-4">
      <div>
        <h1 className="font-display text-3xl tracking-wide text-paper">Tu catálogo</h1>
        <p className="text-sm text-muted">
          Desbloqueado hasta nivel {state.level}, ajustado a tus bandas, mancuernas y bici.
        </p>
      </div>

      <div className="space-y-3">
        {exercises.map((e) => (
          <ExerciseCard
            key={e.id}
            exercise={e}
            expanded={expandedId === e.id}
            onExpand={() => setExpandedId(expandedId === e.id ? null : e.id)}
          />
        ))}
      </div>

      {unlock && (
        <div className="border border-dashed border-line rounded-2xl p-4 text-center">
          <div className="text-sm text-muted">
            🔒 Próximo desbloqueo en <span className="text-lime font-mono">nivel {unlock.minLevel}</span>
          </div>
          <div className="text-paper font-semibold mt-1">{unlock.name}</div>
        </div>
      )}
    </div>
  );
}
