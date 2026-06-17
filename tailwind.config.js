/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            black: '#0a0a0a',
            charcoal: '#1a1a1a',
            white: '#fafafa',
            gold: '#C5A059',
          }
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          serif: ['Playfair Display', 'serif'],
        }
      },
    },
    plugins: [],
  }