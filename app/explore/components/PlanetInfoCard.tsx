import type { PlanetData } from "../data/planets";

type PlanetInfoCardProps = {
  planet: PlanetData;
  onClose: () => void;
};

/** Futuristic glassmorphism panel shown when a planet is clicked. */
export default function PlanetInfoCard({ planet, onClose }: PlanetInfoCardProps) {
  return (
    <div
      className="absolute bottom-4 left-4 right-4 z-20 mx-auto w-[min(520px,calc(100%-2rem))] animate-hud-card-in rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:bottom-auto sm:left-auto sm:right-6 sm:top-6 sm:p-5"
      role="dialog"
      aria-label={`${planet.name} information`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-400/20 via-sky-400/10 to-indigo-400/20" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:radial-gradient(160px_160px_at_85%_0%,black,transparent)] bg-white/10" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.32em] text-cyan-300/80 uppercase">
            Planet dossier
          </p>
          <h3 className="mt-1 truncate text-xl font-semibold text-white sm:text-2xl">
            {planet.name}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-sm text-slate-200/80 transition hover:border-white/25 hover:bg-black/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
          aria-label="Close planet info"
        >
          <span aria-hidden>✕</span>
        </button>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-[11px] tracking-widest text-slate-400 uppercase">Size</p>
          <p className="mt-1 text-sm font-medium text-white">{planet.sizeLabel}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-[11px] tracking-widest text-slate-400 uppercase">
            Avg temperature
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            {planet.averageTemperature}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-[11px] tracking-widest text-slate-400 uppercase">Moons</p>
          <p className="mt-1 text-sm font-medium text-white">{planet.moons}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-[11px] tracking-widest text-slate-400 uppercase">
            Distance
          </p>
          <p className="mt-1 text-sm font-medium text-white">{planet.distanceFromSun}</p>
        </div>
      </div>

      <div className="relative mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
        <p className="text-[11px] tracking-widest text-slate-400 uppercase">Fun fact</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-200">{planet.funFact}</p>
      </div>

      <p className="relative mt-3 text-xs leading-relaxed text-slate-400">
        {planet.description}
      </p>
    </div>
  );
}
