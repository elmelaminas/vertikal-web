"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useState } from "react";

const GEO_URL =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/mexico/mexico-states.json";

type CoverageLevel = "primary" | "extended";

const COVERAGE_STATES: Record<string, { level: CoverageLevel }> = {
  "Distrito Federal": { level: "primary" },
  "Ciudad de México": { level: "primary" },
  "México": { level: "primary" },
  "Hidalgo": { level: "primary" },
  "Puebla": { level: "primary" },
  "Querétaro de Arteaga": { level: "extended" },
  "Querétaro": { level: "extended" },
  "Guanajuato": { level: "extended" },
  "Morelos": { level: "extended" },
  "Tlaxcala": { level: "extended" },
  "Jalisco": { level: "extended" },
  "Veracruz de Ignacio de la Llave": { level: "extended" },
  "Veracruz": { level: "extended" },
  "San Luis Potosí": { level: "extended" },
  "Aguascalientes": { level: "extended" },
};

const STATE_COLORS: Record<CoverageLevel | "default", string> = {
  primary: "#E87722",
  extended: "#1E4D8C",
  default: "#1A2535",
};

const MARKERS = [
  { name: "CDMX", coordinates: [-99.1332, 19.4326] as [number, number] },
  { name: "Puebla", coordinates: [-98.2063, 19.0414] as [number, number] },
  { name: "Hidalgo", coordinates: [-98.7397, 20.1011] as [number, number] },
];

export function MexicoMap() {
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      {tooltip && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 rounded-lg bg-vk-black/90 border border-vk-orange/40 px-3 py-1.5 text-xs font-semibold text-vk-orange pointer-events-none">
          {tooltip}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1100, center: [-102, 24] }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName =
                geo.properties.name_1 ||
                geo.properties.NAME_1 ||
                geo.properties.name;
              const coverage = COVERAGE_STATES[stateName];
              const color = coverage
                ? STATE_COLORS[coverage.level]
                : STATE_COLORS.default;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={color}
                  stroke="#0A1628"
                  strokeWidth={0.8}
                  style={{
                    default: { outline: "none", opacity: coverage ? 1 : 0.6 },
                    hover: {
                      outline: "none",
                      fill: coverage ? "#FF8A2B" : "#2A3A4A",
                      cursor: coverage ? "pointer" : "default",
                      opacity: 1,
                    },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={() => coverage && setTooltip(stateName)}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          }
        </Geographies>

        {MARKERS.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={5} fill="#E87722" stroke="#FF8A2B" strokeWidth={1.5} />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fontSize: "8px", fill: "#FF8A2B", fontWeight: "bold" }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      <div className="mt-3 flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-[#E87722]" />
          <span className="text-xs text-vk-white/70">Zona principal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-[#1E4D8C]" />
          <span className="text-xs text-vk-white/70">Cobertura extendida</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-[#1A2535]" />
          <span className="text-xs text-vk-white/70">República Mexicana</span>
        </div>
      </div>
    </div>
  );
}
