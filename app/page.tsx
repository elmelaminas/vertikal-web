import { Hero, Stats, ContactCTA } from "@/app/client-sections";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { Brands } from "@/components/sections/Brands";
import { Catalog } from "@/components/sections/Catalog";
import { PlatformTypes } from "@/components/sections/PlatformTypes";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Coverage } from "@/components/sections/Coverage";
import { Testimonials } from "@/components/sections/Testimonials";

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
