"use client";

import { useEffect, useRef } from "react";
import { TrendingUp, RotateCcw, Settings, Zap } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

const SERVICES = [
  {
    id: "renta",
    icon: RotateCcw,
    title: "RENTA",
    subtitle: "Disponibilidad inmediata",
    description:
      "Flota amplia lista para entrega inmediata. Contratos flexibles que se adaptan a la duración de tu proyecto.",
    benefits: [
      "Entrega en 24-48 horas en CDMX",
      "Contratos desde 1 día hasta 12 meses",
      "Seguro incluido y mantenimiento preventivo",
    ],
    color: "vk-orange",
    gradient: "from-orange-900/30 to-transparent",
    messageKey: "renta" as const,
  },
  {
    id: "venta",
    icon: TrendingUp,
    title: "VENTA",
    subtitle: "Inversión inteligente",
    description:
      "Adquiere tu plataforma elevable nueva o seminueva con las mejores condiciones de financiamiento del mercado.",
    benefits: [
      "Equipos nuevos y seminuevos certificados",
      "Financiamiento hasta 48 meses",
      "Garantía de fábrica incluida",
    ],
    color: "vk-blue",
    gradient: "from-vk-blue-dark/30 to-transparent",
    messageKey: "venta" as const,
  },
  {
    id: "servicio",
    icon: Settings,
    title: "SERVICIO",
    subtitle: "Técnicos certificados",
    description:
      "Mantenimiento preventivo y correctivo por técnicos certificados por las marcas. Diagnóstico especializado.",
    benefits: [
      "Certificación directa de Genie, JLG y Haulotte",
      "Servicio en sitio o en taller",
      "Reportes detallados de cada intervención",
    ],
    color: "vk-orange",
    gradient: "from-orange-900/30 to-transparent",
    messageKey: "servicio" as const,
  },
  {
    id: "refacciones",
    icon: Zap,
    title: "REFACCIONES",
    subtitle: "Originales y compatibles",
    description:
      "Stock permanente de refacciones 100% originales para Genie, JLG y Haulotte. Importación directa.",
    benefits: [
      "Piezas originales garantizadas",
      "Stock de más de 2,000 refacciones",
      "Envío inmediato a todo México",
    ],
    color: "vk-blue",
    gradient: "from-vk-blue-dark/30 to-transparent",
    messageKey: "refacciones" as const,
  },
] as const;

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards =
              gridRef.current?.querySelectorAll<HTMLDivElement>(".service-card");
            cards?.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateX(0)";
              }, i * 100);
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
      <div className="absolute inset-0 bg-gradient-to-b from-vk-black/95 via-vk-blue-dark/20 to-vk-black/95" />
      <div className="absolute inset-0 grid-overlay opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.3em] text-vk-orange uppercase">
            Lo que hacemos
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-display text-white"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            SERVICIOS{" "}
            <span className="text-vk-orange">INTEGRALES</span>
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-vk-orange to-transparent" />
        </div>

        {/* Services grid */}
        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isOrange = service.color === "vk-orange";
            return (
              <div
                key={service.id}
                id={service.id}
                className={`service-card group relative rounded-2xl border bg-vk-black/60 backdrop-blur-sm p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden ${
                  isOrange
                    ? "border-vk-orange/20 hover:border-vk-orange/50"
                    : "border-vk-blue/20 hover:border-vk-blue/50"
                }`}
                style={{
                  opacity: 0,
                  transform: `translateX(${i % 2 === 0 ? -20 : 20}px)`,
                  transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${
                      isOrange
                        ? "bg-vk-orange/15 border border-vk-orange/30"
                        : "bg-vk-blue/15 border border-vk-blue/30"
                    }`}
                  >
                    <Icon
                      className={`h-7 w-7 ${isOrange ? "text-vk-orange" : "text-vk-blue"}`}
                    />
                  </div>

                  {/* Title */}
                  <div className="mb-1 text-xs font-semibold tracking-widest text-vk-steel uppercase">
                    {service.subtitle}
                  </div>
                  <h3
                    className="mb-4 text-3xl font-display text-white"
                    style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm text-vk-steel leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <ul className="mb-8 space-y-2">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <div
                          className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                            isOrange ? "bg-vk-orange" : "bg-vk-blue"
                          }`}
                        />
                        <span className="text-xs text-vk-white/70 leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={buildWhatsAppLink(WHATSAPP_MESSAGES[service.messageKey])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-white transition-all duration-200 ${
                      isOrange
                        ? "bg-vk-orange hover:bg-vk-orange-hot"
                        : "bg-vk-blue hover:bg-vk-blue-dark"
                    }`}
                  >
                    Solicitar información
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
