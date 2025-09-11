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
        // Figma Typography Hierarchy - Extracted from Design System
        'display': ['OT Neue Montreal', 'sans-serif'], // Main headings (75.08px)
        'heading': ['Editorial New', 'serif'],          // Secondary headings (61px, 88px)
        'creative': ['Cabazon', 'display'],             // Creative headings (1000px scaled)
        'accent': ['Black-Paint', 'display'],           // Accent text (39px)
        'body': ['Inter', 'sans-serif'],                // Body text (16px, 20px)
        'mono': ['PP Supply Mono', 'monospace'],        // Code/technical text
        
        // Figma-Exact Typography Specifications (Legacy)
        'ot-neue-montreal': ['OT Neue Montreal', 'sans-serif'], 
        'neue-montreal': ['Neue Montreal', 'OT Neue Montreal', 'sans-serif'], 
        'pp-supply-mono': ['PP Supply Mono', 'monospace'],
        'editorial-new': ['Editorial New', 'serif'],
        'cabazon': ['Cabazon', 'display'],
        'black-paint': ['Black-Paint', 'display'],
        'inter': ['Inter', 'sans-serif'],
        
        // Primary font assignments (Updated for Figma hierarchy)
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Default - Inter for body
        headline: ['OT Neue Montreal', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Headlines
        
        // Legacy compatibility
        tech: ['PP Supply Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      
      fontWeight: {
        // Figma Font Weights
        'normal': '400',
        'medium': '500', 
        'semibold': '600',
        'bold': '700',
        
        // Standard weights
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
        '900': '900'
      },
      
      fontSize: {
        // Figma Typography Scale - Exact measurements from design system
        'display': ['75.08px', { lineHeight: '90.10px', fontWeight: '600' }], // OT Neue Montreal - Main headings
        'hero': ['88.56px', { lineHeight: '106px', fontWeight: '300' }],        // Editorial New - Hero text
        'creative': ['200px', { lineHeight: '180px', fontWeight: '500' }],      // Cabazon - Creative displays (scaled down from 1000px)
        'large': ['61px', { lineHeight: '73px', fontWeight: '400' }],           // Editorial New - Large headings
        'accent': ['39px', { lineHeight: '47px', fontWeight: '400' }],          // Black-Paint - Accent text
        'xl-body': ['20px', { lineHeight: '28px', fontWeight: '400' }],         // Inter/Neue Montreal - Large body
        'base-body': ['16px', { lineHeight: '24px', fontWeight: '400' }],       // Inter/Cera Pro - Base body text
        
        // PRD Typography Hierarchy (Legacy - keeping for compatibility)
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
        // PRD Background Specifications - removed to prevent build issues
        // Use inline styles instead when these backgrounds are needed
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}