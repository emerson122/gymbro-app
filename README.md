# GymBro — app de entrenamiento con racha + bot de Telegram

App en Next.js 16 (App Router) pensada para desplegarse en Vercel gratis. Lleva
tu racha estilo Duolingo, arma rutinas con lo que tenés (bandas, mancuernas de
10 y 30 lb, bicicleta estática), te muestra en un diagrama qué músculo estás
trabajando, sugiere snacks nocturnos altos en agua/fibra, te recuerda tomar
colágeno/proteína, y un bot de Telegram te persigue antes de medianoche para
que no pierdas la racha.

## ⚠️ Antes que nada: tu token

Pegaste el token del bot en un chat, así que ya quedó expuesto. Andá a
[@BotFather](https://t.me/BotFather) → `/mybots` → tu bot → **API Token** →
**Revoke current token**, y usá el nuevo. Nunca lo pongas directo en el
código: siempre como variable de entorno.

## Por qué Upstash y no "todo en la URL"

Pensaste en meter el estado en base64 en la URL para no necesitar base de
datos. Funciona para compartir un link, pero **no sirve para el bot**: los
recordatorios los dispara un cron de Vercel a las 10pm, y ese cron no tiene
forma de leer una URL que solo existe en tu navegador. Necesita algo que
pueda leer/escribir desde el servidor.

La solución más simple y gratis: **Upstash Redis**. Se integra directo con
Vercel, no pide tarjeta, y el plan gratis (500,000 comandos/mes) sobra por
mucho para un solo usuario. Es literalmente un diccionario en la nube.

## 1. Requisitos

- Cuenta de [GitHub](https://github.com)
- Cuenta de [Vercel](https://vercel.com) (podés entrar con GitHub)
- Tu bot ya creado: `@MyGymBroRat_bot` ✅ (regenerá el token primero)

## 2. Subir el código a GitHub

```bash
cd gymbro-app
git init
git add .
git commit -m "gymbro app"
gh repo create gymbro-app --private --source=. --push
# o subilo a mano desde github.com/new si no tenés gh cli
```

## 3. Desplegar en Vercel

1. En [vercel.com/new](https://vercel.com/new), importá el repo `gymbro-app`.
2. Antes de darle "Deploy", andá a **Storage** → **Create Database** →
   **Upstash** → **Redis**. Conectala al proyecto: esto crea solo las
   variables `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`.
3. En **Settings → Environment Variables** agregá:
   - `TELEGRAM_BOT_TOKEN` — el token nuevo que generaste en BotFather
   - `CRON_SECRET` — cualquier string random largo (ej. generalo con
     `openssl rand -hex 24`)
   - `TELEGRAM_WEBHOOK_SECRET` — otro string random distinto
4. Dale **Deploy**.

## 4. Conectar el webhook de Telegram

Ya con la app desplegada (te va a dar una URL tipo
`https://gymbro-app.vercel.app`), corré esto una sola vez desde tu compu
(reemplazando TOKEN y los secretos):

```bash
curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://TU-APP.vercel.app/api/telegram/webhook?secret=<TELEGRAM_WEBHOOK_SECRET>"
```

Después escribile `/start` a tu bot en Telegram. Eso guarda tu chat ID
automáticamente. También podés confirmarlo o pegarlo a mano en la pestaña
**Ajustes** de la app.

## 5. Los recordatorios

`vercel.json` ya trae 5 cron jobs (Vercel Hobby permite hasta 100 por
proyecto, uno por día cada uno):

| Hora Honduras | Qué hace |
|---|---|
| 8:00 pm | Recordatorio de colágeno/proteína + snack sugerido |
| 10:00 pm | Aviso si no has entrenado |
| 10:30 pm | Insiste |
| 11:00 pm | Se pone urgente |
| 11:30 pm | Última llamada antes de perder la racha |

Nota real de Vercel: en el plan gratis, un cron programado para una hora
puede disparar en cualquier momento dentro de esa hora (no al minuto exacto).
Para esto no importa — son avisos, no cirugía.

Si en algún momento ya no querés que te moleste tan seguido, editá
`vercel.json` y quitá las etapas que no necesitás, luego hacé commit + push
(Vercel redespliega solo).

## 6. Desarrollo local

```bash
npm install
npm run dev
```

No necesitás Upstash para esto. Si no hay credenciales configuradas, la app
guarda tu progreso sola en `.data/state.local.json` (ya está en
`.gitignore`, no se sube a GitHub). Vas a ver un aviso amarillo en la
terminal avisándote de esto — es normal, no es un error. Cuando conectes
Upstash (paso 3), ese aviso desaparece y ahí sí tu progreso queda guardado
de verdad, accesible desde cualquier dispositivo.

Si querés simular las variables de producción en local (por ejemplo para
probar el bot), copiá `.env.example` a `.env.local` y llenalo.

### Si la pantalla se queda en "Cargando tu progreso…"

Eso pasaba en una versión anterior cuando `/api/state` fallaba sin avisar.
Ya está arreglado: ahora, si algo falla, la app te muestra el error real en
pantalla con un botón de "Reintentar" en vez de quedarse muda. Si lo ves,
revisá la terminal donde corre `npm run dev` — ahí va a estar la causa.

## Estructura

- `lib/exercises.ts` — catálogo de ejercicios armado con tu equipo real
  (2 bandas, mancuerna de 10 lb, mancuernas de 30 lb como meta a desbloquear,
  bicicleta). Sube de dificultad con tu nivel.
- `lib/gamification.ts` — XP, niveles, racha, y el tono del resumen semanal
  (orgulloso / neutral / decepcionado-pero-motivador).
- `lib/snacks.ts` — opciones nocturnas altas en agua/fibra + recordatorio de
  colágeno.
- `components/MuscleDiagram.tsx` — el diagrama corporal que se ilumina según
  el músculo que estás trabajando.
- `app/api/telegram/webhook` — procesa los comandos del bot (`/hoy`,
  `/entrene`, `/cai`, `/snack`, `/racha`).
- `app/api/cron/*` — lo que dispara Vercel Cron todos los días.

## Nota de salud

Mencionaste que estás desarrollando resistencia a la insulina — no está de
más comentarlo con un médico antes de arrancar fuerte, sobre todo para que te
confirme que el cardio en bici y el déficit calórico que busques sean
seguros para vos. La app te acompaña con la constancia, pero no reemplaza
ese chequeo.
