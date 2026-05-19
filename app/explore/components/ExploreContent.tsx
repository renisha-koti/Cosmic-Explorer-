"use client";

import Link from "next/link";
import SolarSystemViewer from "./SolarSystemViewer";

/** Client-side explore layout (3D canvas must not run on the server). */
export default function ExploreContent() {
  return (
    <main className="flex min-h-screen flex-col px-4 py-8 sm:px-10">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-md transition-colors hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center py-8 sm:py-10">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl animate-title-glow">
          <span className="bg-gradient-to-b from-white via-blue-100 to-blue-300/80 bg-clip-text text-transparent">
            Solar System Explorer
          </span>
        </h1>

        <p className="mt-4 max-w-xl text-center text-sm text-slate-400 sm:text-base">
          Drag to look around, scroll to zoom, and click any planet to learn
          more.
        </p>

        <SolarSystemViewer />
      </div>
    </main>
  );
}
