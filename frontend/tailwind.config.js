/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7ff',
          100: '#dfeeff',
          200: '#c7ddff',
          300: '#9cc6ff',
          400: '#69a9ff',
          500: '#2f7ef5',
          600: '#1d63cb',
          700: '#184ea6',
          800: '#1a437e',
          900: '#183b65',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -15px rgba(31, 88, 192, 0.3)',
      },
    },
  },
  plugins: [],
}