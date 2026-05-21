import type { PlanetData } from "../data/planets";

type PlanetInfoCardProps = {
  planet: PlanetData;
  onClose: () => void;
};

/** Futuristic glassmorphism panel shown when a planet is clicked. */
export default function PlanetInfoCard({ planet, onClose }: PlanetInfoCardProps) {
  return (
    <div
      className="pointer-events-auto absolute bottom-4 left-4 right-4 z-20 mx-auto w-[min(540px,calc(100%-2rem))] animate-hud-card-in rounded-[1.5rem] border border-cyan-100/15 bg-slate-950/55 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.55),0_0_50px_rgba(34,211,238,0.12)] backdrop-blur-2xl sm:bottom-auto sm:left-auto sm:right-6 sm:top-6 sm:p-5"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-label={`${planet.name} information`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-[1.5rem] bg-gradient-to-r from-cyan-300/20 via-white/5 to-violet-300/20" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] [mask-image:radial-gradient(190px_190px_at_85%_0%,black,transparent)] bg-white/10" />

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
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-sm text-slate-200/80 shadow-inner shadow-white/5 transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
          aria-label="Close planet info"
        >
          <span aria-hidden>✕</span>
        </button>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-inner shadow-white/5">
          <p className="text-[11px] tracking-widest text-slate-400 uppercase">Size</p>
          <p className="mt-1 text-sm font-medium text-white">{planet.sizeLabel}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-inner shadow-white/5">
          <p className="text-[11px] tracking-widest text-slate-400 uppercase">
            Avg temperature
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            {planet.averageTemperature}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-inner shadow-white/5">
          <p className="text-[11px] tracking-widest text-slate-400 uppercase">Moons</p>
          <p className="mt-1 text-sm font-medium text-white">{planet.moons}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-inner shadow-white/5">
          <p className="text-[11px] tracking-widest text-slate-400 uppercase">
            Distance
          </p>
          <p className="mt-1 text-sm font-medium text-white">{planet.distanceFromSun}</p>
        </div>
      </div>

      <div className="relative mt-4 rounded-2xl border border-cyan-200/10 bg-cyan-300/[0.055] p-3 shadow-inner shadow-white/5">
        <p className="text-[11px] tracking-widest text-slate-400 uppercase">Fun fact</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-200">{planet.funFact}</p>
      </div>

      <p className="relative mt-3 text-xs leading-relaxed text-slate-400">
        {planet.description}
      </p>
    </div>
  );
}
