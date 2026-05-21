/** About section — mission overview for the explore experience. */
export default function ExploreAbout() {
  return (
    <div className="relative mt-14 w-full max-w-6xl" aria-labelledby="about-heading">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo-500/12 via-transparent to-cyan-500/12 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50 p-6 shadow-[0_30px_120px_rgba(2,6,23,0.58),0_0_80px_rgba(59,130,246,0.08)] backdrop-blur-2xl sm:p-8">
        <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-r from-indigo-300/18 via-white/[0.035] to-cyan-300/18" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-100/65 to-transparent" />

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

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Cosmic Explorer is an interactive learning experience inspired by
            NASA mission control — explore a 3D solar system, ask an AI astronomy
            guide powered by Groq AI, and test your knowledge with a
            space-themed quiz.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-inner shadow-white/5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-300/[0.07]">
              <p className="text-[10px] font-semibold tracking-widest text-cyan-400/90 uppercase">
                Explore
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Orbit, zoom, and click planets for detailed dossiers.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-inner shadow-white/5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-300/[0.07]">
              <p className="text-[10px] font-semibold tracking-widest text-cyan-400/90 uppercase">
                Learn
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Chat with Cosmic Guide about stars, planets, and space science.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-inner shadow-white/5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-300/[0.07]">
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
    </div>
  );
}
