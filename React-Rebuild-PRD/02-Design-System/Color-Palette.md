# Color Palette - Disruptors Media

## Primary Colors

### Brand Charcoal
**Hex:** `#2B2B2B`
**RGB:** `rgb(43, 43, 43)`
**Usage:** Primary text, buttons, borders, brand elements
**Description:** Dark charcoal that serves as the primary brand color

### Brand Cream
**Hex:** `#F1EDE9`
**RGB:** `rgb(241, 237, 233)`
**Usage:** Text on dark backgrounds, button text, inverted elements
**Description:** Warm off-white cream color for contrast

### Pure Black
**Hex:** `#000000`
**RGB:** `rgb(0, 0, 0)`
**Usage:** Text on light colored backgrounds, borders, accents
**Description:** True black for maximum contrast situations

### Pure White
**Hex:** `#FFFFFF`
**RGB:** `rgb(255, 255, 255)`
**Usage:** Background color, clean sections
**Description:** Pure white for backgrounds and clean areas

## Secondary Colors

### Warm Beige
**Hex:** `#CAC1B8`
**RGB:** `rgb(202, 193, 184)`
**Usage:** Section backgrounds, content areas, FAQ sections
**Description:** Warm neutral background color for content sections

## Background Elements

### Textured Background
**Pattern:** `main-bg.jpg` (repeating texture)
**Usage:** Body background, adds subtle texture
**Description:** Subtle textured pattern that adds visual interest

### Logo Emboss
**Image:** `logo-emboss.png`
**Usage:** Section backgrounds (footer, specific content areas)
**Position:** Center positioned, no-repeat
**Description:** Subtle logo watermark for brand presence

## Usage Guidelines

### Text Color Applications

#### On Light Backgrounds
- **Primary Text:** `#2B2B2B`
- **Secondary Text:** `#2B2B2B`
- **Links:** `#2B2B2B`

#### On Dark Backgrounds (`#2B2B2B`)
- **Primary Text:** `#F1EDE9`
- **Secondary Text:** `#F1EDE9`
- **Links:** `#F1EDE9`

#### On Colored Backgrounds (`#CAC1B8`)
- **Primary Text:** `#000000`
- **Secondary Text:** `#000000`
- **Links:** `#000000`

### Interactive Elements

#### Buttons - Primary
- **Background:** `#2B2B2B`
- **Text:** `#F1EDE9`
- **Hover:** Maintain same colors (no color change on hover)

#### Buttons - CTA Large
- **Background:** `#2B2B2B`
- **Text:** `#F1EDE9`
- **Display:** Flex with space-between alignment

#### Links
- **Default:** Inherits parent text color
- **Hover:** No color change (maintains accessibility)
- **Visited:** Same as default
- **Decoration:** None (text-decoration: none)

### Borders and Separators

#### Section Separators
- **Color:** `#2B2B2B`
- **Variations:** Multiple heights (1px, 2px, 4px, 7px, 9px, 10px)
- **Usage:** Creates visual rhythm between sections

#### Content Borders
- **Color:** `#000000`
- **Width:** 1px solid
- **Usage:** Work grid separations, content divisions

### Background Applications

#### Full Page Background
```css
background: url('../images/main-bg.jpg') repeat
```

#### Section Backgrounds - Dark
```css
background: #2B2B2B
```

#### Section Backgrounds - Light Colored
```css
background: #CAC1B8
```

#### Section Backgrounds - With Logo
```css
background: url(../images/logo-emboss.png) center 40px no-repeat
```

#### Mobile Video Background
```css
background: url('../images/mobile-sec-bg.jpg') no-repeat center top
background-size: cover
```

## Color Accessibility

### Contrast Ratios
- `#2B2B2B` on `#F1EDE9`: **12.8:1** (AAA compliant)
- `#000000` on `#CAC1B8`: **8.1:1** (AAA compliant)
- `#F1EDE9` on `#2B2B2B`: **12.8:1** (AAA compliant)

### Color Blindness Considerations
- High contrast maintained across all color combinations
- No reliance on color alone for information
- Clear differentiation between interactive and static elements

## Implementation

### CSS Variables
```css
:root {
  /* Primary Colors */
  --color-brand-charcoal: #2B2B2B;
  --color-brand-cream: #F1EDE9;
  --color-black: #000000;
  --color-white: #FFFFFF;
  
  /* Secondary Colors */
  --color-warm-beige: #CAC1B8;
  
  /* Background Images */
  --bg-texture: url('../images/main-bg.jpg');
  --bg-logo-emboss: url('../images/logo-emboss.png');
  --bg-mobile-section: url('../images/mobile-sec-bg.jpg');
}
```

### Utility Classes
```css
.text-primary { color: var(--color-brand-charcoal); }
.text-inverted { color: var(--color-brand-cream); }
.text-accent { color: var(--color-black); }
.bg-dark { background-color: var(--color-brand-charcoal); }
.bg-light { background-color: var(--color-warm-beige); }
.bg-texture { background: var(--bg-texture) repeat; }
```

## Brand Guidelines

### Do's
- Use brand charcoal (`#2B2B2B`) for primary brand elements
- Maintain high contrast ratios for accessibility
- Use warm beige for content section backgrounds
- Apply textured background to body for visual interest

### Don'ts
- Don't introduce additional colors without brand approval
- Don't compromise contrast ratios for visual appeal
- Don't use pure black for primary text (use brand charcoal)
- Don't overlay text on busy background images without proper contrast