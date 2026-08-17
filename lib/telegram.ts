const TELEGRAM_API = "https://api.telegram.org";

function token(): string {
  const t = process.env.TELEGRAM_BOT_TOKEN;
  if (!t) throw new Error("Falta TELEGRAM_BOT_TOKEN en las variables de entorno");
  return t;
}

export async function sendTelegramMessage(
  chatId: string | number,
  text: string,
  extra: Record<string, unknown> = {}
) {
  const res = await fetch(`${TELEGRAM_API}/bot${token()}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      ...extra,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("Error enviando mensaje de Telegram:", res.status, body);
  }
  return res;
}

export async function setTelegramWebhook(url: string) {
  const res = await fetch(
    `${TELEGRAM_API}/bot${token()}/setWebhook?url=${encodeURIComponent(url)}`
  );
  return res.json();
}

// Tipos mínimos del payload que nos manda Telegram al webhook
export interface TelegramUpdate {
  message?: {
    chat: { id: number };
    text?: string;
    from?: { first_name?: string };
  };
}
