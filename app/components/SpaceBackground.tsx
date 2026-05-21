import StarCanvas from "./StarCanvas";

/**
 * Shared dark space backdrop (stars, nebula, grid).
 * Wrap page content inside this component.
 */
export default function SpaceBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#01030a]">
      <StarCanvas />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_-12%,rgba(96,165,250,0.22),transparent_34rem),linear-gradient(180deg,rgba(2,6,23,0.2)_0%,rgba(3,0,20,0.84)_46%,rgba(0,4,12,0.96)_100%)]" />

      <div
        className="pointer-events-none absolute -left-1/4 top-1/4 z-[2] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.36)_0%,transparent_70%)] blur-3xl animate-nebula-drift"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 z-[2] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.28)_0%,transparent_70%)] blur-3xl animate-nebula-drift nebula-delay"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-[2] h-[50vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(67,56,202,0.2)_0%,transparent_70%)] blur-3xl animate-nebula-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[-10%] top-24 z-[2] h-72 w-[120vw] rotate-[-8deg] bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.12),rgba(129,140,248,0.12),transparent)] blur-2xl animate-aurora-sweep"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.055] bg-[linear-gradient(rgba(255,255,255,0.48)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.48)_1px,transparent_1px)] bg-[length:96px_96px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-40 bg-[linear-gradient(180deg,transparent,rgba(34,211,238,0.08),transparent)] opacity-60 animate-scanline-drift"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2)_0_1px,transparent_1px),radial-gradient(circle_at_78%_24%,rgba(125,211,252,0.22)_0_1px,transparent_1px),radial-gradient(circle_at_64%_76%,rgba(196,181,253,0.2)_0_1px,transparent_1px)] bg-[length:180px_180px,240px_240px,220px_220px] animate-star-shimmer"
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t from-[#00040c] to-transparent" />
    </div>
  );
}
