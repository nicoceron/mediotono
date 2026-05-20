"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

function useTheme() {
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") as "light" | "dark" || "light";
  }, []);

  const getServerSnapshot = useCallback(() => "light", []);

  const subscribe = useCallback((callback: () => void) => {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("tono-theme", next);
  };

  const navClasses = ["topnav", scrolled ? "topnav--scrolled" : ""].join(" ");

  return (
    <header className={navClasses}>
      <div className="container topnav-inner">
        <Link href="/" className="nav-logo" aria-label="A medio tono — inicio">
          <Image
            className="nav-logo-img"
            src="/logo-nav-947b682d.svg"
            alt="A ½ tono"
            width={1205}
            height={300}
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </Link>

        <div className="nav-right">
          <nav className="nav-links" id="navLinks">
            <Link href="/profes">Profes</Link>
            <Link href="/nosotros">Nosotros</Link>
          </nav>
          <Link className="nav-cta" href="/#contacto">
            Contacto
          </Link>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
