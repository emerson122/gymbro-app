import { Exercise } from "./types";

export const EXERCISES: Exercise[] = [
  {
    id: "banda-braquial",
    name: "Curl de bíceps/braquial parado en banda",
    equipment: "banda",
    muscles: ["biceps"],
    view: "front",
    minLevel: 1,
    baseSets: 3,
    baseReps: "12",
    progressionNote: "Sube reps antes de subir tensión: 12 → 15 → 20, luego dobla la banda para más resistencia.",
    howTo:
      "Pasa la banda por detrás de tu espalda hasta el piso, párate encima con ambos pies y sube el antebrazo por encima de la cabeza controlando la bajada.",
  },
  {
    id: "banda-remo",
    name: "Remo con banda (espalda)",
    equipment: "banda",
    muscles: ["back", "biceps"],
    view: "back",
    minLevel: 1,
    baseSets: 3,
    baseReps: "12",
    progressionNote: "Cuando 12 reps se sientan fáciles con buena forma, sube a 15 antes de acortar la banda.",
    howTo:
      "Sentado o de pie, banda anclada al frente (puede ser con el pie), jala los codos hacia atrás apretando los omóplatos.",
  },
  {
    id: "banda-press-hombro",
    name: "Press de hombro con banda",
    equipment: "banda",
    muscles: ["shoulders"],
    view: "front",
    minLevel: 1,
    baseSets: 3,
    baseReps: "10",
    progressionNote: "Empieza con rango parcial si te cuesta el rango completo, ve ampliando semana a semana.",
    howTo:
      "Banda bajo los pies, empuja ambas manos hacia arriba desde la altura de los hombros hasta casi estirar el codo.",
  },
  {
    id: "banda-triceps",
    name: "Extensión de tríceps con banda",
    equipment: "banda",
    muscles: ["triceps"],
    view: "back",
    minLevel: 1,
    baseSets: 3,
    baseReps: "12",
    progressionNote: "Mantén el codo fijo pegado al cuerpo; cuando lo domines, prueba una mano a la vez.",
    howTo:
      "Banda anclada arriba (puerta o por encima del hombro), extiende el antebrazo hacia abajo sin mover el codo.",
  },
  {
    id: "banda-sentadilla",
    name: "Sentadilla con banda",
    equipment: "banda",
    muscles: ["quads", "glutes"],
    view: "front",
    minLevel: 1,
    baseSets: 3,
    baseReps: "12",
    progressionNote: "Empieza con rango corto (medias sentadillas) e incrementa la profundidad cada semana.",
    howTo:
      "Banda bajo los pies y sobre los hombros o agarrada con las manos a la altura del pecho, baja como si te sentaras en una silla.",
  },
  {
    id: "banda-puente-gluteo",
    name: "Puente de glúteo con banda",
    equipment: "banda",
    muscles: ["glutes", "hamstrings"],
    view: "back",
    minLevel: 1,
    baseSets: 3,
    baseReps: "15",
    progressionNote: "Cuando sea fácil, agrega una pausa de 2 segundos arriba en cada repetición.",
    howTo:
      "Acostado boca arriba, banda justo arriba de las rodillas, empuja la cadera hacia arriba apretando glúteo.",
  },
  {
    id: "mancuerna10-curl",
    name: "Curl de bíceps con mancuerna de 10 lb",
    equipment: "mancuerna10",
    muscles: ["biceps"],
    view: "front",
    minLevel: 1,
    baseSets: 3,
    baseReps: "10 por brazo",
    progressionNote: "Cuando 3x10 por brazo se sienta liviano y controlado, es momento de agregar una serie más.",
    howTo: "De pie, sube la mancuerna doblando el codo sin balancear el torso, baja lento (3 segundos).",
  },
  {
    id: "mancuerna10-lateral",
    name: "Elevación lateral con mancuerna de 10 lb",
    equipment: "mancuerna10",
    muscles: ["shoulders"],
    view: "front",
    minLevel: 2,
    baseSets: 3,
    baseReps: "10 por brazo",
    progressionNote: "Prioriza técnica limpia sobre altura del brazo — el hombro es fácil de lesionar aquí.",
    howTo: "Brazo semi-flexionado, sube lateralmente hasta la altura del hombro, controla la bajada.",
  },
  {
    id: "mancuerna10-remo1brazo",
    name: "Remo a un brazo con mancuerna de 10 lb",
    equipment: "mancuerna10",
    muscles: ["back", "biceps"],
    view: "back",
    minLevel: 2,
    baseSets: 3,
    baseReps: "10 por brazo",
    progressionNote: "Apóyate en una silla o la banca; concéntrate en apretar la espalda, no solo el brazo.",
    howTo: "Apoyado con una mano y rodilla, jala la mancuerna hacia la cadera apretando el omóplato.",
  },
  {
    id: "mancuerna30-hold",
    name: "Sostén isométrico con mancuerna de 30 lb (nivel meta)",
    equipment: "mancuerna30",
    muscles: ["biceps", "back"],
    view: "front",
    minLevel: 5,
    baseSets: 3,
    baseReps: "15-20s",
    progressionNote: "Objetivo real: llegar a manejarlas con buena forma. Empieza solo sosteniéndolas quieto, sin moverlas, para acostumbrar la mano y el antebrazo.",
    howTo: "Levanta la mancuerna con ambas manos ayudándote (o desde una mesa) y sostenla quieta a la altura de la cadera el tiempo indicado, controlando la respiración.",
  },
  {
    id: "mancuerna30-goblet",
    name: "Sentadilla goblet con mancuerna de 30 lb (desbloqueable)",
    equipment: "mancuerna30",
    muscles: ["quads", "glutes"],
    view: "front",
    minLevel: 7,
    baseSets: 3,
    baseReps: "8",
    progressionNote: "Esta se desbloquea cuando ya domines la sentadilla con banda y el sostén isométrico. Ahí sí valdrá la pena el peso.",
    howTo: "Sostén la mancuerna vertical pegada al pecho con ambas manos y baja en sentadilla controlada.",
  },
  {
    id: "bici-suave",
    name: "Bicicleta estática — ritmo suave",
    equipment: "bici",
    muscles: ["cardio", "quads"],
    view: "front",
    minLevel: 1,
    baseSets: 1,
    baseReps: "10 min",
    progressionNote: "Sube 2-3 minutos por semana. Meta a mediano plazo: 30 min continuos a ritmo cómodo.",
    howTo: "Ritmo donde puedas hablar en frases completas sin ahogarte. Esto es lo mejor para empezar a mover la aguja de la insulina sin destrozar las rodillas.",
  },
  {
    id: "bici-intervalos",
    name: "Bicicleta estática — intervalos suaves",
    equipment: "bici",
    muscles: ["cardio", "quads"],
    view: "front",
    minLevel: 4,
    baseSets: 6,
    baseReps: "1 min fuerte / 2 min suave",
    progressionNote: "Se desbloquea cuando ya toleres 15-20 min continuos sin problema.",
    howTo: "Alterna 1 minuto pedaleando más fuerte con 2 minutos suaves, repite. Esto mejora tu capacidad cardiovascular más rápido que el ritmo constante.",
  },
  {
    id: "core-plancha-rodillas",
    name: "Plancha con rodillas apoyadas",
    equipment: "peso_corporal",
    muscles: ["abs"],
    view: "front",
    minLevel: 1,
    baseSets: 3,
    baseReps: "20s",
    progressionNote: "Sube 5 segundos por semana hasta llegar a plancha completa.",
    howTo: "Antebrazos y rodillas en el piso, cuerpo recto desde la cabeza hasta la rodilla, aprieta el abdomen.",
  },
];

export function exercisesForLevel(level: number): Exercise[] {
  return EXERCISES.filter((e) => e.minLevel <= level);
}

export function nextUnlock(level: number): Exercise | null {
  const locked = EXERCISES.filter((e) => e.minLevel > level).sort(
    (a, b) => a.minLevel - b.minLevel
  );
  return locked[0] || null;
}

/**
 * Arma la rutina del día: si el usuario cayó en tentación ayer o antier,
 * priorizamos más cardio suave y menos volumen de fuerza (recuperación activa,
 * no castigo). Si viene con racha alta, subimos un poco el volumen.
 */
export function buildTodayWorkout(
  level: number,
  streak: number,
  daysSinceCheat: number | null
): Exercise[] {
  const available = exercisesForLevel(level);
  const cardio = available.filter((e) => e.muscles.includes("cardio"));
  const strength = available.filter((e) => !e.muscles.includes("cardio"));

  const recentCheat = daysSinceCheat !== null && daysSinceCheat <= 1;

  if (recentCheat) {
    // más cardio suave, rutina de fuerza corta, tono de "volver al ruedo"
    const pick = strength.slice(0, 3);
    return [...cardio.filter((c) => c.id === "bici-suave"), ...pick];
  }

  const volume = streak >= 7 ? 5 : streak >= 3 ? 4 : 3;
  const strengthPick = shuffleDeterministic(strength).slice(0, volume);
  const cardioPick = cardio.slice(0, 1);
  return [...strengthPick, ...cardioPick];
}

function shuffleDeterministic<T>(arr: T[]): T[] {
  // determinístico por día, para que la rutina no cambie si recargas la página el mismo día
  const day = new Date().getDate();
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = (i * 7 + day) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
