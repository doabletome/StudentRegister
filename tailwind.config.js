/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*{html,js}"],
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#BAA333",
        "custom-dark": "#0d1137",
        "custom-blue": "#12a4d9",
        "custom-pink": "#e52165",
      },

      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
