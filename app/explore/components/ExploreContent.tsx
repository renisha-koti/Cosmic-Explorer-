"use client";

import AstronomyChat from "./chat/AstronomyChat";
import ExploreAbout from "./ExploreAbout";
import ExploreNav from "./nav/ExploreNav";
import AstronomyQuiz from "./quiz/AstronomyQuiz";
import SolarSystemViewer from "./SolarSystemViewer";

/** Client-side explore layout (3D canvas must not run on the server). */
export default function ExploreContent() {
  return (
    <>
      <ExploreNav />

      <main className="flex min-h-screen flex-col px-4 pb-12 pt-[4.25rem] sm:px-10 sm:pt-20">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center py-6 sm:py-10">
          <header className="text-center">
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
          </header>

          <section
            id="solar-system"
            className="scroll-mt-28 w-full"
            aria-label="Solar System"
          >
            <SolarSystemViewer />
          </section>

          <section
            id="ai-assistant"
            className="scroll-mt-28 w-full"
            aria-label="AI Assistant"
          >
            <AstronomyChat />
          </section>

          <section
            id="quiz"
            className="scroll-mt-28 w-full"
            aria-label="Quiz"
          >
            <AstronomyQuiz />
          </section>

          <ExploreAbout />
        </div>
      </main>
    </>
  );
}
