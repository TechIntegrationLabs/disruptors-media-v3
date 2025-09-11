# Figma Component Analysis Checklist

Use this checklist to systematically extract information from your Figma design:

## Navigation Components

### Header
- [ ] Logo dimensions and placement
- [ ] Navigation item spacing
- [ ] Dropdown menu styling
- [ ] Mobile menu design
- [ ] Header height on different breakpoints
- [ ] Background color/transparency
- [ ] Typography for navigation items

### Mobile Menu
- [ ] Menu toggle icon design
- [ ] Overlay background color/opacity
- [ ] Menu item typography and spacing
- [ ] Animation direction and timing
- [ ] Close button design and placement

## Hero Section

### Layout
- [ ] Background image/video specifications
- [ ] Content positioning (centered, left-aligned, etc.)
- [ ] Padding/margins around content
- [ ] Responsive behavior on mobile

### Typography
- [ ] Main headline font size and line height
- [ ] Subtitle/tagline styling
- [ ] Text color and any text effects
- [ ] Letter spacing if specified

### CTA Elements
- [ ] Button design (colors, borders, shadows)
- [ ] Button typography
- [ ] Button hover states
- [ ] Button spacing from other elements

## Services/Features Section

### Layout Pattern
- [ ] Grid system (2-column, 3-column, etc.)
- [ ] Card/item spacing
- [ ] Background patterns or colors
- [ ] Section padding from top/bottom

### Card Design
- [ ] Card background color
- [ ] Card border radius
- [ ] Card shadow/elevation
- [ ] Image placement and sizing
- [ ] Text hierarchy within cards
- [ ] Hover state effects

## Work/Portfolio Grid

### Grid Specifications
- [ ] Number of columns per breakpoint
- [ ] Gap between items
- [ ] Aspect ratio of grid items
- [ ] Image overlay effects
- [ ] Typography for project titles

### Interactive States
- [ ] Hover effects on portfolio items
- [ ] Click/tap feedback
- [ ] Image loading states
- [ ] Filter button styling (if applicable)

## Contact/CTA Sections

### Form Design
- [ ] Input field styling
- [ ] Label positioning and typography
- [ ] Placeholder text color
- [ ] Focus states for inputs
- [ ] Error state styling
- [ ] Submit button design

### Background Elements
- [ ] Section background color/image
- [ ] Any decorative elements
- [ ] Padding and margins
- [ ] Typography for section headers

## Footer

### Layout Structure
- [ ] Number of columns
- [ ] Content organization
- [ ] Logo placement and size
- [ ] Social icon design and spacing

### Styling Details
- [ ] Background color
- [ ] Text colors and hierarchy
- [ ] Link hover states
- [ ] Divider lines or spacing elements

## Interactive Elements

### Buttons
- [ ] Primary button styling (background, text, border)
- [ ] Secondary button variations
- [ ] Button sizes (small, medium, large)
- [ ] Hover state changes
- [ ] Active/pressed states
- [ ] Disabled state styling

### Links
- [ ] Default link color
- [ ] Hover state color
- [ ] Underline styling
- [ ] Visited state (if different)

## Responsive Design

### Breakpoints
- [ ] Mobile design (typically 375px-767px)
- [ ] Tablet design (typically 768px-1023px)
- [ ] Desktop design (typically 1024px+)
- [ ] Large desktop variations (1400px+)

### Mobile-Specific Changes
- [ ] Typography size adjustments
- [ ] Spacing/padding changes
- [ ] Navigation differences
- [ ] Image sizing modifications
- [ ] Content reordering or hiding

## Assets to Extract

### Images
- [ ] Logo variations (light, dark, monochrome)
- [ ] Hero background images
- [ ] Service/feature icons or graphics
- [ ] Portfolio/work samples
- [ ] Team photos or about images
- [ ] Any decorative graphics

### Export Specifications
- [ ] Required image sizes (1x, 2x, 3x for retina)
- [ ] Preferred formats (PNG, JPG, WebP)
- [ ] Optimization requirements
- [ ] Fallback images needed

## Animation Specifications

### Page Transitions
- [ ] Page load animations
- [ ] Element fade-in timing
- [ ] Scroll-triggered animations
- [ ] Stagger effects for lists

### Micro-interactions
- [ ] Button hover animations
- [ ] Form field focus animations
- [ ] Image hover effects
- [ ] Loading state animations

### Timing and Easing
- [ ] Animation duration values
- [ ] Easing curves (ease-in, ease-out, cubic-bezier)
- [ ] Delay values for staggered animations

## Color Usage Map

Create a comprehensive color usage document:

### Primary Colors
- [ ] Where brand-charcoal is used
- [ ] Where brand-cream is used  
- [ ] Where warm-beige appears
- [ ] Gold accent usage

### Interactive Colors
- [ ] Hover state color changes
- [ ] Focus state indicators
- [ ] Active state styling
- [ ] Disabled state colors

## Typography Usage Map

### Font Applications
- [ ] Where OT Neue Montreal is used
- [ ] Where PP Supply Mono is used
- [ ] Any mixed font usage in single components

### Size Hierarchy
- [ ] H1, H2, H3 heading sizes
- [ ] Body text sizes
- [ ] Caption/small text sizes
- [ ] Button text sizes

---

## Action Items After Analysis

1. **Update design-tokens.css** with exact values
2. **Modify tailwind.config.js** to match Figma specifications
3. **Create component-specific CSS** for complex styling
4. **Export and optimize assets** from Figma
5. **Update React components** to match design specifications
6. **Test responsive behavior** across all breakpoints
7. **Implement animations** according to Figma specs
8. **Validate color contrast** for accessibility compliance