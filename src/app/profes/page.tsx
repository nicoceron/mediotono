import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, GraduationCap, Sparkles, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { TEACHERS, shortDisplayName } from "@/lib/teachers";

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

          <ul className="profe-list">
            {TEACHERS.map((t, i) => {
              const instruments = t.role
                .split("·")
                .map((p) => p.trim())
                .filter(Boolean);
              return (
                <Reveal
                  as="li"
                  key={t.slug}
                  delay={i * 80}
                  className="profe-card-wrap"
                >
                  <article
                    className="profe-card"
                    style={{ ["--profe-color" as string]: t.color }}
                  >
                    <Link
                      href={`/profes/${t.slug}`}
                      className="profe-card-photo"
                      style={{ borderColor: t.color }}
                      aria-label={`Ver perfil de ${t.name}`}
                    >
                      <div
                        className="profe-card-photo-bg"
                        style={{ background: t.color }}
                      />
                      <Image src={t.photo} alt={t.name} fill sizes="180px" />
                    </Link>

                    <div className="profe-card-body">
                      <div className="profe-card-head">
                        <Link
                          href={`/profes/${t.slug}`}
                          className="profe-card-name"
                        >
                          {shortDisplayName(t.name)}
                          <BadgeCheck
                            size={20}
                            strokeWidth={2.4}
                            className="profe-card-verified"
                            style={{ color: t.color }}
                            aria-label="Profe verificada"
                          />
                          {t.countryFlag && (
                            <span
                              className="profe-card-flag"
                              aria-label={t.country}
                              title={t.country}
                            >
                              {t.countryFlag}
                            </span>
                          )}
                        </Link>
                      </div>

                      <ul className="profe-card-meta">
                        <li>
                          <BadgeCheck size={14} strokeWidth={2.4} />
                          <span>Profe verificada</span>
                        </li>
                        <li>
                          <GraduationCap size={14} strokeWidth={2.4} />
                          <span>{instruments.join(" · ")}</span>
                        </li>
                        <li>
                          <Sparkles size={14} strokeWidth={2.4} />
                          <span>{t.yearsTeaching}+ años enseñando</span>
                        </li>
                      </ul>

                      <p className="profe-card-bio">{t.longBio}</p>

                      <Link
                        href={`/profes/${t.slug}`}
                        className="profe-card-more"
                      >
                        Más información
                      </Link>
                    </div>

                    <aside className="profe-card-side">
                      <div className="profe-card-stats">
                        <div className="profe-card-stat">
                          <strong>
                            <Star
                              size={16}
                              fill="currentColor"
                              strokeWidth={0}
                              style={{ color: t.color }}
                              aria-hidden="true"
                            />
                            5.0
                          </strong>
                          <span>{t.reviews.length} {t.reviews.length === 1 ? "reseña" : "reseñas"}</span>
                        </div>
                        <div className="profe-card-stat">
                          <strong>{t.classFormats.length}</strong>
                          <span>formatos de clase</span>
                        </div>
                      </div>

                      <Link
                        href={`/profes/${t.slug}`}
                        className="profe-card-cta"
                        style={{ background: t.color }}
                      >
                        Ver perfil
                        <ArrowRight size={18} strokeWidth={2.4} />
                      </Link>

                      <p className="profe-card-popular">
                        <Sparkles size={14} strokeWidth={2.4} />
                        Acepta nuevos estudiantes
                      </p>
                    </aside>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
