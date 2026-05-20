"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

type RevealAs = "div" | "article" | "section" | "li" | "ul" | "header" | "p";

type RevealProps = {
  children: ReactNode;
  as?: RevealAs;
  className?: string;
  delay?: number;
  amount?: number;
  y?: number;
  style?: CSSProperties;
};

export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  amount = 0.18,
  y = 28,
  style,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      data-mobile-reveal="instant"
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </Component>
  );
}
