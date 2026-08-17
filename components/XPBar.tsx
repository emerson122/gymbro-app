export default function XPBar({
  level,
  xp,
  xpToNext,
}: {
  level: number;
  xp: number;
  xpToNext: number;
}) {
  const pct = Math.min(100, Math.round((xp / xpToNext) * 100));
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm text-muted">
          Nivel <span className="text-paper font-semibold">{level}</span>
        </span>
        <span className="font-mono text-xs text-muted">
          {xp}/{xpToNext} XP
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-surface2 border border-line overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lime to-flame2 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
