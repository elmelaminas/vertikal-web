"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

const COVERAGE_ZONES = [
  { name: "Ciudad de México", priority: true },
  { name: "Estado de México", priority: true },
  { name: "Querétaro", priority: true },
  { name: "Puebla", priority: true },
  { name: "Guanajuato", priority: false },
  { name: "Jalisco", priority: false },
  { name: "Hidalgo", priority: false },
  { name: "Morelos", priority: false },
  { name: "Tlaxcala", priority: false },
  { name: "Todo el Bajío", priority: false },
];

// Simplified SVG map of Mexico with key states
function MexicoMap() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 500 380"
        className="w-full"
        style={{ filter: "drop-shadow(0 0 20px rgba(30, 77, 140, 0.3))" }}
      >
        {/* Mexico outline - simplified path */}
        <path
          d="M 60 80 L 120 60 L 180 50 L 240 55 L 290 45 L 340 30 L 400 50 L 430 80 L 440 120 L 420 160 L 400 200 L 380 230 L 350 250 L 320 280 L 290 310 L 260 340 L 230 360 L 200 350 L 180 320 L 160 290 L 140 260 L 100 240 L 70 210 L 50 180 L 40 140 Z"
          fill="#1a2a1a"
          stroke="#2a3a2a"
          strokeWidth="1.5"
        />

        {/* Center region (CDMX + Estado de México + Puebla + Querétaro) */}
        <circle cx="230" cy="210" r="45" fill="#E87722" opacity="0.25" />
        <circle cx="230" cy="210" r="35" fill="#E87722" opacity="0.2" />
        <circle cx="230" cy="210" r="20" fill="#E87722" opacity="0.4" />

        {/* Pulse rings */}
        <circle
          cx="230"
          cy="210"
          r="50"
          fill="none"
          stroke="#E87722"
          strokeWidth="1.5"
          opacity="0.5"
          style={{ animation: "pulse-slow 2s ease-in-out infinite" }}
        />

        {/* CDMX point */}
        <circle cx="228" cy="212" r="6" fill="#E87722" />
        <circle cx="228" cy="212" r="3" fill="#FF8A2B" />

        {/* Querétaro */}
        <circle cx="210" cy="190" r="4" fill="#E87722" opacity="0.8" />

        {/* Puebla */}
        <circle cx="250" cy="225" r="4" fill="#E87722" opacity="0.8" />

        {/* Estado de México */}
        <circle cx="215" cy="208" r="4" fill="#E87722" opacity="0.8" />

        {/* Guanajuato */}
        <circle cx="185" cy="185" r="3" fill="#1E4D8C" opacity="0.7" />

        {/* Jalisco */}
        <circle cx="155" cy="185" r="3" fill="#1E4D8C" opacity="0.6" />

        {/* Labels */}
        <text x="238" y="200" fontSize="9" fill="#FF8A2B" fontWeight="bold">
          CDMX
        </text>
        <text x="205" y="180" fontSize="7" fill="#E87722" opacity="0.8">
          QRO
        </text>
        <text x="255" y="238" fontSize="7" fill="#E87722" opacity="0.8">
          PUE
        </text>

        {/* Decorative dots for other states */}
        {[
          [300, 180], [320, 200], [350, 170], [280, 220],
          [160, 160], [130, 170], [100, 190],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill="#1E4D8C"
            opacity="0.4"
          />
        ))}

        {/* Mexico border decoration */}
        <path
          d="M 60 80 L 120 60 L 180 50 L 240 55 L 290 45 L 340 30 L 400 50 L 430 80 L 440 120 L 420 160 L 400 200 L 380 230 L 350 250 L 320 280 L 290 310 L 260 340 L 230 360 L 200 350 L 180 320 L 160 290 L 140 260 L 100 240 L 70 210 L 50 180 L 40 140 Z"
          fill="none"
          stroke="#1E4D8C"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>

      {/* Legend */}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-vk-orange" />
          <span className="text-xs text-vk-white/70">Zona principal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-vk-blue" />
          <span className="text-xs text-vk-white/70">Cobertura extendida</span>
        </div>
      </div>
    </div>
  );
}

export function Coverage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && sectionRef.current) {
          sectionRef.current
            .querySelectorAll<HTMLElement>(".coverage-reveal")
            .forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, i * 150);
            });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-vk-graphite/95 to-vk-black/95" />
      <div className="absolute inset-0 grid-overlay opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: text */}
          <div>
            <div
              className="coverage-reveal"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
            >
              <span className="mb-4 inline-block text-xs font-semibold tracking-[0.3em] text-vk-orange uppercase">
                Dónde operamos
              </span>
              <h2
                className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-display text-white"
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                ZONA DE{" "}
                <span className="text-vk-orange">COBERTURA</span>
              </h2>
              <p className="mb-8 text-vk-steel leading-relaxed">
                Servicio principal en CDMX y Área Metropolitana con entregas en
                24-48 hrs. Cobertura extendida a todo el Bajío y estados
                circundantes.
              </p>
            </div>

            <div
              className="coverage-reveal grid grid-cols-2 gap-3"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "0.15s" }}
            >
              {COVERAGE_ZONES.map((zone) => (
                <div
                  key={zone.name}
                  className={`flex items-center gap-2 rounded-xl p-3 ${
                    zone.priority
                      ? "bg-vk-orange/10 border border-vk-orange/20"
                      : "bg-vk-black/40 border border-vk-white/5"
                  }`}
                >
                  <MapPin
                    className={`h-4 w-4 flex-shrink-0 ${
                      zone.priority ? "text-vk-orange" : "text-vk-steel"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      zone.priority ? "text-white" : "text-vk-steel"
                    }`}
                  >
                    {zone.name}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="coverage-reveal mt-8 rounded-2xl border border-vk-blue/20 bg-vk-blue/5 p-6"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "0.3s" }}
            >
              <p className="text-sm text-vk-white/80 leading-relaxed">
                <strong className="text-vk-orange">¿Fuera del área?</strong>{" "}
                Contáctanos. Coordinamos entregas a cualquier punto de México
                con logística especializada para equipo pesado.
              </p>
            </div>
          </div>

          {/* Right: map */}
          <div
            className="coverage-reveal"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "0.1s" }}
          >
            <div className="rounded-2xl border border-vk-blue/20 bg-vk-black/60 p-8 backdrop-blur-sm">
              <MexicoMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
