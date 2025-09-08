/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // PRD Exact Colors - Primary Brand Colors
        'brand-charcoal': '#2B2B2B',
        'brand-cream': '#F1EDE9', 
        'warm-beige': '#CAC1B8',
        
        // PRD Exact Colors - Supporting Colors
        'pure-black': '#000000',
        'pure-white': '#FFFFFF',
        
        // Legacy colors for backward compatibility
        gold: '#FFD700',
        dark: '#2B2B2B', // Maps to brand-charcoal
        cream: '#F1EDE9', // Maps to brand-cream
        'dark-bg': '#2B2B2B',
        'secondary-bg': '#CAC1B8'
      },
      
      maxWidth: {
        'container-custom': '1430px', // PRD Container specification
      },
      fontFamily: {
        // PRD Typography Specifications
        'ot-neue-montreal': ['OT Neue Montreal', 'sans-serif'], // Headlines, titles, major text elements
        'pp-supply-mono': ['PP Supply Mono', 'monospace'], // Body text, navigation, buttons, general content
        
        // Legacy fonts for backward compatibility  
        sans: ['PP Supply Mono', 'ui-monospace', 'system-ui', 'sans-serif'],
        headline: ['OT Neue Montreal', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['PP Supply Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        tech: ['PP Supply Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      
      fontSize: {
        // PRD Typography Hierarchy
        'hero-h1': ['220.302px', { lineHeight: '198.59px', fontWeight: '600' }], // Main Headlines
        'section-h2': ['63px', { lineHeight: '68.6px', fontWeight: '600' }], // Section Headers  
        'section-h3': ['65px', { lineHeight: '68.6px', fontWeight: '600' }], // Subsection Headers
        'section-h3-small': ['39px', { lineHeight: '40px', fontWeight: '600' }], // Alternative H3
        'body-primary': ['22px', { lineHeight: '30px', fontWeight: '400' }], // Main content, navigation
        'body-secondary': ['20px', { lineHeight: '28px', fontWeight: '400' }], // Paragraph content
        'body-small': ['16px', { lineHeight: '28px', fontWeight: '400' }], // Captions, metadata
        'cta-large': ['39.645px', { lineHeight: '47.65px', fontWeight: '400' }], // Large call-to-action buttons
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
        // PRD Layout Specifications
        'xs': '10px',
        'sm': '20px', 
        'md': '40px',
        'lg': '60px',
        'xl': '130px',
        
        // PRD Specific Spacing
        'header-padding': '25px',
        'hero-padding-top': '130px',
        'hero-padding-bottom': '21px',
        'section-padding': '60px',
        'content-padding': '30px',
        'footer-padding': '160px',
        'about-hero-padding': '186px',
        'faq-hero-padding': '50px',
        
        // Legacy spacing
        '18': '4.5rem',
        '88': '22rem', 
        '128': '32rem'
      },
      
      backgroundImage: {
        // PRD Background Specifications
        'main-texture': "url('../images/main-bg.jpg')",
        'logo-emboss': "url('../images/logo-emboss.png')",
        'mobile-section': "url('../images/mobile-sec-bg.jpg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}