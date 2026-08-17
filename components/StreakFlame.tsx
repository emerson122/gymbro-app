export default function StreakFlame({ streak, done }: { streak: number; done: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`text-4xl ${done ? "animate-pulseSlow" : "grayscale opacity-50"}`}
        aria-hidden
      >
        🔥
      </div>
      <div>
        <div className="font-mono text-3xl font-bold leading-none text-paper">
          {streak}
        </div>
        <div className="text-xs text-muted uppercase tracking-wide">
          {done ? "racha activa hoy" : "día(s) — falta hoy"}
        </div>
      </div>
    </div>
  );
}
