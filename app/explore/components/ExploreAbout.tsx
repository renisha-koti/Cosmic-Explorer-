/** About section — mission overview for the explore experience. */
export default function ExploreAbout() {
  return (
    <section
      id="about"
      className="scroll-mt-28 mt-12 w-full max-w-5xl opacity-0-start animate-fade-in-up delay-800"
      aria-labelledby="about-heading"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 shadow-[0_0_80px_rgba(59,130,246,0.08)] backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-indigo-400/15 via-transparent to-cyan-400/15" />

        <div className="relative">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-indigo-300/80 uppercase">
            Mission brief
          </p>
          <h2
            id="about-heading"
            className="mt-1 text-xl font-semibold text-white sm:text-2xl"
          >
            About Cosmic Explorer
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Cosmic Explorer is an interactive learning experience inspired by
            NASA mission control — explore a 3D solar system, ask an AI astronomy
            guide powered by Google Gemini, and test your knowledge with a
            space-themed quiz.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/25 p-4 transition-colors duration-300 hover:border-cyan-400/30 hover:bg-black/35">
              <p className="text-[10px] font-semibold tracking-widest text-cyan-400/90 uppercase">
                Explore
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Orbit, zoom, and click planets for detailed dossiers.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/25 p-4 transition-colors duration-300 hover:border-cyan-400/30 hover:bg-black/35">
              <p className="text-[10px] font-semibold tracking-widest text-cyan-400/90 uppercase">
                Learn
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Chat with Cosmic Guide about stars, planets, and space science.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/25 p-4 transition-colors duration-300 hover:border-cyan-400/30 hover:bg-black/35">
              <p className="text-[10px] font-semibold tracking-widest text-cyan-400/90 uppercase">
                Challenge
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Take the astronomy quiz and track your mission score.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
