"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import type { PlanetData } from "../data/planets";
import PlanetInfoCard from "./PlanetInfoCard";
import SolarSystemScene from "./SolarSystemScene";
import { Vector3 } from "three";

/** Client wrapper: 3D canvas + planet info overlay. */
export default function SolarSystemViewer() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [focusRequest, setFocusRequest] = useState<{
    id: number;
    planet: PlanetData;
    worldPosition: Vector3;
  } | null>(null);
  const [resetCameraRequest, setResetCameraRequest] = useState<number | null>(
    null,
  );
  /** Ignores stale focus callbacks if the user closed the card early. */
  const focusSessionRef = useRef(0);

  const handleCloseCard = () => {
    focusSessionRef.current += 1;
    setSelectedPlanet(null);
    setFocusRequest(null);
    setResetCameraRequest(Date.now());
  };

  return (
    <div
      className="relative mt-10 w-full max-w-6xl"
      aria-label="Interactive 3D solar system"
    >
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_46%),radial-gradient(circle_at_80%_80%,rgba(124,58,237,0.13),transparent_38%)] blur-2xl" />
      <div className="relative h-[min(72vh,620px)] w-full overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-black/60 shadow-[0_30px_120px_rgba(2,6,23,0.72),0_0_80px_rgba(34,211,238,0.1)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_14%,transparent_76%,rgba(34,211,238,0.05)),radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.12),transparent_28rem)]" />
        <Canvas
          camera={{ position: [0, 14, 24], fov: 45, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <SolarSystemScene
              onPlanetSelect={(planet, worldPosition) => {
                const sessionId = Date.now();
                focusSessionRef.current = sessionId;
                setSelectedPlanet(null);
                setResetCameraRequest(null);
                setFocusRequest({
                  id: sessionId,
                  planet,
                  worldPosition,
                });
              }}
              resetCameraRequest={resetCameraRequest}
              selectedPlanetId={selectedPlanet?.id ?? null}
              focusRequest={
                focusRequest
                  ? {
                      id: focusRequest.id,
                      planetId: focusRequest.planet.id,
                      worldPosition: focusRequest.worldPosition,
                    }
                  : null
              }
              onFocusComplete={(requestId) => {
                if (focusSessionRef.current !== requestId) return;
                setFocusRequest((current) => {
                  if (!current || current.id !== requestId) return current;
                  setSelectedPlanet(current.planet);
                  return null;
                });
              }}
            />
          </Suspense>
        </Canvas>

        {selectedPlanet && (
          <div className="pointer-events-none absolute inset-0 z-20">
            <PlanetInfoCard
              planet={selectedPlanet}
              onClose={handleCloseCard}
            />
          </div>
        )}

        <p className="pointer-events-none absolute bottom-4 left-1/2 z-20 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-center text-xs text-slate-300/80 shadow-[0_0_30px_rgba(15,23,42,0.5)] backdrop-blur-md">
          Drag to orbit · Scroll to zoom · Click a planet for details
        </p>
      </div>
    </div>
  );
}
