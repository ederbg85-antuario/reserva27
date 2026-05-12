import Image from "next/image";

const SHOTS = [
  { src: "/images/michelada-bokeh.jpg", alt: "Michelada con bokeh", ratio: "aspect-[4/5]" },
  { src: "/images/baristas-trabajando.jpg", alt: "Baristas Reserva 27", ratio: "aspect-[3/4]" },
  { src: "/images/barra-llena.jpg", alt: "Barra Reserva 27 con cervezas", ratio: "aspect-[3/4]" },
  { src: "/images/michelada-chamoy.jpg", alt: "Michelada con escarcha de chamoy", ratio: "aspect-[3/4]" },
  { src: "/images/cervezas-vicky-tecate.jpg", alt: "Cervezas Vicky y Tecate", ratio: "aspect-[4/5]" },
  { src: "/images/barista-preparando.jpg", alt: "Barista preparando", ratio: "aspect-[3/4]" },
];

export default function Galeria() {
  return (
    <section id="galeria" className="bg-charcoal text-crema py-20 sm:py-28 overflow-hidden">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-champagne">Galería</p>
            <h2 className="mt-3 text-crema">
              El servicio, <span className="text-crema/55">en acción.</span>
            </h2>
          </div>
          <p className="text-crema/70 max-w-md text-sm sm:text-base leading-relaxed">
            Cálida · Cercana · Real. La forma en que se ve un evento con Reserva 27.
          </p>
        </div>

        {/* Mobile: carrusel horizontal */}
        <div className="mt-10 -mx-5 sm:hidden">
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 snap-x snap-mandatory">
            {SHOTS.map((s) => (
              <div
                key={s.src}
                className={`relative shrink-0 w-[80%] ${s.ratio} rounded-2xl overflow-hidden snap-start`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="80vw"
                  className="object-cover"
                  quality={78}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid uniforme y predecible */}
        <div className="mt-10 hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4">
          {SHOTS.map((s) => (
            <div
              key={s.src}
              className={`group relative ${s.ratio} rounded-2xl overflow-hidden`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width:1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                quality={80}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
