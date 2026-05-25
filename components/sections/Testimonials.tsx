"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    company: "Constructora del Valle S.A. de C.V.",
    contact: "Ing. Roberto M., Director de Operaciones",
    industry: "Construcción",
    text: "Llevamos 3 años trabajando con VERTIKAL. Su flota de Genie siempre está en perfectas condiciones y su servicio técnico nunca nos ha fallado. En un proyecto con 8 plataformas simultáneas, cero tiempos muertos.",
    rating: 5,
    equipos: "Genie GS-2632 y Z-45",
  },
  {
    company: "Logística Norte de México",
    contact: "Lic. Patricia V., Gerente de Almacén",
    industry: "Logística y Almacenaje",
    text: "Rentamos plataformas JLG para nuestro CEDIS en Querétaro. El proceso fue rapidísimo: cotización el lunes, entrega el miércoles. El equipo llegó en perfectas condiciones y el operador certificado que nos mandaron fue de gran apoyo.",
    rating: 5,
    equipos: "JLG 1932R y 3246ES",
  },
  {
    company: "Grupo Industrial MX",
    contact: "Ing. Carlos H., Jefe de Mantenimiento",
    industry: "Manufactura Industrial",
    text: "Compramos dos Haulotte HA16 para nuestra planta. El asesoramiento técnico antes de la compra fue excelente. Ya llevan 18 meses operando sin falla mayor. Las refacciones las conseguimos con VERTIKAL en días.",
    rating: 5,
    equipos: "Haulotte HA16 RTJ",
  },
];

export function Testimonials() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gridRef.current
              ?.querySelectorAll<HTMLElement>(".testimonial-card")
              .forEach((card, i) => {
                setTimeout(() => {
                  card.style.opacity = "1";
                  card.style.transform = "translateY(0)";
                }, i * 150);
              });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-vk-black/95 to-vk-graphite/90" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.3em] text-vk-orange uppercase">
            Lo que dicen nuestros clientes
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-display text-white"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            CLIENTES QUE{" "}
            <span className="text-vk-orange">CONFÍAN EN NOSOTROS</span>
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-vk-orange to-transparent" />
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.company}
              className="testimonial-card relative rounded-2xl border border-vk-white/10 bg-vk-black/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-vk-orange/30 hover:shadow-2xl"
              style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              {/* Quote icon */}
              <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-vk-orange/10 border border-vk-orange/20">
                <Quote className="h-5 w-5 text-vk-orange" />
              </div>

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-vk-orange text-vk-orange"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="mb-6 text-sm text-vk-white/75 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Equipment badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-vk-blue/10 border border-vk-blue/20 px-3 py-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-vk-blue" />
                <span className="text-xs text-vk-blue font-semibold">
                  {t.equipos}
                </span>
              </div>

              {/* Company info */}
              <div className="border-t border-vk-white/10 pt-5">
                <div className="font-bold text-white text-sm leading-tight">
                  {t.company}
                </div>
                <div className="mt-1 text-xs text-vk-steel">{t.contact}</div>
                <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-vk-orange/10 px-2.5 py-1">
                  <span className="text-[10px] font-semibold tracking-wide text-vk-orange uppercase">
                    {t.industry}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
