import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { ProfesDirectory } from "@/components/ProfesDirectory";
import { TEACHERS } from "@/lib/teachers";

export const metadata: Metadata = {
  title: "Profes — A ½ tono",
  description:
    "Conoce a nuestros profes: paciencia, técnica y mucho cariño. Encuentra a tu profe ideal en A ½ tono.",
};

function ColoredProfes() {
  const letters = [
    { char: "p", color: "var(--orange)" },
    { char: "r", color: "var(--green)" },
    { char: "o", color: "var(--red)" },
    { char: "f", color: "var(--blue)" },
    { char: "e", color: "var(--pink)" },
    { char: "s", color: "var(--purple)" },
  ];
  return (
    <span>
      {letters.map((l, i) => (
        <span key={i} style={{ color: l.color }}>
          {l.char}
        </span>
      ))}
    </span>
  );
}

export default function ProfesPage() {
  return (
    <>
      <section
        className="block"
        id="profes-page"
        data-screen-label="Profesores"
      >
        <div className="container">
          <div className="sec-head" style={{ textAlign: "left", maxWidth: "1080px", marginLeft: "auto", marginRight: "auto" }}>
            <h2>
              <span style={{ color: "var(--blue)", marginRight: 12 }}>
                Nuestros
              </span>
              <ColoredProfes />
            </h2>
          </div>

          <Suspense fallback={<div className="profes-search-fallback" />}>
            <ProfesDirectory teachers={TEACHERS} />
          </Suspense>
        </div>
      </section>
      <Footer />
    </>
  );
}
