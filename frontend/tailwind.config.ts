import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#241f1c",
        oat: "#f5eadb",
        linen: "#fff8ef",
        clay: "#c97952",
        berry: "#bd4b6c",
        moss: "#64795c",
        denim: "#355c7d"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(36, 31, 28, 0.12)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
