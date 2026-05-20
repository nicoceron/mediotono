import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { CONTACT_EMAIL, INSTAGRAM_URL, whatsappHref } from "@/lib/contact";

const NAV_LINKS = [
  { href: "/profes", label: "Profes" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/#testimonios", label: "Voces" },
  { href: "/#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="foot foot-rich">
      <div className="container foot-grid">
        <div className="foot-brand">
          <Image
            src="/logo-hero-4c023bde.svg"
            alt="A ½ tono — Escuela de artes"
            width={160}
            height={120}
            className="foot-logo-img"
          />
          <p className="foot-tagline">
            Una escuela donde el arte se vive,
            <br />
            se siente y se comparte.
          </p>
        </div>

        <nav className="foot-links" aria-label="Enlaces del pie de página">
          <span className="foot-col-title">Explora</span>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="foot-link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="foot-social">
          <span className="foot-col-title">Hablemos</span>
          <div className="foot-social-row">
            <a
              className="foot-social-btn"
              href={whatsappHref()}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.48 0 .15 5.33.15 11.89c0 2.1.55 4.14 1.6 5.94L.05 24l6.34-1.66a11.86 11.86 0 0 0 5.65 1.43h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.42-8.4ZM12.05 21.4h-.01a9.5 9.5 0 0 1-4.84-1.32l-.35-.21-3.76.99 1-3.66-.23-.38a9.49 9.49 0 0 1-1.45-5.04c0-5.25 4.27-9.51 9.52-9.51 2.54 0 4.93.99 6.73 2.79a9.46 9.46 0 0 1 2.78 6.73c0 5.25-4.27 9.51-9.5 9.51Zm5.5-7.13c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.59-.49-.51-.68-.52l-.58-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z" />
              </svg>
            </a>
            <a
              className="foot-social-btn"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              className="foot-social-btn"
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Email"
              title="Email"
            >
              <Mail size={20} strokeWidth={2.2} />
            </a>
          </div>
          <a className="foot-email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="container foot-bottom">
        <span>© {new Date().getFullYear()} A medio tono</span>
        <span className="foot-bottom-sep" aria-hidden="true">
          ·
        </span>
        <span>Hecho con cariño 🎶</span>
      </div>
    </footer>
  );
}
