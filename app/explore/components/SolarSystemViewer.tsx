"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
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

  return (
    <section
      className="relative mt-8 w-full max-w-5xl opacity-0-start animate-fade-in-up delay-400"
      aria-label="Interactive 3D solar system"
    >
      <div className="relative h-[min(70vh,560px)] w-full overflow-hidden rounded-2xl border border-cyan-400/25 bg-black/50 shadow-[0_0_60px_rgba(59,130,246,0.12)]">
        <Canvas
          camera={{ position: [0, 14, 24], fov: 45, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <SolarSystemScene
              onPlanetSelect={(planet, worldPosition) => {
                // Zoom first, then open the info card when focus completes.
                setSelectedPlanet(null);
                setFocusRequest({
                  id: Date.now(),
                  planet,
                  worldPosition,
                });
              }}
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
          // Transparent overlay: prevents clicks from falling through to the canvas.
          <div
            className="absolute inset-0 z-20"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <PlanetInfoCard
              planet={selectedPlanet}
              onClose={() => {
                setSelectedPlanet(null);
                setFocusRequest(null);
              }}
            />
          </div>
        )}

        <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-slate-500">
          Drag to orbit · Scroll to zoom · Click a planet for details
        </p>
      </div>
    </section>
  );
}
