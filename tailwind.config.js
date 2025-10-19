// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#F97316",   // Navbar & Sidebar
        mainBg: "#047857",    // Main background
        cardBg: "#059669",    // Cards
        button: "#FB923C",    // Buttons
      },
    },
  },
  plugins: [],
};
