# Design Implementation Guide

Quick reference for implementing common design patterns from Figma to React.

## 1. Setting Up Design Tokens

### Update `tailwind.config.js`
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Replace with your Figma values
        'brand': {
          'charcoal': '#2B2B2B',
          'cream': '#F1EDE9',
          'beige': '#CAC1B8',
          'black': '#000000',
          'white': '#FFFFFF',
        },
        'accent': {
          'gold': '#FFD700',
          'primary': '#______', // Add from Figma
          'secondary': '#______',
        },
        'text': {
          'primary': 'var(--color-text-primary)',
          'secondary': 'var(--color-text-secondary)',
          'disabled': 'var(--color-text-disabled)',
          'inverted': 'var(--color-text-inverted)',
        },
        'interactive': {
          'hover': 'var(--color-hover)',
          'active': 'var(--color-active)',
          'focus': 'var(--color-focus)',
        }
      },
      fontSize: {
        // Custom font sizes from Figma
        'hero': ['220.302px', { lineHeight: '198.59px', letterSpacing: '-0.02em' }],
        'h1': ['your-value', { lineHeight: 'your-value', letterSpacing: 'your-value' }],
        'h2': ['your-value', { lineHeight: 'your-value' }],
        'h3': ['your-value', { lineHeight: 'your-value' }],
        'body-lg': ['your-value', { lineHeight: 'your-value' }],
        'body': ['your-value', { lineHeight: 'your-value' }],
        'body-sm': ['your-value', { lineHeight: 'your-value' }],
        'button': ['your-value', { lineHeight: 'your-value' }],
        'nav': ['your-value', { lineHeight: 'your-value' }],
      },
      spacing: {
        // Use a consistent scale from Figma
        '0': '0',
        'px': '1px',
        '0.5': 'calc(var(--spacing-base) * 0.5)',
        '1': 'var(--spacing-base)',
        '2': 'calc(var(--spacing-base) * 2)',
        '3': 'calc(var(--spacing-base) * 3)',
        '4': 'calc(var(--spacing-base) * 4)',
        '5': 'calc(var(--spacing-base) * 5)',
        '6': 'calc(var(--spacing-base) * 6)',
        '8': 'calc(var(--spacing-base) * 8)',
        '10': 'calc(var(--spacing-base) * 10)',
        '12': 'calc(var(--spacing-base) * 12)',
        '16': 'calc(var(--spacing-base) * 16)',
        '20': 'calc(var(--spacing-base) * 20)',
        '24': 'calc(var(--spacing-base) * 24)',
      },
      borderRadius: {
        'none': '0',
        'sm': 'var(--radius-sm)',
        'DEFAULT': 'var(--radius-default)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'full': '9999px',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow-default)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
    },
  },
}
```

### Update `index.css`
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  /* Base spacing unit from Figma */
  --spacing-base: 8px; /* or 4px, depending on your design */
  
  /* Colors - Replace with Figma values */
  --color-text-primary: #2B2B2B;
  --color-text-secondary: #666666;
  --color-text-disabled: rgba(43, 43, 43, 0.5);
  --color-text-inverted: #F1EDE9;
  
  --color-hover: #______;
  --color-active: #______;
  --color-focus: #______;
  
  /* Shadows - Copy from Figma */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Border radius - Match Figma */
  --radius-sm: 4px;
  --radius-default: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  
  /* Animation durations */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
}

/* Font loading - ensure fonts match Figma exactly */
@font-face {
  font-family: 'OT Neue Montreal';
  src: url('/fonts/OTNeueMontreal-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'OT Neue Montreal';
  src: url('/fonts/OTNeueMontreal-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'OT Neue Montreal';
  src: url('/fonts/OTNeueMontreal-Bold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PP Supply Mono';
  src: url('/fonts/PPSupplyMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## 2. Component Templates

### Typography Components
```tsx
// src/components/ui/Typography.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const H1: React.FC<TypographyProps> = ({ 
  children, 
  className = "", 
  as: Component = 'h1' 
}) => (
  <Component className={cn(
    "font-ot-neue-montreal font-semibold text-hero uppercase leading-[0.9]",
    "md:text-[220.302px] text-[120px]", // Responsive sizing
    className
  )}>
    {children}
  </Component>
);

export const H2: React.FC<TypographyProps> = ({ 
  children, 
  className = "", 
  as: Component = 'h2' 
}) => (
  <Component className={cn(
    "font-ot-neue-montreal font-semibold text-h2 uppercase",
    "md:text-[63px] text-[40px] md:leading-[68.6px] leading-[44px]",
    className
  )}>
    {children}
  </Component>
);

export const BodyText: React.FC<TypographyProps> = ({ 
  children, 
  className = "", 
  as: Component = 'p' 
}) => (
  <Component className={cn(
    "font-pp-supply-mono text-body-primary",
    "text-[22px] leading-[30px]",
    className
  )}>
    {children}
  </Component>
);
```

### Button Component with Figma Variants
```tsx
// src/components/ui/Button.tsx
import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "font-pp-supply-mono uppercase transition-all duration-300 inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-brand-charcoal text-brand-cream hover:bg-opacity-90",
    secondary: "bg-transparent border-2 border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream",
    gold: "bg-accent-gold text-brand-charcoal hover:bg-opacity-90",
    ghost: "bg-transparent text-brand-charcoal hover:text-accent-gold"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-[16px] min-h-[40px]",
    md: "px-6 py-3 text-[20px] min-h-[48px]",
    lg: "px-8 py-4 text-[22px] min-h-[56px]"
  };
  
  return (
    <motion.button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
```

### Card Component
```tsx
// src/components/ui/Card.tsx
import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
  padding = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? {
    whileHover: { y: -4, shadow: 'var(--shadow-lg)' },
    transition: { duration: 0.3 }
  } : {};
  
  return (
    <Component
      className={cn(
        "bg-white rounded-lg shadow-md",
        paddingClasses[padding],
        className
      )}
      {...hoverProps}
    >
      {children}
    </Component>
  );
};
```

### Section Container
```tsx
// src/components/layout/Section.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'cream' | 'charcoal' | 'beige' | 'white';
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  padding = 'lg',
  background,
  fullWidth = false
}) => {
  const paddingClasses = {
    none: '',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-24 md:py-32'
  };
  
  const backgroundClasses = {
    cream: 'bg-brand-cream',
    charcoal: 'bg-brand-charcoal text-brand-cream',
    beige: 'bg-brand-beige',
    white: 'bg-white'
  };
  
  return (
    <section className={cn(
      paddingClasses[padding],
      background && backgroundClasses[background],
      className
    )}>
      <div className={cn(
        !fullWidth && "container-custom",
        "px-4 md:px-6"
      )}>
        {children}
      </div>
    </section>
  );
};
```

## 3. Responsive Utilities

### Breakpoint Hook
```tsx
// src/hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < breakpoints.sm) setBreakpoint('xs');
      else if (width < breakpoints.md) setBreakpoint('sm');
      else if (width < breakpoints.lg) setBreakpoint('md');
      else if (width < breakpoints.xl) setBreakpoint('lg');
      else if (width < breakpoints['2xl']) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};
```

### Container Component
```tsx
// src/components/layout/Container.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  size = 'lg'
}) => {
  const sizes = {
    sm: 'max-w-4xl',
    md: 'max-w-6xl',
    lg: 'max-w-[1430px]', // From PRD
    full: 'max-w-full'
  };
  
  return (
    <div className={cn(
      "mx-auto px-4 md:px-6 lg:px-8",
      sizes[size],
      className
    )}>
      {children}
    </div>
  );
};
```

## 4. Animation Patterns

### Scroll Reveal Component
```tsx
// src/components/animations/ScrollReveal.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 20
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
```

### Hover Effects
```tsx
// src/components/animations/HoverScale.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

export const HoverScale: React.FC<HoverScaleProps> = ({
  children,
  scale = 1.05,
  className = ""
}) => (
  <motion.div
    whileHover={{ scale }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className={className}
  >
    {children}
  </motion.div>
);
```

## 5. Form Components

### Input Component
```tsx
// src/components/ui/Input.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  fullWidth = true,
  className = "",
  ...props
}, ref) => {
  return (
    <div className={cn(fullWidth && "w-full")}>
      {label && (
        <label className="block text-sm font-pp-supply-mono uppercase mb-2 text-brand-charcoal">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "px-4 py-3 border rounded-md w-full",
          "font-pp-supply-mono text-body-primary",
          "focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent",
          "transition-all duration-300",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 font-pp-supply-mono">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
```

## 6. Utility Functions

### Class Name Merger
```tsx
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Responsive Value Hook
```tsx
// src/hooks/useResponsiveValue.ts
import { useBreakpoint } from './useBreakpoint';

export function useResponsiveValue<T>(values: {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}): T {
  const breakpoint = useBreakpoint();
  
  switch (breakpoint) {
    case '2xl':
      return values['2xl'] ?? values.xl ?? values.lg ?? values.md ?? values.sm ?? values.base;
    case 'xl':
      return values.xl ?? values.lg ?? values.md ?? values.sm ?? values.base;
    case 'lg':
      return values.lg ?? values.md ?? values.sm ?? values.base;
    case 'md':
      return values.md ?? values.sm ?? values.base;
    case 'sm':
      return values.sm ?? values.base;
    default:
      return values.base;
  }
}
```

## 7. Implementation Checklist

### Phase 1: Foundation
- [ ] Extract all design tokens from Figma
- [ ] Update `tailwind.config.js` with exact values
- [ ] Update CSS variables in `index.css`
- [ ] Verify font files match Figma exactly
- [ ] Set up base typography components

### Phase 2: Core Components
- [ ] Create Button component with all variants
- [ ] Create Card component variations
- [ ] Create Form components (Input, Textarea, Select)
- [ ] Create Layout components (Container, Section)
- [ ] Create Navigation components

### Phase 3: Complex Components
- [ ] Hero sections with proper spacing
- [ ] Feature sections with grids
- [ ] Testimonial components
- [ ] Footer with all elements
- [ ] Modal/Dialog components

### Phase 4: Polish
- [ ] Add all hover/active states
- [ ] Implement scroll animations
- [ ] Add loading states
- [ ] Verify responsive behavior
- [ ] Cross-browser testing

## 8. Common Pitfalls to Avoid

1. **Font Loading**: Ensure exact font weights are loaded
2. **Color Opacity**: Use exact opacity values from Figma
3. **Spacing**: Don't round spacing values - use exact pixels
4. **Line Height**: Use unitless values when possible
5. **Border Radius**: Match exact corner radius values
6. **Shadows**: Copy complete shadow strings from Figma
7. **Transitions**: Match timing and easing functions
8. **Responsive**: Test at exact breakpoint values

Remember: Pixel-perfect implementation requires attention to detail. Always compare your implementation side-by-side with the Figma design.