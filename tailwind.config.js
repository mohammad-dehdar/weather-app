/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'arial': ['Arial', 'sans-serif'],
      },
      keyframes: {
        'rotate': {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            opacity: '1',
            transform: 'rotate(360deg)'
          },
        }
      },
      animation: {
        'rotate': 'rotate 0.8s linear infinite'
      }
    }
  },
  plugins: [],
}


