"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";

const BRANDS = [
  {
    name: "Genie",
    logo: "/brands/genie-logo.png",
    description: "Líder mundial en plataformas de tijera y articuladas",
    color: "#003E7E",
  },
  {
    name: "JLG",
    logo: "/brands/jlg-logo.png",
    description: "Innovación americana en plataformas telescópicas",
    color: "#E87722",
  },
  {
    name: "Haulotte",
    logo: "/brands/haulotte-logo.png",
    description: "Ingeniería francesa de alto rendimiento",
    color: "#FFD100",
  },
];

export function Brands() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[#E87722] font-bold uppercase tracking-wider text-sm">
            Distribuidores Oficiales
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1E4D8C] mt-2">
            Las mejores marcas del mundo
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Distribuidores de los fabricantes más confiables en plataformas de elevación a nivel mundial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="flex flex-col items-center p-8 rounded-2xl border-2 border-gray-100 hover:border-[#1E4D8C]/30 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="relative w-48 h-24 mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                <SafeImage
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <div
                className="w-8 h-1 rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: brand.color }}
              />
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {brand.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
