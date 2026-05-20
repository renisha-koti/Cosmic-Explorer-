import { ApiError, GoogleGenAI } from "@google/genai/node";
import type { Content } from "@google/genai/node";
import { NextResponse } from "next/server";

/** Node runtime: @google/genai uses Node APIs (e.g. WebSocket, fs) — not Edge-compatible. */
export const runtime = "nodejs";

const ASTRONOMY_SYSTEM = `You are Cosmic Guide, a friendly expert on astronomy and space science.
Rules:
- Only answer questions about astronomy, space, planets, stars, cosmology, space exploration, and closely related science.
- If the user asks about something unrelated, politely refuse and suggest an astronomy topic instead.
- Keep answers clear and accurate; use short paragraphs or bullet points when helpful.
- Do not claim to have real-time telescope data or classified information.`;

type ChatHistoryItem = {
  role: "user" | "model";
  content: string;
};

function toGeminiHistory(items: ChatHistoryItem[]): Content[] {
  return items.map((item) => ({
    role: item.role,
    parts: [{ text: item.content.trim() }],
  }));
}

function getApiKey(): string | undefined {
  const google = process.env.GOOGLE_API_KEY?.trim();
  const gemini = process.env.GEMINI_API_KEY?.trim();
  if (google && gemini) {
    // Matches @google/genai precedence: explicit GOOGLE_API_KEY wins when both set.
    return google;
  }
  return google || gemini;
}

export async function POST(request: Request) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Server is not configured with an API key. Set GEMINI_API_KEY or GOOGLE_API_KEY in .env.local and restart the dev server.",
      },
      { status: 503 },
    );
  }

  let body: { message?: string; history?: ChatHistoryItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json(
      { error: "Message cannot be empty." },
      { status: 400 },
    );
  }

  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const history: ChatHistoryItem[] = rawHistory
    .filter(
      (h): h is ChatHistoryItem =>
        h != null &&
        (h.role === "user" || h.role === "model") &&
        typeof h.content === "string" &&
        h.content.trim().length > 0,
    )
    .map((h) => ({
      role: h.role,
      content: h.content.trim(),
    }));

  const modelName =
    process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";

  try {
    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: modelName,
      config: {
        systemInstruction: ASTRONOMY_SYSTEM,
      },
      history: toGeminiHistory(history),
    });

    const response = await chat.sendMessage({ message });
    const text = response.text?.trim();

    if (!text) {
      return NextResponse.json(
        { error: "The model returned an empty response. Try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply: text });
  } catch (err) {
    if (err instanceof ApiError) {
      console.error("[api/chat] ApiError", err.status, err.message);
      const status =
        err.status === 401 || err.status === 403
          ? 401
          : err.status === 429
            ? 429
            : err.status >= 400 && err.status < 500
              ? err.status
              : 502;
      return NextResponse.json(
        {
          error:
            status === 429
              ? "Too many requests. Wait a moment and try again."
              : status === 401
                ? "Invalid or unauthorized API key."
                : "The AI service returned an error. Check your key, model name, and quota.",
          detail:
            process.env.NODE_ENV === "development" ? err.message : undefined,
        },
        { status },
      );
    }

    const messageText =
      err instanceof Error ? err.message : "Unknown error calling Gemini.";
    console.error("[api/chat]", err);
    return NextResponse.json(
      {
        error:
          "Could not reach the AI service. Check your API key, model name, and network.",
        detail: process.env.NODE_ENV === "development" ? messageText : undefined,
      },
      { status: 502 },
    );
  }
}
