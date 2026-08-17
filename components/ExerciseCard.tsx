import { Exercise } from "@/lib/types";
import MuscleDiagram from "./MuscleDiagram";

export default function ExerciseCard({
  exercise,
  onExpand,
  expanded,
}: {
  exercise: Exercise;
  onExpand?: () => void;
  expanded?: boolean;
}) {
  return (
    <button
      onClick={onExpand}
      className="w-full text-left bg-surface border border-line rounded-2xl p-4 flex gap-4 items-center hover:border-flame/50 transition-colors animate-rise"
    >
      <div className="shrink-0 bg-surface2 rounded-xl p-1">
        <MuscleDiagram active={exercise.muscles} view={exercise.view} size={64} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-paper leading-tight">{exercise.name}</div>
        <div className="font-mono text-xs text-lime mt-0.5">
          {exercise.baseSets}x{exercise.baseReps}
        </div>
        {expanded && (
          <p className="text-sm text-muted mt-2 leading-relaxed">{exercise.howTo}</p>
        )}
        {expanded && (
          <p className="text-xs text-water mt-2">📈 {exercise.progressionNote}</p>
        )}
      </div>
    </button>
  );
}
