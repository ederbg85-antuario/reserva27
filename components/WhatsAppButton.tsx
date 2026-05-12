"use client";

import { useEffect, useState } from "react";

type Props = {
  phone: string; // formato internacional, sin "+", ej: 525538792176
  message?: string;
};

const DEFAULT_MSG =
  "Hola Reserva 27 — quiero info para un evento. ¿Me ayudan?";

export default function WhatsAppButton({ phone, message = DEFAULT_MSG }: Props) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="
        fixed z-50
        right-4 sm:right-6
        bottom-[max(1rem,env(safe-area-inset-bottom))]
        sm:bottom-6
        flex items-center gap-2
        rounded-full
        bg-[#25D366] text-white
        shadow-[0_18px_40px_-12px_rgba(37,211,102,0.55)]
        hover:brightness-105 active:scale-[0.96]
        transition
        h-14 pl-4 pr-5
        sm:h-14
      "
    >
      <svg
        viewBox="0 0 32 32"
        width="22"
        height="22"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M19.11 17.42c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.84 1.04-1.03 1.25-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.49.14-.65.15-.14.32-.38.49-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.57-.08-.16-.73-1.77-1-2.43-.26-.63-.53-.55-.73-.55-.19 0-.4-.02-.62-.02-.21 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.59 1.15 3.12 1.31 3.33.16.21 2.27 3.46 5.5 4.85.77.33 1.36.53 1.83.68.77.25 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.3-.21-.62-.37zM16.04 4C9.39 4 4 9.39 4 16.04c0 2.12.55 4.18 1.59 5.99L4 28l6.16-1.55a12.04 12.04 0 0 0 5.88 1.53h.01C22.69 27.98 28 22.59 28 15.94 28 12.71 26.74 9.66 24.45 7.37 22.16 5.08 19.13 4 16.04 4zm0 21.97h-.01a9.94 9.94 0 0 1-5.06-1.38l-.36-.22-3.66.92.98-3.56-.24-.37a9.93 9.93 0 0 1-1.52-5.32c0-5.49 4.47-9.96 9.97-9.96 2.66 0 5.16 1.04 7.04 2.92a9.9 9.9 0 0 1 2.92 7.04c0 5.49-4.47 9.93-9.96 9.93z" />
      </svg>
      <span className="hidden xs:inline sm:inline text-sm font-semibold tracking-wide">
        WhatsApp
      </span>
    </a>
  );
}
