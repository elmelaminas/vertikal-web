"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_MESSAGES, type WhatsAppMessageKey } from "@/lib/constants";

interface WhatsAppButtonProps {
  variant?: "float" | "inline";
  messageKey?: WhatsAppMessageKey;
  label?: string;
  className?: string;
}

export function WhatsAppButton({
  variant = "inline",
  messageKey = "default",
  label = "Cotizar por WhatsApp",
  className = "",
}: WhatsAppButtonProps) {
  const href = buildWhatsAppLink(WHATSAPP_MESSAGES[messageKey]);

  if (variant === "float") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Habla con la Gerente de Ventas por WhatsApp"
        className="group fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-2xl wa-pulse transition-transform duration-200 hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
      >
        <MessageCircle className="h-8 w-8 text-white fill-white" />
        {/* Tooltip */}
        <span className="pointer-events-none absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-vk-graphite px-3 py-2 text-sm font-medium text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
          Habla con la Gerente de Ventas
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent border-l-vk-graphite" />
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${className}`}
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="h-5 w-5 fill-white" />
      {label}
    </a>
  );
}
