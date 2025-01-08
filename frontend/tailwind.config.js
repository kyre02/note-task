/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        text: "rgb(var(--text))",
        border: "rgb(var(--border))",
        card: "rgb(var(--card))",
        bluecyan:"#3992ce"
      },
      
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
    screens: {
      'sm': '375px',
      'md': '640px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
  plugins: [],
}

