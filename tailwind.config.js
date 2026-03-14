/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00FF87",
        background: "#0D0D0D",
        surface: "#1A1A1A",
        surface2: "#222222",
        border: "#2A2A2A",
        textPrimary: "#FFFFFF",
        textSecondary: "#888888",
        textMuted: "#555555",
        danger: "#FF4444",
        warning: "#FFB800",
        gold: "#FFD700",
        silver: "#C0C0C0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
