"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { PLANETS, type PlanetData } from "../data/planets";
import Planet from "./Planet";
import Sun from "./Sun";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type SolarSystemSceneProps = {
  onPlanetSelect: (planet: PlanetData, worldPosition: Vector3) => void;
  selectedPlanetId?: string | null;
  focusRequest?:
    | {
        id: number;
        planetId: string;
        worldPosition: Vector3;
      }
    | null;
  onFocusComplete?: (requestId: number) => void;
};

/** All 3D objects inside the Canvas. */
export default function SolarSystemScene({
  onPlanetSelect,
  selectedPlanetId,
  focusRequest,
  onFocusComplete,
}: SolarSystemSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera } = useThree();

  const focusState = useRef<{
    requestId: number;
    active: boolean;
    fromCam: Vector3;
    toCam: Vector3;
    fromTarget: Vector3;
    toTarget: Vector3;
    t: number;
  } | null>(null);

  const scratch = useMemo(
    () => ({
      v0: new Vector3(),
      v1: new Vector3(),
      v2: new Vector3(),
    }),
    [],
  );

  useEffect(() => {
    if (!focusRequest) return;
    const controls = controlsRef.current;
    if (!controls) return;

    const target = focusRequest.worldPosition.clone();
    const currentTarget = controls.target.clone();

    // Preserve current viewing direction while zooming in.
    const dir = scratch.v0.copy(camera.position).sub(currentTarget).normalize();
    const desiredDistance = 7.5; // close enough to feel like a zoom, far enough to keep context
    const desiredCam = scratch.v1.copy(target).addScaledVector(dir, desiredDistance);

    // Add a small "overhead" bias so the planet isn't dead-center behind the UI.
    desiredCam.y += 1.2;

    focusState.current = {
      requestId: focusRequest.id,
      active: true,
      fromCam: camera.position.clone(),
      toCam: desiredCam.clone(),
      fromTarget: currentTarget.clone(),
      toTarget: target.clone(),
      t: 0,
    };
  }, [camera, focusRequest, scratch]);

  useFrame((_, delta) => {
    const state = focusState.current;
    const controls = controlsRef.current;
    if (!state || !state.active || !controls) return;

    // Smooth, time-based interpolation with a quick ease-out.
    state.t = Math.min(1, state.t + delta * 2.8);
    const easeOut = 1 - Math.pow(1 - state.t, 3);

    camera.position.lerpVectors(state.fromCam, state.toCam, easeOut);
    controls.target.lerpVectors(state.fromTarget, state.toTarget, easeOut);
    controls.update();

    const camDone = camera.position.distanceTo(state.toCam) < 0.05;
    const targetDone = controls.target.distanceTo(state.toTarget) < 0.05;
    if (state.t >= 1 || (camDone && targetDone)) {
      state.active = false;
      onFocusComplete?.(state.requestId);
    }
  });

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
        ref={controlsRef}
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
