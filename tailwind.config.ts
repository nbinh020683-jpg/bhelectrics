import type { Config } from "tailwindcss";

const fullOpacityScale = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)])
);

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      opacity: fullOpacityScale,
      colors: {
        primary: {
          DEFAULT: "#1E40AF",
          dark: "#152B7A",
          darker: "#0F1E52",
          light: "#3B82F6",
          lighter: "#93C5FD",
        },
        accent: {
          DEFAULT: "#EA580C",
          dark: "#C2410C",
          light: "#FB923C",
        },
        caution: {
          DEFAULT: "#FACC15",
          dark: "#CA8A04",
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          soft: "#64748B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F8FAFC",
          tint: "#EFF6FF",
          dark: "#0B1220",
        },
        border: {
          DEFAULT: "#E2E8F0",
          tint: "#BFDBFE",
        },
        success: "#16A34A",
        danger: "#DC2626",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-open-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "8xl": "1440px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.06), 0 8px 24px -8px rgba(15, 23, 42, 0.12)",
        "card-hover": "0 4px 12px rgba(15, 23, 42, 0.08), 0 16px 40px -12px rgba(30, 64, 175, 0.22)",
        "glow-accent": "0 8px 30px -6px rgba(234, 88, 12, 0.45)",
      },
      backgroundImage: {
        "hazard-stripe":
          "repeating-linear-gradient(135deg, var(--tw-gradient-from) 0 14px, var(--tw-gradient-to) 14px 28px)",
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(234,88,12,0.20), transparent 35%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(234,88,12,0.45)" },
          "100%": { boxShadow: "0 0 0 14px rgba(234,88,12,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
