import type { Config } from "tailwindcss";

// لوحة الألوان مأخوذة من هوية الأستاذ (Dusty Rose / Royal Burgundy / Dark Wine / Rose Gold)
// مع أرضية داكنة مائلة للكحلي. لتغيير الألوان عدّل متغيرات CSS في globals.css.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", md: "1.5rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        night: "rgb(var(--night) / <alpha-value>)",
        wine: "rgb(var(--wine) / <alpha-value>)",
        burgundy: "rgb(var(--burgundy) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        rose: "rgb(var(--rose) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--gold) / .25), 0 20px 60px -20px rgb(var(--burgundy) / .7)",
        book: "20px 30px 50px -10px rgba(0,0,0,.65)",
      },
      keyframes: {
        "pin-drop": { "0%": { transform: "translateY(-18px) scale(.6)", opacity: "0" }, "100%": { transform: "none", opacity: "1" } },
        pulseRing: { "0%": { transform: "scale(.6)", opacity: ".8" }, "100%": { transform: "scale(2.2)", opacity: "0" } },
        shimmer: { "100%": { transform: "translateX(-100%)" } },
      },
      animation: {
        "pin-drop": "pin-drop .5s cubic-bezier(.2,.8,.2,1.2) both",
        pulseRing: "pulseRing 2s ease-out infinite",
        shimmer: "shimmer 1.4s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
