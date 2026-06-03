import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [360, 414, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
};

export default nextConfig;
