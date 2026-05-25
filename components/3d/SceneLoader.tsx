"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => (
    <div
      className="fixed inset-0 bg-gradient-to-b from-vk-black via-vk-blue-dark/20 to-vk-black"
      style={{ zIndex: -10 }}
      aria-hidden="true"
    />
  ),
});

export function SceneLoader() {
  return <Scene />;
}
