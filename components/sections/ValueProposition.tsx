"use client";

import { useEffect, useRef } from "react";
import { Award, Wrench, Package, Clock } from "lucide-react";

const VALUES = [
  {
    icon: Award,
    title: "Marcas Líderes",
    description:
      "Distribuidores autorizados de Genie, JLG y Haulotte, las marcas más confiables del mundo en plataformas elevables.",
    color: "text-vk-orange",
    bg: "bg-vk-orange/10",
    border: "border-vk-orange/20",
  },
  {
    icon: Wrench,
    title: "Servicio Técnico Certificado",
    description:
      "Técnicos certificados directamente por las marcas, con equipos de diagnóstico especializados y capacitación continua.",
    color: "text-vk-blue",
    bg: "bg-vk-blue/10",
    border: "border-vk-blue/20",
  },
  {
    icon: Package,
    title: "Refacciones Originales",
    description:
      "Stock permanente de refacciones 100% originales. Importación directa para garantizar compatibilidad y durabilidad.",
    color: "text-vk-orange",
    bg: "bg-vk-orange/10",
    border: "border-vk-orange/20",
  },
  {
    icon: Clock,
    title: "Renta Inmediata",
    description:
      "Flota disponible para entrega inmediata en CDMX y área metropolitana. Contratos flexibles desde 1 día hasta 12 meses.",
    color: "text-vk-blue",
    bg: "bg-vk-blue/10",
    border: "border-vk-blue/20",
  },
];

export function ValueProposition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards =
              ref.current?.querySelectorAll<HTMLDivElement>(".value-card");
            cards?.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, i * 120);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vk-graphite/95 to-vk-graphite/98" />
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.3em] text-vk-orange uppercase">
            Por qué elegirnos
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-display text-white"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            LA DIFERENCIA{" "}
            <span className="text-vk-orange">VERTIKAL</span>
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-vk-orange to-transparent" />
        </div>

        {/* Cards */}
        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className={`value-card rounded-2xl border ${value.border} ${value.bg} p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-default`}
                style={{
                  opacity: 0,
                  transform: "translateY(24px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${value.bg} border ${value.border}`}
                >
                  <Icon className={`h-7 w-7 ${value.color}`} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-white leading-tight">
                  {value.title}
                </h3>
                <p className="text-sm text-vk-steel leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
