export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        'primary-dark': '#E85A2A',
        'primary-light': '#FF8561',
        secondary: '#F7931E',
        accent: '#FFD23F',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}