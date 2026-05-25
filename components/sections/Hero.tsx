"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      titleRef.current,
      subtitleRef.current,
      ctasRef.current,
    ].filter(Boolean);

    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 200 + i * 150);
    });
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-vk-black/80 via-vk-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-vk-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-vk-orange/30 bg-vk-orange/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-vk-orange animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] text-vk-orange uppercase">
              Genie · JLG · Haulotte · México
            </span>
          </div>

          {/* Main title */}
          <h1
            ref={titleRef}
            className="mb-6 font-display text-6xl sm:text-7xl lg:text-[7rem] leading-none tracking-wide text-vk-white"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            ELEVAMOS
            <br />
            <span className="text-vk-orange">TU PROYECTO</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mb-10 max-w-xl text-lg sm:text-xl text-vk-white/75 leading-relaxed font-light"
          >
            Venta y renta de plataformas elevables{" "}
            <strong className="text-vk-white font-semibold">
              Genie, JLG y Haulotte
            </strong>{" "}
            en México. Articuladas · Tijeras · Telescópicas —{" "}
            <span className="text-vk-orange font-semibold">
              Desde 6 hasta 56 metros de alcance.
            </span>
          </p>

          {/* CTAs */}
          <div
            ref={ctasRef}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#maquinas"
              className="inline-flex items-center gap-2 rounded-full bg-vk-orange px-8 py-4 text-base font-bold text-white tracking-wide transition-all duration-200 hover:bg-vk-orange-hot hover:scale-105 orange-glow shadow-lg"
            >
              VER MÁQUINAS
            </a>
            <a
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-base font-bold text-white tracking-wide backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white/10"
            >
              COTIZAR POR WHATSAPP
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {[
              { value: "15+", label: "Años de experiencia" },
              { value: "500+", label: "Equipos entregados" },
              { value: "3", label: "Marcas líderes" },
              { value: "24/7", label: "Soporte técnico" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div
                  className="text-3xl font-display text-vk-orange"
                  style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-vk-steel font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-vk-white/50">
        <span className="text-xs tracking-[0.25em] uppercase font-medium">
          Desliza para elevarte
        </span>
        <ChevronDown
          className="h-5 w-5"
          style={{ animation: "scroll-indicator 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
