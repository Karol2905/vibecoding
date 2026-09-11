import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1B4332",
          muted: "#2D6A4F",
          soft: "#40916C",
        },
        cream: "#F8F9FA",
      },
    },
  },
  plugins: [],
};

export default config;
