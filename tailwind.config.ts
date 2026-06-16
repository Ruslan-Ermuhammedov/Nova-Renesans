import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nova: {
          blue: "#2F74FA",
          darkBlue: "#071F52",
          softBlue: "#8FB6FF",
          orange: "#F24602",
          darkOrange: "#7A2100",
          green: "#F24602",
          darkGreen: "#7A2100",
          black: "#070708",
          ink: "#F7F9FF",
          muted: "#9BA3B4",
          paper: "#070708",
          surface: "#0B1220",
          surfaceBlue: "#0B275B",
          line: "#18335F",
        },
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 26px 80px rgba(0,0,0,0.42)",
        green: "0 20px 70px rgba(242,70,2,0.26)",
        blue: "0 28px 90px rgba(47,116,250,0.28)",
        orange: "0 20px 70px rgba(242,70,2,0.26)",
      },
    },
  },
  plugins: [],
};

export default config;
