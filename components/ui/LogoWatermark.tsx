"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CSSProperties } from "react";

type Position = "center" | "top-right" | "bottom-left" | "bottom-right" | "top-left";

interface LogoWatermarkProps {
  position?: Position;
  size?: number;
  opacity?: number;
  rotation?: number;
  float?: boolean;
  variant?: "light" | "dark";
  className?: string;
}

const POSITION_STYLES: Record<Position, CSSProperties> = {
  center:        { left: "50%", top: "50%", transform: "translate(-50%, -50%)" },
  "top-right":   { right: "-8%", top: "-8%" },
  "bottom-left": { left: "-8%", bottom: "-8%" },
  "bottom-right":{ right: "-8%", bottom: "-8%" },
  "top-left":    { left: "-8%", top: "-8%" },
};

export function LogoWatermark({
  position = "center",
  size = 600,
  opacity = 0.08,
  rotation = 0,
  float = false,
  variant = "dark",
  className = "",
}: LogoWatermarkProps) {
  const blendMode = variant === "dark" ? "screen" : "multiply";
  const posStyle = POSITION_STYLES[position];

  return (
    <div
      className={`pointer-events-none absolute z-0 ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        mixBlendMode: blendMode as CSSProperties["mixBlendMode"],
        ...posStyle,
        ...(rotation !== 0 && position !== "center"
          ? { transform: `rotate(${rotation}deg)` }
          : position === "center"
          ? { transform: `translate(-50%, -50%) rotate(${rotation}deg)` }
          : {}),
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={float ? { y: [0, -20, 0] } : undefined}
        transition={
          float
            ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <Image
          src="/logo-vertikal.png"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
