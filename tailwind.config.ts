import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ecoyaan: {
          green: "#166534",
          "green-light": "#22c55e",
          mint: "#86efac",
          cream: "#f0fdf4",
          sage: "#d1fae5",
          gold: "#ca8a04",
          amber: "#fcd34d",
        },
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgb(22 101 52 / 0.08), 0 2px 8px -2px rgb(22 101 52 / 0.04)",
        "soft-hover": "0 12px 40px -8px rgb(22 101 52 / 0.15), 0 4px 16px -4px rgb(22 101 52 / 0.08)",
      },
      keyframes: {
        stepIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        successPop: {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "60%": { opacity: "1", transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "100% 0" },
          "100%": { backgroundPosition: "-100% 0" },
        },
      },
      animation: {
        "step-in": "stepIn 0.3s ease-out forwards",
        "success-pop": "successPop 0.5s ease-out forwards",
        shimmer: "shimmer 1.5s ease-in-out infinite",
      },
      transitionDuration: {
        200: "200ms",
        400: "400ms",
        500: "500ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
