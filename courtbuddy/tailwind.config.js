/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: '#00FF87',
        bg: '#0D0D0D',
        surface: '#1A1A1A',
        surface2: '#252525',
        border: '#2A2A2A',
        danger: '#FF4444',
        warning: '#FFB800',
      },
    },
  },
  plugins: [],
};
