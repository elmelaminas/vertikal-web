import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { Brands } from "@/components/sections/Brands";
import { Catalog } from "@/components/sections/Catalog";
import { PlatformTypes } from "@/components/sections/PlatformTypes";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Coverage } from "@/components/sections/Coverage";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <ValueProposition />
      <Brands />
      <Catalog />
      <PlatformTypes />
      <Services />
      <Industries />
      <Coverage />
      <Testimonials />
      <ContactCTA />
    </main>
  );
}
