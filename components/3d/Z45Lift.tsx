"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";

// ─── Materials ────────────────────────────────────────────────────────────────
const genieBlue = new THREE.MeshStandardMaterial({ color: "#003E7E", metalness: 0.65, roughness: 0.35 });
const chassisWhite = new THREE.MeshStandardMaterial({ color: "#EFEFEF", metalness: 0.2, roughness: 0.7 });
const darkSteel = new THREE.MeshStandardMaterial({ color: "#2A2A2A", metalness: 0.82, roughness: 0.22 });
const midSteel = new THREE.MeshStandardMaterial({ color: "#4A4A4A", metalness: 0.75, roughness: 0.3 });
const rubber = new THREE.MeshStandardMaterial({ color: "#1A1A1A", metalness: 0.0, roughness: 0.95 });
const rim = new THREE.MeshStandardMaterial({ color: "#888888", metalness: 0.9, roughness: 0.3 });
const chrome = new THREE.MeshStandardMaterial({ color: "#C8C8C8", metalness: 1.0, roughness: 0.08 });
const hydraulicRod = new THREE.MeshStandardMaterial({ color: "#E0D8A0", metalness: 1.0, roughness: 0.05 });
const hose = new THREE.MeshStandardMaterial({ color: "#1C1C1C", metalness: 0.1, roughness: 0.9 });
const orangeAccent = new THREE.MeshStandardMaterial({ color: "#E87722", metalness: 0.35, roughness: 0.55, emissive: "#E87722", emissiveIntensity: 0.1 });
const warningBeacon = new THREE.MeshStandardMaterial({ color: "#FF8A2B", emissive: "#FF8A2B", emissiveIntensity: 0.6, metalness: 0.2, roughness: 0.5 });
const basketWhite = new THREE.MeshStandardMaterial({ color: "#E8E8E8", metalness: 0.3, roughness: 0.65 });
const roughFloor = new THREE.MeshStandardMaterial({ color: "#C8C8C8", metalness: 0.1, roughness: 0.98 });
const glass = new THREE.MeshStandardMaterial({ color: "#5090D0", metalness: 0.15, roughness: 0.05, transparent: true, opacity: 0.42 });
const genieRed = new THREE.MeshStandardMaterial({ color: "#C82020", metalness: 0.3, roughness: 0.6 });
const controlBlack = new THREE.MeshStandardMaterial({ color: "#111111", metalness: 0.4, roughness: 0.5 });
const btnGreen = new THREE.MeshStandardMaterial({ color: "#22AA44", emissive: "#22AA44", emissiveIntensity: 0.25 });
const btnRed = new THREE.MeshStandardMaterial({ color: "#DD2222", emissive: "#DD2222", emissiveIntensity: 0.25 });
const flagOrange = new THREE.MeshStandardMaterial({ color: "#FF6600", side: THREE.DoubleSide });

// ─── Easing ──────────────────────────────────────────────────────────────────
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── Hydraulic piston sub-assembly ──────────────────────────────────────────
function HydPiston({
  length = 1.8,
  offset = -0.28,
}: {
  length?: number;
  offset?: number;
}) {
  return (
    <group position={[offset, length * 0.35, 0]} rotation={[0, 0, 0.04]}>
      {/* Outer cylinder (barrel) */}
      <mesh material={chrome} position={[0, -length * 0.12, 0]}>
        <cylinderGeometry args={[0.065, 0.065, length * 0.6, 10]} />
      </mesh>
      {/* Inner rod (extending) */}
      <mesh material={hydraulicRod} position={[0, length * 0.2, 0]}>
        <cylinderGeometry args={[0.042, 0.042, length * 0.55, 10]} />
      </mesh>
      {/* End caps */}
      <mesh material={darkSteel} position={[0, -length * 0.42, 0]}>
        <sphereGeometry args={[0.075, 8, 8]} />
      </mesh>
      <mesh material={darkSteel} position={[0, length * 0.45, 0]}>
        <sphereGeometry args={[0.055, 8, 8]} />
      </mesh>
    </group>
  );
}

// ─── Hydraulic hoses running along a boom ────────────────────────────────────
function HydHoses({ length = 3.5 }: { length?: number }) {
  return (
    <group position={[0.22, length * 0.5, 0]}>
      {[-0.05, 0, 0.05].map((z, i) => (
        <mesh key={i} material={hose} position={[0, 0, z]}>
          <cylinderGeometry args={[0.018, 0.018, length * 0.9, 6]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Wheel sub-component ─────────────────────────────────────────────────────
function Wheel({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Tire */}
      <mesh material={rubber} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.44, 0.44, 0.38, 20]} />
      </mesh>
      {/* Tire tread ring */}
      <mesh material={rubber} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.44, 0.045, 6, 20]} />
      </mesh>
      {/* Rim */}
      <mesh material={rim} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.4, 14]} />
      </mesh>
      {/* Hub */}
      <mesh material={chrome} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.42, 12]} />
      </mesh>
      {/* Lug bolts (4) */}
      {[0, 1, 2, 3].map((j) => (
        <mesh
          key={j}
          material={darkSteel}
          position={[
            Math.cos((j * Math.PI) / 2) * 0.15,
            0,
            Math.sin((j * Math.PI) / 2) * 0.15,
          ]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.025, 0.025, 0.43, 6]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Fender / mud guard over a wheel pair ───────────────────────────────────
function Fender({ z }: { z: number }) {
  return (
    <group position={[0, 0.52, z]}>
      <mesh material={chassisWhite}>
        <boxGeometry args={[2.35, 0.07, 0.52]} />
      </mesh>
      {/* Orange accent strip on fender */}
      <mesh material={orangeAccent} position={[0, -0.045, 0]}>
        <boxGeometry args={[2.35, 0.04, 0.52]} />
      </mesh>
    </group>
  );
}

// ─── Outrigger stabilizer arm ────────────────────────────────────────────────
function Outrigger({ pos, rotY }: { pos: [number, number, number]; rotY: number }) {
  return (
    <group position={pos} rotation={[0, rotY, -0.25]}>
      {/* Arm */}
      <mesh material={genieBlue} position={[0.35, 0, 0]}>
        <boxGeometry args={[0.65, 0.09, 0.09]} />
      </mesh>
      {/* Foot pad */}
      <mesh material={darkSteel} position={[0.72, 0, 0]}>
        <boxGeometry args={[0.22, 0.08, 0.22]} />
      </mesh>
      {/* Vertical support */}
      <mesh material={midSteel} position={[0.72, -0.14, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.22, 8]} />
      </mesh>
    </group>
  );
}

// ─── Basket ─────────────────────────────────────────────────────────────────
function Basket() {
  const W = 1.52;  // total width X
  const D = 0.98;  // total depth Z
  const cX = 0.73; // corner X
  const cZ = 0.46; // corner Z
  const postH = 1.08;
  const topRailY = 0.28 + postH;
  const midRailY = 0.28 + postH * 0.5;

  return (
    <group position={[0, 1.25, 0]}>
      {/* Leveling bracket */}
      <mesh material={midSteel} position={[0, 0.06, 0]}>
        <boxGeometry args={[0.5, 0.14, 0.5]} />
      </mesh>

      {/* Floor structure */}
      <mesh material={basketWhite} position={[0, 0.16, 0]} castShadow>
        <boxGeometry args={[W, 0.14, D]} />
      </mesh>
      {/* Anti-slip grid layer */}
      <mesh material={roughFloor} position={[0, 0.24, 0]}>
        <boxGeometry args={[W - 0.04, 0.03, D - 0.04]} />
      </mesh>

      {/* Orange toe-boards (kick plates) perimeter */}
      {/* Front */}
      <mesh material={orangeAccent} position={[0, 0.38, cZ]}>
        <boxGeometry args={[W, 0.18, 0.04]} />
      </mesh>
      {/* Back */}
      <mesh material={orangeAccent} position={[0, 0.38, -cZ]}>
        <boxGeometry args={[W, 0.18, 0.04]} />
      </mesh>
      {/* Left */}
      <mesh material={orangeAccent} position={[-cX, 0.38, 0]}>
        <boxGeometry args={[0.04, 0.18, D - 0.08]} />
      </mesh>
      {/* Right (entry gap side — half panel) */}
      <mesh material={orangeAccent} position={[cX, 0.38, -0.15]}>
        <boxGeometry args={[0.04, 0.18, D * 0.7]} />
      </mesh>

      {/* Corner posts (x4) */}
      {(
        [
          [cX, 0.28 + postH / 2, cZ],
          [-cX, 0.28 + postH / 2, cZ],
          [cX, 0.28 + postH / 2, -cZ],
          [-cX, 0.28 + postH / 2, -cZ],
        ] as [number, number, number][]
      ).map(([x, y, z], i) => (
        <mesh key={i} material={genieBlue} position={[x, y, z]}>
          <boxGeometry args={[0.06, postH, 0.06]} />
        </mesh>
      ))}

      {/* Mid rail — front/back */}
      <mesh material={genieBlue} position={[0, midRailY, cZ]}>
        <boxGeometry args={[W, 0.045, 0.045]} />
      </mesh>
      <mesh material={genieBlue} position={[0, midRailY, -cZ]}>
        <boxGeometry args={[W, 0.045, 0.045]} />
      </mesh>
      {/* Mid rail — sides */}
      <mesh material={genieBlue} position={[cX, midRailY, 0]}>
        <boxGeometry args={[0.045, 0.045, D - 0.12]} />
      </mesh>
      <mesh material={genieBlue} position={[-cX, midRailY, 0]}>
        <boxGeometry args={[0.045, 0.045, D - 0.12]} />
      </mesh>

      {/* Top rail — front/back */}
      <mesh material={orangeAccent} position={[0, topRailY, cZ]}>
        <boxGeometry args={[W, 0.055, 0.055]} />
      </mesh>
      <mesh material={orangeAccent} position={[0, topRailY, -cZ]}>
        <boxGeometry args={[W, 0.055, 0.055]} />
      </mesh>
      {/* Top rail — sides */}
      <mesh material={orangeAccent} position={[cX, topRailY, 0]}>
        <boxGeometry args={[0.055, 0.055, D - 0.12]} />
      </mesh>
      <mesh material={orangeAccent} position={[-cX, topRailY, 0]}>
        <boxGeometry args={[0.055, 0.055, D - 0.12]} />
      </mesh>

      {/* ── Control panel ─────────────────────────────────── */}
      <group position={[cX - 0.01, 0.55, cZ - 0.12]}>
        {/* Panel housing — tilted inward */}
        <mesh material={controlBlack} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.32, 0.28, 0.12]} />
        </mesh>
        {/* LCD screen area */}
        <mesh material={glass} position={[0, 0.04, 0.065]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.2, 0.1, 0.01]} />
        </mesh>
        {/* Buttons */}
        <mesh material={btnGreen} position={[-0.06, -0.05, 0.068]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.025, 8]} />
        </mesh>
        <mesh material={btnRed} position={[0.06, -0.05, 0.068]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.025, 8]} />
        </mesh>
        <mesh material={orangeAccent} position={[0, -0.05, 0.068]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.025, 8]} />
        </mesh>
        {/* Joystick handle */}
        <mesh material={darkSteel} position={[-0.09, 0.04, 0.07]} rotation={[0.2, 0, 0.1]}>
          <cylinderGeometry args={[0.018, 0.018, 0.1, 8]} />
        </mesh>
        <mesh material={darkSteel} position={[-0.088, 0.09, 0.072]} rotation={[0.2, 0, 0.1]}>
          <sphereGeometry args={[0.03, 8, 8]} />
        </mesh>
      </group>

      {/* ── Tool storage box ──────────────────────────────── */}
      <mesh material={orangeAccent} position={[-0.5, 0.3, -cZ + 0.08]}>
        <boxGeometry args={[0.28, 0.18, 0.22]} />
      </mesh>
      {/* Tool box lid */}
      <mesh material={darkSteel} position={[-0.5, 0.4, -cZ + 0.08]}>
        <boxGeometry args={[0.3, 0.04, 0.24]} />
      </mesh>

      {/* ── Warning beacon (rotating light) ──────────────── */}
      <group position={[0, topRailY + 0.22, 0]}>
        <mesh material={darkSteel}>
          <cylinderGeometry args={[0.04, 0.04, 0.16, 10]} />
        </mesh>
        <mesh material={warningBeacon} position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 10]} />
        </mesh>
        {/* Lens dome */}
        <mesh material={warningBeacon} position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.065, 10, 6]} />
        </mesh>
      </group>

      {/* ── Safety whip flag ─────────────────────────────── */}
      <group position={[-cX + 0.03, topRailY + 0.06, -cZ + 0.04]}>
        {/* Rod */}
        <mesh material={midSteel} position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.44, 6]} />
        </mesh>
        {/* Flag */}
        <mesh material={flagOrange} position={[0.09, 0.38, 0]} rotation={[0, 0, 0.1]}>
          <planeGeometry args={[0.18, 0.14]} />
        </mesh>
      </group>

      {/* ── VERTIKAL brand decal plate ───────────────────── */}
      <mesh material={orangeAccent} position={[-cX - 0.015, midRailY, 0]}>
        <boxGeometry args={[0.02, 0.32, 0.64]} />
      </mesh>

      {/* Work flood light */}
      <mesh material={glass} position={[0, topRailY + 0.04, cZ]}>
        <boxGeometry args={[0.24, 0.07, 0.04]} />
      </mesh>
    </group>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function Z45Lift() {
  const machineRef   = useRef<THREE.Group>(null);
  const turretRef    = useRef<THREE.Group>(null);
  const lowerBoomRef = useRef<THREE.Group>(null);
  const upperBoomRef = useRef<THREE.Group>(null);
  const jibRef       = useRef<THREE.Group>(null);
  const smoothP      = useRef(0);

  useFrame(() => {
    smoothP.current = THREE.MathUtils.lerp(smoothP.current, scrollStore.progress, 0.038);
    const p = easeInOutCubic(smoothP.current);

    if (lowerBoomRef.current) lowerBoomRef.current.rotation.z = THREE.MathUtils.lerp(1.18, 0.26, p);
    if (upperBoomRef.current) upperBoomRef.current.rotation.z = THREE.MathUtils.lerp(-0.55, 0.88, p);
    if (jibRef.current)       jibRef.current.rotation.z       = THREE.MathUtils.lerp(0.38, -0.95, p);
    if (turretRef.current)    turretRef.current.rotation.y    = p * 0.28;
    if (machineRef.current)   machineRef.current.rotation.y   = THREE.MathUtils.lerp(-0.25, 0.08, p);
  });

  return (
    <group ref={machineRef} position={[0, -3.2, 0]}>

      {/* ═══════════════════════════════════════════════════
          CHASSIS
      ═══════════════════════════════════════════════════ */}
      <group>
        {/* Main frame body */}
        <mesh material={chassisWhite} position={[0, 0.33, 0]} castShadow>
          <boxGeometry args={[2.65, 0.62, 1.48]} />
        </mesh>
        {/* Top deck plate */}
        <mesh material={chassisWhite} position={[0, 0.65, 0]}>
          <boxGeometry args={[2.42, 0.06, 1.28]} />
        </mesh>

        {/* Orange accent stripe on chassis sides */}
        <mesh material={orangeAccent} position={[0, 0.14, 0.755]}>
          <boxGeometry args={[2.65, 0.08, 0.04]} />
        </mesh>
        <mesh material={orangeAccent} position={[0, 0.14, -0.755]}>
          <boxGeometry args={[2.65, 0.08, 0.04]} />
        </mesh>

        {/* Undercarriage frame */}
        <mesh material={darkSteel} position={[0, 0.06, 0]}>
          <boxGeometry args={[2.4, 0.08, 1.22]} />
        </mesh>

        {/* ── Motor / engine hood (front-right) */}
        <mesh material={chassisWhite} position={[0.68, 0.82, 0.24]} castShadow>
          <boxGeometry args={[0.88, 0.38, 0.76]} />
        </mesh>
        {/* Hood orange accent stripe */}
        <mesh material={orangeAccent} position={[0.68, 0.65, 0.24]}>
          <boxGeometry args={[0.88, 0.04, 0.76]} />
        </mesh>
        {/* Radiator grille at front */}
        {[0.12, 0.06, 0.0, -0.06, -0.12].map((y, i) => (
          <mesh key={i} material={darkSteel} position={[1.12, 0.75 + y, 0.24]}>
            <boxGeometry args={[0.04, 0.025, 0.62]} />
          </mesh>
        ))}
        {/* Hood vent slat (top) */}
        {[0.1, 0.0, -0.1].map((z, i) => (
          <mesh key={i} material={darkSteel} position={[0.68, 1.02, 0.24 + z]}>
            <boxGeometry args={[0.7, 0.025, 0.08]} />
          </mesh>
        ))}

        {/* ── Operator cab */}
        <mesh material={genieBlue} position={[-0.72, 0.98, -0.32]} castShadow>
          <boxGeometry args={[0.66, 0.58, 0.68]} />
        </mesh>
        {/* Cab roof */}
        <mesh material={darkSteel} position={[-0.72, 1.3, -0.32]}>
          <boxGeometry args={[0.69, 0.06, 0.71]} />
        </mesh>
        {/* Cab windshield */}
        <mesh material={glass} position={[-0.72, 0.98, 0.025]}>
          <boxGeometry args={[0.52, 0.36, 0.025]} />
        </mesh>
        {/* Cab side glass */}
        <mesh material={glass} position={[-0.37, 0.98, -0.32]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.52, 0.32, 0.025]} />
        </mesh>
        {/* A-pillar */}
        <mesh material={darkSteel} position={[-0.72, 1.14, 0.025]}>
          <boxGeometry args={[0.06, 0.28, 0.025]} />
        </mesh>

        {/* ── Ground control panel on chassis front */}
        <mesh material={controlBlack} position={[0.55, 0.78, 0.78]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.42, 0.28, 0.1]} />
        </mesh>
        {/* Ground panel buttons */}
        <mesh material={btnGreen} position={[0.48, 0.85, 0.82]} rotation={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.025, 8]} />
        </mesh>
        <mesh material={btnRed} position={[0.62, 0.85, 0.82]} rotation={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.025, 8]} />
        </mesh>

        {/* ── Hydraulic oil tank + counterweight (rear) */}
        <mesh material={genieBlue} position={[-1.08, 0.55, 0]} castShadow>
          <boxGeometry args={[0.44, 0.62, 1.1]} />
        </mesh>
        {/* Tank filler cap */}
        <mesh material={chrome} position={[-1.08, 0.88, 0.25]}>
          <cylinderGeometry args={[0.06, 0.06, 0.06, 10]} />
        </mesh>
        {/* Tank label stripe */}
        <mesh material={orangeAccent} position={[-1.08, 0.55, 0]}>
          <boxGeometry args={[0.445, 0.06, 1.1]} />
        </mesh>

        {/* ── Axles */}
        <mesh material={darkSteel} position={[0, 0.1, 0.64]}>
          <boxGeometry args={[2.35, 0.11, 0.1]} />
        </mesh>
        <mesh material={darkSteel} position={[0, 0.1, -0.64]}>
          <boxGeometry args={[2.35, 0.11, 0.1]} />
        </mesh>

        {/* ── Outrigger stabilizers (4 corners) */}
        <Outrigger pos={[1.12, 0.22, 0.62]}  rotY={0} />
        <Outrigger pos={[-1.12, 0.22, 0.62]} rotY={Math.PI} />
        <Outrigger pos={[1.12, 0.22, -0.62]} rotY={0} />
        <Outrigger pos={[-1.12, 0.22, -0.62]} rotY={Math.PI} />

        {/* ── Fenders over wheel pairs */}
        <Fender z={0.64} />
        <Fender z={-0.64} />

        {/* ── WHEELS (4) */}
        <Wheel pos={[1.08, 0.04, 0.74]} />
        <Wheel pos={[-1.08, 0.04, 0.74]} />
        <Wheel pos={[1.08, 0.04, -0.74]} />
        <Wheel pos={[-1.08, 0.04, -0.74]} />
      </group>

      {/* ═══════════════════════════════════════════════════
          TURRET — rotates Y
      ═══════════════════════════════════════════════════ */}
      <group ref={turretRef} position={[0.28, 0.68, 0]}>
        {/* Base flange */}
        <mesh material={darkSteel} position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.06, 18]} />
        </mesh>
        {/* Slew ring / bearing */}
        <mesh material={midSteel} position={[0, -0.19, 0]}>
          <cylinderGeometry args={[0.68, 0.68, 0.08, 18]} />
        </mesh>
        {/* Turret body lower */}
        <mesh material={genieBlue} position={[0, 0.0, 0]} castShadow>
          <cylinderGeometry args={[0.55, 0.67, 0.48, 18]} />
        </mesh>
        {/* Turret body upper neck */}
        <mesh material={genieBlue} position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.44, 0.55, 0.2, 16]} />
        </mesh>
        {/* Top cap */}
        <mesh material={genieBlue} position={[0, 0.44, 0]}>
          <cylinderGeometry args={[0.42, 0.44, 0.06, 14]} />
        </mesh>

        {/* Genie decal / logo panel */}
        <mesh material={genieRed} position={[0.53, 0.08, 0]}>
          <boxGeometry args={[0.04, 0.18, 0.42]} />
        </mesh>

        {/* Hose reel / side box */}
        <mesh material={darkSteel} position={[0.3, 0.15, -0.42]}>
          <boxGeometry args={[0.3, 0.28, 0.2]} />
        </mesh>

        {/* ═══════════════════════════════════════════════════
            LOWER BOOM — pivots Z
        ═══════════════════════════════════════════════════ */}
        <group ref={lowerBoomRef} position={[0, 0.22, 0]} rotation={[0, 0, 1.18]}>
          {/* Root pivot sphere */}
          <mesh material={darkSteel}>
            <sphereGeometry args={[0.24, 14, 14]} />
          </mesh>
          {/* Pivot pin */}
          <mesh material={chrome} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.55, 10]} />
          </mesh>
          {/* Side cheek plates */}
          <mesh material={genieBlue} position={[0, 0.12, 0.26]}>
            <boxGeometry args={[0.48, 0.48, 0.08]} />
          </mesh>
          <mesh material={genieBlue} position={[0, 0.12, -0.26]}>
            <boxGeometry args={[0.48, 0.48, 0.08]} />
          </mesh>

          {/* Boom arm body */}
          <mesh material={genieBlue} position={[0, 1.75, 0]} castShadow>
            <boxGeometry args={[0.38, 3.5, 0.4]} />
          </mesh>
          {/* Arm stiffener ribs */}
          {[0.8, 1.75, 2.7].map((y, i) => (
            <mesh key={i} material={midSteel} position={[0, y, 0]}>
              <boxGeometry args={[0.42, 0.05, 0.44]} />
            </mesh>
          ))}

          {/* Hydraulic piston (lower boom) */}
          <HydPiston length={1.8} offset={-0.3} />

          {/* Hydraulic hoses along lower boom */}
          <HydHoses length={3.5} />

          {/* Mounting bracket at mid-arm */}
          <mesh material={darkSteel} position={[-0.22, 2.2, 0]}>
            <boxGeometry args={[0.08, 0.18, 0.42]} />
          </mesh>

          {/* ═══════════════════════════════════════════════════
              UPPER BOOM PIVOT — at tip of lower boom
          ═══════════════════════════════════════════════════ */}
          <group position={[0, 3.5, 0]}>
            {/* Knuckle sphere */}
            <mesh material={darkSteel}>
              <sphereGeometry args={[0.26, 14, 14]} />
            </mesh>
            {/* Pivot pin */}
            <mesh material={chrome} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.065, 0.065, 0.58, 10]} />
            </mesh>
            {/* Side plates */}
            <mesh material={genieBlue} position={[0, 0, 0.28]}>
              <boxGeometry args={[0.54, 0.54, 0.09]} />
            </mesh>
            <mesh material={genieBlue} position={[0, 0, -0.28]}>
              <boxGeometry args={[0.54, 0.54, 0.09]} />
            </mesh>

            {/* ═══════════════════════════════════════════════════
                UPPER BOOM — pivots Z
            ═══════════════════════════════════════════════════ */}
            <group ref={upperBoomRef} rotation={[0, 0, -0.55]}>
              {/* Boom arm body */}
              <mesh material={genieBlue} position={[0, 1.5, 0]} castShadow>
                <boxGeometry args={[0.33, 3.0, 0.35]} />
              </mesh>
              {/* Stiffener ribs */}
              {[0.65, 1.5, 2.35].map((y, i) => (
                <mesh key={i} material={midSteel} position={[0, y, 0]}>
                  <boxGeometry args={[0.37, 0.05, 0.39]} />
                </mesh>
              ))}

              {/* Hydraulic piston (upper boom) */}
              <HydPiston length={1.5} offset={-0.28} />

              {/* Hoses */}
              <HydHoses length={3.0} />

              {/* Level compensator arm (keeps basket level) */}
              <mesh material={chrome} position={[0.22, 2.6, 0]} rotation={[0, 0, -0.12]}>
                <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
              </mesh>

              {/* ═══════════════════════════════════════════════════
                  JIB PIVOT — at tip of upper boom
              ═══════════════════════════════════════════════════ */}
              <group position={[0, 3.0, 0]}>
                {/* Knuckle */}
                <mesh material={darkSteel}>
                  <sphereGeometry args={[0.2, 12, 12]} />
                </mesh>
                {/* Pivot pin */}
                <mesh material={chrome} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.055, 0.055, 0.5, 10]} />
                </mesh>
                {/* Side plates */}
                <mesh material={genieBlue} position={[0, 0, 0.22]}>
                  <boxGeometry args={[0.42, 0.42, 0.08]} />
                </mesh>
                <mesh material={genieBlue} position={[0, 0, -0.22]}>
                  <boxGeometry args={[0.42, 0.42, 0.08]} />
                </mesh>

                {/* ═══════════════════════════════════════════════════
                    JIB — pivots Z
                ═══════════════════════════════════════════════════ */}
                <group ref={jibRef} rotation={[0, 0, 0.38]}>
                  {/* Jib arm */}
                  <mesh material={genieBlue} position={[0, 0.62, 0]} castShadow>
                    <boxGeometry args={[0.24, 1.26, 0.26]} />
                  </mesh>

                  {/* Jib hydraulic (small) */}
                  <mesh material={chrome} position={[-0.2, 0.45, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
                  </mesh>
                  <mesh material={hydraulicRod} position={[-0.2, 0.85, 0]}>
                    <cylinderGeometry args={[0.028, 0.028, 0.5, 8]} />
                  </mesh>

                  {/* Level link rod */}
                  <mesh material={chrome} position={[0.2, 0.6, 0]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.9, 8]} />
                  </mesh>

                  {/* ── BASKET ─────────────────────────────────────── */}
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
