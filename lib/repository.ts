/**
 * Capa de repositorio.
 *
 * Hoy todo viene de `catalog.ts` (estático). Cuando conectemos Supabase, sólo
 * reemplazamos las implementaciones de abajo por queries a `supabase.from(...)`.
 * El resto del UI consume estas funciones, no el módulo estático directamente.
 */
import {
  CERVEZAS,
  SABORES,
  CHILES,
  EXTRAS,
  TIPOS_EVENTO,
  PRICING,
  type Cerveza,
  type SaborMichelada,
  type ChileOption,
  type Extra,
} from "./catalog";

export async function getCervezas(): Promise<Cerveza[]> {
  return CERVEZAS;
}

export async function getSabores(): Promise<SaborMichelada[]> {
  return SABORES;
}

export async function getChiles(): Promise<ChileOption[]> {
  return CHILES;
}

export async function getExtras(): Promise<Extra[]> {
  return EXTRAS;
}

export function getTiposEvento() {
  return TIPOS_EVENTO;
}

export function getPricing() {
  return PRICING;
}

/**
 * Persistencia de cotizaciones.
 *
 * Cuando exista Supabase, esta función hace `insert` en la tabla `quotes`.
 * Hoy sólo registra en consola en dev para que el flujo end-to-end sea visible.
 */
export type QuotePayload = Record<string, unknown>;

export async function saveQuote(payload: QuotePayload): Promise<{ id: string }> {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[repository] saveQuote (stub)", payload);
  }
  return { id: `local-${Date.now()}` };
}
