import { Hero } from "@/components/Hero";
import { VocesStrip } from "@/components/VocesStrip";
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
