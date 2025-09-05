/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors from old site design system
        gold: '#FFD700',
        dark: '#2B2B2B',
        cream: '#F1EDE9',
        
        // Extended color palette
        'gold-light': '#FFF4A3',
        'gold-dark': '#E6C200',
        'dark-light': '#404040',
        'cream-dark': '#E8E1DC',
        
        // Old site additional colors
        'dark-bg': '#2B2B2B',
        'secondary-bg': '#CAC1B8',
        'accent-bg': '#e0e0de',
        'pure-black': '#000000',
        'dark-gray': '#1F1F1F',
        'border-gray': '#CCCCCC',
        'warning-yellow': '#FFFF99'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        headline: ['OT Neue Montreal', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['PP Supply Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        tech: ['PP Supply Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Old site animations
        'slide-to-left': 'slideToLeft 50s linear infinite',
        'slide-to-right': 'slideToRight 50s linear infinite',
        'rotate-continuous': 'rotateContinuous 10s linear infinite',
        'loading-counter': 'loadingCounter 3.5s ease-out forwards',
        'scramble-text': 'scrambleText 2s ease-out forwards'
      },
      
      keyframes: {
        slideToLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        slideToRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        rotateContinuous: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        loadingCounter: {
          '0%': { opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        scrambleText: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '1' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}