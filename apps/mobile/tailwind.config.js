/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#8E44FF',
        accent: '#FF4EDD',
        background: '#F5F5FA',
        textPrimary: '#2D3748',
        textSecondary: '#718096',
      },
      fontFamily: {
        poppins: ['Poppins-Regular', 'Poppins-SemiBold'],
      },
    },
  },
  plugins: [],
}

