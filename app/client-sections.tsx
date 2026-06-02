"use client";

import dynamic from "next/dynamic";

export const Hero = dynamic(
  () => import("@/components/sections/Hero").then((m) => m.Hero),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#143866] to-[#0A1628]" />
    ),
  }
);

export const Stats = dynamic(
  () => import("@/components/sections/Stats").then((m) => m.Stats),
  {
    ssr: false,
    loading: () => (
      <div className="bg-[#1E4D8C] py-20 border-y-4 border-[#E87722] animate-pulse" />
    ),
  }
);

export const ContactCTA = dynamic(
  () => import("@/components/sections/ContactCTA").then((m) => m.ContactCTA),
  {
    ssr: false,
    loading: () => (
      <div className="py-32 bg-gradient-to-b from-[#1A2A3A] via-[#0F1E30] to-[#0A0A0A]" />
    ),
  }
);
