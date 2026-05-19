import Image from "next/image";
import { HeroEntrance } from "./HeroEntrance";

export function Hero() {
  return (
    <section className="hero hero-with-bg" data-screen-label="Hero">
      <Image
        className="hero-bg-image"
        src="/hero-bg.svg"
        alt=""
        fill
        sizes="100vw"
        style={{ zIndex: 0 }}
        priority
      />
      <div className="container hero-grid">
        <HeroEntrance />
      </div>
    </section>
  );
}
