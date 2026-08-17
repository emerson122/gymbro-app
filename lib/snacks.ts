export interface Snack {
  id: string;
  name: string;
  why: string;
  tags: ("agua" | "fibra" | "proteina" | "colageno")[];
}

export const SNACKS: Snack[] = [
  {
    id: "pepino-limon",
    name: "Pepino en rodajas con limón y chile en polvo",
    why: "Es casi todo agua (~96%) y prácticamente no tiene calorías. El chile ayuda a que se sienta más satisfactorio.",
    tags: ["agua"],
  },
  {
    id: "jicama",
    name: "Jícama en bastones con limón",
    why: "Muy alta en agua y fibra, textura crujiente que engaña las ganas de algo tipo papitas.",
    tags: ["agua", "fibra"],
  },
  {
    id: "apio-hummus",
    name: "Apio con un poco de hummus",
    why: "El apio es casi puro agua, y el hummus da algo de proteína y grasa buena para sentirte lleno más tiempo.",
    tags: ["agua", "fibra", "proteina"],
  },
  {
    id: "gelatina-light",
    name: "Gelatina light (sin azúcar)",
    why: "Es tu forma más fácil de meter colágeno en la noche — ayuda a la piel y son prácticamente 0 calorías extra si es light.",
    tags: ["colageno"],
  },
  {
    id: "sandia",
    name: "Sandía en cubos",
    why: "Más del 90% agua, dulce natural que corta el antojo de algo dulce sin arruinar el día.",
    tags: ["agua"],
  },
  {
    id: "claras-cocidas",
    name: "2-3 claras de huevo cocidas",
    why: "Proteína pura, casi sin grasa, te llena bien y ayuda a recuperar músculo mientras duermes.",
    tags: ["proteina"],
  },
  {
    id: "yogur-griego",
    name: "Yogur griego sin azúcar (natural)",
    why: "Alto en proteína, con probióticos, y si le agregas un poco de colágeno en polvo sin sabor, ni lo notás.",
    tags: ["proteina", "colageno"],
  },
  {
    id: "edamame",
    name: "Edamame al vapor con sal",
    why: "Proteína vegetal + fibra, y el ritual de pelarlos hace que comas más despacio (eso ayuda a sentirte lleno).",
    tags: ["fibra", "proteina"],
  },
  {
    id: "palomitas-naturales",
    name: "Palomitas de maíz naturales (sin mantequilla)",
    why: "Mucho volumen y fibra por pocas calorías — llenan el estómago de verdad, no solo el antojo.",
    tags: ["fibra"],
  },
  {
    id: "zanahoria-tomate",
    name: "Zanahoria baby + tomates cherry",
    why: "Alta en agua y fibra, buena opción si querés algo para masticar viendo una serie.",
    tags: ["agua", "fibra"],
  },
];

export function randomSnack(excludeIds: string[] = []): Snack {
  const pool = SNACKS.filter((s) => !excludeIds.includes(s.id));
  const list = pool.length ? pool : SNACKS;
  return list[Math.floor(Math.random() * list.length)];
}

export function formatSnackMessage(s: Snack): string {
  const tagLabel: Record<string, string> = {
    agua: "💧 mucha agua",
    fibra: "🌾 fibra",
    proteina: "💪 proteína",
    colageno: "✨ colágeno",
  };
  const tags = s.tags.map((t) => tagLabel[t]).join(" · ");
  return `🥒 *${s.name}*\n${tags}\n\n${s.why}`;
}
