import Image from "next/image";

export function HeroEntrance() {
  return (
    <div className="hero-logo-stage">
      <Image
        className="hero-logo-main"
        src="/logo-hero-4c023bde.svg"
        alt="A ½ tono — Escuela de artes"
        width={1448}
        height={1086}
        priority
        sizes="(max-width: 700px) 76vw, (max-width: 1100px) 46vw, 500px"
      />
    </div>
  );
}
