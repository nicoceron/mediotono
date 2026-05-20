"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useRef, useState, type CSSProperties } from "react";
import { FEATURED_QUOTES } from "@/lib/teachers";

function trimQuote(text: string, maxChars = 130): string {
  if (text.length <= maxChars) return text;
  const slice = text.slice(0, maxChars);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : maxChars).trim()}…`;
}

const SPEED = 38; // px/sec

export function TestimoniosSection() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  const items = [...FEATURED_QUOTES, ...FEATURED_QUOTES];

  useAnimationFrame((_, delta) => {
    if (reduce || paused) return;
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth === 0) return;
    let next = x.get() - (SPEED * delta) / 1000;
    if (-next >= halfWidth) next += halfWidth;
    x.set(next);
  });

  return (
    <section
      className="block voces-block"
      id="testimonios"
      data-screen-label="Voces"
    >
      <div className="container">
        <div className="sec-head voces-head">
          <h2 className="voces-title">Lo que dicen las familias</h2>
        </div>

        <div
          className="voces-marquee"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <span className="voces-halo voces-halo-1" aria-hidden="true" />
          <span className="voces-halo voces-halo-2" aria-hidden="true" />
          <span className="voces-halo voces-halo-3" aria-hidden="true" />
          <motion.div
            ref={trackRef}
            className="voces-marquee-track"
            style={{ x }}
          >
            {items.map((q, i) => (
              <Link
                href={`/profes/${q.teacherSlug}`}
                key={`${q.id}-${i}`}
                className="voces-card-link"
                aria-label={`Ver perfil de ${q.teacherName}`}
              >
                <article
                  className="voces-card"
                  style={{ "--voice-color": q.color } as CSSProperties & Record<"--voice-color", string>}
                >
                  <div className="voces-stars" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star
                        key={s}
                        size={18}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <p className="voces-card-quote">{trimQuote(q.quote, 130)}</p>
                  <footer className="voces-card-foot">
                    <strong>{q.author}</strong>
                    <span>
                      Estudiante de {q.teacherShortName}
                      {q.instrument ? ` · ${q.instrument}` : ""}
                    </span>
                  </footer>
                </article>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
