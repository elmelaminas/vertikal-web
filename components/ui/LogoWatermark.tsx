"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CSSProperties } from "react";

type Position = "center" | "top-right" | "bottom-left" | "bottom-right" | "top-left";
type Variant   = "dark" | "light" | "white" | "navy";

interface LogoWatermarkProps {
  position?: Position;
  size?: number;
  opacity?: number;
  rotation?: number;
  float?: boolean;
  variant?: Variant;
  className?: string;
}

function positionStyle(position: Position, rotation: number): CSSProperties {
  const rot = `rotate(${rotation}deg)`;
  switch (position) {
    case "center":
      return { left: "50%", top: "50%", transform: `translate(-50%, -50%) ${rot}` };
    case "top-right":
      return { right: "-8%", top: "-8%", transform: rot };
    case "bottom-left":
      return { left: "-8%", bottom: "-8%", transform: rot };
    case "bottom-right":
      return { right: "-8%", bottom: "-8%", transform: rot };
    case "top-left":
      return { left: "-8%", top: "-8%", transform: rot };
  }
}

function variantFilter(variant: Variant): string {
  switch (variant) {
    case "white":
      // Force everything to white — background was already made transparent
      return "brightness(0) invert(1)";
    case "navy":
      // Force to VERTIKAL blue #1E4D8C
      return "brightness(0) saturate(100%) invert(22%) sepia(45%) saturate(1500%) hue-rotate(195deg) brightness(90%) contrast(95%)";
    default:
      // "dark" and "light" — keep original logo colors (blue + orange + grey)
      return "none";
  }
}

export function LogoWatermark({
  position = "center",
  size = 600,
  opacity = 0.15,
  rotation = 0,
  float = false,
  variant = "dark",
  className = "",
}: LogoWatermarkProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        ...positionStyle(position, rotation),
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ filter: variantFilter(variant) }}
        animate={float ? { y: [0, -20, 0] } : undefined}
        transition={float ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <Image
          src="/logo-vertikal-transparent.png"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
