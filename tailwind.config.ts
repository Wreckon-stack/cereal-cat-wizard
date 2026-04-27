import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        cereal: {
          red: "#ff3b5c",
          orange: "#ff8a1f",
          yellow: "#ffd93d",
          green: "#3bff9a",
          blue: "#3bb6ff",
          purple: "#c55bff",
          pink: "#ff6fd8",
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 14s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        drift: "drift 20s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 1s ease-out both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(4deg)" },
        },
        drift: {
          "0%": { transform: "translateX(-10vw) translateY(0)" },
          "100%": { transform: "translateX(110vw) translateY(-30px)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 22px rgba(255,217,61,0.55), 0 0 70px rgba(197,91,255,0.35)",
          },
          "50%": {
            boxShadow:
              "0 0 45px rgba(255,217,61,0.95), 0 0 120px rgba(197,91,255,0.6)",
          },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "rainbow-shimmer":
          "linear-gradient(90deg, #ff3b5c, #ff8a1f, #ffd93d, #3bff9a, #3bb6ff, #c55bff, #ff6fd8, #ff3b5c)",
      },
    },
  },
  plugins: [],
};

export default config;
