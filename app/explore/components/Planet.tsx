"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { DoubleSide } from "three";
import type { PlanetData } from "../data/planets";
import OrbitRing from "./OrbitRing";

type PlanetProps = {
  data: PlanetData;
  onSelect: (planet: PlanetData) => void;
};

/** A single planet orbiting the Sun with hover glow and click selection. */
export default function Planet({ data, onSelect }: PlanetProps) {
  const orbitRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scaleRef = useRef(1);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += data.orbitSpeed * delta;
    }

    const targetScale = hovered ? 1.18 : 1;
    scaleRef.current += (targetScale - scaleRef.current) * Math.min(delta * 8, 1);
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scaleRef.current);
    }
  });

  return (
    <group ref={orbitRef} rotation={[0, data.startAngle, 0]}>
      <OrbitRing radius={data.orbitRadius} />

      <group position={[data.orbitRadius, 0, 0]}>
        {data.hasRings && (
          <mesh rotation={[Math.PI / 2.2, 0.15, 0]}>
            <ringGeometry args={[data.size * 1.35, data.size * 2.1, 64]} />
            <meshBasicMaterial
              color="#d4c4a0"
              transparent
              opacity={0.55}
              side={DoubleSide}
            />
          </mesh>
        )}

        <mesh
          ref={meshRef}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(data);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[data.size, 32, 32]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={hovered ? 0.9 : 0.22}
            roughness={0.65}
            metalness={0.15}
          />
        </mesh>

        {hovered && (
          <pointLight
            intensity={1.2}
            distance={4}
            color={data.color}
            decay={2}
          />
        )}
      </group>
    </group>
  );
}
