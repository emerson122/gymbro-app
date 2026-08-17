import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasUpstash
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// En Vercel el filesystem del deployment es de solo lectura (salvo /tmp, que
// no persiste entre invocaciones), así que ahí NO usamos archivo: si falta
// Upstash, usamos memoria (se resetea seguido, pero no truena la app).
const isServerless = !!process.env.VERCEL;
const LOCAL_FILE = path.join(process.cwd(), ".data", "state.local.json");

let memoryFallback: Record<string, unknown> = {};
let warned = false;

function warnOnce() {
  if (warned) return;
  warned = true;
  if (isServerless) {
    console.warn(
      "[gymbro] Upstash no está configurado en este deployment. Conecta la integración de Upstash en Vercel > Storage para que tu progreso persista de verdad — mientras tanto se usa memoria temporal que se borra en cada cold start."
    );
  } else {
    console.warn(
      "[gymbro] Upstash no está configurado. Usando .data/state.local.json solo para desarrollo local. Para producción, conecta Upstash (ver README)."
    );
  }
}

function readLocalFile(): Record<string, unknown> {
  try {
    if (!fs.existsSync(LOCAL_FILE)) return {};
    return JSON.parse(fs.readFileSync(LOCAL_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeLocalFile(data: Record<string, unknown>) {
  try {
    fs.mkdirSync(path.dirname(LOCAL_FILE), { recursive: true });
    fs.writeFileSync(LOCAL_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("[gymbro] No se pudo escribir el estado local:", e);
  }
}

export async function storeGet<T>(key: string): Promise<T | null> {
  if (redis) {
    return (await redis.get<T>(key)) ?? null;
  }
  warnOnce();
  if (!isServerless) {
    const data = readLocalFile();
    return (data[key] as T) ?? null;
  }
  return (memoryFallback[key] as T) ?? null;
}

export async function storeSet<T>(key: string, value: T): Promise<void> {
  if (redis) {
    await redis.set(key, value);
    return;
  }
  warnOnce();
  if (!isServerless) {
    const data = readLocalFile();
    data[key] = value;
    writeLocalFile(data);
    return;
  }
  memoryFallback[key] = value;
}

export const STATE_KEY = "gymbro:state";
export const isUsingRealPersistence = hasUpstash;
