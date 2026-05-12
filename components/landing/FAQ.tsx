"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const QA = [
  {
    q: "¿Cuánto tiempo dura el servicio?",
    a: "El paquete base incluye 4 horas de servicio continuo. Si tu evento es más largo, puedes sumar horas extras desde el cotizador.",
  },
  {
    q: "¿Qué incluye el paquete base?",
    a: "Barra Reserva 27, dos baristas uniformados, vajilla PET 16oz con sello, hielo, salsas, especias, escarchas, montaje y limpieza al final del evento.",
  },
  {
    q: "¿Cómo se cobra el servicio?",
    a: "Cobramos un fijo de $1,500 por los dos baristas (cuatro horas) más un 30% sobre el total de las micheladas que cubre operación, montaje y limpieza. La cerveza va por separado y la elegimos juntos.",
  },
  {
    q: "¿En qué zonas dan servicio?",
    a: "Damos servicio en toda CDMX y zona metropolitana. Para eventos fuera de esa cobertura, lo platicamos por WhatsApp.",
  },
  {
    q: "¿Cómo aseguro mi fecha?",
    a: "Con un anticipo del 50%. El resto se liquida el día del evento. Te enviamos la cotización formal por correo después de armar tu paquete.",
  },
  {
    q: "¿Puedo elegir las cervezas y los sabores?",
    a: "Sí, ese es el punto del cotizador: tú armas todo a tu gusto. También podemos sugerir el mix ideal según tu número de invitados.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-crema py-20 sm:py-28">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Preguntas frecuentes</p>
        <h2 className="mt-3">
          Las dudas que <span className="text-charcoal/55">siempre nos hacen.</span>
        </h2>
        <div className="mt-10 sm:mt-12 divide-y divide-charcoal/10">
          {QA.map((item, i) => (
            <FAQItem key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-4 sm:py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 text-left py-2"
      >
        <span className="text-base sm:text-lg font-medium text-charcoal leading-snug pr-2">
          {q}
        </span>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-charcoal text-crema">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pt-2" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <p className="overflow-hidden text-charcoal/75 leading-relaxed text-[15px] sm:text-base">
          {a}
        </p>
      </div>
    </div>
  );
}
