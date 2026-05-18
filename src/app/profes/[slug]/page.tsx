import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Star,
  Video,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import {
  TEACHERS,
  getTeacherBySlug,
  shortDisplayName,
} from "@/lib/teachers";

const WA_NUMBER = "573228725396";

export function generateStaticParams() {
  return TEACHERS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const teacher = getTeacherBySlug(slug);
  if (!teacher) return { title: "Profe — A ½ tono" };
  return {
    title: `${teacher.name} — Profe de ${teacher.role} · A ½ tono`,
    description: teacher.bio,
  };
}

export default async function ProfeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const teacher = getTeacherBySlug(slug);
  if (!teacher) notFound();

  const waMsg = encodeURIComponent(
    `¡Hola! Quiero más información sobre las clases con ${teacher.shortName}.`,
  );
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  const instruments = teacher.role
    .split("·")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <section
        className="block profe-detail"
        data-screen-label={teacher.name}
        style={{ "--profe-color": teacher.color } as React.CSSProperties}
      >
        <div className="container">
          <Link href="/profes" className="profe-back">
            <ArrowLeft size={18} strokeWidth={2.4} />
            <span>Volver a profes</span>
          </Link>

          <div className="profe-detail-grid">
            <div className="profe-detail-main">
              {/* Hero */}
              <header className="pd-hero">
                <div
                  className="pd-hero-photo"
                  style={{ borderColor: teacher.color }}
                >
                  <div
                    className="pd-hero-photo-bg"
                    style={{ background: teacher.color }}
                  />
                  <Image src={teacher.photo} alt={teacher.name} fill sizes="200px" />
                </div>
                <div className="pd-hero-copy">
                  <h1 className="pd-hero-name">
                    {shortDisplayName(teacher.name)}
                    <BadgeCheck
                      size={28}
                      strokeWidth={2.4}
                      style={{ color: teacher.color }}
                      aria-label="Profe verificada"
                    />
                  </h1>
                  <div className="pd-hero-meta">
                    <span className="pd-hero-role">
                      Profe de {instruments.join(" · ")}
                    </span>
                    {teacher.country && (
                      <>
                        <span className="pd-hero-dot" aria-hidden="true">
                          ·
                        </span>
                        <span className="pd-hero-country">
                          De {teacher.country}{" "}
                          {teacher.countryFlag && (
                            <span aria-hidden="true">
                              {teacher.countryFlag}
                            </span>
                          )}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="pd-hero-bio">{teacher.bio}</p>
                </div>
              </header>

              {/* Imparte */}
              <section className="pd-section">
                <header className="pd-section-head">
                  <GraduationCap size={20} strokeWidth={2.4} style={{ color: teacher.color }} />
                  <h2>Imparte</h2>
                </header>
                <ul className="pd-imparte">
                  {instruments.map((inst) => (
                    <li key={inst} className="pd-imparte-item">
                      <span
                        className="pd-imparte-dot"
                        style={{ background: teacher.color }}
                        aria-hidden="true"
                      />
                      Clases de {inst.toLowerCase()}
                    </li>
                  ))}
                  {teacher.classFormats.map((fmt) => (
                    <li key={fmt} className="pd-imparte-item pd-imparte-item-soft">
                      <Video
                        size={14}
                        strokeWidth={2.4}
                        style={{ color: teacher.color }}
                      />
                      {fmt}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Sobre mí */}
              <section className="pd-section">
                <header className="pd-section-head">
                  <h2 className="pd-about-title">Sobre mí</h2>
                </header>
                <p className="pd-about-body">{teacher.longBio}</p>
              </section>

              {/* Reseñas */}
              <section className="pd-section">
                <header className="pd-section-head pd-reviews-head">
                  <h2>Reseñas de mis estudiantes</h2>
                  <div className="pd-reviews-rating">
                    <strong>5,0</strong>
                    <span
                      className="pd-reviews-stars"
                      aria-hidden="true"
                      style={{ color: teacher.color }}
                    >
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star
                          key={s}
                          size={16}
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      ))}
                    </span>
                  </div>
                </header>
                <p className="pd-section-sub">
                  Basado en reseñas de {teacher.reviews.length}{" "}
                  {teacher.reviews.length === 1 ? "estudiante" : "estudiantes"}.
                </p>
                <div className="pd-reviews-grid">
                  {teacher.reviews.map((r) => (
                    <article className="pd-review" key={r.id}>
                      <header className="pd-review-head">
                        <span
                          className="pd-review-avatar"
                          style={{ background: teacher.color }}
                          aria-hidden="true"
                        >
                          {r.author.charAt(0).toUpperCase()}
                        </span>
                        <div className="pd-review-meta">
                          <strong>{r.author}</strong>
                          {r.instrument && (
                            <span>{r.instrument}</span>
                          )}
                        </div>
                      </header>
                      <span
                        className="pd-review-stars"
                        aria-hidden="true"
                        style={{ color: teacher.color }}
                      >
                        {[0, 1, 2, 3, 4].map((s) => (
                          <Star
                            key={s}
                            size={14}
                            fill="currentColor"
                            strokeWidth={0}
                          />
                        ))}
                      </span>
                      <p className="pd-review-quote">{r.quote}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            {/* Sticky right card */}
            <aside className="profe-detail-side">
              <div className="pd-cta-card">
                <div className="pd-cta-stats">
                  <div className="pd-cta-stat">
                    <strong>
                      <Star
                        size={18}
                        fill="currentColor"
                        strokeWidth={0}
                        style={{ color: teacher.color }}
                        aria-hidden="true"
                      />
                      5,0
                    </strong>
                    <span>
                      {teacher.reviews.length}{" "}
                      {teacher.reviews.length === 1 ? "reseña" : "reseñas"}
                    </span>
                  </div>
                  <div className="pd-cta-stat">
                    <strong>{teacher.yearsTeaching}+</strong>
                    <span>años enseñando</span>
                  </div>
                </div>

                <a
                  className="pd-cta-primary"
                  href={waUrl}
                  target="_blank"
                  rel="noopener"
                  style={{ background: teacher.color }}
                >
                  Quiero clases con {teacher.shortName}
                  <ArrowRight size={18} strokeWidth={2.4} />
                </a>

                <a
                  className="pd-cta-secondary"
                  href={waUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <MessageCircle size={18} strokeWidth={2.2} />
                  Pregunta lo que quieras
                </a>

                <div className="pd-cta-callout">
                  <BadgeCheck size={18} strokeWidth={2.4} />
                  <div>
                    <strong>¿No te convence?</strong>
                    <span>
                      Conoce al resto del equipo y elige otra profe.
                    </span>
                    <Link href="/profes" className="pd-cta-callout-link">
                      Ver todas las profes →
                    </Link>
                  </div>
                </div>

                <div className="pd-cta-popular">
                  <Sparkles size={16} strokeWidth={2.4} style={{ color: teacher.color }} />
                  <div>
                    <strong>Acepta nuevos estudiantes</strong>
                    <span>Cupos limitados este mes.</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
