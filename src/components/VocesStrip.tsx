"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

type StripItem =
  | { type: "asset"; icon: string }
  | { type: "offer"; title: string; subtitle: string };

const ITEMS: StripItem[] = [
  { type: "asset", icon: "/instruments/blue-note.svg" },
  { type: "offer", title: "Clases a domicilio", subtitle: "En tu espacio" },
  { type: "asset", icon: "/instruments/orange-note.svg" },
  { type: "offer", title: "Clases virtuales", subtitle: "Desde casa" },
  { type: "asset", icon: "/instruments/pink-treble.svg" },
  { type: "offer", title: "Todas las edades", subtitle: "Música y arte" },
];

export function VocesStrip() {
  return (
    <section className="voces-strip" aria-hidden="true">
      <Marquee
        autoFill
        direction="left"
        speed={28}
        gradient={false}
        pauseOnHover={false}
        className="voces-marquee-wrap"
      >
        {ITEMS.map((item, i) => (
          <span className={`voces-badge ${item.type === "asset" ? "voces-badge-asset" : ""}`} key={i}>
            {item.type === "asset" ? (
              <Image
                src={item.icon}
                alt=""
                width={96}
                height={96}
                className="voces-strip-icon"
              />
            ) : (
              <span className="voces-offer">
                <span className="voces-offer-title">{item.title}</span>
                <span className="voces-offer-sub">{item.subtitle}</span>
              </span>
            )}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
