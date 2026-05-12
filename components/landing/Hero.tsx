import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-crema">
      {/* Foto de fondo — pan animado para sentirse cinematográfico */}
      <div className="absolute inset-0">
        <Image
          src="/images/michelada-bokeh.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-slow-pan"
          quality={85}
        />
        {/* Gradientes para legibilidad mobile y desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/55 to-charcoal/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grain opacity-60 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative container-page flex min-h-[100svh] flex-col justify-end sm:justify-center pt-24 pb-12 sm:pb-24">
        <div className="max-w-3xl animate-fade-up">
          <p className="kicker text-champagne mb-5 sm:mb-7">
            Barra de micheladas para eventos · CDMX
          </p>
          <h1 className="text-crema">
            Tú pones el evento.
            <br />
            <span className="text-champagne">Nosotros las micheladas.</span>
          </h1>
          <p className="mt-6 sm:mt-8 max-w-xl text-crema/85 text-base sm:text-lg leading-relaxed">
            Barra completa, manos expertas, buena onda. Llegamos con todo —
            carrito, cervezas, insumos y un equipo que sirve con cariño y oficio.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/cotizador"
              className="btn-primary group w-full sm:w-auto"
            >
              Arma tu paquete
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link href="/#servicio" className="btn-on-dark w-full sm:w-auto">
              Cómo funciona
            </Link>
          </div>

          <ul className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl">
            {[
              { k: "Sabor", v: "Mexicano, con carácter." },
              { k: "Servicio", v: "Atento, sin protocolos." },
              { k: "Experiencia", v: "Algo que la gente cuenta." },
            ].map((it) => (
              <li key={it.k}>
                <p className="kicker text-champagne">{it.k}</p>
                <p className="mt-1.5 text-[13px] sm:text-sm text-crema/80 leading-snug">
                  {it.v}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll cue solo en pantallas con espacio */}
      <div className="hidden lg:block absolute bottom-8 right-8 text-crema/60 text-xs uppercase tracking-kicker rotate-90 origin-right">
        Scroll
      </div>
    </section>
  );
}
