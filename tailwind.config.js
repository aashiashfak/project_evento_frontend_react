/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        maxHeight: {
        '1/3-screen': '33vh', // Custom value for 1/3 of the screen height
      },
    },

  },
  plugins: [],
};

