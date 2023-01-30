/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@singlestone/sugar-react/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)"],
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [require("@singlestone/sugar").sugarCorePlugin()],
};
