import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Sox design system
        crimson: "#C92F36",
        "crimson-dark": "#a82028",
        sox: {
          black: "#0B0B0B",
          charcoal: "#201D1D",
          gray: "#F3F3F3",
          border: "#E2E2E2",
          body: "#1A1A1A",
          orange: "#FF671F",
        },
      },
      fontFamily: {
        heading: ["var(--font-jost)", "Jost", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
