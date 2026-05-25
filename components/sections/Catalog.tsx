"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Ruler, Weight, Zap } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { SafeImage } from "@/components/ui/SafeImage";

const EQUIPMENT = [
  {
    brand: "Genie",
    model: "GS-1930",
    type: "Tijera Eléctrica",
    height: "7.79 m",
    capacity: "227 kg",
    power: "Eléctrica",
    image: "/catalog/genie-gs1930.png",
    color: "#003E7E",
  },
  {
    brand: "Genie",
    model: "Z-45/25J RT",
    type: "Articulada Diésel",
    height: "15.79 m",
    capacity: "227 kg",
    power: "Diésel 4x4",
    image: "/catalog/genie-z45.png",
    color: "#003E7E",
  },
  {
    brand: "Genie",
    model: "S-65",
    type: "Telescópica",
    height: "21.80 m",
    capacity: "227 kg",
    power: "Diésel 4x4",
    image: "/catalog/genie-s65.png",
    color: "#003E7E",
  },
  {
    brand: "JLG",
    model: "1932R",
    type: "Tijera Eléctrica",
    height: "7.79 m",
    capacity: "230 kg",
    power: "Eléctrica",
    image: "/catalog/jlg-1932r.png",
    color: "#E87722",
  },
  {
    brand: "JLG",
    model: "600AJ",
    type: "Articulada",
    height: "20.30 m",
    capacity: "227 kg",
    power: "Diésel 4x4",
    image: "/catalog/jlg-600aj.png",
    color: "#E87722",
  },
  {
    brand: "JLG",
    model: "660SJ",
    type: "Telescópica",
    height: "22.30 m",
    capacity: "454 kg",
    power: "Diésel 4x4",
    image: "/catalog/jlg-660sj.png",
    color: "#E87722",
  },
  {
    brand: "Haulotte",
    model: "Compact 8",
    type: "Tijera Eléctrica",
    height: "8.00 m",
    capacity: "450 kg",
    power: "Eléctrica",
    image: "/catalog/haulotte-compact8.png",
    color: "#D4A800",
  },
  {
    brand: "Haulotte",
    model: "HA16 RTJ PRO",
    type: "Articulada Diésel",
    height: "16.00 m",
    capacity: "230 kg",
    power: "Diésel 4x4",
    image: "/catalog/haulotte-ha16.png",
    color: "#D4A800",
  },
] as const;

export function Catalog() {
  return (
    <section id="maquinas" className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#E87722] font-bold uppercase tracking-wider text-sm">
            Catálogo
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1E4D8C] mt-2">
            Equipos disponibles
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Stock inmediato. Solicita cotización al instante por WhatsApp con el precio y disponibilidad exacta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EQUIPMENT.map((eq, i) => {
            const message = `Hola, me interesa cotizar la ${eq.brand} ${eq.model}. ¿Tienen disponibilidad y cuál es el precio?`;
            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

            return (
              <motion.div
                key={`${eq.brand}-${eq.model}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group border-t-4"
                style={{ borderTopColor: eq.color }}
              >
                {/* Image area */}
                <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <SafeImage
                    src={eq.image}
                    alt={`${eq.brand} ${eq.model}`}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full"
                    style={{ backgroundColor: eq.color }}
                  >
                    {eq.brand}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-black text-[#1E4D8C]">{eq.model}</h3>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">
                    {eq.type}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Ruler className="w-3.5 h-3.5 text-[#E87722] flex-shrink-0" />
                      <span>
                        <strong>Altura:</strong> {eq.height}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Weight className="w-3.5 h-3.5 text-[#E87722] flex-shrink-0" />
                      <span>
                        <strong>Capacidad:</strong> {eq.capacity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Zap className="w-3.5 h-3.5 text-[#E87722] flex-shrink-0" />
                      <span>
                        <strong>Energía:</strong> {eq.power}
                      </span>
                    </div>
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#1E4D8C] hover:bg-[#E87722] text-white font-bold rounded-lg transition-all text-sm"
                  >
                    Cotizar <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
