import Link from "next/link";
import Logo from "./Logo";
import { BRAND } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-crema/90 pt-16 pb-8">
      <div className="container-page grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="inverso" className="h-9 w-auto" />
          <p className="mt-6 max-w-sm text-crema/70 leading-relaxed">
            Reserva 27 es una barra móvil de micheladas para eventos en CDMX y área
            metropolitana. Tú pones el evento, nosotros las micheladas.
          </p>
        </div>
        <div>
          <p className="kicker text-champagne">Contacto</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`https://wa.me/${BRAND.whatsappE164}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-champagne transition-colors"
              >
                WhatsApp · {BRAND.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="hover:text-champagne transition-colors">
                {BRAND.email}
              </a>
            </li>
            <li className="text-crema/60">{BRAND.city}</li>
          </ul>
        </div>
        <div>
          <p className="kicker text-champagne">Navegación</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/#nosotros" className="hover:text-champagne">Nosotros</Link></li>
            <li><Link href="/#servicio" className="hover:text-champagne">Servicio</Link></li>
            <li><Link href="/#galeria" className="hover:text-champagne">Galería</Link></li>
            <li><Link href="/cotizador" className="hover:text-champagne">Cotiza tu evento</Link></li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-14 pt-6 border-t border-crema/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-crema/55">
        <p>© {new Date().getFullYear()} Reserva 27 · Todos los derechos reservados.</p>
        <p className="italic">Reserva la fecha — el resto va por nuestra cuenta.</p>
      </div>
    </footer>
  );
}
