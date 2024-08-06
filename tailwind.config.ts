import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

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
    },
    colors: {
      ...colors,
      primary: {
        50: '#f3eee2',
        100: '#fff1e6',
        200: '#f0dfd7',
        300: '#e5d1d0',
        400: '#dfc5c4',
        500: '#d7b7b5',
        600: '#f5cac3',
        700: '#cda5a2',
        800: '#a29190',
        900: '#372f33',
      },
      secondary: {
        50: '#e7ecff',
        100: '#d8e1ff',
        200: '#bbd0ff',
        300: '#a8bcfb',
        400: '#7ea0ea',
        500: '#7ea0ea',
        600: '#33658a',
        700: '#977669',
        800: '#006d77',
        900: '#3b5f99',
      },
      todo: "#fccb6c",
      inProgress: "#7cbfb9",
      done: "#cf5b5d",
      bg: colors.slate,
      text1: colors.gray,
    },
  },
  plugins: [],
};
export default config;
