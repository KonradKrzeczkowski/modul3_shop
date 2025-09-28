/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       fontFamily: {
      inter: ["var(--font-inter)", "sans-serif"],
      fira: ["var(--font-fira-code)", "monospace"],
    },
      colors: {
        base: "#262626",

        gray: {
          50: "#25272c",
          100: "#edeef1",
          200: "#383B42",
          300: "#b6bac3",
          400: "#8e95a2",
          500: "#6b7280",
          600: "#4a4e5a",
          700: "#40444c",
          800: "#383b42",
          900: "#25272c",
        },

        neutral: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#737373",
          600: "#E7E7E7",
          700: "#4f4f4f",
          800: "#454545",
          900: "#FCFCFC",
        },

        primary: {
          50: "#fef7ee",
          100: "#fdedd7",
          200: "#fad6ae",
          300: "#f7b87a",
          400: "#f29145",
          500: "#ee701d",
          600: "#e05816",
          700: "#b94315",
          800: "#943518",
          900: "#40150a",
        },

        success: {
          50: "#f0fdf5",
          100: "#dcfce8",
          200: "#bbf7d1",
          300: "#86efad",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803c",
          800: "#14532b",
          900: "#052e14",
        },

        warning: {
          50: "#fef9e8",
          100: "#fef0c3",
          200: "#fee28a",
          300: "#fdd147",
          400: "#fac215",
          500: "#eab308",
          600: "#ca9a04",
          700: "#a17c07",
          800: "#85680e",
          900: "#423306",
        },

        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#7f1d1d",
          900: "#450a0a",
        },

        baseColors: {
          white: "#ffffff",
          white2: "#fdfdfd",
          alabaster: "#fbfbfb",
          shark: "#232227",
          woodsmoke: "#141316",
          black: "#000000",
        },

        violet: {
          50: "#f2ebfe",
          100: "#d8c0fb",
          200: "#c5a1f9",
          300: "#ab76f6",
          400: "#9a5cf4",
          500: "#8133f1",
          600: "#752edb",
          700: "#5c24ab",
          800: "#471c85",
          900: "#361565",
        },

        brown: {
          50: "#f0ede7",
          100: "#d1c6b4",
          200: "#baaa8f",
          300: "#9b845c",
          400: "#886c3d",
          500: "#6a470c",
          600: "#60410b",
          700: "#4b3209",
          800: "#3a2707",
          900: "#2d1e05",
        },

        blueGreen: {
          50: "#eef9fa",
          100: "#ccecee",
          200: "#b3e3e6",
          300: "#90d7da",
          400: "#7acfd3",
          500: "#59c3c8",
          600: "#51b1b6",
          700: "#3f8a8e",
          800: "#316b6e",
          900: "#255254",
        },

        blue: {
          50: "#e8f2ff",
          100: "#b6d6ff",
          200: "#93c2ff",
          300: "#62a7ff",
          400: "#4495ff",
          500: "#157bff",
          600: "#1370e8",
          700: "#0f57b5",
          800: "#0c448c",
          900: "#09346b",
        },

        greenEverglade: {
          50: "#e9edeb",
          100: "#bac7bf",
          200: "#99aba1",
          300: "#6a8576",
          400: "#4d6d5b",
          500: "#214932",
          600: "#1e422e",
          700: "#173424",
          800: "#12281c",
          900: "#0e1f15",
        },

        blazeOrange: {
          50: "#fff0e7",
          100: "#fed1b3",
          200: "#febb8f",
          300: "#fd9c5c",
          400: "#fd893c",
          500: "#fc6b0b",
          600: "#e5610a",
          700: "#b34c08",
          800: "#8b3b06",
          900: "#6a2d05",
        },
      },
    },
  },
  plugins: [ lineClamp],
};

export default tailwindConfig;
