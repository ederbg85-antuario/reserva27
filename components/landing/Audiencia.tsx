import Image from "next/image";
import { Sparkles, Heart, Briefcase } from "lucide-react";

const ITEMS = [
  {
    icon: Heart,
    title: "Bodas & XV",
    body:
      "Eventos con producción media-alta que buscan una activación memorable y muy fotogénica.",
    image: "/images/michelada-chamoy.jpg",
  },
  {
    icon: Sparkles,
    title: "Fiestas privadas",
    body:
      "Cumpleaños, reuniones y celebraciones donde el anfitrión quiere algo distinto al clásico bar.",
    image: "/images/vaso-mostrador.jpg",
  },
  {
    icon: Briefcase,
    title: "Eventos corporativos",
    body:
      "Empresas que quieren elevar un after, una activación o celebración con sello mexicano.",
    image: "/images/barista-preparando.jpg",
  },
];

export default function Audiencia() {
  return (
    <section id="audiencia" className="bg-crema py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="kicker">Nuestra audiencia</p>
          <h2 className="mt-3 text-charcoal">
            Eventos donde la michelada
            <span className="text-brasa"> se vuelve protagonista.</span>
          </h2>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 md:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, body, image }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-3xl bg-white border border-charcoal/5 shadow-card transition hover:shadow-soft"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width:768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center justify-center h-10 w-10 rounded-full bg-champagne text-charcoal">
                  <Icon size={18} />
                </div>
                <div className="absolute left-5 right-5 bottom-5 text-crema">
                  <h3 className="text-2xl sm:text-3xl">{title}</h3>
                  <p className="mt-2 text-sm sm:text-[15px] text-crema/85 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
