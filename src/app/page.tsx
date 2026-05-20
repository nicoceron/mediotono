import { Hero } from "@/components/Hero";
import { VocesStrip } from "@/components/VocesStrip";
import { CursosSection } from "@/components/CursosSection";
import { ComoFuncionaSection } from "@/components/ComoFuncionaSection";
import { CalidadBanner } from "@/components/CalidadBanner";
import { TestimoniosSection } from "@/components/TestimoniosSection";
import { JobsCTASection } from "@/components/JobsCTASection";
import { ContactoSection } from "@/components/ContactoSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CursosSection />
      <VocesStrip />
      <ComoFuncionaSection />
      <CalidadBanner />
      <TestimoniosSection />
      <JobsCTASection />
      <ContactoSection />
      <Footer />
    </>
  );
}
