"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const MexicoMap = dynamic(
  () => import("@/components/sections/MexicoMap").then((m) => m.MexicoMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 w-full items-center justify-center text-vk-steel text-sm">
        Cargando mapa...
      </div>
    ),
  }
);

const COVERAGE_ZONES = [
  { name: "Ciudad de México", priority: true },
  { name: "Estado de México", priority: true },
  { name: "Puebla", priority: true },
  { name: "Hidalgo", priority: true },
  { name: "Querétaro", priority: false },
  { name: "Guanajuato", priority: false },
  { name: "Jalisco", priority: false },
  { name: "Morelos", priority: false },
  { name: "Tlaxcala", priority: false },
  { name: "Todo el Bajío", priority: false },
];


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
              className="coverage-reveal mt-6 rounded-2xl border border-vk-orange/20 bg-vk-orange/5 p-4"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "0.25s" }}
            >
              <p className="text-base font-bold text-vk-orange mb-1">
                🇲🇽 Operamos en toda la República Mexicana
              </p>
              <p className="text-sm text-vk-white/70 leading-relaxed">
                Operaciones principales en CDMX, Estado de México, Puebla e Hidalgo.
                Coordinamos entregas a cualquier estado con logística especializada
                para equipo pesado.
              </p>
            </div>

            <div
              className="coverage-reveal mt-4 rounded-2xl border border-vk-blue/20 bg-vk-blue/5 p-6"
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
