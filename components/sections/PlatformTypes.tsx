"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { buildWhatsAppLink } from "@/lib/constants";

const TYPES = [
  {
    name: "Articuladas",
    description:
      "Brazo articulado que permite acceso a zonas elevadas con obstáculos. Ideales para mantenimiento industrial, telecomunicaciones y obras complejas.",
    image: "/types/articulada.jpg",
    heights: "12 a 45 metros",
    models: "Z-45/25J, 600AJ, HA16 RTJ PRO",
    whatsapp: "Hola, me interesa cotizar una plataforma ARTICULADA. ¿Qué modelos tienen disponibles?",
  },
  {
    name: "De Tijera",
    description:
      "Plataforma vertical para superficies grandes y planas. Mayor capacidad de carga y área de trabajo amplia. Ideales para almacenes, naves industriales y mantenimiento.",
    image: "/types/tijera.jpg",
    heights: "6 a 18 metros",
    models: "GS-1930, GS-2632, 1932R, Compact 8",
    whatsapp: "Hola, me interesa cotizar una plataforma TIJERA. ¿Qué modelos tienen disponibles?",
  },
  {
    name: "Telescópicas",
    description:
      "Brazo telescópico recto con el mayor alcance horizontal y vertical. Para trabajos a gran altura en construcción, montaje estructural y obra civil.",
    image: "/types/telescopica.jpg",
    heights: "15 a 56 metros",
    models: "S-65, S-125, 660SJ, 1350SJP",
    whatsapp: "Hola, me interesa cotizar una plataforma TELESCÓPICA. ¿Qué modelos tienen disponibles?",
  },
];

export function PlatformTypes() {
  return (
    <section className="bg-[#0A1628] py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#E87722] font-bold uppercase tracking-wider text-sm">
            Tipos de equipo
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            ¿Qué tipo de plataforma necesitas?
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Te asesoramos sin costo para encontrar el equipo ideal según tu proyecto, altura requerida y tipo de terreno.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TYPES.map((type, i) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <SafeImage
                src={type.image}
                alt={type.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-white">
                <span className="text-[#E87722] font-bold text-xs uppercase tracking-widest mb-1">
                  {type.heights}
                </span>
                <h3 className="text-3xl font-black mb-3">{type.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">{type.description}</p>
                <p className="text-xs text-gray-400 mb-5">
                  <span className="text-white/60 font-semibold">Modelos: </span>
                  {type.models}
                </p>

                <a
                  href={buildWhatsAppLink(type.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#E87722] hover:bg-[#FF8A2B] text-white font-bold rounded-lg text-sm transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                >
                  Cotizar este tipo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
