/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['poppins-md', 'sans-serif'], // <- ini yang penting!
        poppins: ['poppins-md', 'sans-serif'],
        'poppins-sb': ['poppins-sb', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
