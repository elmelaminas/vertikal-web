"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { SafeImage } from "@/components/ui/SafeImage";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#143866] to-[#0A1628]"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src="/hero/plataforma-obra.jpg"
          alt="Plataforma elevable en obra"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/80 to-transparent" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,77,140,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,77,140,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-[#E87722]/20 border border-[#E87722]/40 text-[#E87722] text-sm font-semibold rounded-full mb-6 tracking-wide"
          >
            PLATAFORMAS ELEVABLES EN MÉXICO
          </motion.span>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Elevamos tu{" "}
            <span className="text-[#E87722]">proyecto</span>
            <br />a nuevas alturas
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
            Venta y renta de plataformas elevables{" "}
            <strong className="text-white">Genie, JLG y Haulotte</strong>.
            Articuladas, de tijera y telescópicas. Alcances desde{" "}
            <span className="text-[#E87722] font-semibold">6 hasta 56 metros</span>.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#maquinas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E87722] hover:bg-[#FF8A2B] text-white font-bold rounded-lg transition-all shadow-lg shadow-[#E87722]/30 hover:shadow-[#E87722]/50 hover:scale-105"
            >
              Ver catálogo <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white hover:bg-white hover:text-[#1E4D8C] font-bold rounded-lg transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" /> Cotizar ahora
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {[
              { value: "15+", label: "Años de exp." },
              { value: "200+", label: "Equipos en flota" },
              { value: "3", label: "Marcas líderes" },
              { value: "24/7", label: "Soporte técnico" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-[#E87722]">{s.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: machine image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:block relative"
        >
          <div className="relative h-[520px] w-full">
            <SafeImage
              src="/hero/genie-z45-destacada.png"
              alt="Genie Z-45 plataforma articulada"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />
          </div>
          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">
              ✓
            </div>
            <div>
              <div className="text-[#1E4D8C] font-bold text-sm">Certificados ANSI/CSA</div>
              <div className="text-gray-500 text-xs">Equipos en norma</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs flex flex-col items-center gap-2 tracking-[0.25em] uppercase"
      >
        <span>Desliza para explorar</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
