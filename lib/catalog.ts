/**
 * Catálogo estático del cotizador.
 *
 * Esta capa intencionalmente expone funciones tipo "repo" (getCervezas, getSabores...)
 * para que mañana podamos cambiar el backing store a Supabase sin tocar UI.
 * Ver `lib/supabase.ts` y `lib/repository.ts`.
 */

export type Cerveza = {
  id: string;
  marca: string;
  variante?: string;
  formato: "lata" | "botella" | "caguama";
  ml: number;
  precio: number; // MXN por unidad
  imagen: string;
};

export const CERVEZAS: Cerveza[] = [
  // Latas
  { id: "bohemia-cristal-lata", marca: "Bohemia", variante: "Cristal", formato: "lata", ml: 473, precio: 50, imagen: "/cervezas/bohemia-cristal-lata.png" },
  { id: "victoria-lata", marca: "Victoria", formato: "lata", ml: 473, precio: 42, imagen: "/cervezas/victoria-lata.png" },
  { id: "modelo-especial-lata", marca: "Modelo", variante: "Especial", formato: "lata", ml: 473, precio: 48, imagen: "/cervezas/modelo-especial-lata.png" },
  { id: "indio-lata", marca: "Indio", formato: "lata", ml: 473, precio: 42, imagen: "/cervezas/indio-lata.png" },
  { id: "tecate-original-lata", marca: "Tecate", variante: "Original", formato: "lata", ml: 473, precio: 42, imagen: "/cervezas/tecate-original-lata.png" },
  { id: "tecate-light-lata", marca: "Tecate", variante: "Light", formato: "lata", ml: 473, precio: 42, imagen: "/cervezas/tecate-light-lata.png" },
  { id: "modelo-negra-lata", marca: "Modelo", variante: "Negra", formato: "lata", ml: 473, precio: 52, imagen: "/cervezas/modelo-negra-lata.png" },
  { id: "dos-equis-lata", marca: "Dos Equis", variante: "Lager", formato: "lata", ml: 473, precio: 45, imagen: "/cervezas/dos-equis-lata.png" },
  { id: "pacifico-clara-lata", marca: "Pacífico", variante: "Clara", formato: "lata", ml: 355, precio: 42, imagen: "/cervezas/pacifico-clara-lata.png" },

  // Botellas
  { id: "corona-extra-botella", marca: "Corona", variante: "Extra", formato: "botella", ml: 355, precio: 38, imagen: "/cervezas/corona-extra-botella.png" },
  { id: "victoria-botella", marca: "Victoria", formato: "botella", ml: 355, precio: 35, imagen: "/cervezas/victoria-botella.png" },
  { id: "pacifico-clara-botella", marca: "Pacífico", variante: "Clara", formato: "botella", ml: 355, precio: 38, imagen: "/cervezas/pacifico-clara-botella.png" },
  { id: "modelo-negra-botella", marca: "Modelo", variante: "Negra", formato: "botella", ml: 355, precio: 42, imagen: "/cervezas/modelo-negra-botella.png" },
  { id: "xx-lager-botella", marca: "Dos Equis", variante: "Lager", formato: "botella", ml: 355, precio: 38, imagen: "/cervezas/xx-lager-botella.png" },
  { id: "michelob-ultra-botella", marca: "Michelob", variante: "Ultra", formato: "botella", ml: 355, precio: 48, imagen: "/cervezas/michelob-ultra-botella.png" },

  // Familiares / Caguamas
  { id: "corona-mega", marca: "Corona", variante: "Mega 1.2L", formato: "caguama", ml: 1200, precio: 130, imagen: "/cervezas/corona-mega.png" },
  { id: "corona-extra-familiar", marca: "Corona", variante: "Familiar 710ml", formato: "caguama", ml: 710, precio: 75, imagen: "/cervezas/corona-extra-familiar.png" },
  { id: "indio-caguama", marca: "Indio", variante: "Caguama 940ml", formato: "caguama", ml: 940, precio: 95, imagen: "/cervezas/indio-caguama.png" },
  { id: "leon-caguama", marca: "León", variante: "Caguama 1.2L", formato: "caguama", ml: 1200, precio: 110, imagen: "/cervezas/leon-caguama.png" },
  { id: "modelo-especial-caguama", marca: "Modelo", variante: "Caguama 1.2L", formato: "caguama", ml: 1200, precio: 130, imagen: "/cervezas/modelo-especial-caguama.png" },
  { id: "victoria-caguama", marca: "Victoria", variante: "Caguama 940ml", formato: "caguama", ml: 940, precio: 90, imagen: "/cervezas/victoria-caguama.png" },
  { id: "tecate-caguama", marca: "Tecate", variante: "Caguama 1.2L", formato: "caguama", ml: 1200, precio: 110, imagen: "/cervezas/tecate-caguama.png" },
  { id: "dos-equis-caguama", marca: "Dos Equis", variante: "Caguama 1.2L", formato: "caguama", ml: 1200, precio: 115, imagen: "/cervezas/dos-equis-caguama.png" },
];

export type SaborMichelada = {
  id: string;
  nombre: string;
  descripcion: string;
  picante: 0 | 1 | 2 | 3;
};

export const SABORES: SaborMichelada[] = [
  { id: "clasica", nombre: "Clásica", descripcion: "Limón, sal, salsa inglesa y maggi.", picante: 1 },
  { id: "chamoy", nombre: "Chamoy", descripcion: "El balance perfecto: dulce, ácido y salado.", picante: 2 },
  { id: "mango-chamoy", nombre: "Mango Chamoy", descripcion: "Mango natural con escarcha de chamoy.", picante: 2 },
  { id: "tamarindo", nombre: "Tamarindo", descripcion: "Pulpa de tamarindo y un toque de tajín.", picante: 2 },
  { id: "maracuya", nombre: "Maracuyá", descripcion: "Fresca, ácida y muy fotogénica.", picante: 1 },
  { id: "pepino", nombre: "Pepino", descripcion: "Pepino fresco, ligera y refrescante.", picante: 1 },
  { id: "jamaica", nombre: "Jamaica", descripcion: "Concentrado natural de jamaica con limón.", picante: 1 },
  { id: "habanero", nombre: "Mango Habanero", descripcion: "Para los que la quieren con carácter.", picante: 3 },
];

export type ChileOption = {
  id: "tajin" | "chamoy-tajin" | "extra-picante" | "sin-chile";
  nombre: string;
  detalle: string;
  costoExtra: number;
};

export const CHILES: ChileOption[] = [
  { id: "tajin", nombre: "Tajín Clásico", detalle: "Escarcha suave.", costoExtra: 0 },
  { id: "chamoy-tajin", nombre: "Chamoy + Tajín", detalle: "Nuestra firma.", costoExtra: 0 },
  { id: "extra-picante", nombre: "Extra Picante", detalle: "Habanero molido en la escarcha.", costoExtra: 8 },
  { id: "sin-chile", nombre: "Sin Chile", detalle: "Sin escarcha, vaso limpio.", costoExtra: 0 },
];

export type Extra = {
  id: string;
  nombre: string;
  detalle: string;
  precio: number;
  unidad: "fijo" | "hora";
};

export const EXTRAS: Extra[] = [
  { id: "barra-decorada", nombre: "Barra decorada premium", detalle: "Iluminación LED y backdrop.", precio: 1500, unidad: "fijo" },
  { id: "barista-extra", nombre: "Barista adicional", detalle: "Para eventos +150 invitados.", precio: 750, unidad: "fijo" },
  { id: "hora-extra", nombre: "Hora extra de servicio", detalle: "Más allá de las 4 horas base.", precio: 600, unidad: "hora" },
  { id: "vajilla-cristal", nombre: "Upgrade a vaso de vidrio", detalle: "En lugar del PET 16oz.", precio: 800, unidad: "fijo" },
];

/** Reglas comerciales base — controladas en un solo lugar para fácil tuneo. */
export const PRICING = {
  precioBaseMichelada: 85, // incluye vaso, hielo, preparación, escarcha estándar
  clamatoPorMichelada: 10, // si el cliente lo elige para sus micheladas
  baristasFijo: 1500, // 2 baristas a $750 c/u (servicio base 4h)
  baristasIncluidos: 2,
  servicioPct: 0.30, // 30% sobre subtotal de micheladas — operación, montaje y limpieza
  iva: 0.16, // IVA opcional, mostrado si se requiere factura
};

export type TipoEvento =
  | "boda"
  | "xv"
  | "cumpleanos"
  | "corporativo"
  | "fiesta-privada"
  | "otro";

export const TIPOS_EVENTO: { id: TipoEvento; nombre: string }[] = [
  { id: "boda", nombre: "Boda" },
  { id: "xv", nombre: "XV Años" },
  { id: "cumpleanos", nombre: "Cumpleaños" },
  { id: "corporativo", nombre: "Evento corporativo" },
  { id: "fiesta-privada", nombre: "Fiesta privada" },
  { id: "otro", nombre: "Otro" },
];
