"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import { Platform } from "./Platform";

const skyDawn = new THREE.Color("#060818");
const skySunset = new THREE.Color("#1a0702");
const fogDawn = new THREE.Color("#060818");
const fogSunset = new THREE.Color("#180501");
const _tmpColor = new THREE.Color();

function SceneBackground() {
  const { scene } = useThree();

  useFrame(() => {
    const p = scrollStore.progress;
    _tmpColor.lerpColors(skyDawn, skySunset, p * 0.65);
    scene.background = _tmpColor.clone();
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerpColors(fogDawn, fogSunset, p * 0.55);
    }
  });

  return null;
}

function CameraRig() {
  const { camera } = useThree();
  const smooth = useRef(0);
  const lookTarget = useRef(new THREE.Vector3(0, -1, 0));

  useFrame(() => {
    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.035);
    const p = smooth.current;

    camera.position.set(
      THREE.MathUtils.lerp(4.5, 2.5, p),
      THREE.MathUtils.lerp(0.5, 10, p),
      THREE.MathUtils.lerp(9, 6.5, p)
    );

    lookTarget.current.set(0, THREE.MathUtils.lerp(-1.5, 4, p), 0);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function Ground() {
  return (
    <group position={[0, -3.5, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#222222" metalness={0.05} roughness={0.95} />
      </mesh>
      <gridHelper args={[80, 24, "#1E4D8C", "#181818"]} />
    </group>
  );
}

function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = Math.random() * 16 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const p = scrollStore.progress;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.08 + p * 0.45, 0.05);
  });

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.045,
        color: "#E87722",
        transparent: true,
        opacity: 0.08,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    []
  );

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function OrangeSpotlight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    const p = scrollStore.progress;
    lightRef.current.intensity = THREE.MathUtils.lerp(1.2, 5, p);
    lightRef.current.position.y = THREE.MathUtils.lerp(-2, 10, p);
  });

  return (
    <pointLight
      ref={lightRef}
      position={[-4, -2, 3]}
      color="#FF8A2B"
      intensity={1.2}
      distance={30}
    />
  );
}

export function Scene() {
  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: -10 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [4.5, 0.5, 9], fov: 55, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        shadows
      >
        <fog attach="fog" args={["#060818", 22, 75]} />
        <SceneBackground />
        <CameraRig />

        <ambientLight intensity={0.22} color="#8090c0" />
        <directionalLight
          position={[8, 20, 5]}
          intensity={1.7}
          color="#fff5e0"
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[0, 15, 0]} color="#4060a0" intensity={0.7} distance={35} />
        <OrangeSpotlight />

        <Stars
          radius={80}
          depth={60}
          count={3000}
          factor={3}
          saturation={0}
          fade
          speed={0.3}
        />

        <Suspense fallback={null}>
          <Ground />
          <AmbientParticles />
          <Platform />
        </Suspense>
      </Canvas>
    </div>
  );
}
