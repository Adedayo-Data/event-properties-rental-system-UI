/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00c950", // Green
        accent: "#111111", // Black
        white: "#ffffff",
        gray: "#f1f5f9", // Soft Gray
        gold: "#FFD700", // Gold color added for text-gold
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "1.25rem",
      },
      boxShadow: {
        gold: "0 4px 14px 0 rgba(255, 215, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
