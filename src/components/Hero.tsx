import Image from "next/image";
import { Squiggle } from "./Ornaments";

const WA_NUMBER = "573228725396";
const WA_MSG = encodeURIComponent("¡Hola! Quiero más información sobre los cursos.");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

export function Hero() {
  return (
    <section className="hero hero-with-bg" data-screen-label="Hero">
      <Image
            src="/hero-bg.svg"
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
          <Squiggle color="var(--accent)" style={{ marginTop: 12, maxWidth: 320, width: "60%" }} />
          <p className="hero-sub">
            En <strong>A ½ tono</strong> aprendes música y arte en grupos pequeños,
            con profes que te acompañan a tu ritmo. Para todas las edades.
          </p>

        </div>
      </div>
    </section>
  );
}