import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07060d",
          900: "#0c0a17",
          800: "#141026",
          700: "#1e1836",
          600: "#2a2246",
        },
        haze: {
          400: "#a89dc9",
          300: "#c3badf",
          200: "#e4dff5",
        },
        signal: {
          correct: "#3ddc97",
          "correct-deep": "#1f9d6c",
          taboo: "#ff4d5e",
          "taboo-deep": "#c3212f",
          skip: "#ffb84d",
          "skip-deep": "#d98a1f",
        },
        team: {
          one: "#ff6b7a",
          "one-deep": "#c73e50",
          two: "#4fc3ff",
          "two-deep": "#1f8fd9",
        },
        aurora: {
          violet: "#7c5cff",
          magenta: "#e14fd4",
          indigo: "#4634c1",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "aurora-radial":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,92,255,0.35), transparent), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(225,79,212,0.18), transparent)",
        "card-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-lg": "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)",
        glow: "0 0 40px rgba(124,92,255,0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
