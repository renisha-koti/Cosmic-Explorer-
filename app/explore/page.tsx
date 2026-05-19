import type { Metadata } from "next";
import Link from "next/link";
import SpaceBackground from "../components/SpaceBackground";

export const metadata: Metadata = {
  title: "Solar System Explorer | Cosmic Explorer AI",
  description: "Explore the solar system with interactive 3D learning.",
};

export default function ExplorePage() {
  return (
    <SpaceBackground>
      <main className="flex min-h-screen flex-col px-6 py-8 sm:px-10">
        {/* Back to homepage */}
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

        {/* Page content */}
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center py-12">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl animate-title-glow">
            <span className="bg-gradient-to-b from-white via-blue-100 to-blue-300/80 bg-clip-text text-transparent">
              Solar System Explorer
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-center text-sm text-slate-400 sm:text-base">
            Interactive 3D tour coming soon. Planets, orbits, and missions will
            appear here.
          </p>

          {/* Placeholder for future 3D solar system */}
          <section
            className="mt-10 w-full max-w-3xl opacity-0-start animate-fade-in-up delay-400"
            aria-label="3D solar system placeholder"
          >
            <div className="relative flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-400/30 bg-white/[0.03] p-8 text-center backdrop-blur-sm sm:min-h-[400px]">
              {/* Corner accents */}
              <span className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-cyan-400/50" />
              <span className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-cyan-400/50" />
              <span className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-cyan-400/50" />
              <span className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-cyan-400/50" />

              {/* Icon */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-blue-500/20 to-violet-600/20">
                <svg
                  className="h-8 w-8 text-cyan-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path
                    strokeLinecap="round"
                    d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"
                  />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="9"
                    ry="4"
                    className="opacity-60"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-medium text-white sm:text-xl">
                3D Solar System
              </h2>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                This area is reserved for an interactive Three.js scene. You
                will be able to orbit planets and learn about each world.
              </p>

              <span className="mt-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-widest text-slate-500 uppercase">
                Coming soon
              </span>
            </div>
          </section>
        </div>
      </main>
    </SpaceBackground>
  );
}
