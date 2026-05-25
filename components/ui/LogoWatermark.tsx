"use client";

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

// Posicionamiento puro por CSS — no Tailwind translate (evita conflictos con style.transform)
const POSITION_STYLES: Record<Position, CSSProperties> = {
  center:         { left: "50%", top: "50%", transform: "translate(-50%, -50%)" },
  "top-right":    { right: "-10%", top: "-10%" },
  "bottom-left":  { left: "-10%", bottom: "-10%" },
  "bottom-right": { right: "-10%", bottom: "-10%" },
  "top-left":     { left: "-10%", top: "-10%" },
};

export function LogoWatermark({
  position = "center",
  size = 600,
  opacity = 0.12,
  rotation = 0,
  float = false,
  variant = "dark",
  className = "",
}: LogoWatermarkProps) {
  const textColor = variant === "dark" ? "#FFFFFF" : "#1E4D8C";
  const accentColor = "#E87722";

  const posStyle = POSITION_STYLES[position];
  // Para center el transform ya está puesto; para otros, solo rotamos
  const transformStr =
    position === "center"
      ? `translate(-50%, -50%) rotate(${rotation}deg)`
      : `rotate(${rotation}deg)`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        ...posStyle,
        transform: transformStr,
      }}
    >
      <motion.div
        className="w-full h-full flex flex-col items-center justify-center gap-4"
        animate={float ? { y: [0, -20, 0] } : undefined}
        transition={
          float ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined
        }
      >
        {/* ── SVG de plataforma elevable estilizada ── */}
        <svg
          viewBox="0 0 160 180"
          style={{ width: size * 0.55, height: "auto" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Canastilla (rectángulo superior) */}
          <rect x="88" y="8" width="62" height="38" rx="3"
            stroke={accentColor} strokeWidth="6" />
          {/* Barras verticales internas de la canastilla */}
          <line x1="103" y1="8"  x2="103" y2="46" stroke={accentColor} strokeWidth="3" />
          <line x1="119" y1="8"  x2="119" y2="46" stroke={accentColor} strokeWidth="3" />
          <line x1="135" y1="8"  x2="135" y2="46" stroke={accentColor} strokeWidth="3" />
          {/* Barra horizontal media */}
          <line x1="88"  y1="27" x2="150" y2="27" stroke={accentColor} strokeWidth="3" />

          {/* Brazo articulado superior */}
          <line x1="94"  y1="46" x2="62"  y2="100"
            stroke={textColor} strokeWidth="10" strokeLinecap="round" />

          {/* Articulación (círculo) */}
          <circle cx="62" cy="100" r="7" fill={textColor} />

          {/* Brazo articulado inferior */}
          <line x1="62"  y1="100" x2="80"  y2="158"
            stroke={textColor} strokeWidth="12" strokeLinecap="round" />

          {/* Chasis / base */}
          <rect x="20" y="158" width="120" height="16" rx="4"
            fill={textColor} />

          {/* Ruedas */}
          <circle cx="42"  cy="174" r="6" fill={accentColor} />
          <circle cx="118" cy="174" r="6" fill={accentColor} />

          {/* Torreta (cuadrado sobre el chasis) */}
          <rect x="62" y="140" width="36" height="20" rx="3"
            fill={accentColor} />
        </svg>

        {/* ── Texto VERTIKAL ── */}
        <span
          style={{
            color: textColor,
            fontSize: size * 0.145,
            fontFamily: "var(--font-bebas), 'Anton', Impact, sans-serif",
            letterSpacing: "0.06em",
            lineHeight: 1,
            display: "block",
          }}
        >
          VERTIKAL
        </span>
      </motion.div>
    </div>
  );
}
