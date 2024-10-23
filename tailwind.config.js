 /** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // Ativar modo JIT
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: [["Poppins"], "Roboto", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        home: "url('/assets/bgg.png')",
        
      },
    },
  },
  plugins: [],
};