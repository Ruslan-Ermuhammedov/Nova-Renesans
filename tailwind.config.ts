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
          green: "#2F9E20",
          darkGreen: "#17680F",
          black: "#050505",
          ink: "#101210",
          paper: "#F7F8F5",
          line: "#DADDD7",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 26px 80px rgba(0,0,0,0.14)",
        green: "0 20px 70px rgba(47,158,32,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
