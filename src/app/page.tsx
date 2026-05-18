import { Hero } from "@/components/Hero";
import { VocesStrip } from "@/components/VocesStrip";
import { ProfesSection } from "@/components/ProfesSection";
import { TestimoniosSection } from "@/components/TestimoniosSection";
import { JobsCTASection } from "@/components/JobsCTASection";
import { ContactoSection } from "@/components/ContactoSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <VocesStrip />
      <ProfesSection />
      <TestimoniosSection />
      <JobsCTASection />
      <ContactoSection />
      <Footer />
    </>
  );
}
