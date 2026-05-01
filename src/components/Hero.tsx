import Image from "next/image";
import { Squiggle } from "./Ornaments";

const WA_NUMBER = "573228725396";
const WA_MSG = encodeURIComponent("¡Hola! Quiero más información sobre los cursos.");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

export function Hero() {
  return (
    <section className="hero hero-with-bg" data-screen-label="Hero">
      <Image
            src="/hero-bg.png"
        alt=""
        fill
        sizes="100vw"
      style={{ objectFit: "cover", zIndex: 0 }}
      priority
    />
    <div className="container hero-grid" style={{ position: "relative", zIndex: 2 }}>
        <div>
          <span className="hero-eyebrow">✦ Escuela de artes ✦</span>
          <h1>
            <span className="word c-orange">Descubre</span><br />
            <span className="word c-pink">tu</span>{" "}
            <span className="word c-blue">pasión</span>{" "}
            <span className="word c-green">por</span><br />
            <span className="word c-red">el arte.</span>
          </h1>
          <Squiggle color="var(--accent)" style={{ marginTop: 18, width: "50%", maxWidth: 320 }} />
          <p className="hero-sub">
            En <strong>A ½ tono</strong> aprendes música y arte en grupos pequeños,
            con profes que te acompañan a tu ritmo. Para todas las edades.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-wa" href={WA_URL} target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .15 5.3.15 11.9c0 2.1.55 4.1 1.6 5.9L.05 24l6.3-1.7a11.9 11.9 0 0 0 5.65 1.4c6.55 0 11.9-5.3 11.9-11.9 0-3.2-1.25-6.2-3.4-8.3Z"/></svg>
              Escríbenos
            </a>
            <a className="btn btn-yellow" href="#cursos">
              Ver cursos →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}