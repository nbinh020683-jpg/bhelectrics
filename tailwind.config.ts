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
          DEFAULT: "#14181C",
          dark: "#0B0D0F",
          darker: "#14171A",
          light: "#3A4147",
          lighter: "#5B646B",
        },
        accent: {
          DEFAULT: "#A8571F",
          dark: "#8C481A",
          light: "#DB8A46",
        },
        caution: {
          DEFAULT: "#DB8A46",
          dark: "#8C481A",
        },
        brass: {
          DEFAULT: "#8F7526",
          dark: "#6E5A1D",
        },
        ink: {
          DEFAULT: "#14181C",
          muted: "#4B5459",
          soft: "#7B8489",
        },
        surface: {
          DEFAULT: "#F0F2F1",
          alt: "#FFFFFF",
          tint: "#F1E2D5",
          dark: "#14171A",
        },
        border: {
          DEFAULT: "#D6D9D7",
          tint: "#E9D9C4",
        },
        success: "#16A34A",
        danger: "#DC2626",
      },
      fontFamily: {
        heading: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        "8xl": "1440px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 24, 28, 0.06), 0 8px 24px -8px rgba(20, 24, 28, 0.12)",
        "card-hover": "0 4px 12px rgba(20, 24, 28, 0.08), 0 16px 40px -12px rgba(168, 87, 31, 0.22)",
        "glow-accent": "0 8px 30px -6px rgba(168, 87, 31, 0.4)",
      },
      backgroundImage: {
        "hazard-stripe":
          "repeating-linear-gradient(135deg, var(--tw-gradient-from) 0 14px, var(--tw-gradient-to) 14px 28px)",
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(219,138,70,0.16), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05), transparent 35%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(219,138,70,0.45)" },
          "100%": { boxShadow: "0 0 0 14px rgba(219,138,70,0)" },
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
