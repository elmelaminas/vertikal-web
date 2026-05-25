"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { useEffect, useRef } from "react";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-black text-[#E87722]">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 15, suffix: "+", label: "Años de experiencia" },
  { value: 200, suffix: "+", label: "Máquinas en flota" },
  { value: 500, suffix: "+", label: "Clientes satisfechos" },
  { value: 12, suffix: "", label: "Estados de cobertura" },
];

export function Stats() {
  return (
    <section className="relative bg-[#1E4D8C] py-20 border-y-4 border-[#E87722] overflow-hidden">
      {/* Logo watermark centrado */}
      <LogoWatermark position="center" size={600} opacity={0.10} variant="dark" />

      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="mb-2">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-white/80 uppercase tracking-wide text-sm font-semibold">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
