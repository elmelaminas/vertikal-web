"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { buildWhatsAppLink, WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from "@/lib/constants";

export function ContactCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  return (
    <section
      id="contacto"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-[#1A2A3A] via-[#0F1E30] to-[#0A0A0A]"
    >
      {/* Logo gigante con parallax */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 800,
          height: 800,
          y: logoY,
          scale: logoScale,
          opacity: 0.07,
          mixBlendMode: "screen",
        }}
      >
        <Image src="/logo-vertikal.png" alt="" fill className="object-contain" aria-hidden="true" />
      </motion.div>

      {/* Orange accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E87722]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E87722]/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="mb-6 inline-block text-xs font-semibold tracking-[0.3em] text-[#E87722] uppercase">
            Hablemos hoy mismo
          </span>
          <h2
            className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            ¿LISTO PARA
            <br />
            <span className="text-[#E87722]">ELEVAR TU OBRA?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70 leading-relaxed">
            Nuestro equipo de ventas responde en minutos. Cotización sin compromiso,
            entrega inmediata y el mejor precio del mercado.
          </p>

          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#25D366" }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            CONTACTAR A GERENTE DE VENTAS
          </a>
        </motion.div>

        {/* Contact info grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10 pt-16"
        >
          {[
            {
              icon: Phone,
              label: "Teléfono / WhatsApp",
              value: `+52 ${WHATSAPP_NUMBER.slice(2, 4)} ${WHATSAPP_NUMBER.slice(4, 8)}-${WHATSAPP_NUMBER.slice(8)}`,
              href: buildWhatsAppLink(),
            },
            {
              icon: Mail,
              label: "Correo electrónico",
              value: "ventas@vertikal.mx",
              href: "mailto:ventas@vertikal.mx",
            },
            {
              icon: MapPin,
              label: "Ubicación",
              value: "CDMX y Área Metropolitana",
              href: "#cobertura",
            },
            {
              icon: Clock,
              label: "Horario de atención",
              value: "Lun–Vie 8:00–18:00\nSáb 9:00–14:00",
              href: undefined,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm"
              >
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E87722]/15 border border-[#E87722]/20">
                  <Icon className="h-5 w-5 text-[#E87722]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-white hover:text-[#E87722] transition-colors whitespace-pre-line"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-white whitespace-pre-line">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
