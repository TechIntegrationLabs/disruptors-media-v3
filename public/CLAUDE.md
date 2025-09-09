# CLAUDE.md - Public Assets Management

This file provides guidance for working with the public assets and static files in the Disruptors Media v3 project.

## Overview

The `/public/` directory contains all static assets, media files, and configuration for the Progressive Web App (PWA). This includes organized image libraries, custom fonts, video content, and build-time assets that are served directly to users.

## Directory Structure

```
public/
├── assets/                    # Main asset library
│   ├── images/               # Organized image collection
│   │   ├── backgrounds/      # Hero and section backgrounds
│   │   ├── gallery/          # Portfolio and work samples  
│   │   ├── icons/            # UI icons and graphics
│   │   ├── logos/            # Brand and client logos
│   │   ├── portfolio/        # Project showcase images
│   │   ├── services/         # Service illustration assets
│   │   └── team/             # Team member photography
│   ├── clients/              # Client-specific assets
│   ├── portfolios/           # Portfolio project assets
│   └── videos/               # Video content and placeholders
├── fonts/                    # Custom typography assets
├── favicon.ico               # Site favicon
├── logo.svg                  # Primary brand logo
├── manifest.json             # PWA configuration
└── robots.txt               # SEO crawler configuration
```

## Asset Organization System

### Image Library (`assets/images/`)

**Purpose**: Centralized image management with logical categorization

#### Backgrounds (`backgrounds/`)
- Hero section backgrounds
- Service page headers  
- Section dividers and overlays
- Abstract and gradient backgrounds

**Naming Convention**: `[section]-[style]-[variant].jpg`
```
hero-studio-main.jpg
services-gradient-dark.jpg
about-team-background.jpg
```

#### Gallery (`gallery/`)
- Portfolio project screenshots
- Work sample previews
- Before/after comparisons
- Process documentation images

**Naming Convention**: `[project]-[type]-[number].jpg`
```
client-website-desktop-01.jpg
campaign-results-mobile-02.jpg
```

#### Icons (`icons/`)
- Service category icons
- Feature highlight graphics
- Social media icons
- UI elements and indicators

**Naming Convention**: `[category]-[name].svg`
```
service-ai-marketing.svg
social-linkedin.svg
feature-analytics.svg
```

#### Logos (`logos/`)
- Primary brand logos (multiple variations)
- Client company logos
- Partner and integration logos
- Certification badges

**Brand Logo Variations**:
```
logo-primary.svg        # Main brand logo
logo-white.svg         # White variant for dark backgrounds
logo-gold.svg          # Gold variant for special uses
logo-emboss.svg        # Embossed effect version
```

#### Portfolio (`portfolio/`)
- Project showcase images
- Case study visuals
- Client work samples
- Results and analytics screenshots

**Organization**: Subdirectories by project or client
```
portfolio/
├── client-a/
│   ├── desktop-homepage.jpg
│   ├── mobile-responsive.jpg
│   └── results-analytics.jpg
└── client-b/
    ├── campaign-creative.jpg
    └── performance-metrics.jpg
```

#### Services (`services/`)
- Service offering illustrations
- Process flow diagrams
- Technology stack visuals
- Capability demonstration images

**Categories**:
```
ai-marketing/          # AI-powered marketing assets
studio-services/       # Photography and video assets
content-production/    # Content creation visuals
digital-transformation/ # Business transformation graphics
```

#### Team (`team/`)
- Professional headshots
- Team event photography
- Behind-the-scenes content
- Studio environment shots

**Naming Convention**: `[name]-[type].jpg`
```
john-doe-headshot.jpg
team-meeting-candid.jpg
studio-workspace.jpg
```

### Client Assets (`assets/clients/`)

**Purpose**: Client-specific asset organization

**Structure**:
```
clients/
├── logos/             # Client company logos
├── testimonials/      # Testimonial videos and images  
├── case-studies/      # Case study specific assets
└── projects/          # Project-specific media
```

**Usage**: Referenced in client data files and testimonial components

### Portfolio Assets (`assets/portfolios/`)

**Purpose**: Dedicated portfolio project organization

**Structure**: Mirrors portfolio data structure with organized project assets
```
portfolios/
├── web-design/        # Web design project assets
├── marketing-campaigns/ # Campaign creative assets
├── branding-projects/ # Brand identity assets
└── video-production/  # Video project assets
```

### Video Content (`assets/videos/`)

**Purpose**: Video assets and placeholder content

**Categories**:
- **Hero Videos**: Background video loops and hero content
- **Service Demos**: Process and capability demonstrations  
- **Testimonials**: Client testimonial videos
- **Behind-the-Scenes**: Company culture and process content
- **Placeholders**: Temporary video placeholders during development

**Formats**: MP4 (primary), WebM (optimized), poster images (JPG)

## Typography System (`fonts/`)

### Custom Font Integration

**Font Families**:
- **OT Neue Montreal**: Primary brand font for headlines
- **PP Supply Mono**: Technical/code elements
- **Inter**: Body text and UI elements (loaded via Google Fonts)

**Implementation**:
```css
/* fonts/ contains local font files */
@font-face {
  font-family: 'OT Neue Montreal';
  src: url('/fonts/OTNeueMontreal-Regular.woff2') format('woff2');
  font-weight: normal;
  font-display: swap;
}

/* Tailwind CSS configuration */
fontFamily: {
  'neue-montreal': ['OT Neue Montreal', 'sans-serif'],
  'supply-mono': ['PP Supply Mono', 'monospace'],
  'sans': ['Inter', 'sans-serif']
}
```

## PWA Configuration

### Manifest (`manifest.json`)

**Purpose**: Progressive Web App configuration

**Key Settings**:
```json
{
  "name": "Disruptors Media - AI Marketing Solutions",
  "short_name": "Disruptors Media",
  "description": "Professional AI-powered marketing and studio services",
  "theme_color": "#FFD700",
  "background_color": "#2B2B2B",
  "icons": [
    {
      "src": "logo.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
```

**Features Enabled**:
- Add to home screen capability
- Offline functionality
- Brand theming
- Custom splash screen

### SEO Configuration (`robots.txt`)

**Purpose**: Search engine crawler guidance

**Configuration**:
```
User-agent: *
Allow: /

Sitemap: https://disruptorsmedia.com/sitemap.xml
```

## Asset Optimization Strategy

### Image Optimization

**Primary Strategy**: Cloudinary integration for automatic optimization
```typescript
// Cloudinary URL with optimization parameters
const optimizedUrl = `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_600/${imagePath}`;
```

**Fallback Strategy**: Local assets with manual optimization
- WebP format for modern browsers
- JPEG/PNG fallbacks for compatibility
- Multiple size variants for responsive loading

### Performance Considerations

**Image Loading**:
- Lazy loading for below-the-fold images
- Responsive image sets for different screen sizes
- Placeholder images during loading states

**Video Optimization**:
- Compressed MP4 for broad compatibility
- WebM format for improved compression
- Poster images for video elements
- Autoplay considerations for mobile

## Development Workflows

### Adding New Assets

1. **Categorization**: Place assets in appropriate directory structure
2. **Naming Convention**: Follow established naming patterns
3. **Optimization**: Apply optimization before adding to repository
4. **Documentation**: Update asset inventory and usage documentation

### Asset Usage Patterns

**Component Integration**:
```tsx
// Static asset import
import heroBackground from '/assets/images/backgrounds/hero-studio-main.jpg';

// Dynamic asset loading
const getAssetUrl = (category: string, filename: string) => 
  `/assets/images/${category}/${filename}`;

// Cloudinary fallback pattern
const imageUrl = cloudinaryAsset || `/assets/images/fallback/${filename}`;
```

**Responsive Image Implementation**:
```tsx
<picture>
  <source 
    media="(min-width: 768px)" 
    srcSet="/assets/images/hero-desktop.webp"
  />
  <source 
    media="(min-width: 480px)" 
    srcSet="/assets/images/hero-tablet.webp"
  />
  <img 
    src="/assets/images/hero-mobile.jpg" 
    alt="Hero image description"
    loading="lazy"
  />
</picture>
```

### Asset Management Commands

```bash
# Asset optimization (if implemented)
npm run assets:optimize     # Compress and optimize all assets
npm run assets:audit        # Check for unused or missing assets
npm run assets:generate     # Generate responsive variants

# Development helpers
npm run assets:size         # Report asset sizes and recommendations
npm run assets:validate     # Validate asset naming and structure
```

## Integration with Build System

### Build-Time Processing

**Asset Processing**:
- Automatic compression during build
- Generate multiple size variants
- Create WebP versions for supported browsers
- Optimize SVG files for smaller file sizes

**Caching Strategy**:
- Assets receive unique hashes for cache busting
- Long-term caching for unchanged assets
- CDN integration for improved delivery performance

### Deployment Considerations

**Asset Delivery**:
- CDN integration for global asset delivery
- Gzip compression for text-based assets
- Browser caching headers for optimal performance
- Progressive loading for large image galleries

**Monitoring**:
- Asset loading performance metrics
- Failed asset load tracking
- User experience impact measurement

## Quality Standards

### Image Standards
- **Minimum Resolution**: 1920px width for hero images
- **Format Standards**: WebP preferred, JPEG/PNG fallback
- **Compression**: Balance quality vs. file size (80-85% quality)
- **Color Profile**: sRGB for web compatibility

### Accessibility Standards
- **Alt Text**: Descriptive alternative text for all images
- **Color Contrast**: Ensure sufficient contrast in image overlays
- **Focus Indicators**: Visible focus states for interactive images

This public assets system provides organized, optimized, and performant asset delivery while maintaining clear structure and development workflows for the marketing website.