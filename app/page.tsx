import StarCanvas from "./components/StarCanvas";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#030014]">
      {/* Star particle canvas (client-only) */}
      <StarCanvas />

      {/* Deep space gradient base */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030014] via-[#0a0520] to-[#020010]" />

      {/* Animated nebula layers */}
      <div
        className="pointer-events-none absolute -left-1/4 top-1/4 z-[2] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.35)_0%,transparent_70%)] blur-3xl animate-nebula-drift"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 z-[2] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,0.4)_0%,transparent_70%)] blur-3xl animate-nebula-drift nebula-delay"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-[2] h-[50vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(67,56,202,0.2)_0%,transparent_70%)] blur-3xl animate-nebula-pulse"
        aria-hidden="true"
      />

      {/* Subtle grid — NASA mission-control feel */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[length:80px_80px]"
        aria-hidden="true"
      />

      {/* Planet + orbit decoration (top-right) */}
      <div
        className="pointer-events-none absolute right-8 top-8 z-10 opacity-0-start animate-fade-in delay-800 sm:right-16 sm:top-16"
        aria-hidden="true"
      >
        <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-orbit-spin">
            <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300/80 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
          </div>

          <div className="absolute inset-4 rounded-full border border-dashed border-white/5 animate-orbit-spin orbit-reverse">
            <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-300/70 shadow-[0_0_8px_rgba(196,181,253,0.7)]" />
          </div>

          <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-violet-700 animate-planet-glow sm:h-16 sm:w-16">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent" />
            <div className="absolute -right-1 top-3 h-3 w-5 rounded-full bg-indigo-900/40 blur-[1px]" />
          </div>
        </div>
      </div>

      {/* Secondary small planet (bottom-left) */}
      <div
        className="pointer-events-none absolute bottom-20 left-8 z-10 opacity-0-start animate-fade-in delay-600 sm:bottom-28 sm:left-16"
        aria-hidden="true"
      >
        <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-amber-200/80 via-orange-400/60 to-red-900/80 shadow-[0_0_24px_rgba(251,191,36,0.35)] sm:h-12 sm:w-12">
          <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        </div>
      </div>

      {/* Main content */}
      <section className="relative z-20 flex max-w-4xl flex-col items-center px-6 text-center">
        <div className="mb-6 opacity-0-start animate-fade-in-up delay-200">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-blue-200/90 uppercase backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            AI-Powered Space Learning
          </span>
        </div>

        <h1 className="opacity-0-start animate-fade-in-up delay-400 text-4xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl animate-title-glow">
          <span className="bg-gradient-to-b from-white via-blue-100 to-blue-300/80 bg-clip-text text-transparent">
            Cosmic Explorer
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            AI
          </span>
        </h1>

        <p className="opacity-0-start animate-fade-in-up delay-600 mt-6 max-w-xl text-base leading-relaxed font-light text-slate-300/90 sm:text-lg md:max-w-2xl md:text-xl">
          Explore planets, stars, and the universe with AI-powered interactive
          learning.
        </p>

        <div className="opacity-0-start animate-fade-in-up delay-800 mt-10 sm:mt-12">
          <button
            type="button"
            className="group relative overflow-hidden rounded-full px-10 py-4 text-sm font-medium tracking-wide text-white transition-all duration-300 sm:px-12 sm:py-4 sm:text-base"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 transition-all duration-300 group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-violet-500" />
            <span className="absolute inset-0 rounded-full opacity-0 blur-xl bg-cyan-400 transition-opacity duration-300 group-hover:opacity-60" />
            <span className="absolute inset-px rounded-full bg-[#0a0520]/80 backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#0f0830]/60" />
            <span className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative flex items-center gap-2">
              Start Exploring
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>

            <span className="absolute -inset-1 -z-10 rounded-full bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-violet-500/40 opacity-70 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg group-hover:scale-105" />
          </button>
        </div>

        <p className="opacity-0-start animate-fade-in delay-800 mt-16 text-xs tracking-widest text-slate-500 uppercase">
          Mission-ready · Interactive · Infinite discovery
        </p>
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t from-[#020010] to-transparent" />
    </main>
  );
}
