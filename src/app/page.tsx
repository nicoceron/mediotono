import { Hero } from "@/components/Hero";
import { VocesStrip } from "@/components/VocesStrip";
import { CursosSection } from "@/components/CursosSection";
import { ProfesSection } from "@/components/ProfesSection";
import { FeedSection } from "@/components/FeedSection";
import { TestimoniosSection } from "@/components/TestimoniosSection";
import { ContactoSection } from "@/components/ContactoSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <VocesStrip />
      <CursosSection />
      <ProfesSection />
      <FeedSection />
      <TestimoniosSection />
      <ContactoSection />
      <Footer />
    </>
  );
}