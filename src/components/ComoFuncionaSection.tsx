import Image from "next/image";
import {
  BadgeCheck,
  GraduationCap,
  Languages,
} from "lucide-react";
import { TEACHERS } from "@/lib/teachers";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    number: "1",
    title: "Encuentra tu profe.",
    body: "Conoce a los profes de A ½ tono y elige con quién quieres empezar.",
    accent: "var(--pink)",
  },
  {
    number: "2",
    title: "Comienza a aprender.",
    body: "Tu profe ajusta la clase a tu objetivo, estés empezando o puliendo técnica.",
    accent: "var(--orange)",
  },
  {
    number: "3",
    title: "Avanza cada semana.",
    body: "Virtual o a domicilio, en grupos pequeños y con seguimiento para avanzar cada semana.",
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
              src="/logo-nav-947b682d.svg"
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
                    <div
                      key={t.slug}
                      className="cf-mini-profe"
                      style={{
                        ["--cf-mini-accent" as string]: t.color,
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
                          alt={t.shortName}
                          fill
                          sizes="(max-width: 700px) 112px, 130px"
                          style={
                            t.photoPosition
                              ? { objectPosition: t.photoPosition }
                              : undefined
                          }
                        />
                      </div>
                      <div className="cf-mini-profe-body">
                        <div className="cf-mini-profe-head">
                          <strong>{t.shortName}</strong>
                          <BadgeCheck
                            size={18}
                            strokeWidth={2.4}
                            style={{ color: t.color }}
                            aria-label="Profe verificado"
                          />
                          {t.countryFlag && (
                            <span
                              className="cf-mini-profe-flag"
                              aria-label={t.country}
                              title={t.country}
                            >
                              {t.countryFlag}
                            </span>
                          )}
                        </div>
                        <span className="cf-mini-profe-line">
                          <GraduationCap size={18} strokeWidth={2.4} aria-hidden="true" />
                          <span>Profe de {t.skills[0]?.label ?? t.role}</span>
                        </span>
                        <span className="cf-mini-profe-line">
                          <Languages size={18} strokeWidth={2.4} aria-hidden="true" />
                          <span>{(t.classLanguages ?? ["Español"]).join(" · ")}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {i === 1 && (
                <div className="cf-card-visual cf-visual-class">
                  <div className="cf-lesson-frame">
                    <video
                      className="cf-lesson-video"
                      src="/comienza-a-aprender-guitarra.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="Estudiante tocando guitarra en clase"
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
