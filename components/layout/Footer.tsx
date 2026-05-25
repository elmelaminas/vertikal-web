import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

const FOOTER_LINKS = {
  empresa: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Nuestras marcas", href: "#maquinas" },
    { label: "Zona de cobertura", href: "#cobertura" },
    { label: "Testimonios", href: "#testimonios" },
  ],
  maquinas: [
    { label: "Genie", href: "#genie" },
    { label: "JLG", href: "#jlg" },
    { label: "Haulotte", href: "#haulotte" },
    { label: "Renta", href: "#renta" },
    { label: "Venta", href: "#venta" },
    { label: "Refacciones", href: "#refacciones" },
  ],
  contacto: [
    { label: "WhatsApp: +52 56 5851-1207", href: buildWhatsAppLink() },
    { label: "ventas@vertikal.mx", href: "mailto:ventas@vertikal.mx" },
    { label: "CDMX y Área Metropolitana", href: "#cobertura" },
    { label: "Lun–Vie 8:00–18:00", href: undefined },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-vk-white/10 bg-vk-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div
                className="text-4xl font-display text-white tracking-wider"
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                VERTIKAL
              </div>
              <div className="text-xs tracking-[0.2em] text-vk-orange font-semibold uppercase">
                Plataformas Elevables
              </div>
            </div>
            <p className="text-sm text-vk-steel leading-relaxed mb-6">
              Venta, renta y servicio técnico de plataformas elevables Genie,
              JLG y Haulotte en México. Llevamos tu proyecto a la altura que
              necesita.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {["FB", "IG", "LI", "YT"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-vk-white/10 bg-vk-white/5 text-xs font-bold text-vk-steel hover:border-vk-orange/40 hover:text-vk-orange transition-all duration-200"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="mb-5 text-sm font-bold text-white tracking-widest uppercase">
              Empresa
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-vk-steel hover:text-vk-orange transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Máquinas */}
          <div>
            <h4 className="mb-5 text-sm font-bold text-white tracking-widest uppercase">
              Máquinas
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.maquinas.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-vk-steel hover:text-vk-orange transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-5 text-sm font-bold text-white tracking-widest uppercase">
              Contacto
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.contacto.map((link) =>
                link.href ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-vk-steel hover:text-vk-orange transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label} className="text-sm text-vk-steel">
                    {link.label}
                  </li>
                )
              )}
            </ul>

            {/* Brands logos text */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["GENIE", "JLG", "HAULOTTE"].map((brand) => (
                <span
                  key={brand}
                  className="rounded-md border border-vk-white/10 px-2.5 py-1 text-xs font-bold text-vk-steel"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-vk-white/10 pt-8">
          <p className="text-xs text-vk-steel">
            © {currentYear} VERTIKAL · Todos los derechos reservados
          </p>
          <div className="flex gap-6">
            {["Aviso de Privacidad", "Términos de Uso"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-vk-steel hover:text-vk-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
