"use client";

import { useEffect, useRef } from "react";
import {
  Building2,
  Package,
  Factory,
  Film,
  Music2,
  Radio,
  Anchor,
  Rocket,
} from "lucide-react";

const INDUSTRIES = [
  {
    icon: Building2,
    name: "Construcción",
    description: "Fachadas, estructuras y acabados a gran altura",
  },
  {
    icon: Package,
    name: "Logística",
    description: "Almacenes de alta densidad y racks industriales",
  },
  {
    icon: Factory,
    name: "Mantenimiento Industrial",
    description: "Plantas, refinerías y centros de manufactura",
  },
  {
    icon: Film,
    name: "Cinematografía",
    description: "Producción audiovisual y tomas especiales",
  },
  {
    icon: Music2,
    name: "Eventos",
    description: "Conciertos, festivales y producciones en vivo",
  },
  {
    icon: Radio,
    name: "Telecomunicaciones",
    description: "Torres, antenas y tendido de fibra óptica",
  },
  {
    icon: Anchor,
    name: "Naval",
    description: "Mantenimiento de embarcaciones y diques",
  },
  {
    icon: Rocket,
    name: "Aeroespacial",
    description: "Hangares y mantenimiento de aeronaves",
  },
];

export function Industries() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards =
              gridRef.current?.querySelectorAll<HTMLDivElement>(
                ".industry-card"
              );
            cards?.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "scale(1) translateY(0)";
              }, i * 80);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-vk-black/95 to-vk-graphite/95" />

      {/* Diagonal accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vk-orange/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.3em] text-vk-orange uppercase">
            Sectores atendidos
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-display text-white"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            INDUSTRIAS QUE{" "}
            <span className="text-vk-orange">ELEVAMOS</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-vk-steel">
            Nuestras plataformas trabajan en los sectores más exigentes de
            México. Donde se necesita altura, VERTIKAL está presente.
          </p>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-vk-orange to-transparent" />
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="industry-card group relative rounded-2xl border border-vk-white/5 bg-vk-black/40 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-vk-orange/40 hover:bg-vk-orange/5 hover:scale-105 cursor-default"
                style={{
                  opacity: 0,
                  transform: "scale(0.9) translateY(16px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-vk-orange/10 border border-vk-orange/20 group-hover:bg-vk-orange/20 transition-colors duration-200">
                  <Icon className="h-6 w-6 text-vk-orange" />
                </div>
                <h3 className="mb-2 text-sm font-bold text-white">
                  {industry.name}
                </h3>
                <p className="text-xs text-vk-steel leading-relaxed">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
