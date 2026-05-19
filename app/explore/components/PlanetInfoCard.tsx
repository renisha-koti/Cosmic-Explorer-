import type { PlanetData } from "../data/planets";

type PlanetInfoCardProps = {
  planet: PlanetData;
  onClose: () => void;
};

/** Tailwind info panel shown when a planet is clicked. */
export default function PlanetInfoCard({ planet, onClose }: PlanetInfoCardProps) {
  return (
    <div
      className="absolute left-4 right-4 top-4 z-20 mx-auto max-w-sm rounded-xl border border-cyan-400/30 bg-[#0a0520]/90 p-4 shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-md sm:left-auto sm:right-4 sm:top-4"
      role="dialog"
      aria-label={`${planet.name} information`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-widest text-cyan-400/80 uppercase">
            Planet
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">{planet.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-400 transition-colors hover:border-white/30 hover:text-white"
          aria-label="Close planet info"
        >
          ✕
        </button>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-300">
        {planet.description}
      </p>

      <p className="mt-3 text-xs text-slate-500">
        <span className="text-slate-400">Distance from Sun:</span>{" "}
        <span className="text-cyan-200/90">{planet.distanceFromSun}</span>
      </p>
    </div>
  );
}
