import type { Config } from "tailwindcss";

/**
 * Paleta y tipografía oficiales del BrandBook Reserva 27 (Edición 2025).
 * Charcoal + Champagne son base. Naranja Brasa es acento de activación.
 * Crema Hielo se usa como fondo para dar aire.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#1F1F1F",
          900: "#141414",
          800: "#1F1F1F",
          700: "#2a2a2a",
          600: "#3a3a3a",
          500: "#555555",
        },
        champagne: {
          DEFAULT: "#D7B28B",
          50: "#fbf6ee",
          100: "#f4ead8",
          200: "#ead7b8",
          300: "#dec19a",
          400: "#D7B28B",
          500: "#c69b6c",
          600: "#a17e5a",
        },
        brasa: {
          DEFAULT: "#D9602A",
          400: "#e07a4a",
          500: "#D9602A",
          600: "#b54812",
        },
        crema: {
          DEFAULT: "#F5EFE6",
          50: "#fbf8f2",
          100: "#F5EFE6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Bebas Neue", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        tightish: "-0.01em",
        kicker: "0.16em",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(0,0,0,0.25)",
        card: "0 8px 24px -8px rgba(31,31,31,0.18)",
        glow: "0 0 0 1px rgba(215,178,139,0.45), 0 20px 60px -20px rgba(215,178,139,0.45)",
        brasa: "0 14px 40px -14px rgba(217,96,42,0.55)",
      },
      backgroundImage: {
        // Sutil ruido tipo papel — usa el principio fotográfico "cálida y cinematográfica"
        grain:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(.2,.7,.2,1) both",
        "fade-in": "fadeIn 0.6s ease-out both",
        "slow-pan": "slowPan 22s ease-in-out infinite alternate",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slowPan: {
          "0%": { transform: "scale(1.06) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.14) translate3d(-2%, -1%, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
