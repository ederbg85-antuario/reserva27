import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="min-h-[100svh] bg-charcoal text-crema flex flex-col items-center justify-center px-6 text-center">
      <Logo variant="inverso" className="h-9 w-auto" />
      <p className="kicker text-champagne mt-10">Error 404</p>
      <h1 className="mt-4 max-w-2xl">
        Aquí no hay <span className="text-champagne">micheladas.</span>
      </h1>
      <p className="mt-6 max-w-md text-crema/80">
        La página que buscas no existe o se movió. Vuelve al inicio o cotiza tu
        evento.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-primary">
          Volver al inicio
        </Link>
        <Link href="/cotizador" className="btn-on-dark">
          Cotizar mi evento
        </Link>
      </div>
    </main>
  );
}
