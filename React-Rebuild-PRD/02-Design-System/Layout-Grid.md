# Layout Grid System - Disruptors Media

## Container System

### Main Container
**Max Width:** `1430px`
**Behavior:** Centered with auto margins
**Breakpoint:** Applied at `1200px` and above
**Padding:** Default Bootstrap container padding maintained

```css
@media (min-width: 1200px) {
  .container {
    width: 1430px;
  }
}
```

### Full-Width Sections
- Header/Navigation
- Hero sections
- Video backgrounds
- Footer sections

## Responsive Breakpoints

### Mobile First Approach
- **XS (Extra Small):** `320px - 575px`
- **SM (Small):** `576px - 767px` 
- **MD (Medium):** `768px - 991px`
- **LG (Large):** `992px - 1199px`
- **XL (Extra Large):** `1200px+`
- **XXL (Custom):** `1430px+` (custom container width)

## Grid System

### Bootstrap-Based Grid
- **Columns:** 12-column system
- **Gutters:** Bootstrap default gutters
- **Breakpoints:** Bootstrap responsive breakpoints

### Column Variations Used

#### Work Portfolio Grid
```css
.col-sm-6 {
  min-height: 914px;
}

.col-sm-6:nth-child(odd) {
  padding-right: 0px;
}

.col-sm-6:nth-child(even) {
  border-left: 1px solid #000;
  padding-left: 0px;
}
```

#### Case Study Image Grid
```css
.col-full { width: 100%; }
.col-half { width: 50%; }
.col-img {
  float: left;
  padding: 15px;
}
```

## Spacing System

### Padding Utilities
```css
.p-0 {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
```

### Section Padding Standards

#### Header
```css
padding: 25px 0;
```

#### Main Sections
```css
padding: 130px 0 21px 0; /* Hero sections */
padding: 60px 0 40px 0;  /* Content sections */
padding: 20px 0 40px 0;  /* Text sections */
```

#### Mobile Sections
```css
padding: 67px 0; /* Mobile background sections */
```

#### Footer Areas
```css
padding: 160px 30px 40px 30px; /* Main footer */
padding: 40px 0; /* Pre-footer */
```

#### Content Areas
```css
padding: 60px 30px;   /* FAQ/Services content */
padding: 70px 170px;  /* Featured clients */
padding: 20px 30px;   /* Work list details */
```

## Layout Patterns

### Hero Section Layout
- Full-width background
- Centered content within container
- Large typography with specific spacing
- Embossed logo background positioning

### Two-Column Layouts
- Work portfolio: 50/50 split with border separation
- Case study details: Flexible column widths
- About sections: Text and media combinations

### Full-Width Media Sections
- Video backgrounds with overlay content
- Gallery sections with custom positioning
- Featured client logo grids

### Content Section Patterns
- Header + description + content
- Background color changes for visual separation
- Consistent internal padding systems

## Positioning Systems

### Absolute Positioning Elements

#### Mobile Section Decorative Elements
```css
.mobile-sec .cont:before {
  position: absolute;
  left: -57px;
  top: 127px;
  width: 510px;
  height: 231px;
}

.mobile-sec .cont:after {
  position: absolute;
  right: -92px;
  bottom: 215px;
  width: 578px;
  height: 235px;
}
```

#### Slider Content Positioning
```css
.slider div {
  position: absolute;
  bottom: 105px;
  padding-right: 111px;
}
```

### Flexbox Layouts

#### Call-to-Action Buttons
```css
display: flex;
align-items: center;
justify-content: space-between;
```

#### Vertical Centering
```css
.va-ctr {
  align-items: center;
  display: flex;
}
```

#### Right-Aligned Content
```css
.ft-r {
  display: flex;
  justify-content: flex-end;
}
```

## Responsive Behavior

### Desktop (1430px container)
- Full layout as designed
- Maximum content width maintained
- All spacing and positioning as specified

### Large Desktop (1200px+)
- Custom container width applied
- Proportional spacing maintained
- Content centered within viewport

### Tablet (768px - 1199px)
- Container fluid width
- Adjusted padding for smaller screens
- Maintained aspect ratios

### Mobile (320px - 767px)
- Single column layouts
- Reduced padding values
- Stacked content organization
- Typography scaling

## Background Systems

### Repeating Backgrounds
```css
background: url('../images/main-bg.jpg') repeat;
```

### Positioned Backgrounds
```css
background: url(../images/logo-emboss.png) center 40px no-repeat;
```

### Cover Backgrounds
```css
background: url('../images/mobile-sec-bg.jpg') no-repeat center top;
background-size: cover;
```

## Implementation Guidelines

### CSS Grid Support
- Primary layout uses Flexbox and Bootstrap grid
- Consider CSS Grid for complex layout areas
- Maintain browser compatibility

### Container Queries
- Consider container queries for component-based responsive design
- Maintain current breakpoint system for consistency

### Spacing Tokens
```css
:root {
  --spacing-xs: 10px;
  --spacing-sm: 20px;
  --spacing-md: 40px;
  --spacing-lg: 60px;
  --spacing-xl: 130px;
  
  --container-max-width: 1430px;
}
```

### Layout Utilities
```css
.full-width { width: 100%; }
.container-custom { max-width: 1430px; margin: 0 auto; }
.section-padding { padding: 60px 0; }
.content-padding { padding: 60px 30px; }
```