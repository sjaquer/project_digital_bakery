/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#A0522D',
          DEFAULT: '#8B4513',
          dark: '#753A0C',
        },
        secondary: {
          light: '#E2C196',
          DEFAULT: '#DAA520',
          dark: '#B8860B',
        },
        cream: {
          light: '#FFFFF0',
          DEFAULT: '#FFFDD0',
          dark: '#F5F5DC',
        },
        success: {
          light: '#86EFAC',
          DEFAULT: '#22C55E',
          dark: '#16A34A',
        },
        warning: {
          light: '#FEF08A',
          DEFAULT: '#EAB308',
          dark: '#CA8A04',
        },
        error: {
          light: '#FECACA',
          DEFAULT: '#EF4444',
          dark: '#DC2626',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-once': 'bounceOnce 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceOnce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};