import Image from "next/image";

const SHOTS = [
  { src: "/images/michelada-bokeh.jpg", alt: "Michelada con bokeh", span: "row-span-2" },
  { src: "/images/baristas-trabajando.jpg", alt: "Baristas Reserva 27 en evento", span: "" },
  { src: "/images/barra-llena.jpg", alt: "Barra Reserva 27 llena de cervezas", span: "" },
  { src: "/images/michelada-chamoy.jpg", alt: "Michelada con escarcha de chamoy", span: "" },
  { src: "/images/cervezas-vicky-tecate.jpg", alt: "Cervezas Vicky y Tecate", span: "" },
  { src: "/images/barista-preparando.jpg", alt: "Barista preparando una michelada", span: "row-span-2" },
];

export default function Galeria() {
  return (
    <section id="galeria" className="bg-charcoal text-crema py-20 sm:py-28 overflow-hidden">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker text-champagne">Estilo cinematográfico</p>
            <h2 className="mt-3">
              El servicio
              <br />
              <span className="text-champagne">en acción.</span>
            </h2>
          </div>
          <p className="text-crema/70 max-w-md leading-relaxed">
            Cálida · Cercana · Real. La forma en que se ve un evento con Reserva 27.
          </p>
        </div>

        {/* Mosaico: en mobile scroll horizontal, en desktop grid */}
        <div className="mt-10 -mx-5 sm:mx-0 sm:hidden">
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 snap-x snap-mandatory">
            {SHOTS.map((s) => (
              <div
                key={s.src}
                className="relative shrink-0 w-[78%] aspect-[4/5] rounded-2xl overflow-hidden snap-start"
              >
                <Image src={s.src} alt={s.alt} fill sizes="78vw" className="object-cover" quality={80} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 hidden sm:grid grid-cols-4 grid-rows-2 gap-3 sm:gap-4 auto-rows-[14rem] md:auto-rows-[16rem] lg:auto-rows-[18rem]">
          {SHOTS.map((s) => (
            <div
              key={s.src}
              className={`relative overflow-hidden rounded-2xl ${s.span}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width:1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={80}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
