"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CHAT_SUGGESTIONS } from "./constants";
import type { ChatMessage } from "./types";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Builds alternating user/model history for the Gemini API (excludes latest user message). */
function historyForApi(messages: ChatMessage[]): {
  role: "user" | "model";
  content: string;
}[] {
  const pairs: { role: "user" | "model"; content: string }[] = [];
  for (let i = 0; i < messages.length - 1; i++) {
    const m = messages[i];
    if (!m) continue;
    if (m.role === "user") {
      pairs.push({ role: "user", content: m.content });
    } else {
      pairs.push({ role: "model", content: m.content });
    }
  }
  return pairs;
}

/** Futuristic glass-style astronomy assistant powered by Gemini (via /api/chat). */
export default function AstronomyChat() {
  const formId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || loading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: newId(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyForApi([...messages, userMsg]),
        }),
      });

      const data: unknown = await res.json().catch(() => ({}));
      const reply =
        typeof data === "object" &&
        data !== null &&
        "reply" in data &&
        typeof (data as { reply: unknown }).reply === "string"
          ? (data as { reply: string }).reply
          : null;
      const errMsg =
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : null;

      if (!res.ok || !reply) {
        setError(errMsg || "Something went wrong. Please try again.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: newId(), role: "assistant", content: reply },
      ]);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <section
      className="mt-12 w-full max-w-5xl opacity-0-start animate-fade-in-up delay-600"
      aria-labelledby={`${formId}-heading`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-4 shadow-[0_0_80px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-6">
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-400/15 via-transparent to-violet-400/15" />

        <div className="relative">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] text-cyan-300/80 uppercase">
                AI assistant
              </p>
              <h2
                id={`${formId}-heading`}
                className="mt-1 text-xl font-semibold text-white sm:text-2xl"
              >
                Astronomy chat
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Ask anything about space, planets, stars, or exploration. Answers
                come from Google Gemini—your API key stays on the server.
              </p>
            </div>
            <div
              className="mt-3 hidden h-10 w-10 shrink-0 rounded-2xl border border-cyan-400/20 bg-black/30 sm:block"
              aria-hidden
            >
              <div className="m-2 h-6 w-6 animate-pulse rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 opacity-80" />
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-rose-400/30 bg-rose-950/40 px-4 py-3 text-sm text-rose-100"
            >
              {error}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {CHAT_SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                disabled={loading}
                onClick={() => void sendMessage(s)}
                className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-left text-xs text-slate-200 transition hover:border-cyan-400/40 hover:bg-black/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
              >
                {s}
              </button>
            ))}
          </div>

          <div
            ref={listRef}
            className="mt-4 flex max-h-[min(52vh,420px)] min-h-[200px] flex-col gap-3 overflow-y-auto rounded-2xl border border-white/5 bg-black/25 p-3 sm:p-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.length === 0 && !loading && (
              <p className="m-auto max-w-sm text-center text-sm text-slate-500">
                Try a suggestion above or type your own astronomy question.
              </p>
            )}

            {messages.map((m) =>
              m.role === "user" ? (
                <div
                  key={m.id}
                  className="flex justify-end"
                >
                  <div className="max-w-[min(100%,520px)] rounded-2xl rounded-br-md border border-cyan-400/25 bg-gradient-to-br from-cyan-500/20 to-sky-600/10 px-4 py-3 text-sm text-slate-100 shadow-inner">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div
                  key={m.id}
                  className="flex justify-start"
                >
                  <div className="max-w-[min(100%,560px)] rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-slate-200">
                    <span className="mb-1 block text-[10px] font-semibold tracking-widest text-violet-300/90 uppercase">
                      Cosmic Guide
                    </span>
                    {m.content}
                  </div>
                </div>
              ),
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3 rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3">
                  <span className="sr-only">Assistant is typing</span>
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
                  </div>
                  <span className="text-xs text-slate-400">Thinking…</span>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <label className="sr-only" htmlFor={`${formId}-input`}>
              Your astronomy question
            </label>
            <textarea
              id={`${formId}-input`}
              rows={2}
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void sendMessage(input);
                }
              }}
              placeholder="e.g. What causes the northern lights?"
              className="min-h-[44px] flex-1 resize-y rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Sending…" : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
