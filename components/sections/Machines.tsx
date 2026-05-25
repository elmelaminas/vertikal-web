"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const BRANDS = [
  {
    id: "genie",
    name: "GENIE",
    tagline: "Líder mundial en altura",
    description:
      "Líder mundial en plataformas tipo tijera y articuladas. Ingeniería estadounidense con alcances desde 6m hasta 56m. Reconocida por su durabilidad extrema y facilidad de mantenimiento.",
    models: ["GS-1930", "GS-2632", "Z-45/25J", "S-65 TRAX"],
    specs: [
      "Altura máx: hasta 56m",
      "Capacidad: hasta 454 kg",
      "Eléctrico y diésel",
    ],
    messageKey: "genie" as const,
    accentColor: "#E87722",
    gradient: "from-orange-900/40 to-vk-black/60",
    logoColor: "text-vk-orange",
    border: "border-vk-orange/30",
    hoverBorder: "hover:border-vk-orange/70",
  },
  {
    id: "jlg",
    name: "JLG",
    tagline: "Innovación americana",
    description:
      "Innovación estadounidense en plataformas telescópicas y de tijera. Tecnología de punta con sistemas de nivelación avanzados. Confianza para trabajos pesados en cualquier terreno.",
    models: ["1932R", "3246ES", "600AJ", "660SJ"],
    specs: [
      "Altura máx: hasta 57m",
      "Plumas telescópicas",
      "Todo terreno 4x4",
    ],
    messageKey: "jlg" as const,
    accentColor: "#1E4D8C",
    gradient: "from-vk-blue-dark/40 to-vk-black/60",
    logoColor: "text-vk-blue",
    border: "border-vk-blue/30",
    hoverBorder: "hover:border-vk-blue/70",
  },
  {
    id: "haulotte",
    name: "HAULOTTE",
    tagline: "Ingeniería francesa",
    description:
      "Ingeniería francesa de alto rendimiento y precisión. Plataformas eléctricas y diésel para todo terreno con sistemas de seguridad avanzados. Ideal para proyectos de gran escala.",
    models: ["Compact 8", "Star 10", "HA16 RTJ", "HA20 RTJ"],
    specs: [
      "Altura máx: hasta 43m",
      "Plataformas articuladas",
      "Giro 360° sin fin",
    ],
    messageKey: "haulotte" as const,
    accentColor: "#E87722",
    gradient: "from-orange-900/30 to-vk-black/60",
    logoColor: "text-vk-orange",
    border: "border-vk-orange/30",
    hoverBorder: "hover:border-vk-orange/70",
  },
] as const;

interface BrandCardProps {
  brand: (typeof BRANDS)[number];
  index: number;
}

function BrandCard({ brand, index }: BrandCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && cardRef.current) {
          cardRef.current.style.opacity = "1";
          cardRef.current.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      id={brand.id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border ${brand.border} ${brand.hoverBorder} bg-vk-black/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-default group`}
      style={{
        opacity: 0,
        transform: `translateY(${40 + index * 10}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "opacity 0.7s ease, transform 0.3s ease, box-shadow 0.3s ease",
        transitionDelay: `${index * 150}ms`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Gradient top */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-60`}
      />

      <div className="relative p-8">
        {/* Brand header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-1 text-xs font-semibold tracking-[0.25em] text-vk-steel uppercase">
              {brand.tagline}
            </div>
            <h3
              className={`text-5xl font-display ${brand.logoColor} tracking-wider`}
              style={{ fontFamily: "var(--font-bebas), sans-serif" }}
            >
              {brand.name}
            </h3>
          </div>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl border ${brand.border} bg-white/5`}
          >
            <span
              className={`text-xl font-display font-bold ${brand.logoColor}`}
              style={{ fontFamily: "var(--font-bebas), sans-serif" }}
            >
              {brand.name[0]}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm text-vk-steel leading-relaxed">
          {brand.description}
        </p>

        {/* Specs */}
        <div className="mb-6 space-y-2">
          {brand.specs.map((spec) => (
            <div key={spec} className="flex items-center gap-2">
              <div
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: brand.accentColor }}
              />
              <span className="text-xs text-vk-white/70 font-medium">{spec}</span>
            </div>
          ))}
        </div>

        {/* Models */}
        <div className="mb-8">
          <div className="mb-2 text-xs font-semibold tracking-widest text-vk-steel uppercase">
            Modelos destacados
          </div>
          <div className="flex flex-wrap gap-2">
            {brand.models.map((model) => (
              <span
                key={model}
                className={`rounded-lg border ${brand.border} bg-white/5 px-3 py-1 text-xs font-semibold text-vk-white/80`}
              >
                {model}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`#${brand.id}`}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl border ${brand.border} bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10`}
          >
            Ver catálogo {brand.name}
            <ChevronRight className="h-4 w-4" />
          </a>
          <WhatsAppButton
            variant="inline"
            messageKey={brand.messageKey}
            label="WhatsApp"
            className="flex-1 justify-center text-sm py-3 px-4 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export function Machines() {
  return (
    <section id="maquinas" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-vk-graphite/98 via-vk-black/90 to-vk-black/95" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.3em] text-vk-orange uppercase">
            Nuestras marcas
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-display text-white"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            MÁQUINAS DE{" "}
            <span className="text-vk-orange">CLASE MUNDIAL</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-vk-steel">
            Trabajamos exclusivamente con las tres marcas más reconocidas en la
            industria de plataformas elevables. Calidad y confiabilidad
            garantizadas.
          </p>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-vk-orange to-transparent" />
        </div>

        {/* Brand cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {BRANDS.map((brand, i) => (
            <BrandCard key={brand.id} brand={brand} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
