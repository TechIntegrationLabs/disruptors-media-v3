# Figma to React Design Audit & Implementation Guide

## Current Design System Analysis

### 1. Color Palette
The current implementation has the following color scheme:

**Primary Brand Colors:**
- `brand-charcoal`: #2B2B2B (Dark backgrounds, text)
- `brand-cream`: #F1EDE9 (Light backgrounds, inverted text)
- `warm-beige`: #CAC1B8 (Secondary backgrounds)
- `pure-black`: #000000 (Text, accents)
- `pure-white`: #FFFFFF (Text on dark)
- `gold`: #FFD700 (Legacy accent color - still in use)

**Observations:**
- The design tokens file (`design-tokens.css`) has placeholders for many values
- Interactive states (hover, active, focus) are not defined
- Status colors (success, warning, error) are missing
- The gold accent color appears in components but isn't in the PRD specification

### 2. Typography System

**Font Families:**
- Headlines: 'OT Neue Montreal' (sans-serif)
- Body/UI: 'PP Supply Mono' (monospace)

**Type Scale:**
- Hero H1: 220.302px / line-height: 198.59px / weight: 600
- Section H2: 63px / line-height: 68.6px / weight: 600
- Section H3: 65px / line-height: 68.6px / weight: 600
- Section H3 Small: 39px / line-height: 40px / weight: 600
- Body Primary: 22px / line-height: 30px / weight: 400
- Body Secondary: 20px / line-height: 28px / weight: 400
- Body Small: 16px / line-height: 28px / weight: 400
- CTA Large: 39.645px / line-height: 47.65px / weight: 400

**Observations:**
- Letter spacing values are missing
- Text transform (uppercase) is inconsistently applied
- Mobile responsive sizes not defined
- Font loading strategy needs optimization

### 3. Spacing & Layout

**Container System:**
- Max width: 1430px
- Container padding: 15px (sides)

**Spacing Scale:**
- xs: 10px
- sm: 20px
- md: 40px
- lg: 60px
- xl: 130px

**Component-Specific Spacing:**
- Header padding: 25px
- Hero padding top: 130px
- Hero padding bottom: 21px
- Section padding: 60px
- Content padding: 30px
- Footer padding: 160px

**Observations:**
- No consistent spacing scale (jumps from 60px to 130px)
- Component-specific spacing hardcoded in many places
- Grid system not defined
- Responsive spacing rules missing

### 4. Component Architecture

**Current Structure:**
```
components/
├── layout/          # Global layout components
├── sections/        # Page section components (20+ components)
├── common/          # Shared utilities
└── animations/      # Animation components
```

**Key Issues Identified:**
1. **Inconsistent styling approach**: Mix of Tailwind classes, inline styles, and CSS modules
2. **Hard-coded values**: Many components have hard-coded colors and spacing
3. **Responsive design gaps**: Mobile breakpoints not consistently implemented
4. **Animation inconsistency**: Different animation libraries (Framer Motion + GSAP) used without clear patterns

### 5. Current Implementation Gaps

**Design System:**
- Missing comprehensive design tokens
- No component variants system
- Inconsistent hover/active states
- No dark mode consideration

**Components:**
- Button variants not standardized
- Form elements lack consistent styling
- Card components have varying styles
- Navigation dropdowns need refinement

**Accessibility:**
- Focus states not properly defined
- Color contrast not verified
- Screen reader support incomplete

## Systematic Figma Extraction Guide

### Step 1: Design Tokens Extraction

Create a spreadsheet with these columns to extract from Figma:

#### Colors
| Token Name | Figma Value | Hex Code | RGB | Usage Context | Notes |
|------------|-------------|----------|-----|---------------|-------|
| Example: brand-primary | Frame/Color Name | #2B2B2B | 43,43,43 | Backgrounds, text | Check all color styles |

#### Typography
| Token Name | Font Family | Size (px) | Line Height | Letter Spacing | Weight | Text Transform | Usage |
|------------|-------------|-----------|-------------|----------------|--------|----------------|-------|
| Example: heading-1 | Font name | 64 | 1.2 | -0.02em | 600 | uppercase | Page titles |

#### Spacing
| Token Name | Desktop (px) | Tablet (px) | Mobile (px) | Usage Context |
|------------|--------------|-------------|-------------|---------------|
| Example: section-gap | 80 | 60 | 40 | Between sections |

#### Effects
| Token Name | Type | Values | Usage |
|------------|------|--------|-------|
| Example: shadow-card | Box Shadow | 0 4px 6px rgba(0,0,0,0.1) | Card hover |

### Step 2: Component Audit Checklist

For each component in Figma, document:

#### Component Structure
- [ ] Component name and variants
- [ ] Props/states (default, hover, active, disabled)
- [ ] Responsive behavior
- [ ] Content flexibility

#### Visual Properties
- [ ] Background colors/gradients
- [ ] Border properties (width, color, radius)
- [ ] Shadows and effects
- [ ] Typography application
- [ ] Spacing (padding, margins, gaps)
- [ ] Icons and imagery

#### Interactions
- [ ] Hover effects
- [ ] Click behaviors
- [ ] Transitions/animations
- [ ] Focus states

### Step 3: Page-Level Analysis

For each page design, capture:

#### Layout Structure
- [ ] Grid system (columns, gutters)
- [ ] Section ordering
- [ ] Breakpoint behaviors
- [ ] Container widths

#### Content Patterns
- [ ] Hero variations
- [ ] Content sections
- [ ] CTA placements
- [ ] Navigation patterns

### Step 4: Implementation Priority Matrix

| Component/Feature | Current State | Figma Difference | Impact | Effort | Priority |
|------------------|---------------|------------------|---------|---------|----------|
| Navigation | Functional | Styling needed | High | Medium | 1 |
| Hero Section | Basic | Major updates | High | High | 2 |
| Typography | Partial | Refinement | High | Low | 1 |
| Color System | Basic | Extension needed | High | Low | 1 |
| Buttons/CTAs | Inconsistent | Standardization | Medium | Low | 2 |
| Cards | Various styles | Unification | Medium | Medium | 3 |
| Forms | Basic | Enhancement | Low | Medium | 4 |

## Implementation Recommendations

### Phase 1: Foundation (Week 1)
1. **Update design tokens:**
   ```css
   /* Complete all missing values in design-tokens.css */
   :root {
     /* Extract exact values from Figma */
   }
   ```

2. **Standardize typography:**
   - Create typography component/mixins
   - Implement responsive type scale
   - Add letter-spacing and text-transform rules

3. **Refine color system:**
   - Add interactive states
   - Define semantic color mappings
   - Implement color contrast checking

### Phase 2: Components (Week 2)
1. **Create component library:**
   - Button system with variants
   - Card components with consistent styling
   - Form elements with validation states
   - Navigation with proper dropdown behavior

2. **Standardize spacing:**
   - Implement spacing scale utilities
   - Create layout components with built-in spacing
   - Add responsive spacing rules

3. **Animation system:**
   - Choose primary animation library
   - Create reusable animation patterns
   - Document animation principles

### Phase 3: Pages & Polish (Week 3)
1. **Update page layouts:**
   - Implement Figma-accurate sections
   - Add missing components
   - Refine responsive behavior

2. **Quality assurance:**
   - Cross-browser testing
   - Performance optimization
   - Accessibility audit

3. **Documentation:**
   - Component usage guide
   - Design system documentation
   - Maintenance guidelines

## Figma Inspection Tools

### Manual Extraction Process

1. **Use Figma Dev Mode:**
   - Enable Dev Mode in Figma
   - Click on any element to see properties
   - Copy CSS values directly

2. **Export Assets:**
   - Select all icons/logos
   - Export as SVG with proper naming
   - Optimize with SVGO

3. **Create Style Dictionary:**
   ```json
   {
     "color": {
       "brand": {
         "primary": { "value": "#2B2B2B" },
         "secondary": { "value": "#F1EDE9" }
       }
     },
     "typography": {
       "heading": {
         "1": {
           "fontSize": { "value": "220.302px" },
           "lineHeight": { "value": "198.59px" }
         }
       }
     }
   }
   ```

4. **Component Mapping:**
   - Screenshot each component state
   - Document all variations
   - Note interaction patterns

## Quick Wins for Immediate Improvement

1. **Fix Typography Hierarchy:**
   ```tsx
   // Create consistent heading components
   export const H1 = ({ children, className = "" }) => (
     <h1 className={`font-ot-neue-montreal text-hero-h1 font-semibold uppercase ${className}`}>
       {children}
     </h1>
   );
   ```

2. **Standardize Buttons:**
   ```tsx
   // Button component with variants
   export const Button = ({ variant = "primary", size = "medium", children, ...props }) => {
     const variants = {
       primary: "bg-brand-charcoal text-brand-cream hover:bg-opacity-90",
       secondary: "bg-transparent border-2 border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream",
       gold: "bg-gold text-brand-charcoal hover:bg-opacity-90"
     };
     
     const sizes = {
       small: "px-4 py-2 text-body-small",
       medium: "px-6 py-3 text-body-primary",
       large: "px-8 py-4 text-cta-large"
     };
     
     return (
       <button className={`${variants[variant]} ${sizes[size]} transition-all duration-300 font-pp-supply-mono uppercase`} {...props}>
         {children}
       </button>
     );
   };
   ```

3. **Implement Spacing Utilities:**
   ```css
   /* Add to Tailwind config */
   spacing: {
     'section': '60px',
     'component': '40px',
     'element': '20px',
     'tight': '10px'
   }
   ```

4. **Create Layout Wrapper:**
   ```tsx
   export const Section = ({ children, className = "", padding = "section" }) => (
     <section className={`py-${padding} ${className}`}>
       <div className="container-custom">
         {children}
       </div>
     </section>
   );
   ```

## Next Steps

1. **Immediate Actions:**
   - Complete the design tokens audit using the spreadsheet template
   - Take screenshots of key Figma components for reference
   - Create a component priority list based on usage frequency

2. **Development Process:**
   - Set up Storybook for component development
   - Implement one component at a time with full Figma parity
   - Create visual regression tests

3. **Validation:**
   - Side-by-side comparison with Figma
   - Stakeholder review at each phase
   - Performance and accessibility testing

## Resources & Tools

- **Figma Plugins:**
  - Design Tokens (export design tokens)
  - Figma to Code (generate initial code)
  - Contrast (check color accessibility)

- **Development Tools:**
  - Chrome DevTools for pixel-perfect comparison
  - Storybook for component documentation
  - Percy for visual regression testing

- **References:**
  - [Tailwind CSS Custom Design Systems](https://tailwindcss.com/docs/adding-custom-styles)
  - [Design Tokens W3C Spec](https://www.w3.org/community/design-tokens/)
  - [Component-Driven Development](https://www.componentdriven.org/)

---

This guide provides a systematic approach to bridging the gap between your Figma design and React implementation. Focus on extracting accurate values from Figma and implementing them consistently across your codebase.