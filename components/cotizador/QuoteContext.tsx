"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import { calcularCotizacion, type Selection, type QuoteBreakdown } from "@/lib/pricing";
import type { Cerveza, ChileOption, Extra } from "@/lib/catalog";

export type ClienteData = {
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  direccion: string;
  invitados: string;
  tipoEvento: string;
  notas: string;
};

export type State = {
  totalMicheladas: number;
  horasEvento: number;
  sabores: { id: string; nombre: string; cantidad: number }[];
  chileId: ChileOption["id"];
  conClamato: boolean;
  cervezas: { cerveza: Cerveza; cantidad: number }[];
  extras: { extra: Extra; cantidad: number }[];
  cliente: ClienteData;
};

type Action =
  | { type: "set"; patch: Partial<State> }
  | { type: "setMicheladas"; value: number }
  | { type: "setHoras"; value: number }
  | { type: "setChile"; value: ChileOption["id"] }
  | { type: "toggleClamato" }
  | { type: "setSaborQty"; id: string; nombre: string; cantidad: number }
  | { type: "setCervezaQty"; cerveza: Cerveza; cantidad: number }
  | { type: "setExtraQty"; extra: Extra; cantidad: number }
  | { type: "setCliente"; patch: Partial<ClienteData> }
  | { type: "reset" };

const INITIAL: State = {
  totalMicheladas: 50,
  horasEvento: 4,
  sabores: [],
  chileId: "chamoy-tajin",
  conClamato: true,
  cervezas: [],
  extras: [],
  cliente: {
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
    direccion: "",
    invitados: "",
    tipoEvento: "",
    notas: "",
  },
};

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "set":
      return { ...state, ...a.patch };
    case "setMicheladas":
      return { ...state, totalMicheladas: clamp(a.value, 0, 2000) };
    case "setHoras":
      return { ...state, horasEvento: clamp(a.value, 4, 12) };
    case "setChile":
      return { ...state, chileId: a.value };
    case "toggleClamato":
      return { ...state, conClamato: !state.conClamato };
    case "setSaborQty": {
      const next = state.sabores.filter((s) => s.id !== a.id);
      if (a.cantidad > 0) next.push({ id: a.id, nombre: a.nombre, cantidad: a.cantidad });
      return { ...state, sabores: next };
    }
    case "setCervezaQty": {
      const next = state.cervezas.filter((c) => c.cerveza.id !== a.cerveza.id);
      if (a.cantidad > 0) next.push({ cerveza: a.cerveza, cantidad: a.cantidad });
      return { ...state, cervezas: next };
    }
    case "setExtraQty": {
      const next = state.extras.filter((e) => e.extra.id !== a.extra.id);
      if (a.cantidad > 0) next.push({ extra: a.extra, cantidad: a.cantidad });
      return { ...state, extras: next };
    }
    case "setCliente":
      return { ...state, cliente: { ...state.cliente, ...a.patch } };
    case "reset":
      return INITIAL;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, isNaN(n) ? min : n));
}

type Ctx = {
  state: State;
  dispatch: React.Dispatch<Action>;
  selection: Selection;
  quote: QuoteBreakdown;
};

const QuoteCtx = createContext<Ctx | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const selection: Selection = useMemo(
    () => ({
      totalMicheladas: state.totalMicheladas,
      sabores: state.sabores,
      chileId: state.chileId,
      conClamato: state.conClamato,
      cervezas: state.cervezas,
      extras: state.extras,
      horasEvento: state.horasEvento,
    }),
    [state]
  );

  const quote = useMemo(() => calcularCotizacion(selection), [selection]);

  return (
    <QuoteCtx.Provider value={{ state, dispatch, selection, quote }}>
      {children}
    </QuoteCtx.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteCtx);
  if (!ctx) throw new Error("useQuote debe usarse dentro de QuoteProvider");
  return ctx;
}
