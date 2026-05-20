import { NextResponse } from "next/server";
import {
  askAstronomyGuide,
  formatGroqError,
  type ChatHistoryItem,
} from "@/lib/groq";

export const runtime = "nodejs";

export async function POST(request: Request) {
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

  try {
    const reply = await askAstronomyGuide(message, history);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[api/chat]", err);
    const { status, error, detail } = formatGroqError(err);
    return NextResponse.json({ error, detail }, { status });
  }
}
