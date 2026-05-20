/** Astronomy system prompt — keeps Cosmic Guide focused on space topics. */
export const ASTRONOMY_SYSTEM_PROMPT = `You are Cosmic Guide, a friendly expert on astronomy and space science.
Rules:
- Only answer questions about astronomy, space, planets, stars, cosmology, space exploration, and closely related science.
- If the user asks about something unrelated, politely refuse and suggest an astronomy topic instead.
- Keep answers clear and accurate; use short paragraphs or bullet points when helpful.
- Do not claim to have real-time telescope data or classified information.`;

export type ChatHistoryItem = {
  role: "user" | "model";
  content: string;
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
export const GROQ_MODEL = "llama-3.1-8b-instant";

export class GroqApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "GroqApiError";
    this.status = status;
  }
}

export function getGroqApiKey(): string | undefined {
  return process.env.GROQ_API_KEY?.trim();
}

/** Converts client history (user/model) into Groq chat messages (user/assistant). */
function buildMessages(
  history: ChatHistoryItem[],
  userMessage: string,
): { role: "system" | "user" | "assistant"; content: string }[] {
  const messages: { role: "system" | "user" | "assistant"; content: string }[] =
    [{ role: "system", content: ASTRONOMY_SYSTEM_PROMPT }];

  for (const item of history) {
    messages.push({
      role: item.role === "model" ? "assistant" : "user",
      content: item.content,
    });
  }

  messages.push({ role: "user", content: userMessage });
  return messages;
}

/** Sends one message with prior turns via Groq; returns assistant text. */
export async function askAstronomyGuide(
  message: string,
  history: ChatHistoryItem[] = [],
): Promise<string> {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: buildMessages(history, message),
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  const data: unknown = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errMessage =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: { message?: string } }).error === "object" &&
      (data as { error: { message?: string } }).error?.message
        ? (data as { error: { message: string } }).error.message
        : response.statusText || "Groq API error";
    throw new GroqApiError(response.status, errMessage);
  }

  const text =
    typeof data === "object" &&
    data !== null &&
    "choices" in data &&
    Array.isArray((data as { choices: unknown }).choices) &&
    (data as { choices: { message?: { content?: string } }[] }).choices[0]
      ?.message?.content;

  const reply = typeof text === "string" ? text.trim() : "";
  if (!reply) {
    throw new Error("EMPTY_MODEL_RESPONSE");
  }

  return reply;
}

export function formatGroqError(err: unknown): {
  status: number;
  error: string;
  detail?: string;
} {
  if (err instanceof GroqApiError) {
    const status =
      err.status === 401 || err.status === 403
        ? 401
        : err.status === 429
          ? 429
          : err.status >= 400 && err.status < 500
            ? err.status
            : 502;
    return {
      status,
      error:
        status === 429
          ? "Too many requests. Wait a moment and try again."
          : status === 401
            ? "Invalid or unauthorized API key."
            : "The AI service returned an error. Check your Groq key and quota.",
      detail: process.env.NODE_ENV === "development" ? err.message : undefined,
    };
  }
  if (err instanceof Error && err.message === "MISSING_API_KEY") {
    return {
      status: 503,
      error:
        "Server is not configured with GROQ_API_KEY. Add it to .env.local and restart the dev server.",
    };
  }
  if (err instanceof Error && err.message === "EMPTY_MODEL_RESPONSE") {
    return {
      status: 502,
      error: "The model returned an empty response. Try again.",
    };
  }
  const messageText =
    err instanceof Error ? err.message : "Unknown error calling Groq.";
  return {
    status: 502,
    error:
      "Could not reach the AI service. Check your API key, model name, and network.",
    detail: process.env.NODE_ENV === "development" ? messageText : undefined,
  };
}
