"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const ITEMS = [
  { type: "brand" },
  { type: "offer", title: "CLASES PRESENCIALES", subtitle: "En grupos pequeños" },
  { type: "brand" },
  { type: "offer", title: "CLASES VIRTUALES", subtitle: "Desde casa" },
  { type: "brand" },
  { type: "offer", title: "TODAS LAS EDADES", subtitle: "Música y arte" },
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
          <span className="voces-badge" key={i}>
            {item.type === "brand" ? (
              <Image
                src="/logo-nav.svg"
                alt=""
                width={1205}
                height={300}
                className="voces-logo"
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
