"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

/** Central Sun with emissive glow and warm light. */
export default function Sun() {
  const coreRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.2) * 0.03;
    if (coreRef.current) coreRef.current.scale.setScalar(pulse);
    if (glowRef.current) glowRef.current.scale.setScalar(pulse * 1.35);
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial color="#ffaa33" transparent opacity={0.12} />
      </mesh>

      <mesh ref={coreRef}>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshStandardMaterial
          color="#ffcc44"
          emissive="#ff9900"
          emissiveIntensity={1.8}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      <pointLight intensity={28} distance={80} color="#ffcc66" decay={2} />
      <pointLight intensity={8} distance={40} color="#ff8833" decay={2} />
    </group>
  );
}
