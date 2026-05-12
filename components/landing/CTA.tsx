import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-crema">
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/images/cervezas-vicky-tecate.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={70}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40" />
      </div>

      <div className="relative container-page py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="kicker text-champagne">Reserva tu fecha</p>
          <h2 className="mt-3">
            Y nosotros
            <br />
            <span className="text-champagne">ponemos la barra.</span>
          </h2>
          <p className="mt-6 text-crema/80 text-base sm:text-lg leading-relaxed max-w-xl">
            Arma tu paquete en menos de dos minutos. Eliges micheladas, sabores y
            cervezas; te damos el desglose y lo descargas en PDF.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/cotizador" className="btn-primary group w-full sm:w-auto">
              Cotizar ahora
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://wa.me/525538792176?text=Hola%20Reserva%2027%2C%20quiero%20info%20para%20mi%20evento."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-on-dark w-full sm:w-auto"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
