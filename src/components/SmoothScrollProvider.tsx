"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

function getElementByHash(hash: string) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return null;

  try {
    return document.getElementById(decodeURIComponent(id));
  } catch {
    return document.getElementById(id);
  }
}

function scrollToElement(element: HTMLElement, lenis: Lenis | null) {
  const scrollMargin = parseInt(getComputedStyle(element).scrollMarginTop, 10) || 0;

  if (lenis) {
    lenis.scrollTo(element, { offset: -scrollMargin });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - scrollMargin;
  window.scrollTo({ top, left: 0 });
}

function scrollToTop(lenis: Lenis | null) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    return;
  }

  window.scrollTo({ top: 0, left: 0 });
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInitialPath = useRef(true);
  const isHistoryNavigation = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);

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
    lenisRef.current = lenis;

    if (lenis) {
      Array.from(document.getElementsByTagName("*")).forEach((node) => {
        if (node instanceof HTMLElement && getComputedStyle(node).overflow === "auto") {
          node.setAttribute("data-lenis-prevent", "true");
        }
      });
    }

    const handleAnchorClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      const href = anchor?.getAttribute("href");
      if (!anchor || !href) return;
      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(anchor.href);
      const isSamePageHash =
        href.startsWith("#") ||
        (url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          Boolean(url.hash));
      if (!isSamePageHash) return;

      const el = getElementByHash(url.hash || href);
      if (!el) return;

      e.preventDefault();
      if (url.hash && window.location.hash !== url.hash) {
        window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
      }
      scrollToElement(el, lenisRef.current);
    };

    const handlePopState = () => {
      isHistoryNavigation.current = true;
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("popstate", handlePopState);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isInitialPath.current) {
      isInitialPath.current = false;
      return;
    }

    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const hash = window.location.hash;
      const hashTarget = hash ? getElementByHash(hash) : null;

      if (hashTarget) {
        scrollToElement(hashTarget, lenisRef.current);
        return;
      }

      scrollToTop(lenisRef.current);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return <>{children}</>;
}
