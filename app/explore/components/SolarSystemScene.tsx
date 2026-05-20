"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { PLANETS, type PlanetData } from "../data/planets";
import Planet from "./Planet";
import Sun from "./Sun";

type SolarSystemSceneProps = {
  onPlanetSelect: (planet: PlanetData) => void;
  selectedPlanetId?: string | null;
};

/** All 3D objects inside the Canvas. */
export default function SolarSystemScene({
  onPlanetSelect,
  selectedPlanetId,
}: SolarSystemSceneProps) {
  return (
    <>
      <color attach="background" args={["#020010"]} />

      <ambientLight intensity={0.12} />
      <directionalLight position={[8, 12, 6]} intensity={0.35} color="#8899ff" />

      <Stars
        radius={120}
        depth={60}
        count={5000}
        factor={3}
        saturation={0}
        fade
        speed={0.4}
      />

      <Sun />

      {PLANETS.map((planet) => (
        <Planet
          key={planet.id}
          data={planet}
          onSelect={onPlanetSelect}
          isSelected={selectedPlanetId === planet.id}
        />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={45}
        maxPolarAngle={Math.PI / 2 + 0.35}
        minPolarAngle={0.2}
        rotateSpeed={0.4}
        zoomSpeed={0.6}
      />
    </>
  );
}
