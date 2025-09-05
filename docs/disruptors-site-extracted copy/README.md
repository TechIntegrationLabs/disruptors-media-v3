# Disruptors Media Website - Extracted Resources

This folder contains all extracted assets and documentation from the Disruptors Media website, organized for rebuilding the site from scratch.

## 📁 Folder Structure

```
disruptors-site-extracted/
├── assets/                 # All media assets
│   ├── images/            # All image files
│   │   ├── logos/         # Logo variations
│   │   ├── backgrounds/   # Background images
│   │   ├── icons/         # UI and service icons
│   │   ├── gallery/       # Gallery images
│   │   ├── portfolio/     # Case study images
│   │   └── services/      # Service-related images
│   ├── videos/            # All video files
│   ├── fonts/             # Custom font files
│   └── audio/             # Audio files (if any)
├── documentation/         # Detailed documentation
│   ├── content/          # Page-by-page content
│   ├── design-system/    # Colors, fonts, components
│   ├── layouts/          # Layout patterns
│   └── animations.md     # Animation specifications
├── brand/                # Brand guidelines
└── PRD.md               # Complete Product Requirements
```

## 📄 Key Documents

### 1. **PRD.md** - Product Requirements Document
The master document containing:
- Complete technical specifications
- Design system details
- Feature requirements
- Development phases
- Success metrics

### 2. **documentation/site-structure.md**
- Full sitemap
- Page hierarchy
- Navigation flow
- User journeys

### 3. **documentation/design-system/design-system.md**
- Color palette (hex values)
- Typography specifications
- Spacing system
- Component library

### 4. **documentation/animations.md**
- GSAP animation patterns
- Scroll triggers
- Interactive elements
- Performance guidelines

### 5. **brand/brand-voice-guidelines.md**
- Messaging strategy
- Tone of voice
- Content patterns
- Audience considerations

## 🎨 Design System Summary

### Colors
- Primary: `#F1EDE9` (Light beige)
- Text: `#2B2B2B` (Dark charcoal)
- Secondary: `#CAC1B8` (Medium beige)
- Dark: `#000000` (Black)

### Fonts
- Headlines: OT Neue Montreal
- Technical: PP Supply Mono

### Key Visual Elements
- Robot hand vs Human hand (duality theme)
- Gold accents
- Video backgrounds
- Scramble text effects

## 🚀 Quick Start for Developers

1. **Review the PRD.md** for complete requirements
2. **Check design-system.md** for styling specifications
3. **Reference animations.md** for interaction patterns
4. **Use provided assets** from the assets folder
5. **Follow brand guidelines** for content creation

## 🎯 Core Features to Implement

1. **Loading Animation** (0-100% counter)
2. **Sticky Navigation** with transparency
3. **Video Backgrounds** with fallbacks
4. **GSAP Animations**:
   - Scroll triggers
   - Text scramble
   - Image reveals
   - Rotating elements
5. **Responsive Design** (Mobile-first)
6. **Dynamic Content** via API/CMS
7. **Contact Forms** with validation
8. **SEO Optimization**

## 💡 Technology Recommendations

### Frontend Frameworks (Choose One)
- React 18+ with Vite
- Next.js 14+ (Recommended for SEO)
- Vue 3 with Nuxt
- Vanilla JS with modern tooling

### Required Libraries
- GSAP (Business License)
- Lenis (Smooth scrolling)
- Bootstrap or Tailwind CSS

### Backend/CMS Options
- Headless CMS (Strapi, Contentful)
- Custom API (Node.js/Express)
- Static Site Generation
- WordPress Headless

## 📱 Responsive Breakpoints
- Mobile: <576px
- Tablet: 576px - 991px
- Desktop: 992px+
- Large: 1200px+

## 🔄 Development Workflow

1. Set up development environment
2. Implement design system
3. Create component library
4. Build page layouts
5. Add animations
6. Integrate content
7. Optimize performance
8. Test across devices
9. Deploy

## 📝 Notes

- All content is currently API-driven in the original site
- GSAP Business license is required for some animations
- Videos should have poster images for mobile
- Focus on performance and accessibility
- Maintain the balance between tech and human elements

---

This extracted resource folder provides everything needed to rebuild the Disruptors Media website in any modern framework while maintaining the original design vision and functionality.