# Typography System - Disruptors Media

## Font Families

### Primary Font: PP Supply Mono
**Usage:** Body text, navigation, buttons, general content
**File:** `PPSupplyMono-Regular`
**Formats:** .eot, .woff2, .woff, .ttf, .svg
**Weight:** 400 (Regular)
**Style:** Normal
**Character:** Monospace, modern, technical aesthetic

### Secondary Font: OT Neue Montreal
**Usage:** Headlines, titles, major text elements
**File:** `OTNeueMontreal-SemiBoldSemiSqueezed`
**Formats:** .eot, .woff2, .woff, .ttf, .svg
**Weight:** 600 (Semi-Bold)
**Style:** Normal, Semi-Squeezed variant
**Character:** Condensed, impactful, brand-focused

## Typography Hierarchy

### H1 - Main Headlines
```css
font-family: 'OT Neue Montreal'
font-size: 220.302px
font-weight: 600
line-height: 198.59px
color: #2B2B2B
text-transform: uppercase
text-align: center (default)
```
**Usage:** Primary page titles, hero headlines
**Responsive:** Scales down on mobile devices

### H2 - Section Headers
```css
font-family: 'OT Neue Montreal'
font-size: 63px
font-weight: 600
line-height: 68.6px
color: #2B2B2B
text-transform: uppercase
text-align: center (default)
```
**Usage:** Section titles, major content headers
**Variants:**
- Contact page H2: `font-size: 61px, text-transform: none`

### H3 - Subsection Headers
```css
font-family: 'OT Neue Montreal'
font-size: 65px (slider content)
font-weight: 600
line-height: 68.6px
color: #F1EDE9 (on dark backgrounds)
text-transform: uppercase
```
**Alternative H3 (smaller):**
```css
font-family: 'OT Neue Montreal'
font-size: 39px
font-weight: 600
color: #2B2B2B
text-transform: uppercase
```

### Body Text - Primary
```css
font-family: 'PP Supply Mono'
font-size: 22px
font-weight: 400
line-height: 30px
color: #2B2B2B
text-transform: uppercase
```
**Usage:** Main content, descriptions, navigation

### Body Text - Secondary
```css
font-family: 'PP Supply Mono'
font-size: 20px
font-weight: 400
line-height: 28px
color: #2B2B2B
text-align: justify (for longer content)
text-transform: none (for readable content)
```
**Usage:** Paragraph content, case study descriptions

### Body Text - Small
```css
font-family: 'PP Supply Mono'
font-size: 16px
font-weight: 400
line-height: 28px
color: #2B2B2B
text-transform: uppercase
```
**Usage:** Captions, metadata, footer text

### Navigation Text
```css
font-family: 'PP Supply Mono'
font-size: 22px
font-weight: 400
line-height: 30px
color: #2B2B2B
text-transform: uppercase
```

### Button Text
```css
font-family: 'PP Supply Mono'
font-size: 20px
font-weight: 400
text-transform: uppercase
color: #F1EDE9 (on dark backgrounds)
```

### CTA Large Text
```css
font-family: 'PP Supply Mono'
font-size: 39.645px
font-weight: 400
line-height: 47.65px
text-transform: uppercase
```
**Usage:** Large call-to-action buttons

## Color Applications

### Text Colors
- **Primary Text:** `#2B2B2B` (dark charcoal)
- **Inverted Text:** `#F1EDE9` (cream/off-white)
- **Accent Text:** `#000000` (pure black on light backgrounds)

### Background Contexts
- **Light Backgrounds:** Use `#2B2B2B` text
- **Dark Backgrounds (#2B2B2B):** Use `#F1EDE9` text
- **Colored Backgrounds (#CAC1B8):** Use `#000000` text

## Text Treatments

### Uppercase Transform
- Applied to: Navigation, buttons, most headings, descriptive text
- Exception: Paragraph content and readable body text

### Text Alignment
- **Default:** Left-aligned
- **Headers:** Center-aligned (most cases)
- **Paragraphs:** Justified for longer content
- **Navigation:** Center-aligned

### Line Spacing
- Consistent line-height ratios maintained
- Tight leading for headlines (90% of font size)
- Comfortable reading spacing for body text (140% of font size)

## Responsive Typography

### Mobile Adjustments
- H1: Scale down significantly (suggest 60-80px)
- H2: Scale to ~40-45px
- Body text: Maintain 20-22px for readability
- Adjust line-heights proportionally

### Tablet Adjustments
- H1: Scale to ~120-140px
- H2: Scale to ~50-55px
- Maintain desktop body text sizes

## Implementation Notes

### Font Loading
- Use `font-display: swap` for performance
- Load fonts early in document head
- Provide fallback fonts (monospace, sans-serif)
- Consider font preloading for critical fonts

### CSS Variables
```css
:root {
  --font-primary: 'PP Supply Mono', monospace;
  --font-secondary: 'OT Neue Montreal', sans-serif;
  --color-text-primary: #2B2B2B;
  --color-text-inverted: #F1EDE9;
  --color-text-accent: #000000;
}
```

### Accessibility
- Maintain minimum 4.5:1 contrast ratios
- Ensure readable font sizes on all devices
- Provide sufficient line spacing for dyslexia accessibility