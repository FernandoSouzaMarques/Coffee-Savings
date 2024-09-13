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
        base: {
          "100": "#1C1C1C",
          "200": "#202020",
          "300": "#232222",
          "400": "#2B2B2B",
          "500": "#202020"
        },
        success: {
          DEFAULT: "#00DB7F",
          dark: "#007E6F"
        },
        error: "#FD003D",
        info: "#0093FD",
        detail: {
          DEFAULT: "#A6A6A6",
        }
      },
      backgroundImage: {
        "logo": "url(/images/bg-logo.png)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
