# Figma Design Extraction Template

Use this template to systematically extract design specifications from your Figma file. Fill in each section with exact values from the design.

## 🎨 Color Palette Extraction

### Primary Brand Colors
```css
/* Extract exact hex values from Figma */
--brand-primary: #______; /* Main brand color */
--brand-secondary: #______; /* Secondary brand color */
--brand-accent: #______; /* Accent/highlight color */

/* Background Colors */
--bg-main: #______; /* Main background */
--bg-section: #______; /* Section backgrounds */
--bg-card: #______; /* Card/content backgrounds */
--bg-overlay: #______; /* Overlay backgrounds */

/* Text Colors */
--text-primary: #______; /* Main text color */
--text-secondary: #______; /* Secondary text color */
--text-muted: #______; /* Muted/caption text */
--text-inverse: #______; /* Text on dark backgrounds */

/* Interactive Colors */
--button-primary: #______; /* Primary button background */
--button-secondary: #______; /* Secondary button background */
--button-text: #______; /* Button text color */
--link-color: #______; /* Link color */
--hover-color: #______; /* Hover state color */

/* Status Colors */
--success: #______; /* Success state */
--warning: #______; /* Warning state */
--error: #______; /* Error state */
--info: #______; /* Information state */
```

## 📝 Typography Specifications

### Font Families
```css
/* Verify exact font names from Figma */
--font-primary: '______', sans-serif; /* Main body font */
--font-heading: '______', sans-serif; /* Heading font */
--font-mono: '______', monospace; /* Monospace font */
--font-accent: '______', sans-serif; /* Accent font if different */
```

### Font Sizes - Desktop
```css
/* Extract exact pixel values */
--text-hero: ___px; /* Hero/display text */
--text-h1: ___px; /* Main heading */
--text-h2: ___px; /* Section heading */
--text-h3: ___px; /* Subsection heading */
--text-h4: ___px; /* Smaller heading */
--text-body: ___px; /* Body text */
--text-small: ___px; /* Small text */
--text-caption: ___px; /* Caption text */
--text-button: ___px; /* Button text */
```

### Font Sizes - Tablet
```css
/* Extract responsive values */
--text-hero-tablet: ___px;
--text-h1-tablet: ___px;
--text-h2-tablet: ___px;
--text-h3-tablet: ___px;
--text-h4-tablet: ___px;
--text-body-tablet: ___px;
--text-small-tablet: ___px;
--text-caption-tablet: ___px;
--text-button-tablet: ___px;
```

### Font Sizes - Mobile
```css
/* Extract mobile values */
--text-hero-mobile: ___px;
--text-h1-mobile: ___px;
--text-h2-mobile: ___px;
--text-h3-mobile: ___px;
--text-h4-mobile: ___px;
--text-body-mobile: ___px;
--text-small-mobile: ___px;
--text-caption-mobile: ___px;
--text-button-mobile: ___px;
```

### Line Heights
```css
/* Extract line height values */
--line-height-hero: ___px; /* or unitless ratio */
--line-height-heading: ___px;
--line-height-body: ___px;
--line-height-tight: ___px;
--line-height-loose: ___px;
```

### Font Weights
```css
/* Note which weights are used */
--weight-light: 300;
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-black: 900;
```

## 📐 Spacing & Layout System

### Grid System
```css
/* Extract container and grid specifications */
--container-max-width: ____px; /* Max container width */
--container-padding-desktop: ___px; /* Container side padding */
--container-padding-tablet: ___px;
--container-padding-mobile: ___px;

--grid-columns: __; /* Number of columns */
--grid-gutter: ___px; /* Space between columns */
```

### Spacing Scale
```css
/* Extract all spacing values used in the design */
--space-0: 0px;
--space-1: ___px;
--space-2: ___px;
--space-3: ___px;
--space-4: ___px;
--space-5: ___px;
--space-6: ___px;
--space-8: ___px;
--space-10: ___px;
--space-12: ___px;
--space-16: ___px;
--space-20: ___px;
--space-24: ___px;
--space-32: ___px;
--space-40: ___px;
--space-48: ___px;
--space-64: ___px;
--space-80: ___px;
--space-96: ___px;
--space-128: ___px;
```

### Section Spacing
```css
/* Page section padding */
--section-padding-top-desktop: ___px;
--section-padding-bottom-desktop: ___px;
--section-padding-top-tablet: ___px;
--section-padding-bottom-tablet: ___px;
--section-padding-top-mobile: ___px;
--section-padding-bottom-mobile: ___px;

/* Header/Footer spacing */
--header-height: ___px;
--header-padding: ___px;
--footer-padding-top: ___px;
--footer-padding-bottom: ___px;
```

## 🎯 Component Specifications

### Buttons
```css
/* Primary Button */
.btn-primary {
  padding: ___px ___px ___px ___px; /* top right bottom left */
  border-radius: ___px;
  font-size: ___px;
  font-weight: ___;
  line-height: ___px;
  min-height: ___px;
  background: #______;
  color: #______;
  border: ___px solid #______; /* if applicable */
}

/* Primary Button Hover */
.btn-primary:hover {
  background: #______;
  color: #______;
  transform: ______; /* if applicable */
  box-shadow: ______; /* if applicable */
}

/* Secondary Button */
.btn-secondary {
  padding: ___px ___px ___px ___px;
  border-radius: ___px;
  font-size: ___px;
  font-weight: ___;
  line-height: ___px;
  min-height: ___px;
  background: #______;
  color: #______;
  border: ___px solid #______;
}
```

### Cards/Content Blocks
```css
.card {
  padding: ___px; /* or specific sides */
  border-radius: ___px;
  background: #______;
  border: ___px solid #______; /* if applicable */
  box-shadow: ______; /* extract shadow specifications */
}

.card:hover {
  transform: ______; /* hover effects */
  box-shadow: ______;
  background: #______;
}
```

### Form Fields
```css
.input {
  padding: ___px ___px ___px ___px;
  border-radius: ___px;
  border: ___px solid #______;
  background: #______;
  font-size: ___px;
  line-height: ___px;
  height: ___px; /* or min-height */
}

.input:focus {
  border-color: #______;
  box-shadow: ______;
  outline: none;
}

.input::placeholder {
  color: #______;
  opacity: ___;
}
```

### Navigation
```css
/* Header/Navigation */
.header {
  height: ___px;
  padding: ___px ___px;
  background: #______;
  border-bottom: ___px solid #______; /* if applicable */
}

.nav-item {
  padding: ___px ___px;
  font-size: ___px;
  font-weight: ___;
  color: #______;
}

.nav-item:hover {
  color: #______;
  background: #______; /* if applicable */
}

.nav-item.active {
  color: #______;
  font-weight: ___;
}

/* Dropdown Menu */
.dropdown {
  min-width: ___px;
  padding: ___px;
  background: #______;
  border: ___px solid #______;
  border-radius: ___px;
  box-shadow: ______;
}
```

## 📱 Responsive Breakpoints

```css
/* Extract exact breakpoint values from Figma */
--breakpoint-sm: ___px; /* Mobile */
--breakpoint-md: ___px; /* Tablet */
--breakpoint-lg: ___px; /* Desktop */
--breakpoint-xl: ___px; /* Large Desktop */
--breakpoint-xxl: ___px; /* Extra Large */
```

## 🖼️ Image & Media Specifications

### Image Dimensions
```
/* Document standard image sizes used */
Hero Image: ___px × ___px
Card Image: ___px × ___px
Thumbnail: ___px × ___px
Avatar: ___px × ___px
Logo: ___px × ___px (max-height)
Icon: ___px × ___px
```

### Image Styles
```css
.hero-image {
  border-radius: ___px;
  object-fit: ____; /* cover, contain, etc. */
  aspect-ratio: ___ / ___; /* if using aspect ratios */
}

.card-image {
  border-radius: ___px;
  object-fit: ____;
  aspect-ratio: ___ / ___;
}
```

## 🎭 Effects & Animations

### Shadows
```css
/* Extract all shadow variations */
--shadow-small: __ __ __ __ rgba(__,__,__,__);
--shadow-medium: __ __ __ __ rgba(__,__,__,__);
--shadow-large: __ __ __ __ rgba(__,__,__,__);
--shadow-hover: __ __ __ __ rgba(__,__,__,__);
```

### Border Radius
```css
/* Standard radius values */
--radius-small: ___px;
--radius-medium: ___px;
--radius-large: ___px;
--radius-full: ___px; /* for circular elements */
```

### Transitions
```css
/* Animation specifications */
--transition-fast: ___ms ease-in-out;
--transition-medium: ___ms ease-in-out;
--transition-slow: ___ms ease-in-out;

/* Specific transition properties */
--transition-color: color ___ms ease-in-out;
--transition-transform: transform ___ms ease-in-out;
--transition-opacity: opacity ___ms ease-in-out;
```

### Hover Effects
```
/* Document hover behaviors */
Button hover: _____________ (describe effect)
Card hover: _____________ (describe effect)
Image hover: _____________ (describe effect)
Link hover: _____________ (describe effect)
```

## 📋 Component Checklist

### Header/Navigation
- [ ] Logo size and positioning
- [ ] Navigation item spacing
- [ ] Menu item typography
- [ ] Dropdown styling
- [ ] Mobile menu design
- [ ] Active/hover states

### Hero Section
- [ ] Layout proportions
- [ ] Text sizing hierarchy
- [ ] Background treatment
- [ ] CTA button styling
- [ ] Responsive behavior

### Content Sections
- [ ] Section padding/margins
- [ ] Text block width/alignment
- [ ] Image positioning
- [ ] Card/grid layouts
- [ ] List styling

### Forms
- [ ] Input field styling
- [ ] Button treatments
- [ ] Validation states
- [ ] Label positioning
- [ ] Placeholder text

### Footer
- [ ] Layout structure
- [ ] Link styling
- [ ] Social icon treatment
- [ ] Background/borders

## 🔧 Implementation Notes

### Special Effects to Note:
- Glass morphism/backdrop filters: ________________
- Gradient backgrounds: ________________
- Custom animations: ________________
- Parallax effects: ________________
- Scroll-triggered animations: ________________

### Accessibility Features:
- Focus states: ________________
- Color contrast ratios: ________________
- Touch targets: ___px minimum
- Alt text patterns: ________________

### Performance Considerations:
- Image optimization specs: ________________
- Font loading strategy: ________________
- Animation performance notes: ________________

---

## How to Use This Template

1. **Open your Figma file** and switch to Dev Mode (or use Inspect panel)
2. **Go through each component** systematically
3. **Fill in the exact values** from the Figma specifications
4. **Export assets** and note their dimensions
5. **Document any special effects** or interactions
6. **Update your Tailwind config** with these values
7. **Implement components** to match the specifications exactly

This systematic approach ensures pixel-perfect implementation that matches your original Figma design.