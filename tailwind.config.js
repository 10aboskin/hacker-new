/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        orange: "#ff6600",
      },
      fontFamily: {
        sans: ["Verdana", "Geneva", "sans-serif"],
      },
    },
  },
  plugins: [],
};
