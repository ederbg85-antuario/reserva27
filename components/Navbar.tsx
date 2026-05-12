"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#cotiza", label: "Cotiza en vivo" },
  { href: "/#equipo", label: "Lo que llevamos" },
  { href: "/#galeria", label: "Galería" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isLight = tone === "light";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-crema/85 border-b border-charcoal/5 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.2)]"
          : isLight
          ? "bg-transparent"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-page flex h-[68px] sm:h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Reserva 27 — inicio">
          <Logo
            variant={scrolled || isLight ? "principal" : "inverso"}
            className="h-10 sm:h-11 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "text-[13px] font-medium tracking-wide transition-colors",
                scrolled || isLight
                  ? "text-charcoal/75 hover:text-charcoal"
                  : "text-crema/85 hover:text-crema",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/cotizador" className="btn-primary">
            Cotizar mi evento
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className={[
            "md:hidden flex items-center justify-center rounded-full h-11 w-11 transition",
            scrolled || isLight
              ? "bg-charcoal text-crema"
              : "bg-crema/95 text-charcoal",
          ].join(" ")}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          "md:hidden fixed inset-x-0 top-[68px] sm:top-20 bottom-0 bg-charcoal text-crema",
          "transition-all duration-300",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <div className="container-page py-8 flex flex-col gap-1">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-semibold tracking-tight py-3 border-b border-crema/10"
              style={{ animation: `fadeUp 0.35s ${i * 40}ms both` }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cotizador"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brasa text-crema font-semibold uppercase tracking-kicker text-sm h-14 px-6"
          >
            Cotizar mi evento
          </Link>
          <p className="mt-10 text-crema/60 text-sm">
            CDMX & Área Metropolitana · WhatsApp 55 38 79 21 76
          </p>
        </div>
      </div>
    </header>
  );
}
