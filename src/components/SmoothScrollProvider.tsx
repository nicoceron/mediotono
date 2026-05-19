"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = prefersReducedMotion
      ? null
      : new Lenis({
          autoRaf: true,
          duration: 1,
          smoothWheel: true,
          syncTouch: false,
        });

    if (lenis) {
      Array.from(document.getElementsByTagName("*")).forEach((node) => {
        if (node instanceof HTMLElement && getComputedStyle(node).overflow === "auto") {
          node.setAttribute("data-lenis-prevent", "true");
        }
      });
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) {
            if (lenis) {
              const scrollMargin = parseInt(getComputedStyle(el).scrollMarginTop, 10) || 0;
              lenis.scrollTo(el as HTMLElement, { offset: -scrollMargin });
            } else {
              const top = el.getBoundingClientRect().top + window.scrollY - 70;
              window.scrollTo({ top });
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
