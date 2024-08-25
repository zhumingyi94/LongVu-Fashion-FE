/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        kaushan: ['Kaushan Script', 'cursive'],
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      fontSize: {
        '38.616': '38.616px',
        '25.455': '25.455px',
      },
      letterSpacing: {
        '18.536': '18.536px',
      },
      lineHeight: {
        '140.715': '140.715%',
      },
      gap: {
        '6.364': '6.364px',
      },
    },
  },
  plugins: [],
};