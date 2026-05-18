import Image from "next/image";
import Link from "next/link";
import { TEACHERS } from "@/lib/teachers";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    number: "1",
    title: "Encuentra tu profe.",
    body: "Conoce a los profes de A ½ tono y elige con quién quieres empezar — desde la primera clase vas a sentirte en confianza.",
    accent: "var(--green)",
  },
  {
    number: "2",
    title: "Comienza a aprender.",
    body: "Tu profe adapta cada clase a tus objetivos — sin importar si llegas con miedo, sin saber leer una nota o queriendo perfeccionar tu técnica.",
    accent: "var(--orange)",
  },
  {
    number: "3",
    title: "Avanza cada semana.",
    body: "Clases presenciales o virtuales, en grupos pequeños y con seguimiento real — para que cada semana suene un poquito mejor que la anterior.",
    accent: "var(--blue)",
  },
];

export function ComoFuncionaSection() {
  const featured = TEACHERS.slice(0, 3);

  return (
    <section
      className="block alt"
      id="como-funciona"
      data-screen-label="Cómo funciona"
    >
      <div className="container cf-container">
        <div className="cf-head">
          <h2 className="cf-title">
            <span style={{ color: "var(--orange)" }}>Cómo</span>{" "}
            <span style={{ color: "var(--ink)" }}>funciona</span>{" "}
            <Image
              className="cf-title-logo"
              src="/logo-nav.svg"
              alt="A ½ tono"
              width={1205}
              height={300}
              priority
            />
          </h2>
        </div>

        <div className="cf-grid">
          {STEPS.map((step, i) => (
            <Reveal as="article" className="cf-card" key={step.number} delay={i * 120}>
              <span
                className="cf-step-chip"
                style={{ background: step.accent }}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3 className="cf-card-title">{step.title}</h3>
              <p className="cf-card-body">{step.body}</p>

              {i === 0 && (
                <div className="cf-card-visual cf-visual-profes">
                  {featured.map((t, idx) => (
                    <Link
                      key={t.slug}
                      href={`/profes/${t.slug}`}
                      className="cf-mini-profe"
                      style={{
                        borderColor: t.color,
                        zIndex: featured.length - idx,
                      }}
                    >
                      <div
                        className="cf-mini-profe-photo"
                        style={{ borderColor: t.color }}
                      >
                        <div
                          className="cf-mini-profe-bg"
                          style={{ background: t.color }}
                        />
                        <Image
                          src={t.photo}
                          alt=""
                          fill
                          sizes="(max-width: 700px) 112px, 130px"
                        />
                      </div>
                      <div className="cf-mini-profe-body">
                        <strong style={{ color: t.color }}>
                          {t.shortName}
                        </strong>
                        <span>Profe de {t.role.split("·")[0].trim()}</span>
                      </div>
                    </Link>
                  ))}
                  <Link href="/profes" className="cf-mini-profe-more">
                    Ver todas →
                  </Link>
                </div>
              )}

              {i === 1 && (
                <div className="cf-card-visual cf-visual-class">
                  <div className="cf-lesson-frame">
                    <video
                      className="cf-lesson-video"
                      src="/comienza-a-aprender-guitarra.mp4"
                      poster="/comienza-a-aprender-guitarra-poster.jpg"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="Estudiante en clase de guitarra"
                    />
                  </div>
                </div>
              )}

              {i === 2 && (
                <div className="cf-card-visual cf-visual-progress">
                  <div className="cf-progress-frame">
                    <video
                      className="cf-progress-video"
                      src="/avanza-cada-semana.mp4"
                      poster="/avanza-cada-semana-poster.jpg"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="Presentación musical de estudiantes"
                    />
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
