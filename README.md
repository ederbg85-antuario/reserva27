# Reserva 27 — Web oficial

Landing + cotizador online para **Reserva 27 · Barra de Micheladas para Eventos**.
Construido con Next.js 14 (App Router), TypeScript, Tailwind y siguiendo el
**BrandBook 2025** al pie de la letra.

## Stack

- **Next.js 14** + App Router
- **React 18** + TypeScript estricto
- **Tailwind CSS 3** con paleta y tipografía del manual de marca
- **Anton** (display) + **Montserrat** (texto) vía `next/font`
- **jsPDF** + `jspdf-autotable` para exportar la cotización
- **Supabase JS** (scaffolding listo, sin conexión activa todavía)
- **lucide-react** para iconografía
- **Mobile-first**, animaciones sutiles, accesible (focus visible, touch targets ≥ 44px)

## Estructura

```
app/
  layout.tsx          # Fuentes, metadata, WhatsAppButton global
  page.tsx            # Landing
  cotizador/page.tsx  # Configurador paso a paso
  not-found.tsx
components/
  Logo.tsx            # SVG inline con todas las variantes del BrandBook
  Navbar.tsx          # Top bar transparente → blanca al hacer scroll
  Footer.tsx
  WhatsAppButton.tsx  # Flotante, safe-area aware
  landing/            # Hero, Manifiesto, Servicio, Audiencia, Galería, FAQ, CTA
  cotizador/          # Stepper, PriceBar, QtyControl, Step* + QuoteContext
lib/
  brand.ts            # Constantes del manual (colores, contacto, frases)
  catalog.ts          # Catálogo + reglas comerciales (precios)
  pricing.ts          # Cálculo de cotización
  pdf.ts              # Exporta PDF con identidad Reserva 27
  repository.ts       # Capa repo — hoy estática, mañana Supabase
  supabase.ts         # Cliente listo cuando existan envs
public/
  logo.svg
  cervezas/           # 23 SKUs renombrados para identificarse en código
  images/             # Fotos del estilo cinematográfico (Material Principal)
```

## Cómo correr en local

```bash
npm install
npm run dev
# abre http://localhost:3000
```

Build de producción:

```bash
npm run build
npm run start
```

## Brand system

Paleta exacta del manual (página 16):

| Token       | HEX       | Uso                                                     |
|-------------|-----------|---------------------------------------------------------|
| `charcoal`  | `#1F1F1F` | Base oscura, navegación, totales                        |
| `champagne` | `#D7B28B` | Acento, kickers, highlights                             |
| `brasa`     | `#D9602A` | Activación / CTAs principales                           |
| `crema`     | `#F5EFE6` | Fondo de página para "dar aire"                         |

Tipografía:

- **Display:** Anton (uppercase, line-height 0.92, tipografía fluida con `clamp()`)
- **Texto:** Montserrat (400/500/600/700, interlineado 1.45 en bloques largos)

## Cotizador — reglas comerciales

Centralizadas en `lib/catalog.ts > PRICING`:

| Concepto                  | Valor       |
|---------------------------|-------------|
| Michelada base            | $85         |
| Clamato por michelada     | +$10        |
| Escarcha extra picante    | +$8 / un.   |
| Baristas (2 personas · 4h)| $1,500 fijo |
| Cargo operativo / servicio| 30% s/ subtotal micheladas |
| Hora extra de servicio    | $600 / hora |
| IVA                       | 16% (opcional, se aplica si facturación) |

## Roadmap a Supabase

1. Crear proyecto en Supabase, copiar URL + anon key a `.env.local`.
2. Crear tablas `cervezas`, `sabores`, `chiles`, `extras`, `quotes`.
3. Reemplazar funciones `getCervezas`/etc. en `lib/repository.ts` por queries
   reales (`supabase.from(...)`).
4. Activar `saveQuote` para insertar en la tabla `quotes`.

El resto del UI no necesita cambios — todo consume la capa repo.

## Despliegue en Vercel

1. Push a GitHub (`main`).
2. **Import Project** en Vercel apuntando al repo.
3. Framework preset: **Next.js** (detecta solo).
4. Variables de entorno: agrega `NEXT_PUBLIC_SUPABASE_URL` y
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` cuando exista backend.
5. Deploy.

## Contacto

- Web · [reserva27.mx](https://reserva27.mx)
- WhatsApp · 55 38 79 21 76
- Cobertura · CDMX y zona metropolitana

*Reserva la fecha — el resto va por nuestra cuenta.*
