import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "Inter", "sans-serif"],
      },
      colors: {
        midnight: "#0f172a",
        slate: {
          950: "#0b1220",
          900: "#0f1b2f",
          800: "#1b2942",
          700: "#263956",
          200: "#c7d2e4",
        },
        neon: {
          400: "#6ff38e",
          500: "#4ade80",
          600: "#22c55e",
        },
        amber: {
          400: "#fbbf24",
        },
      },
      boxShadow: {
        glass: "0 20px 80px rgba(0,0,0,0.35)",
        "glow-green": "0 10px 40px rgba(34,197,94,0.35)",
      },
      borderRadius: {
        curved: "28px",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 20% 20%, rgba(74,222,128,0.12), transparent 25%), radial-gradient(circle at 80% 10%, rgba(59,130,246,0.08), transparent 25%), radial-gradient(circle at 30% 80%, rgba(251,191,36,0.14), transparent 28%)",
      },
    },
  },
  plugins: [],
};

export default config;
