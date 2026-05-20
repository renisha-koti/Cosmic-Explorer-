"use client";

import { DoubleSide } from "three";

/** Faint circular path showing a planet's orbit. */
export default function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
      <ringGeometry args={[radius - 0.015, radius + 0.015, 96]} />
      <meshBasicMaterial
        color="#6b7cff"
        transparent
        opacity={0.12}
        side={DoubleSide}
      />
    </mesh>
  );
}
