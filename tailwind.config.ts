import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme');


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px"
      }
    },
    fontFamily: {
      OpenSans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      span: "#01D286",
      navbar: "#0E1630",
      navbarHover: "#4ADE80"

    }
  },
  plugins: [],
};
export default config;
