import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { ProfesDirectory } from "@/components/ProfesDirectory";
import { TEACHERS } from "@/lib/teachers";

export const metadata: Metadata = {
  title: "Profes y tutores de música — A ½ tono",
  description:
    "Encuentra profesores de música para clases particulares virtuales o a domicilio en A ½ tono.",
};

export default function ProfesPage() {
  return (
    <>
      <section
        className="block"
        id="profes-page"
        data-screen-label="Profesores"
      >
        <div className="container">
          <div className="sec-head profes-page-head">
            <h1>Profes y tutores de música</h1>
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
