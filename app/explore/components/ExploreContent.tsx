"use client";

import AstronomyChat from "./chat/AstronomyChat";
import ExploreAbout from "./ExploreAbout";
import ScrollReveal, { ScrollRevealProvider } from "./motion/ScrollReveal";
import ExploreNav from "./nav/ExploreNav";
import AstronomyQuiz from "./quiz/AstronomyQuiz";
import SolarSystemViewer from "./SolarSystemViewer";

/** Client-side explore layout (3D canvas must not run on the server). */
export default function ExploreContent() {
  return (
    <ScrollRevealProvider>
      <ExploreNav />

      <main className="flex min-h-screen flex-col px-4 pb-16 pt-[5.5rem] sm:px-8 sm:pt-24 lg:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center py-8 sm:py-12">
          <ScrollReveal
            as="header"
            className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] px-5 py-10 text-center shadow-[0_28px_120px_rgba(15,23,42,0.55)] backdrop-blur-2xl sm:px-10 sm:py-14"
            delay={0}
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
            <div className="pointer-events-none absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
            <p className="relative text-[11px] font-semibold tracking-[0.32em] text-cyan-200/85 uppercase">
              Deep space interface
            </p>
            <h1 className="relative mt-3 text-4xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl animate-title-glow">
              <span className="bg-gradient-to-b from-white via-blue-100 to-blue-300/80 bg-clip-text text-transparent">
                Solar System Explorer
              </span>
            </h1>
            <p className="relative mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Drag to look around, scroll to zoom, and click any planet to learn
              more. Use the mission nav above to jump between sections.
            </p>
            <div className="relative mx-auto mt-7 grid max-w-2xl grid-cols-3 gap-2 text-left sm:gap-3">
              {["3D Orbit", "AI Guide", "Mission Quiz"].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-center shadow-inner shadow-white/5 backdrop-blur"
                >
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-cyan-200/80 uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal
            id="solar-system"
            className="scroll-mt-28 w-full"
            aria-label="Solar System"
            delay={0.08}
          >
            <SolarSystemViewer />
          </ScrollReveal>

          <ScrollReveal
            id="ai-assistant"
            className="scroll-mt-28 w-full"
            aria-label="AI Assistant"
            delay={0.1}
          >
            <AstronomyChat />
          </ScrollReveal>

          <ScrollReveal
            id="quiz"
            className="scroll-mt-28 w-full"
            aria-label="Quiz"
            delay={0.12}
          >
            <AstronomyQuiz />
          </ScrollReveal>

          <ScrollReveal
            id="about"
            className="scroll-mt-28 w-full"
            aria-label="About"
            delay={0.14}
          >
            <ExploreAbout />
          </ScrollReveal>
        </div>
      </main>
    </ScrollRevealProvider>
  );
}
