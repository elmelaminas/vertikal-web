"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";

// ─── Materials (shared, created once) ────────────────────────────────────────
const genieBlue = new THREE.MeshStandardMaterial({
  color: "#003E7E",
  metalness: 0.65,
  roughness: 0.35,
});
const chassisGray = new THREE.MeshStandardMaterial({
  color: "#D0D0D0",
  metalness: 0.25,
  roughness: 0.65,
});
const darkSteel = new THREE.MeshStandardMaterial({
  color: "#2E2E2E",
  metalness: 0.8,
  roughness: 0.25,
});
const rubber = new THREE.MeshStandardMaterial({
  color: "#181818",
  metalness: 0.2,
  roughness: 0.85,
});
const rimMat = new THREE.MeshStandardMaterial({
  color: "#606060",
  metalness: 0.85,
  roughness: 0.2,
});
const orangeAccent = new THREE.MeshStandardMaterial({
  color: "#E87722",
  metalness: 0.35,
  roughness: 0.55,
  emissive: "#E87722",
  emissiveIntensity: 0.12,
});
const basketFloor = new THREE.MeshStandardMaterial({
  color: "#E0E0E0",
  metalness: 0.35,
  roughness: 0.6,
});
const hydraulicMat = new THREE.MeshStandardMaterial({
  color: "#B8B8B8",
  metalness: 0.9,
  roughness: 0.15,
});
const glassMat = new THREE.MeshStandardMaterial({
  color: "#4080C0",
  metalness: 0.2,
  roughness: 0.05,
  transparent: true,
  opacity: 0.45,
});

// ─── Easing ──────────────────────────────────────────────────────────────────
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tire */}
      <mesh material={rubber} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.34, 20]} />
      </mesh>
      {/* Rim */}
      <mesh material={rimMat} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.36, 16]} />
      </mesh>
      {/* Hub bolts */}
      {Array.from({ length: 5 }, (_, j) => (
        <mesh
          key={j}
          material={darkSteel}
          position={[
            Math.cos((j * Math.PI * 2) / 5) * 0.13,
            0,
            Math.sin((j * Math.PI * 2) / 5) * 0.13,
          ]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.028, 0.028, 0.38, 6]} />
        </mesh>
      ))}
      {/* Mud flap (subtle) */}
      <mesh material={darkSteel} position={[0, 0.42, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.38]} />
      </mesh>
    </group>
  );
}

function Basket() {
  return (
    <group position={[0, 1.28, 0]}>
      {/* Leveling mount */}
      <mesh material={darkSteel} position={[0, 0.07, 0]}>
        <boxGeometry args={[0.45, 0.14, 0.45]} />
      </mesh>

      {/* Floor */}
      <mesh material={basketFloor} position={[0, 0.17, 0]} castShadow>
        <boxGeometry args={[1.42, 0.1, 0.92]} />
      </mesh>

      {/* Orange toe-board */}
      <mesh material={orangeAccent} position={[0, 0.25, 0]}>
        <boxGeometry args={[1.42, 0.1, 0.92]} />
      </mesh>

      {/* Corner posts */}
      {(
        [
          [0.68, 0.75, 0.43],
          [-0.68, 0.75, 0.43],
          [0.68, 0.75, -0.43],
          [-0.68, 0.75, -0.43],
        ] as [number, number, number][]
      ).map(([x, y, z], i) => (
        <mesh key={i} material={genieBlue} position={[x, y, z]}>
          <boxGeometry args={[0.055, 1.06, 0.055]} />
        </mesh>
      ))}

      {/* Top rail loop */}
      <mesh material={orangeAccent} position={[0, 1.27, 0.43]}>
        <boxGeometry args={[1.42, 0.055, 0.055]} />
      </mesh>
      <mesh material={orangeAccent} position={[0, 1.27, -0.43]}>
        <boxGeometry args={[1.42, 0.055, 0.055]} />
      </mesh>
      <mesh material={orangeAccent} position={[0.68, 1.27, 0]}>
        <boxGeometry args={[0.055, 0.055, 0.86]} />
      </mesh>
      <mesh material={orangeAccent} position={[-0.68, 1.27, 0]}>
        <boxGeometry args={[0.055, 0.055, 0.86]} />
      </mesh>

      {/* Mid rails */}
      <mesh material={genieBlue} position={[0, 0.78, 0.43]}>
        <boxGeometry args={[1.42, 0.04, 0.04]} />
      </mesh>
      <mesh material={genieBlue} position={[0, 0.78, -0.43]}>
        <boxGeometry args={[1.42, 0.04, 0.04]} />
      </mesh>
      <mesh material={genieBlue} position={[0.68, 0.78, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.86]} />
      </mesh>
      <mesh material={genieBlue} position={[-0.68, 0.78, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.86]} />
      </mesh>

      {/* Control panel */}
      <mesh material={darkSteel} position={[0.52, 0.68, 0.28]}>
        <boxGeometry args={[0.3, 0.56, 0.1]} />
      </mesh>
      <mesh material={orangeAccent} position={[0.52, 0.75, 0.34]}>
        <boxGeometry args={[0.12, 0.1, 0.02]} />
      </mesh>
      <mesh material={genieBlue} position={[0.52, 0.58, 0.34]}>
        <boxGeometry args={[0.08, 0.08, 0.02]} />
      </mesh>

      {/* VERTIKAL brand plate */}
      <mesh material={orangeAccent} position={[-0.68, 0.78, 0]}>
        <boxGeometry args={[0.025, 0.38, 0.7]} />
      </mesh>

      {/* Work light on front */}
      <mesh material={glassMat} position={[0, 1.32, 0.43]}>
        <boxGeometry args={[0.2, 0.08, 0.04]} />
      </mesh>
    </group>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function Z45Lift() {
  const machineRef = useRef<THREE.Group>(null);
  const turretRef = useRef<THREE.Group>(null);
  const lowerBoomRef = useRef<THREE.Group>(null);
  const upperBoomRef = useRef<THREE.Group>(null);
  const jibRef = useRef<THREE.Group>(null);

  // Smooth scroll follower (separate from global smooth to allow independent lerp rate)
  const smoothP = useRef(0);

  useFrame(() => {
    smoothP.current = THREE.MathUtils.lerp(
      smoothP.current,
      scrollStore.progress,
      0.038
    );
    const p = easeInOutCubic(smoothP.current);

    // Lower boom: 68° (folded, mostly horizontal) → 15° (extended, nearly vertical)
    if (lowerBoomRef.current) {
      lowerBoomRef.current.rotation.z = THREE.MathUtils.lerp(1.18, 0.26, p);
    }

    // Upper boom: folded back → extended outward
    if (upperBoomRef.current) {
      upperBoomRef.current.rotation.z = THREE.MathUtils.lerp(-0.55, 0.88, p);
    }

    // Jib: compensates to keep basket roughly level
    if (jibRef.current) {
      jibRef.current.rotation.z = THREE.MathUtils.lerp(0.38, -0.95, p);
    }

    // Turret: slow pan with scroll
    if (turretRef.current) {
      turretRef.current.rotation.y = p * 0.28;
    }

    // Whole machine slight rotation for visual dynamism
    if (machineRef.current) {
      machineRef.current.rotation.y = THREE.MathUtils.lerp(-0.25, 0.08, p);
    }
  });

  return (
    <group ref={machineRef} position={[0, -3.2, 0]}>
      {/* ── CHASSIS ─────────────────────────────────────────────────── */}
      <group>
        {/* Main frame */}
        <mesh material={chassisGray} position={[0, 0.32, 0]} castShadow>
          <boxGeometry args={[2.6, 0.58, 1.45]} />
        </mesh>
        {/* Top deck */}
        <mesh material={chassisGray} position={[0, 0.63, 0]}>
          <boxGeometry args={[2.38, 0.07, 1.25]} />
        </mesh>
        {/* Orange chassis stripe */}
        <mesh material={orangeAccent} position={[0, 0.14, 0]}>
          <boxGeometry args={[2.62, 0.07, 1.47]} />
        </mesh>
        {/* Undercarriage */}
        <mesh material={darkSteel} position={[0, 0.05, 0]}>
          <boxGeometry args={[2.35, 0.08, 1.2]} />
        </mesh>

        {/* Operator cab */}
        <mesh material={genieBlue} position={[-0.72, 0.98, -0.34]} castShadow>
          <boxGeometry args={[0.65, 0.56, 0.65]} />
        </mesh>
        {/* Cab roof */}
        <mesh material={darkSteel} position={[-0.72, 1.28, -0.34]}>
          <boxGeometry args={[0.68, 0.06, 0.68]} />
        </mesh>
        {/* Cab windshield */}
        <mesh material={glassMat} position={[-0.72, 0.98, 0.0]}>
          <boxGeometry args={[0.5, 0.35, 0.025]} />
        </mesh>
        {/* Cab side window */}
        <mesh material={glassMat} position={[-0.38, 0.98, -0.34]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.025]} />
        </mesh>

        {/* Engine/hydraulic cover rear */}
        <mesh material={darkSteel} position={[-0.85, 0.8, 0.2]}>
          <boxGeometry args={[0.72, 0.3, 0.88]} />
        </mesh>
        {/* Engine vent slats */}
        {[-0.1, 0.0, 0.1].map((z, i) => (
          <mesh key={i} material={darkSteel} position={[-1.17, 0.82, z]}>
            <boxGeometry args={[0.02, 0.22, 0.12]} />
          </mesh>
        ))}

        {/* Fuel tank (cylinder) */}
        <mesh
          material={genieBlue}
          position={[0.85, 0.58, -0.56]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.19, 0.19, 0.52, 16]} />
        </mesh>

        {/* Counterweight */}
        <mesh material={darkSteel} position={[-1.12, 0.35, 0]}>
          <boxGeometry args={[0.28, 0.42, 1.1]} />
        </mesh>

        {/* Stabilizer pads */}
        {([-0.9, 0.9] as number[]).map((z, i) => (
          <mesh key={i} material={darkSteel} position={[0, -0.02, z]}>
            <boxGeometry args={[2.6, 0.06, 0.18]} />
          </mesh>
        ))}

        {/* Axles */}
        <mesh material={darkSteel} position={[0, 0.08, 0.62]}>
          <boxGeometry args={[2.32, 0.12, 0.1]} />
        </mesh>
        <mesh material={darkSteel} position={[0, 0.08, -0.62]}>
          <boxGeometry args={[2.32, 0.12, 0.1]} />
        </mesh>

        {/* WHEELS */}
        <Wheel position={[1.02, 0.02, 0.72]} />
        <Wheel position={[-1.02, 0.02, 0.72]} />
        <Wheel position={[1.02, 0.02, -0.72]} />
        <Wheel position={[-1.02, 0.02, -0.72]} />
      </group>

      {/* ── TURRET (rotates Y) ──────────────────────────────────────── */}
      <group ref={turretRef} position={[0.28, 0.66, 0]}>
        {/* Turret body */}
        <mesh material={genieBlue} castShadow>
          <cylinderGeometry args={[0.52, 0.64, 0.42, 18]} />
        </mesh>
        {/* Slew ring detail */}
        <mesh material={darkSteel} position={[0, -0.23, 0]}>
          <cylinderGeometry args={[0.66, 0.66, 0.07, 18]} />
        </mesh>
        {/* Turret top cover */}
        <mesh material={genieBlue} position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.48, 0.52, 0.07, 18]} />
        </mesh>

        {/* ── LOWER BOOM (pivots Z) ────────────────────────────────── */}
        <group ref={lowerBoomRef} position={[0, 0.21, 0]} rotation={[0, 0, 1.18]}>
          {/* Base pivot knuckle */}
          <mesh material={darkSteel}>
            <sphereGeometry args={[0.22, 14, 14]} />
          </mesh>
          {/* Knuckle side plates */}
          <mesh material={genieBlue} position={[0, 0, 0.22]}>
            <boxGeometry args={[0.46, 0.46, 0.08]} />
          </mesh>
          <mesh material={genieBlue} position={[0, 0, -0.22]}>
            <boxGeometry args={[0.46, 0.46, 0.08]} />
          </mesh>

          {/* Lower boom arm body */}
          <mesh material={genieBlue} position={[0, 1.75, 0]} castShadow>
            <boxGeometry args={[0.37, 3.5, 0.37]} />
          </mesh>
          {/* Arm taper cap top */}
          <mesh material={genieBlue} position={[0, 3.5, 0]}>
            <boxGeometry args={[0.3, 0.12, 0.3]} />
          </mesh>

          {/* Hydraulic cylinder (runs parallel to arm) */}
          <mesh
            material={hydraulicMat}
            position={[-0.27, 1.1, 0]}
            rotation={[0, 0, 0.06]}
          >
            <cylinderGeometry args={[0.065, 0.065, 1.8, 8]} />
          </mesh>
          <mesh
            material={hydraulicMat}
            position={[-0.27, 2.7, 0]}
            rotation={[0, 0, 0.06]}
          >
            <cylinderGeometry args={[0.045, 0.045, 1.2, 8]} />
          </mesh>

          {/* ── UPPER BOOM PIVOT at top of lower boom ─────────────── */}
          <group position={[0, 3.5, 0]}>
            {/* Upper knuckle joint */}
            <mesh material={darkSteel}>
              <sphereGeometry args={[0.24, 14, 14]} />
            </mesh>
            <mesh material={genieBlue} position={[0, 0, 0.24]}>
              <boxGeometry args={[0.5, 0.5, 0.09]} />
            </mesh>
            <mesh material={genieBlue} position={[0, 0, -0.24]}>
              <boxGeometry args={[0.5, 0.5, 0.09]} />
            </mesh>

            {/* ── UPPER BOOM (pivots Z) ────────────────────────────── */}
            <group ref={upperBoomRef} rotation={[0, 0, -0.55]}>
              <mesh material={genieBlue} position={[0, 1.5, 0]} castShadow>
                <boxGeometry args={[0.32, 3.0, 0.32]} />
              </mesh>

              {/* Hydraulic on upper boom */}
              <mesh
                material={hydraulicMat}
                position={[-0.24, 0.9, 0]}
                rotation={[0, 0, 0.08]}
              >
                <cylinderGeometry args={[0.056, 0.056, 1.55, 8]} />
              </mesh>

              {/* ── JIB PIVOT at top of upper boom ──────────────────── */}
              <group position={[0, 3.0, 0]}>
                <mesh material={darkSteel}>
                  <sphereGeometry args={[0.19, 12, 12]} />
                </mesh>
                <mesh material={genieBlue} position={[0, 0, 0.19]}>
                  <boxGeometry args={[0.38, 0.38, 0.08]} />
                </mesh>
                <mesh material={genieBlue} position={[0, 0, -0.19]}>
                  <boxGeometry args={[0.38, 0.38, 0.08]} />
                </mesh>

                {/* ── JIB (pivots Z) ───────────────────────────────── */}
                <group ref={jibRef} rotation={[0, 0, 0.38]}>
                  <mesh material={genieBlue} position={[0, 0.6, 0]} castShadow>
                    <boxGeometry args={[0.23, 1.22, 0.23]} />
                  </mesh>

                  {/* ── BASKET at jib tip ────────────────────────────── */}
                  <Basket />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
