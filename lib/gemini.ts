import { ApiError, GoogleGenAI } from "@google/genai/node";
import type { Content } from "@google/genai/node";

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

export function getGeminiApiKey(): string | undefined {
  const google = process.env.GOOGLE_API_KEY?.trim();
  const gemini = process.env.GEMINI_API_KEY?.trim();
  if (google && gemini) return google;
  return google || gemini;
}

export function getGeminiModelName(): string {
  return process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";
}

export function toGeminiHistory(items: ChatHistoryItem[]): Content[] {
  return items.map((item) => ({
    role: item.role,
    parts: [{ text: item.content.trim() }],
  }));
}

/** Sends one message with prior turns; returns assistant text or throws ApiError. */
export async function askAstronomyGuide(
  message: string,
  history: ChatHistoryItem[] = [],
): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });
  const chat = ai.chats.create({
    model: getGeminiModelName(),
    config: { systemInstruction: ASTRONOMY_SYSTEM_PROMPT },
    history: toGeminiHistory(history),
  });

  const response = await chat.sendMessage({ message });
  const text = response.text?.trim();
  if (!text) {
    throw new Error("EMPTY_MODEL_RESPONSE");
  }
  return text;
}

export function formatGeminiError(err: unknown): {
  status: number;
  error: string;
  detail?: string;
} {
  if (err instanceof ApiError) {
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
            : "The AI service returned an error. Check your key, model name, and quota.",
      detail: process.env.NODE_ENV === "development" ? err.message : undefined,
    };
  }
  if (err instanceof Error && err.message === "MISSING_API_KEY") {
    return {
      status: 503,
      error:
        "Server is not configured with an API key. Set GEMINI_API_KEY or GOOGLE_API_KEY in .env.local and restart the dev server.",
    };
  }
  if (err instanceof Error && err.message === "EMPTY_MODEL_RESPONSE") {
    return {
      status: 502,
      error: "The model returned an empty response. Try again.",
    };
  }
  const messageText =
    err instanceof Error ? err.message : "Unknown error calling Gemini.";
  return {
    status: 502,
    error:
      "Could not reach the AI service. Check your API key, model name, and network.",
    detail: process.env.NODE_ENV === "development" ? messageText : undefined,
  };
}
