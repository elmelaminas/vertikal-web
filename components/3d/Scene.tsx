"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { Z45Lift } from "./Z45Lift";

// ─── Sky colors ───────────────────────────────────────────────────────────────
const skyNight  = new THREE.Color("#050812");
const skySunset = new THREE.Color("#1c0801");
const fogNight  = new THREE.Color("#050812");
const fogSunset = new THREE.Color("#190401");
const _skyColor = new THREE.Color();

function SceneBackground() {
  const { scene } = useThree();

  useFrame(() => {
    const p = scrollStore.progress;
    _skyColor.lerpColors(skyNight, skySunset, p * 0.7);
    scene.background = _skyColor.clone();
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerpColors(fogNight, fogSunset, p * 0.6);
    }
  });

  return null;
}

function CameraRig() {
  const { camera } = useThree();
  const smooth = useRef(0);
  const lookAt  = useRef(new THREE.Vector3(0, 1, 0));

  useFrame(() => {
    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.03);
    const p = smooth.current;

    // Start: slightly to the side so we see the whole machine + boom
    // End: pull back and up to follow the basket at full extension
    camera.position.set(
      THREE.MathUtils.lerp(7,   5,  p),
      THREE.MathUtils.lerp(1.5, 9,  p),
      THREE.MathUtils.lerp(10,  13, p)
    );

    lookAt.current.set(0, THREE.MathUtils.lerp(0.5, 5.5, p), 0);
    camera.lookAt(lookAt.current);
  });

  return null;
}

function Ground() {
  return (
    <group position={[0, -3.5, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1e1e1e" metalness={0.04} roughness={0.96} />
      </mesh>
      <gridHelper args={[100, 30, "#1E4D8C", "#161616"]} />
    </group>
  );
}

function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 220;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = Math.random() * 18 - 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 28;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.048,
        color: "#E87722",
        transparent: true,
        opacity: 0.06,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    if (!pointsRef.current) return;
    const p = scrollStore.progress;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.016;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.06 + p * 0.42, 0.04);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function OrangeSpotlight() {
  const ref = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!ref.current) return;
    const p = scrollStore.progress;
    ref.current.intensity = THREE.MathUtils.lerp(1.0, 5.5, p);
    ref.current.position.y = THREE.MathUtils.lerp(-1, 11, p);
  });

  return (
    <pointLight
      ref={ref}
      position={[-5, -1, 4]}
      color="#FF8A2B"
      intensity={1.0}
      distance={35}
    />
  );
}

export function Scene() {
  return (
    <div className="fixed inset-0" style={{ zIndex: -10 }} aria-hidden="true">
      <Canvas
        camera={{ position: [7, 1.5, 10], fov: 45, near: 0.1, far: 250 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        shadows
      >
        <fog attach="fog" args={["#050812", 25, 85]} />
        <SceneBackground />
        <CameraRig />

        {/* Lighting */}
        <ambientLight intensity={0.28} color="#707898" />
        <directionalLight
          position={[10, 15, 5]}
          intensity={1.2}
          color="#FFF4E0"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight
          position={[-5, 8, -3]}
          intensity={0.4}
          color="#A0C8FF"
        />
        <pointLight position={[3, 5, 3]} color="#E87722" intensity={0.8} distance={20} />
        <OrangeSpotlight />

        <Stars
          radius={90}
          depth={65}
          count={3000}
          factor={3}
          saturation={0}
          fade
          speed={0.25}
        />

        <Suspense fallback={null}>
          <Ground />
          <AmbientParticles />
          <Z45Lift />
        </Suspense>
      </Canvas>
    </div>
  );
}
