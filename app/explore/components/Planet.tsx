"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { Group, Mesh } from "three";
import { DoubleSide } from "three";
import type { PlanetData } from "../data/planets";
import OrbitRing from "./OrbitRing";

type PlanetProps = {
  data: PlanetData;
  onSelect: (planet: PlanetData, worldPosition: Vector3) => void;
  isSelected?: boolean;
};

/** A single planet orbiting the Sun with hover glow and click selection. */
export default function Planet({ data, onSelect, isSelected = false }: PlanetProps) {
  const orbitRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scaleRef = useRef(1);
  const spinRef = useRef(0);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      // Scene-friendly orbit speeds: keep motion readable and click targets stable.
      const orbitSpeed = data.orbitSpeed * 0.22;
      orbitRef.current.rotation.y += orbitSpeed * delta;
    }

    const targetScale = hovered ? 1.18 : isSelected ? 1.08 : 1;
    scaleRef.current += (targetScale - scaleRef.current) * Math.min(delta * 8, 1);
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scaleRef.current);
    }

    // Gentle axial spin for visual life (doesn't affect raycasting).
    // Uses a stable speed derived from orbitSpeed so planets differ slightly.
    const targetSpin = 0.35 + data.orbitSpeed * 0.04;
    spinRef.current += targetSpin * delta;
    if (meshRef.current) {
      meshRef.current.rotation.y = spinRef.current;
    }
  });

  return (
    <group ref={orbitRef} rotation={[0, data.startAngle, 0]}>
      <OrbitRing radius={data.orbitRadius} />

      <group position={[data.orbitRadius, 0, 0]}>
        {data.hasRings && (
          <mesh rotation={[Math.PI / 2.2, 0.15, 0]} raycast={() => null}>
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
            // Capture the click target position in world space for camera focusing.
            const worldPosition = new Vector3();
            meshRef.current?.getWorldPosition(worldPosition);
            onSelect(data, worldPosition);
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
            emissiveIntensity={hovered ? 0.95 : isSelected ? 0.65 : 0.22}
            roughness={0.65}
            metalness={0.15}
          />
        </mesh>

        {(hovered || isSelected) && (
          <pointLight
            intensity={hovered ? 1.2 : 0.85}
            distance={4}
            color={data.color}
            decay={2}
          />
        )}
      </group>
    </group>
  );
}
