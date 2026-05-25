"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/constants";

const BRANDS = [
  {
    id: "genie",
    name: "Genie",
    displayName: "GENIE",
    tagline: "Líder mundial en altura",
    logo: "/brands/genie-logo.png",
    image: "/brands/genie-z45.png",
    imageAlt: "Genie Z-45/25J plataforma articulada",
    description:
      "Líder mundial en plataformas tipo tijera y articuladas. Ingeniería estadounidense con presencia global. Alcances desde 6m hasta 56m con la mayor confiabilidad de la industria.",
    models: ["GS-1930", "GS-2632", "Z-45/25J", "S-65"],
    specs: [
      { label: "Altura máx.", value: "hasta 56 m" },
      { label: "Capacidad", value: "hasta 454 kg" },
      { label: "Tracción", value: "Eléctrico · Diésel" },
    ],
    whatsappMessage:
      "Hola, me interesa una plataforma GENIE. ¿Qué modelos tienen disponibles?",
    accent: "#003E7E",
    accentLight: "rgba(0,62,126,0.12)",
    border: "border-[#003E7E]/25",
    hoverBorder: "hover:border-[#003E7E]/70",
    topBar: "bg-[#003E7E]",
    badgeBg: "bg-[#003E7E]/10",
    badgeText: "text-[#5a9fd8]",
    gradient: "from-[#003E7E]/20 to-transparent",
  },
  {
    id: "jlg",
    name: "JLG",
    displayName: "JLG",
    tagline: "Innovación americana",
    logo: "/brands/jlg-logo.png",
    image: "/brands/jlg-600aj.png",
    imageAlt: "JLG 600AJ plataforma articulada",
    description:
      "Innovación estadounidense en plataformas telescópicas y de tijera. Tecnología de punta con sistemas de nivelación avanzados. Confianza para trabajos pesados en construcción, industria y minería.",
    models: ["1932R", "3246ES", "600AJ", "660SJ"],
    specs: [
      { label: "Altura máx.", value: "hasta 57 m" },
      { label: "Tipo", value: "Telescópica · Tijera" },
      { label: "Tracción", value: "Todo terreno 4×4" },
    ],
    whatsappMessage:
      "Hola, me interesa una plataforma JLG. ¿Qué modelos tienen disponibles?",
    accent: "#E87722",
    accentLight: "rgba(232,119,34,0.12)",
    border: "border-vk-orange/25",
    hoverBorder: "hover:border-vk-orange/70",
    topBar: "bg-vk-orange",
    badgeBg: "bg-vk-orange/10",
    badgeText: "text-vk-orange",
    gradient: "from-orange-900/20 to-transparent",
  },
  {
    id: "haulotte",
    name: "Haulotte",
    displayName: "HAULOTTE",
    tagline: "Ingeniería francesa",
    logo: "/brands/haulotte-logo.png",
    image: "/brands/haulotte-ha16.png",
    imageAlt: "Haulotte HA16 RTJ plataforma articulada",
    description:
      "Ingeniería francesa de alto rendimiento. Plataformas eléctricas y diésel para todo terreno con sistemas de seguridad avanzados. Soluciones para los entornos más exigentes del mercado.",
    models: ["Compact 8", "Star 10", "HA16 RTJ PRO", "HA20"],
    specs: [
      { label: "Altura máx.", value: "hasta 43 m" },
      { label: "Tipo", value: "Articulada · Eléctrica" },
      { label: "Rotación", value: "360° sin fin" },
    ],
    whatsappMessage:
      "Hola, me interesa una plataforma HAULOTTE. ¿Qué modelos tienen disponibles?",
    accent: "#FFD100",
    accentLight: "rgba(255,209,0,0.10)",
    border: "border-yellow-400/25",
    hoverBorder: "hover:border-yellow-400/70",
    topBar: "bg-yellow-400",
    badgeBg: "bg-yellow-400/10",
    badgeText: "text-yellow-400",
    gradient: "from-yellow-900/15 to-transparent",
  },
] as const;

type Brand = (typeof BRANDS)[number];

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && cardRef.current) {
          cardRef.current.style.opacity = "1";
          cardRef.current.style.transform = "translateY(0) rotateX(0) rotateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt({ x: x * -7, y: y * 7 });
  };

  const handleMouseLeave = () =>
    setTilt({ x: 0, y: 0 });

  return (
    <div
      id={brand.id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border ${brand.border} ${brand.hoverBorder} bg-vk-black/70 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:shadow-2xl group`}
      style={{
        opacity: 0,
        transform: `translateY(${32 + index * 12}px)`,
        transition:
          "opacity 0.7s ease, transform 0.35s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        transitionDelay: `${index * 130}ms`,
        transformStyle: "preserve-3d",
        // tilt applied separately so initial transform still works
        ...(tilt.x !== 0 || tilt.y !== 0
          ? {
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.1s ease, box-shadow 0.3s ease",
            }
          : {}),
      }}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${brand.topBar}`} />

      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${brand.gradient} opacity-60`}
      />

      <div className="relative p-7">
        {/* Logo */}
        <div className="mb-5 flex items-center justify-between">
          <div className="relative h-14 w-40">
            {!logoError ? (
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                fill
                sizes="160px"
                className="object-contain object-left"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span
                className="text-4xl font-display font-bold"
                style={{
                  fontFamily: "var(--font-bebas), sans-serif",
                  color: brand.accent,
                }}
              >
                {brand.displayName}
              </span>
            )}
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${brand.badgeBg} ${brand.badgeText}`}
          >
            {brand.tagline}
          </span>
        </div>

        {/* Machine image */}
        <div className="relative mb-6 h-56 w-full overflow-hidden rounded-xl border border-white/5 bg-vk-graphite/30">
          {!imgError ? (
            <Image
              src={brand.image}
              alt={brand.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Placeholder while images are not placed yet */
            <div className="flex h-full w-full items-center justify-center flex-col gap-2">
              <div
                className="text-5xl font-display opacity-20"
                style={{
                  fontFamily: "var(--font-bebas), sans-serif",
                  color: brand.accent,
                }}
              >
                {brand.displayName}
              </div>
              <p className="text-xs text-vk-steel opacity-60">
                Coloca {brand.image} en public/
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="mb-5 text-sm text-vk-steel leading-relaxed">
          {brand.description}
        </p>

        {/* Specs */}
        <div className="mb-5 grid grid-cols-3 gap-2">
          {brand.specs.map((spec) => (
            <div
              key={spec.label}
              className={`rounded-lg p-2.5 text-center ${brand.badgeBg} border border-white/5`}
            >
              <div className={`text-[11px] font-bold ${brand.badgeText}`}>
                {spec.value}
              </div>
              <div className="mt-0.5 text-[10px] text-vk-steel">{spec.label}</div>
            </div>
          ))}
        </div>

        {/* Models */}
        <div className="mb-7">
          <div className="mb-2 text-[10px] font-semibold tracking-widest text-vk-steel uppercase">
            Modelos destacados
          </div>
          <div className="flex flex-wrap gap-2">
            {brand.models.map((model) => (
              <span
                key={model}
                className={`rounded-lg border border-white/10 ${brand.badgeBg} px-3 py-1 text-xs font-semibold text-vk-white/80`}
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
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10`}
          >
            Ver catálogo {brand.name}
            <ChevronRight className="h-4 w-4" />
          </a>
          <a
            href={buildWhatsAppLink(brand.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: "#25D366" }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export function Machines() {
  return (
    <section id="maquinas" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-vk-graphite/98 via-vk-black/92 to-vk-black/96" />

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
            Distribuidores de las tres marcas más reconocidas en la industria de
            plataformas elevables. Calidad, confiabilidad y respaldo garantizados.
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
