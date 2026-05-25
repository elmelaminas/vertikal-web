import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VERTIKAL | Plataformas Elevables · Venta · Renta · Servicio",
  description:
    "Venta y renta de plataformas elevables industriales Genie, JLG y Haulotte en México. Servicio técnico certificado, refacciones originales y atención inmediata en CDMX y todo el Bajío.",
  keywords:
    "plataformas elevables México, renta de manlift, Genie JLG Haulotte México, plataformas tijera, plataformas articuladas, plataformas telescópicas, renta de andamios elevados CDMX",
  openGraph: {
    title: "VERTIKAL | Plataformas Elevables México",
    description:
      "Venta y renta de plataformas Genie, JLG y Haulotte. Servicio técnico y refacciones en México.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${bebasNeue.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased bg-vk-black text-vk-white overflow-x-hidden">
        <Providers>
          <Navbar />
          {children}
          <WhatsAppButton variant="float" />
        </Providers>
      </body>
    </html>
  );
}
