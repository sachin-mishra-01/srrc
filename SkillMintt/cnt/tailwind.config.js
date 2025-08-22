/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-xl': {'max': '1200px'},  // max-width: 1200px
      },
    },
  },
  plugins: [],
}

