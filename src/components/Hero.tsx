import Image from "next/image";
import { HeroEntrance } from "./HeroEntrance";

export function Hero() {
  return (
    <section className="hero hero-with-bg" data-screen-label="Hero">
      <div className="hero-bg-layer" aria-hidden="true">
        <Image
          className="hero-bg-image"
          src="/hero-bg.svg"
          alt=""
          fill
          sizes="100vw"
          priority
        />
      </div>
      <div className="container hero-grid">
        <HeroEntrance />
      </div>
    </section>
  );
}
