/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: "#6B92B0",
        secondary: "#2F69A1",
        accent: "#3C9ABE",
        highlight: "#73AFD2",
        dark: "#436F92",
        background: "#1a202c", // Keep dark background
        text: "#ffffff", // Light text color for contrast
      },
    },
  },
  plugins: [],
};
