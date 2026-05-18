import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const HIGHLIGHTS = [
  "Conecta con estudiantes nuevos",
  "Acompaña procesos creativos",
  "Crece con una escuela cercana",
];

export function JobsCTASection() {
  return (
    <section className="block jobs-cta-section" id="trabaja-con-nosotros" data-screen-label="Trabaja con nosotros">
      <div className="container">
        <article className="jobs-cta-card">
          <div className="jobs-cta-photo" aria-hidden="true">
            <Image
              className="jobs-cta-portrait"
              src="/jobs/profesora-estudiante.jpeg"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>

          <div className="jobs-cta-copy">
            <p className="jobs-cta-eyebrow">Convocatoria abierta</p>
            <h2>Trabaja como profe</h2>
            <p className="jobs-cta-text">
              Buscamos profes de música que disfruten enseñar, escuchar y construir procesos reales con cada estudiante.
            </p>

            <ul className="jobs-cta-list" aria-label="Beneficios para profesores">
              {HIGHLIGHTS.map((item) => (
                <li key={item}>
                  <CheckCircle2 aria-hidden="true" size={22} strokeWidth={2.7} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link className="jobs-cta-button" href="/trabaja-con-nosotros">
              Aplicar como profe
              <ArrowRight aria-hidden="true" size={22} strokeWidth={2.7} />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
