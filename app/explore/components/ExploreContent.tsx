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

      <main className="flex min-h-screen flex-col px-4 pb-12 pt-[4.25rem] sm:px-10 sm:pt-20">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center py-6 sm:py-10">
          <ScrollReveal as="header" className="text-center" delay={0}>
            <p className="text-[11px] font-semibold tracking-[0.32em] text-cyan-400/80 uppercase">
              Deep space interface
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl animate-title-glow">
              <span className="bg-gradient-to-b from-white via-blue-100 to-blue-300/80 bg-clip-text text-transparent">
                Solar System Explorer
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-400 sm:text-base">
              Drag to look around, scroll to zoom, and click any planet to learn
              more. Use the mission nav above to jump between sections.
            </p>
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
