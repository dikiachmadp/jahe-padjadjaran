/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warmth: {
          50: '#FEF9F3',
          100: '#FDF3E7',
          200: '#FAE6CF',
          300: '#F6D4A7',
          400: '#F1BC6E',
          500: '#E89F3C',
          600: '#D67B1C',
          700: '#B35F15',
          800: '#8F4A16',
          900: '#733D16',
        },
        earth: {
          50: '#F7F5F2',
          100: '#EDE8E0',
          200: '#DDD4C3',
          300: '#C7B99D',
          400: '#B39C78',
          500: '#9A7F5A',
          600: '#7D6548',
          700: '#654F3A',
          800: '#504030',
          900: '#423628',
        },
        heritage: {
          50: '#F4F2EF',
          100: '#E8E3DC',
          200: '#CFC3B3',
          300: '#B5A18A',
          400: '#9B8061',
          500: '#7D6445',
          600: '#644E34',
          700: '#4D3B28',
          800: '#3A2C1E',
          900: '#2B2015',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Lora', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
