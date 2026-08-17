"use client";
import { useEffect, useState } from "react";
import { UserState } from "@/lib/types";

export default function SettingsPage() {
  const [state, setState] = useState<UserState | null>(null);
  const [chatId, setChatId] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/state")
      .then((r) => {
        if (!r.ok) throw new Error(`El servidor respondió ${r.status}`);
        return r.json();
      })
      .then((s: UserState) => {
        setState(s);
        setChatId(s.telegramChatId || "");
        setWeight(String(s.currentWeightLb));
        setGoal(String(s.goalWeightLb));
      })
      .catch((e) => setError(e.message || "No se pudo cargar tu progreso."));
  }, []);

  async function save() {
    const res = await fetch("/api/link-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telegramChatId: chatId || null,
        currentWeightLb: weight ? Number(weight) : undefined,
        goalWeightLb: goal ? Number(goal) : undefined,
      }),
    });
    setState(await res.json());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (error) return <div className="pt-16 text-center text-danger text-sm">⚠️ {error}</div>;
  if (!state) return <div className="pt-16 text-center text-muted">Cargando…</div>;

  return (
    <div className="space-y-6 pt-4">
      <div>
        <h1 className="font-display text-3xl tracking-wide text-paper">Ajustes</h1>
        <p className="text-sm text-muted">Vinculá tu bot y actualizá tu peso.</p>
      </div>

      <div className="bg-surface border border-line rounded-2xl p-5 space-y-3">
        <label className="block">
          <span className="text-sm text-muted">Chat ID de Telegram</span>
          <input
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            placeholder="ej. 2120694641"
            className="mt-1 w-full bg-surface2 border border-line rounded-lg px-3 py-2.5 text-paper font-mono text-sm outline-none focus:border-flame"
          />
        </label>
        <p className="text-xs text-muted leading-relaxed">
          Escribile <span className="font-mono text-lime">/start</span> a tu bot en Telegram y se
          guarda solo. Si querés hacerlo a mano, tu chat ID también aparece cuando le escribes.
        </p>
      </div>

      <div className="bg-surface border border-line rounded-2xl p-5 space-y-4">
        <label className="block">
          <span className="text-sm text-muted">Peso actual (lb)</span>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 w-full bg-surface2 border border-line rounded-lg px-3 py-2.5 text-paper font-mono text-sm outline-none focus:border-flame"
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted">Meta de peso (lb)</span>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mt-1 w-full bg-surface2 border border-line rounded-lg px-3 py-2.5 text-paper font-mono text-sm outline-none focus:border-flame"
          />
        </label>
      </div>

      <button
        onClick={save}
        className="w-full bg-flame hover:bg-flame2 text-ink font-semibold rounded-xl py-3.5 transition-colors"
      >
        {saved ? "✅ Guardado" : "Guardar cambios"}
      </button>

      <div className="text-xs text-muted text-center pt-4 leading-relaxed">
        Racha creada el {new Date(state.createdAt).toLocaleDateString("es-HN")}.
        <br />
        Este progreso vive en tu base de datos de Upstash, no en este navegador —
        se ve igual desde cualquier dispositivo.
      </div>
    </div>
  );
}
