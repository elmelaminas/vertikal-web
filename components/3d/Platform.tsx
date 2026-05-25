"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";

// Shared materials to avoid recreating on every render
const matGraphite = new THREE.MeshStandardMaterial({
  color: "#3A3A3A",
  metalness: 0.7,
  roughness: 0.3,
});
const matBlue = new THREE.MeshStandardMaterial({
  color: "#1E4D8C",
  metalness: 0.8,
  roughness: 0.2,
});
const matOrange = new THREE.MeshStandardMaterial({
  color: "#E87722",
  metalness: 0.5,
  roughness: 0.4,
  emissive: "#E87722",
  emissiveIntensity: 0.15,
});
const matBlack = new THREE.MeshStandardMaterial({
  color: "#1a1a1a",
  metalness: 0.3,
  roughness: 0.7,
});
const matSteel = new THREE.MeshStandardMaterial({
  color: "#8890A0",
  metalness: 0.9,
  roughness: 0.15,
});

interface ScissorPairProps {
  yOffset: number;
  level: number;
}

function ScissorPair({ yOffset, level }: ScissorPairProps) {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = scrollStore.progress;
    // Angle from 65° (collapsed) to 15° (extended, nearly vertical)
    const angle = (65 - p * 50) * (Math.PI / 180);
    const armLength = 1.4;
    const h = Math.cos(angle) * armLength;

    if (leftRef.current) leftRef.current.rotation.z = angle;
    if (rightRef.current) rightRef.current.rotation.z = -angle;
    if (groupRef.current) {
      groupRef.current.position.y = yOffset + level * h * 2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={leftRef} material={matBlue}>
        <boxGeometry args={[0.07, 1.4, 0.1]} />
      </mesh>
      <mesh ref={rightRef} material={matBlue}>
        <boxGeometry args={[0.07, 1.4, 0.1]} />
      </mesh>
      {/* Cross connector */}
      <mesh material={matSteel} position={[0, 0, 0]}>
        <sphereGeometry args={[0.055, 8, 8]} />
      </mesh>
    </group>
  );
}

export function Platform() {
  const basketRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = scrollStore.progress;
    // Basket rises from y=0.6 to y=6
    if (basketRef.current) {
      basketRef.current.position.y = 0.6 + p * 5.5;
    }
    // Slow rotation for visual interest
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.25 + p * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.5, 0]}>
      {/* Base platform */}
      <mesh material={matGraphite} position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 0.35, 1.6]} />
      </mesh>

      {/* Base detail strips */}
      <mesh material={matOrange} position={[0, 0.185, 0]}>
        <boxGeometry args={[2.8, 0.04, 1.6]} />
      </mesh>

      {/* Wheels */}
      {(
        [
          [-1.1, -0.28, 0.65],
          [1.1, -0.28, 0.65],
          [-1.1, -0.28, -0.65],
          [1.1, -0.28, -0.65],
        ] as [number, number, number][]
      ).map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh material={matBlack} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.18, 16]} />
          </mesh>
          {/* Wheel rim */}
          <mesh material={matSteel} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.2, 16]} />
          </mesh>
        </group>
      ))}

      {/* Hydraulic outriggers */}
      {(
        [
          [-1.35, -0.05, 0],
          [1.35, -0.05, 0],
        ] as [number, number, number][]
      ).map(([x, y, z], i) => (
        <mesh key={i} material={matGraphite} position={[x, y, z]}>
          <boxGeometry args={[0.12, 0.15, 0.4]} />
        </mesh>
      ))}

      {/* Scissor mechanism - 3 levels */}
      <ScissorPair yOffset={0.3} level={0} />
      <ScissorPair yOffset={0.3} level={1} />
      <ScissorPair yOffset={0.3} level={2} />

      {/* Side guide rails (static) */}
      {([-0.55, 0.55] as number[]).map((x, i) => (
        <group key={i}>
          <mesh material={matBlue} position={[x, 1, 0]}>
            <boxGeometry args={[0.06, 2.2, 0.06]} />
          </mesh>
        </group>
      ))}

      {/* Basket / Work Platform */}
      <group ref={basketRef} position={[0, 0.6, 0]}>
        {/* Platform floor */}
        <mesh material={matBlue} position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.08, 1.0]} />
        </mesh>
        {/* Floor grip texture strips */}
        {[-0.4, 0, 0.4].map((x, i) => (
          <mesh key={i} material={matOrange} position={[x, 0.05, 0]}>
            <boxGeometry args={[0.08, 0.02, 0.9]} />
          </mesh>
        ))}

        {/* Guard rails - sides */}
        <mesh material={matOrange} position={[0.75, 0.55, 0]}>
          <boxGeometry args={[0.045, 1.1, 1.0]} />
        </mesh>
        <mesh material={matOrange} position={[-0.75, 0.55, 0]}>
          <boxGeometry args={[0.045, 1.1, 1.0]} />
        </mesh>

        {/* Guard rails - front/back */}
        <mesh material={matOrange} position={[0, 0.55, 0.5]}>
          <boxGeometry args={[1.5, 0.045, 0.045]} />
        </mesh>
        <mesh material={matOrange} position={[0, 0.55, -0.5]}>
          <boxGeometry args={[1.5, 0.045, 0.045]} />
        </mesh>

        {/* Mid rail */}
        <mesh material={matBlue} position={[0, 0.3, 0.5]}>
          <boxGeometry args={[1.5, 0.035, 0.035]} />
        </mesh>
        <mesh material={matBlue} position={[0, 0.3, -0.5]}>
          <boxGeometry args={[1.5, 0.035, 0.035]} />
        </mesh>

        {/* Top rail */}
        <mesh material={matOrange} position={[0, 1.05, 0.5]}>
          <boxGeometry args={[1.5, 0.05, 0.05]} />
        </mesh>
        <mesh material={matOrange} position={[0, 1.05, -0.5]}>
          <boxGeometry args={[1.5, 0.05, 0.05]} />
        </mesh>
        <mesh material={matOrange} position={[0.75, 1.05, 0]}>
          <boxGeometry args={[0.05, 0.05, 1.0]} />
        </mesh>
        <mesh material={matOrange} position={[-0.75, 1.05, 0]}>
          <boxGeometry args={[0.05, 0.05, 1.0]} />
        </mesh>

        {/* Control box */}
        <mesh material={matGraphite} position={[0.5, 0.25, 0.35]}>
          <boxGeometry args={[0.3, 0.35, 0.12]} />
        </mesh>
        <mesh material={matOrange} position={[0.5, 0.32, 0.42]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
        </mesh>

        {/* Operator silhouette */}
        <group position={[-0.15, 0.08, 0]}>
          {/* Body */}
          <mesh material={matBlue} position={[0, 0.55, 0]}>
            <capsuleGeometry args={[0.12, 0.45, 8, 8]} />
          </mesh>
          {/* Head */}
          <mesh material={matSteel} position={[0, 1.05, 0]}>
            <sphereGeometry args={[0.13, 12, 12]} />
          </mesh>
          {/* Hard hat */}
          <mesh material={matOrange} position={[0, 1.15, 0]}>
            <cylinderGeometry args={[0.16, 0.14, 0.1, 12]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
