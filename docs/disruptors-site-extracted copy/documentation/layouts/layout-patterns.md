# Layout Patterns and Responsive Design

## Grid System
- **Framework**: Bootstrap Grid (12-column system)
- **Container**: Standard Bootstrap container with responsive max-widths
- **Gutters**: Default Bootstrap spacing

## Responsive Breakpoints
Following Bootstrap's standard breakpoints:
- **Extra Small (xs)**: <576px (Mobile)
- **Small (sm)**: ≥576px (Landscape phones)
- **Medium (md)**: ≥768px (Tablets)
- **Large (lg)**: ≥992px (Desktops)
- **Extra Large (xl)**: ≥1200px (Large desktops)

## Common Layout Patterns

### 1. Hero Section
```html
<section class="main-banner">
  <div class="container">
    <div class="text">
      <!-- Centered content -->
    </div>
    <div class="video-background">
      <!-- Full-width video/image -->
    </div>
  </div>
</section>
```
- Full viewport height
- Video/image background
- Centered text overlay
- Mobile: Static image fallback

### 2. Content Sections
```html
<section class="[section-name]">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <!-- Content -->
      </div>
    </div>
  </div>
</section>
```
- Consistent vertical padding
- Container-based width constraints
- Flexible column arrangements

### 3. Two-Column Layouts
- **Desktop**: 50/50 or 60/40 split
- **Tablet**: Often maintains two columns
- **Mobile**: Stacks to single column
- Common uses: Text + Image, Features, About sections

### 4. Three-Column Grid
- **Desktop**: Equal thirds (col-lg-4)
- **Tablet**: May switch to 2 columns
- **Mobile**: Single column stack
- Common uses: Services, Features, Team

### 5. Gallery/Portfolio Grid
- **Desktop**: 3-4 columns
- **Tablet**: 2-3 columns
- **Mobile**: 1-2 columns
- Masonry or equal height options
- Hover effects for interaction

## Component Layout Patterns

### Navigation Header
- **Desktop**: Horizontal menu, logo left, menu right
- **Mobile**: Hamburger menu, centered logo
- Sticky positioning on scroll
- Transparent to solid background transition

### Footer
- **Multi-column layout**: Links, contact, social
- **Mobile**: Stacked sections
- Newsletter signup integration
- Copyright bar at bottom

### Cards/Boxes
- Consistent padding and borders
- Hover state transformations
- Equal heights in rows
- Responsive image handling

### Forms
- Full-width inputs on mobile
- Inline labels on desktop
- Clear error state styling
- Submit button positioning

## Spacing System

### Vertical Rhythm
- Section padding: Consistent top/bottom
- Element spacing: Based on baseline grid
- Mobile adjustments: Reduced padding

### Horizontal Spacing
- Container padding: 15px (Bootstrap default)
- Column gutters: 30px total (15px each side)
- Edge cases handled with custom margins

## Image Handling

### Aspect Ratios
- Hero images: 16:9 or full viewport
- Thumbnails: 1:1 or 4:3
- Gallery images: Varied with consistent heights

### Responsive Images
- Multiple size options
- Lazy loading implementation
- Proper alt text
- WebP format where supported

## Mobile-First Approach

### Progressive Enhancement
1. Start with mobile layout
2. Add complexity for larger screens
3. Touch-first interactions
4. Performance optimizations

### Mobile Specific Patterns
- Simplified navigation
- Larger touch targets (min 44px)
- Reduced animation complexity
- Optimized image sizes

## Special Layout Considerations

### Video Backgrounds
- **Desktop**: Full autoplay video
- **Tablet**: May use static image
- **Mobile**: Always static image with poster
- Performance-based loading

### Overflow Handling
- Horizontal scroll prevention
- Text truncation patterns
- Image cropping strategies
- Content prioritization

### Z-Index Management
```css
/* Z-index scale */
$z-dropdown: 1000;
$z-sticky: 1020;
$z-fixed: 1030;
$z-modal: 1040;
$z-popover: 1050;
$z-tooltip: 1060;
```

## Accessibility in Layouts
- Logical tab order
- Skip navigation links
- Proper heading hierarchy
- ARIA landmarks
- Focus visible states

## Print Styles
- Hidden navigation/footer
- Simplified layouts
- Black and white friendly
- Page break controls