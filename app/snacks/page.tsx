"use client";
import { useState } from "react";
import { SNACKS, Snack, randomSnack } from "@/lib/snacks";

const TAG_LABEL: Record<string, string> = {
  agua: "💧 Agua",
  fibra: "🌾 Fibra",
  proteina: "💪 Proteína",
  colageno: "✨ Colágeno",
};

export default function SnacksPage() {
  const [pick, setPick] = useState<Snack | null>(null);

  return (
    <div className="space-y-5 pt-4">
      <div>
        <h1 className="font-display text-3xl tracking-wide text-paper">Antojo nocturno</h1>
        <p className="text-sm text-muted">
          Opciones con harta agua y fibra para sentirte lleno sin sumar de más.
        </p>
      </div>

      <button
        onClick={() => setPick(randomSnack())}
        className="w-full bg-water/90 hover:bg-water text-ink font-semibold rounded-xl py-3.5 transition-colors"
      >
        Dame una opción ahora
      </button>

      {pick && (
        <div className="bg-surface border border-line rounded-2xl p-5 animate-rise">
          <div className="font-display text-2xl text-paper tracking-wide">{pick.name}</div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {pick.tags.map((t) => (
              <span key={t} className="text-xs bg-surface2 border border-line rounded-full px-2.5 py-1 text-muted">
                {TAG_LABEL[t]}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted mt-3 leading-relaxed">{pick.why}</p>
        </div>
      )}

      <div className="pt-2">
        <h2 className="text-sm text-muted uppercase tracking-wide mb-3">Todas las opciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SNACKS.map((s) => (
            <button
              key={s.id}
              onClick={() => setPick(s)}
              className="text-left bg-surface border border-line rounded-xl p-3.5 hover:border-water/50 transition-colors"
            >
              <div className="font-medium text-paper text-sm">{s.name}</div>
              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                {s.tags.map((t) => (
                  <span key={t} className="text-[10px] text-muted">{TAG_LABEL[t]}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
