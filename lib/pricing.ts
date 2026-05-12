import { PRICING, type Cerveza, type ChileOption, type Extra } from "./catalog";

export type Selection = {
  totalMicheladas: number;
  sabores: { id: string; nombre: string; cantidad: number }[];
  chileId: ChileOption["id"];
  conClamato: boolean;
  cervezas: { cerveza: Cerveza; cantidad: number }[];
  extras: { extra: Extra; cantidad: number }[];
  horasEvento: number; // base 4h; cobra hora extra si supera
};

export type QuoteBreakdown = {
  subtotalMicheladas: number;
  cargoClamato: number;
  cargoChile: number;
  subtotalCervezas: number;
  baristas: number;
  servicio: number;
  extras: number;
  subtotal: number;
  iva: number;
  total: number;
  // detalle para mostrar línea por línea
  lineas: { concepto: string; cantidad?: number; importe: number; detalle?: string }[];
};

export function calcularCotizacion(s: Selection, opts?: { incluirIVA?: boolean }): QuoteBreakdown {
  const chile = chileById(s.chileId);
  const chileCosto = chile?.costoExtra ?? 0;

  const subtotalMicheladas = s.totalMicheladas * PRICING.precioBaseMichelada;
  const cargoClamato = s.conClamato ? s.totalMicheladas * PRICING.clamatoPorMichelada : 0;
  const cargoChile = chileCosto * s.totalMicheladas;

  const subtotalCervezas = s.cervezas.reduce(
    (acc, c) => acc + c.cerveza.precio * c.cantidad,
    0
  );

  const baristas = PRICING.baristasFijo;
  // 30% del valor total de las micheladas (incluye chile y clamato como parte de la prep)
  const servicio = Math.round((subtotalMicheladas + cargoClamato + cargoChile) * PRICING.servicioPct);

  const extras = s.extras.reduce((acc, e) => {
    const factor = e.extra.unidad === "hora" ? Math.max(0, s.horasEvento - 4) : 1;
    return acc + e.extra.precio * e.cantidad * factor;
  }, 0);

  const subtotal =
    subtotalMicheladas + cargoClamato + cargoChile + subtotalCervezas + baristas + servicio + extras;

  const iva = opts?.incluirIVA ? Math.round(subtotal * PRICING.iva) : 0;
  const total = subtotal + iva;

  const lineas: QuoteBreakdown["lineas"] = [
    {
      concepto: "Micheladas preparadas",
      cantidad: s.totalMicheladas,
      importe: subtotalMicheladas,
      detalle: `${s.totalMicheladas} × $${PRICING.precioBaseMichelada} c/u`,
    },
  ];
  if (cargoChile) {
    lineas.push({
      concepto: `Escarcha ${chile?.nombre ?? ""}`.trim(),
      cantidad: s.totalMicheladas,
      importe: cargoChile,
      detalle: `+$${chileCosto} por michelada`,
    });
  }
  if (cargoClamato) {
    lineas.push({
      concepto: "Con Clamato",
      cantidad: s.totalMicheladas,
      importe: cargoClamato,
      detalle: `+$${PRICING.clamatoPorMichelada} por michelada`,
    });
  }
  if (subtotalCervezas > 0) {
    lineas.push({
      concepto: "Cervezas",
      importe: subtotalCervezas,
      detalle: s.cervezas
        .map((c) => `${c.cantidad}× ${c.cerveza.marca}${c.cerveza.variante ? " " + c.cerveza.variante : ""}`)
        .join(" · "),
    });
  }
  lineas.push({
    concepto: "Baristas (2 personas · 4h)",
    importe: baristas,
    detalle: "Servicio base, uniforme y montaje incluidos",
  });
  lineas.push({
    concepto: "Cargo de servicio (30%)",
    importe: servicio,
    detalle: "Montaje, operación y limpieza",
  });
  if (extras > 0) {
    s.extras.forEach((e) => {
      const factor = e.extra.unidad === "hora" ? Math.max(0, s.horasEvento - 4) : 1;
      const imp = e.extra.precio * e.cantidad * factor;
      if (imp > 0) {
        lineas.push({
          concepto: e.extra.nombre,
          cantidad: e.cantidad * factor,
          importe: imp,
        });
      }
    });
  }

  return {
    subtotalMicheladas,
    cargoClamato,
    cargoChile,
    subtotalCervezas,
    baristas,
    servicio,
    extras,
    subtotal,
    iva,
    total,
    lineas,
  };
}

function chileById(id: ChileOption["id"]) {
  const list: ChileOption[] = [
    { id: "tajin", nombre: "Tajín Clásico", detalle: "", costoExtra: 0 },
    { id: "chamoy-tajin", nombre: "Chamoy + Tajín", detalle: "", costoExtra: 0 },
    { id: "extra-picante", nombre: "Extra Picante", detalle: "", costoExtra: 8 },
    { id: "sin-chile", nombre: "Sin Chile", detalle: "", costoExtra: 0 },
  ];
  return list.find((c) => c.id === id);
}

export function formatMXN(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}
