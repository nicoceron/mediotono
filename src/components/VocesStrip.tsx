"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const ITEMS = [
  { word: "Todas las Edades", icon: "/instruments/blue-note.svg" },
  { word: "Todos los Instrumentos", icon: "/instruments/orange-note.svg" },
  { word: "Presencial & Virtual", icon: "/instruments/pink-treble.svg" },
];

export function VocesStrip() {
  return (
    <section className="voces-strip" aria-hidden="true">
      <Marquee
        autoFill
        direction="right"
        speed={45}
        gradient={false}
        pauseOnHover={false}
        className="voces-marquee-wrap"
      >
        {ITEMS.map((item, i) => (
          <span className="voces-badge" key={i}>
            <Image
              src={item.icon}
              alt=""
              width={46}
              height={46}
              className="voces-icon"
            />
            <span className="voces-word">{item.word}</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
