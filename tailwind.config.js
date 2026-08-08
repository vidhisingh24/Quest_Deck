/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FAFAF7',
          100: '#F4F4EE',
          200: '#E8E8DF',
          300: '#D6D6C7',
          700: '#5C5C50',
          800: '#3A3A32',
          900: '#1C1C17',
        },
        sky: {
          light: '#EBF3FF',
          DEFAULT: '#4F8EF7',
          dark: '#3A77E0',
          deep: '#255FC4',
        },
        sage: {
          light: '#F0F7F2',
          DEFAULT: '#A8D5BA',
          dark: '#7EB993',
          deep: '#52976B',
        },
        accent: {
          light: '#FFF9E6',
          DEFAULT: '#FFD166',
          dark: '#F0BA3C',
        },
        mint: {
          DEFAULT: '#51CF66',
          dark: '#38D9A9',
        },
        coral: {
          light: '#FFEBEB',
          DEFAULT: '#FF6B6B',
          dark: '#E04848',
        },
        softOrange: {
          DEFAULT: '#FF922B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'float': '0 12px 32px 0 rgba(79, 142, 247, 0.12)',
        'glow-sky': '0 0 20px rgba(79, 142, 247, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
