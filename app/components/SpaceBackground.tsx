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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030014]">
      <StarCanvas />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030014] via-[#0a0520] to-[#020010]" />

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

      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[length:80px_80px]"
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-t from-[#020010] to-transparent" />
    </div>
  );
}
