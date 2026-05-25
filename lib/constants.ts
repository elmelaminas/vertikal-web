export const WHATSAPP_NUMBER = "525658511207";
export const COMPANY_NAME = "VERTIKAL";
export const COMPANY_TAGLINE =
  "Plataformas Elevables · Venta · Renta · Servicio · Refacciones";

export const WHATSAPP_MESSAGES = {
  default:
    "Hola, vengo del sitio web de VERTIKAL y me interesa cotizar una plataforma elevable.",
  renta:
    "Hola, me interesa RENTAR una plataforma elevable. ¿Pueden enviarme información?",
  venta:
    "Hola, me interesa COMPRAR una plataforma elevable. ¿Me pueden cotizar?",
  servicio:
    "Hola, necesito SERVICIO TÉCNICO para mi plataforma elevable.",
  refacciones:
    "Hola, necesito REFACCIONES para mi plataforma elevable.",
  genie:
    "Hola, me interesa una plataforma GENIE. ¿Qué modelos tienen disponibles?",
  jlg:
    "Hola, me interesa una plataforma JLG. ¿Qué modelos tienen disponibles?",
  haulotte:
    "Hola, me interesa una plataforma HAULOTTE. ¿Qué modelos tienen disponibles?",
} as const;

export type WhatsAppMessageKey = keyof typeof WHATSAPP_MESSAGES;

export function buildWhatsAppLink(
  message: string = WHATSAPP_MESSAGES.default
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
