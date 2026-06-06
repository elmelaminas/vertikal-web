"use client";

import { useState } from "react";

interface StateInfo {
  name: string;
  level: "primary" | "extended" | "republic";
}

const STATES_INFO: Record<string, StateInfo> = {
  "cdmx": { name: "Ciudad de México", level: "primary" },
  "edomex": { name: "Estado de México", level: "primary" },
  "hidalgo": { name: "Hidalgo", level: "primary" },
  "puebla": { name: "Puebla", level: "primary" },
  "queretaro": { name: "Querétaro", level: "extended" },
  "guanajuato": { name: "Guanajuato", level: "extended" },
  "jalisco": { name: "Jalisco", level: "extended" },
  "morelos": { name: "Morelos", level: "extended" },
  "tlaxcala": { name: "Tlaxcala", level: "extended" },
  "veracruz": { name: "Veracruz", level: "extended" },
};

const COLORS = {
  primary: "#E87722",
  extended: "#1E4D8C",
  republic: "#1A2535",
};

export function MexicoMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  const getColor = (stateId: string) => {
    const info = STATES_INFO[stateId];
    if (!info) return COLORS.republic;
    return COLORS[info.level];
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Tooltip */}
      <div className="h-8 flex items-center justify-center mb-2">
        {hovered && STATES_INFO[hovered] && (
          <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {STATES_INFO[hovered].name}
          </span>
        )}
      </div>

      <svg
        viewBox="0 0 800 500"
        className="w-full flex-1"
        style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))" }}
      >
        {/* Silueta general de México (fondo) */}
        <path
          d="M80 150 L120 120 L180 110 L240 115 L300 105 L360 95 L420 85
             L500 90 L560 110 L610 130 L650 160 L670 200 L660 250
             L640 290 L620 320 L600 360 L570 390 L540 410 L510 420
             L480 415 L460 400 L450 380 L440 360 L420 345 L400 355
             L380 370 L360 380 L340 375 L320 360 L300 345 L275 340
             L250 350 L230 360 L210 355 L195 340 L185 320 L170 305
             L155 295 L135 290 L110 280 L90 260 L75 235 L70 210 Z"
          fill="#162030"
          stroke="#0A1628"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Estado de México */}
        <g
          onMouseEnter={() => setHovered("edomex")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M390 255 L415 240 L450 242 L465 260 L460 285 L450 295 L430 300 L410 295 L395 278 Z"
            fill={getColor("edomex")}
            stroke="#0A1628"
            strokeWidth="1.5"
            opacity={hovered === "edomex" ? 1 : 0.85}
          />
          <text x="427" y="272" textAnchor="middle"
            style={{ fontSize: 8, fill: "#fff", fontWeight: 600 }}>
            Edo Méx
          </text>
        </g>

        {/* Hidalgo */}
        <g
          onMouseEnter={() => setHovered("hidalgo")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M415 220 L455 215 L475 235 L465 255 L450 242 L415 240 Z"
            fill={getColor("hidalgo")}
            stroke="#0A1628"
            strokeWidth="1.5"
            opacity={hovered === "hidalgo" ? 1 : 0.85}
          />
          <text x="445" y="233" textAnchor="middle"
            style={{ fontSize: 8, fill: "#fff", fontWeight: 600 }}>
            Hidalgo
          </text>
        </g>

        {/* Puebla */}
        <g
          onMouseEnter={() => setHovered("puebla")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M440 295 L465 285 L490 290 L500 315 L490 335 L465 340 L445 325 L440 305 Z"
            fill={getColor("puebla")}
            stroke="#0A1628"
            strokeWidth="1.5"
            opacity={hovered === "puebla" ? 1 : 0.85}
          />
          <text x="470" y="315" textAnchor="middle"
            style={{ fontSize: 8, fill: "#fff", fontWeight: 600 }}>
            Puebla
          </text>
        </g>

        {/* Querétaro */}
        <g
          onMouseEnter={() => setHovered("queretaro")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M375 230 L410 220 L415 240 L390 255 L370 248 Z"
            fill={getColor("queretaro")}
            stroke="#0A1628"
            strokeWidth="1.5"
            opacity={hovered === "queretaro" ? 1 : 0.75}
          />
          <text x="390" y="238" textAnchor="middle"
            style={{ fontSize: 7, fill: "#fff" }}>
            Qro
          </text>
        </g>

        {/* Guanajuato */}
        <g
          onMouseEnter={() => setHovered("guanajuato")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M330 230 L375 225 L375 248 L355 260 L325 252 L315 240 Z"
            fill={getColor("guanajuato")}
            stroke="#0A1628"
            strokeWidth="1.5"
            opacity={hovered === "guanajuato" ? 1 : 0.75}
          />
          <text x="347" y="244" textAnchor="middle"
            style={{ fontSize: 7, fill: "#fff" }}>
            Gto
          </text>
        </g>

        {/* Jalisco */}
        <g
          onMouseEnter={() => setHovered("jalisco")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M260 220 L315 215 L330 230 L315 260 L290 270 L265 255 L250 235 Z"
            fill={getColor("jalisco")}
            stroke="#0A1628"
            strokeWidth="1.5"
            opacity={hovered === "jalisco" ? 1 : 0.75}
          />
          <text x="290" y="244" textAnchor="middle"
            style={{ fontSize: 7, fill: "#fff" }}>
            Jal
          </text>
        </g>

        {/* Morelos */}
        <g
          onMouseEnter={() => setHovered("morelos")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M420 305 L440 305 L445 325 L430 330 L415 320 Z"
            fill={getColor("morelos")}
            stroke="#0A1628"
            strokeWidth="1.5"
            opacity={hovered === "morelos" ? 1 : 0.75}
          />
          <text x="430" y="318" textAnchor="middle"
            style={{ fontSize: 7, fill: "#fff" }}>
            Mor
          </text>
        </g>

        {/* Tlaxcala */}
        <g
          onMouseEnter={() => setHovered("tlaxcala")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M460 275 L475 272 L480 285 L465 288 Z"
            fill={getColor("tlaxcala")}
            stroke="#0A1628"
            strokeWidth="1.5"
            opacity={hovered === "tlaxcala" ? 1 : 0.75}
          />
          <text x="470" y="282" textAnchor="middle"
            style={{ fontSize: 6, fill: "#fff" }}>
            Tlax
          </text>
        </g>

        {/* Veracruz */}
        <g
          onMouseEnter={() => setHovered("veracruz")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <path
            d="M490 270 L520 255 L540 280 L535 330 L510 350 L490 335 L500 315 L490 290 Z"
            fill={getColor("veracruz")}
            stroke="#0A1628"
            strokeWidth="1.5"
            opacity={hovered === "veracruz" ? 1 : 0.75}
          />
          <text x="513" y="305" textAnchor="middle"
            style={{ fontSize: 7, fill: "#fff" }}>
            Ver
          </text>
        </g>

        {/* Ciudad de México (punto encima de Edomex) */}
        <g
          onMouseEnter={() => setHovered("cdmx")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <circle
            cx="430" cy="283"
            r="10"
            fill={getColor("cdmx")}
            stroke="#FF8A2B"
            strokeWidth="2"
            opacity={hovered === "cdmx" ? 1 : 0.95}
          />
          <circle cx="430" cy="283" r="4" fill="#FF8A2B" />
          <text x="430" y="270" textAnchor="middle"
            style={{ fontSize: 9, fill: "#FF8A2B", fontWeight: 700 }}>
            CDMX
          </text>
        </g>

        {/* Leyenda */}
        <g transform="translate(30, 370)">
          <rect x="0" y="0" width="165" height="90" rx="8"
            fill="#0A1628" fillOpacity="0.85" stroke="#1E4D8C" strokeWidth="1" />
          <circle cx="16" cy="22" r="8" fill="#E87722" />
          <text x="32" y="26" style={{ fontSize: 10, fill: "#fff" }}>
            Zona principal
          </text>
          <rect x="8" y="38" width="16" height="11" rx="2" fill="#1E4D8C" />
          <text x="32" y="48" style={{ fontSize: 10, fill: "#fff" }}>
            Cobertura extendida
          </text>
          <rect x="8" y="58" width="16" height="11" rx="2" fill="#162030"
            stroke="#1E4D8C" strokeWidth="1" />
          <text x="32" y="68" style={{ fontSize: 10, fill: "#aaa" }}>
            República Mexicana
          </text>
        </g>
      </svg>
    </div>
  );
}
