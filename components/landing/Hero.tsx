import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-crema">
      {/* Video de fondo (loop, mute, autoplay, playsinline). Imagen poster carga
          de inmediato para no dejar el hero en negro mientras descarga el mp4. */}
      <div className="absolute inset-0">
        <Image
          src="/images/michelada-bokeh.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={75}
        />
        <video
          src="/hero.mp4"
          poster="/images/michelada-bokeh.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/55 to-charcoal/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grain opacity-60 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative container-page flex min-h-[100svh] flex-col justify-end sm:justify-center pt-28 pb-14 sm:pb-24">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow text-champagne mb-6 sm:mb-8">
            Barra de micheladas para eventos · CDMX
          </p>

          <h1 className="text-crema font-display uppercase display-xl">
            Tú pones el evento.
            <br />
            <span className="text-champagne">Nosotros las micheladas.</span>
          </h1>

          <p className="mt-7 sm:mt-9 max-w-xl text-crema/85 text-[15px] sm:text-lg leading-relaxed">
            Una barra cuidada en cada detalle, atendida por manos que saben.
            La michelada como debe ser: bien servida y a tiempo.
          </p>

          <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/cotizador" className="btn-primary group w-full sm:w-auto">
              Arma tu paquete
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link href="/#nosotros" className="btn-on-dark w-full sm:w-auto">
              Conócenos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
