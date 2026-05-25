import { SceneLoader } from "@/components/3d/SceneLoader";
import { Hero } from "@/components/sections/Hero";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { Machines } from "@/components/sections/Machines";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Coverage } from "@/components/sections/Coverage";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      {/* Fixed 3D background — behind all content, loaded client-side */}
      <SceneLoader />

      <main>
        <Hero />
        <ValueProposition />
        <Machines />
        <Services />
        <Industries />
        <Coverage />
        <Testimonials />
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}
