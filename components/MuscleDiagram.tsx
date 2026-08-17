"use client";
import { MuscleId } from "@/lib/types";

interface Props {
  active: MuscleId[];
  view: "front" | "back";
  size?: number;
}

const BASE = "#2A2420";
const STROKE = "#3A322C";
const ACTIVE = "#FF5A36";
const ACTIVE_SOFT = "#FF8A3D";

function regionProps(id: MuscleId, active: MuscleId[]) {
  const isActive = active.includes(id);
  return {
    fill: isActive ? ACTIVE : BASE,
    stroke: isActive ? ACTIVE_SOFT : STROKE,
    strokeWidth: isActive ? 2 : 1,
    className: isActive ? "animate-pulseSlow" : "",
    style: isActive ? { filter: "drop-shadow(0 0 6px rgba(255,90,54,0.65))" } : undefined,
  };
}

export default function MuscleDiagram({ active, view, size = 220 }: Props) {
  return (
    <svg
      viewBox="0 0 200 400"
      width={size}
      height={(size * 400) / 200}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* silueta base */}
      <circle cx="100" cy="32" r="20" fill={BASE} stroke={STROKE} />
      <rect x="92" y="50" width="16" height="14" fill={BASE} stroke={STROKE} />

      {view === "front" ? (
        <>
          {/* torso */}
          <rect x="68" y="62" width="64" height="95" rx="14" fill={BASE} stroke={STROKE} />
          {/* pecho */}
          <rect x="72" y="66" width="56" height="34" rx="10" {...regionProps("chest", active)} />
          {/* abs */}
          <rect x="80" y="103" width="40" height="48" rx="6" {...regionProps("abs", active)} />
          {/* hombros */}
          <circle cx="63" cy="70" r="13" {...regionProps("shoulders", active)} />
          <circle cx="137" cy="70" r="13" {...regionProps("shoulders", active)} />
          {/* biceps (brazos superiores) */}
          <rect x="42" y="78" width="20" height="52" rx="9" {...regionProps("biceps", active)} />
          <rect x="138" y="78" width="20" height="52" rx="9" {...regionProps("biceps", active)} />
          {/* antebrazos */}
          <rect x="40" y="130" width="17" height="46" rx="8" fill={BASE} stroke={STROKE} />
          <rect x="143" y="130" width="17" height="46" rx="8" fill={BASE} stroke={STROKE} />
          {/* piernas: cuádriceps */}
          <rect x="74" y="160" width="24" height="88" rx="10" {...regionProps("quads", active)} />
          <rect x="102" y="160" width="24" height="88" rx="10" {...regionProps("quads", active)} />
          {/* pantorrillas */}
          <rect x="76" y="250" width="20" height="70" rx="9" {...regionProps("calves", active)} />
          <rect x="104" y="250" width="20" height="70" rx="9" {...regionProps("calves", active)} />
          {/* cardio: corazón */}
          {active.includes("cardio") && (
            <path
              d="M100 78 c-10 -14 -32 -6 -32 10 c0 16 22 26 32 38 c10 -12 32 -22 32 -38 c0 -16 -22 -24 -32 -10 z"
              fill={ACTIVE}
              style={{ filter: "drop-shadow(0 0 8px rgba(255,90,54,0.7))" }}
              className="animate-pulseSlow"
            />
          )}
        </>
      ) : (
        <>
          {/* torso espalda */}
          <rect x="68" y="62" width="64" height="95" rx="14" fill={BASE} stroke={STROKE} />
          {/* espalda */}
          <path
            d="M72 66 h56 v50 c-10 8 -46 8 -56 0 z"
            {...regionProps("back", active)}
          />
          {/* hombros */}
          <circle cx="63" cy="70" r="13" {...regionProps("shoulders", active)} />
          <circle cx="137" cy="70" r="13" {...regionProps("shoulders", active)} />
          {/* triceps */}
          <rect x="42" y="78" width="20" height="52" rx="9" {...regionProps("triceps", active)} />
          <rect x="138" y="78" width="20" height="52" rx="9" {...regionProps("triceps", active)} />
          {/* antebrazos */}
          <rect x="40" y="130" width="17" height="46" rx="8" fill={BASE} stroke={STROKE} />
          <rect x="143" y="130" width="17" height="46" rx="8" fill={BASE} stroke={STROKE} />
          {/* gluteos */}
          <rect x="74" y="158" width="52" height="26" rx="12" {...regionProps("glutes", active)} />
          {/* isquiotibiales */}
          <rect x="74" y="186" width="24" height="62" rx="10" {...regionProps("hamstrings", active)} />
          <rect x="102" y="186" width="24" height="62" rx="10" {...regionProps("hamstrings", active)} />
          {/* pantorrillas */}
          <rect x="76" y="250" width="20" height="70" rx="9" {...regionProps("calves", active)} />
          <rect x="104" y="250" width="20" height="70" rx="9" {...regionProps("calves", active)} />
        </>
      )}
    </svg>
  );
}
