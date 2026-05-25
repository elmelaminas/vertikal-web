import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for proper tree-shaking of Three.js
  transpilePackages: ["three"],
};

export default nextConfig;
