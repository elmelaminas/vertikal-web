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
  metadataBase: new URL("https://vertikal-web.vercel.app"),
  title: "VERTIKAL | Plataformas Elevables · Venta · Renta · Servicio",
  description:
    "Venta y renta de plataformas elevables industriales Genie, JLG y Haulotte en México. Servicio técnico certificado, refacciones originales y atención inmediata en CDMX y todo el Bajío.",
  keywords:
    "plataformas elevables México, renta de manlift, Genie JLG Haulotte México, plataformas tijera, plataformas articuladas, plataformas telescópicas, renta de andamios elevados CDMX",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://vertikal-web.vercel.app",
    siteName: "VERTIKAL",
    title: "VERTIKAL | Plataformas Elevables México",
    description:
      "Venta y renta de plataformas elevables Genie, JLG y Haulotte en México. Stock inmediato, servicio técnico 24/7.",
    images: [
      {
        url: "https://vertikal-web.vercel.app/logo-vertikal.png",
        width: 2048,
        height: 2048,
        alt: "VERTIKAL - Plataformas Elevables México",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "VERTIKAL | Plataformas Elevables México",
    description:
      "Venta y renta de plataformas elevables Genie, JLG y Haulotte en México.",
    images: ["https://vertikal-web.vercel.app/logo-vertikal.png"],
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
