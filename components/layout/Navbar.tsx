"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

const NAV_LINKS = [
  { label: "INICIO", href: "#inicio" },
  {
    label: "MÁQUINAS",
    href: "#maquinas",
    children: [
      { label: "Genie", href: "#genie" },
      { label: "JLG", href: "#jlg" },
      { label: "Haulotte", href: "#haulotte" },
    ],
  },
  { label: "RENTA", href: "#renta" },
  { label: "VENTA", href: "#venta" },
  { label: "SERVICIO", href: "#servicio" },
  { label: "REFACCIONES", href: "#refacciones" },
  { label: "CONTACTO", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-vk-black/95 backdrop-blur-md shadow-lg shadow-black/50 border-b border-vk-blue/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <Image
              src="/logo-vertikal.png"
              alt="VERTIKAL"
              width={52}
              height={52}
              priority
              className="object-contain h-12 w-12 md:h-14 md:w-14 transition-opacity duration-200 group-hover:opacity-85"
            />
          </a>

          {/* Desktop nav */}
          <div ref={dropdownRef} className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === link.label ? null : link.label
                      )
                    }
                    className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-vk-white/80 hover:text-vk-orange transition-colors duration-200 tracking-wide"
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 min-w-[160px] rounded-xl bg-vk-black border border-vk-blue/30 shadow-2xl overflow-hidden">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-3 text-sm text-vk-white/80 hover:text-vk-orange hover:bg-vk-blue/20 transition-colors duration-150 font-medium"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-semibold text-vk-white/80 hover:text-vk-orange transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* CTA button */}
          <div className="hidden lg:flex items-center">
            <a
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-vk-orange px-5 py-2.5 text-sm font-bold text-white tracking-wide transition-all duration-200 hover:bg-vk-orange-hot hover:scale-105 orange-glow"
            >
              COTIZAR AHORA
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-vk-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-vk-black/98 border-t border-vk-blue/20 px-4 py-6 space-y-1">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-base font-semibold text-vk-white/80 hover:text-vk-orange transition-colors duration-150 tracking-wide border-b border-vk-blue/10"
              >
                {link.label}
              </a>
              {link.children && (
                <div className="pl-4 space-y-1 mt-1">
                  {link.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 text-sm text-vk-steel hover:text-vk-orange transition-colors duration-150"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4">
            <a
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-full bg-vk-orange py-3 font-bold text-white tracking-wide"
            >
              COTIZAR AHORA
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
