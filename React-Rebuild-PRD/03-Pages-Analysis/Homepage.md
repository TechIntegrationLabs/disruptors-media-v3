# Homepage Analysis - Disruptors Media

## Page Overview

The homepage serves as the primary entry point showcasing Disruptors Media's brand, services, and portfolio. It features a modern, minimalist design with bold typography, interactive elements, and strategic use of video content to create an immersive experience.

## Complete Section Breakdown

### 1. Header/Navigation Section
**Component:** `<Header />`

**Layout:**
- Fixed/sticky positioning at top
- Full-width background
- Container-constrained content (1430px max)

**Content:**
- Logo (left-aligned): `logo.svg` or `logo-menu.png`
- Primary navigation menu (right-aligned)

**Navigation Items:**
```
- HOME
- ABOUT
- SERVICES  
- WORK
- CONTACT
- FAQ
```

**Styling:**
```css
font-family: 'PP Supply Mono'
font-size: 22px
font-weight: 400
line-height: 30px
color: #2B2B2B
text-transform: uppercase
margin: 0 16px (between items)
padding: 25px 0 (section padding)
```

### 2. Main Hero Section
**Component:** `<HeroSection />`

**Background Elements:**
- Body texture: `main-bg.jpg` (repeating)
- Embossed logo: `logo-emboss.png` (center 40px no-repeat)

**Content Structure:**
1. **Primary Headline (H1):**
   ```
   [EXACT TEXT TO BE PROVIDED - likely brand tagline]
   ```
   **Styling:**
   ```css
   font-family: 'OT Neue Montreal'
   font-size: 220.302px
   font-weight: 600
   line-height: 198.59px
   color: #2B2B2B
   text-transform: uppercase
   text-align: center
   margin-bottom: 75px
   ```

2. **Secondary Headline (H2):**
   ```
   [EXACT TEXT TO BE PROVIDED - likely service description]
   ```
   **Styling:**
   ```css
   font-family: 'OT Neue Montreal'
   font-size: 63px
   font-weight: 600
   line-height: 68.6px
   color: #2B2B2B
   text-transform: uppercase
   text-align: center
   margin-bottom: 54px
   ```

3. **Animated Separator Lines:**
   ```
   6 progressive lines with increasing thickness:
   - Line 1: height 1px, margin-bottom 18px
   - Line 2: height 2px, margin-bottom 16px
   - Line 3: height 4px, margin-bottom 14px
   - Line 4: height 7px, margin-bottom 8px
   - Line 5: height 9px, margin-bottom 11px
   - Line 6: height 10px, margin-bottom 10px
   Color: #2B2B2B
   ```

**Section Padding:** `130px 0 21px 0`

### 3. Call-to-Action Section
**Component:** `<CTAButton />`

**Content:**
```
BOOK A CALL [Arrow Icon]
```

**Layout:**
- Full-width button with flex layout
- Space-between alignment (text left, icon right)

**Styling:**
```css
background: #2B2B2B
color: #F1EDE9
font-family: 'PP Supply Mono'
font-size: 39.645px
font-weight: 400
line-height: 47.65px
text-transform: uppercase
padding: 16px 21px
```

**Assets:**
- Arrow icon: `arrow-cta.svg`

**Behavior:**
- Hover state (no color change, maintain accessibility)
- Click action: Opens contact form or booking system

### 4. Mobile/Interactive Section
**Component:** `<InteractiveSection />`

**Background:**
- Image: `mobile-sec-bg.jpg` (cover, center top)
- Video (optional): `mobile-video-bg.mp4`

**Interactive Elements:**
1. **Robot Hand (Left):**
   - Image: `hand-robot.png`
   - Position: absolute, left -57px, top 127px
   - Size: 510px × 231px

2. **Human Hand (Right):**
   - Image: `hand-human.png`
   - Position: absolute, right -92px, bottom 215px
   - Size: 578px × 235px

3. **Phone Element:**
   - Image: `phone.png` or `after-phone-sec.png`
   - Center positioned

**Content:**
```
[TEXT TO BE PROVIDED - likely about human/AI collaboration]
```

**Section Styling:**
```css
padding: 67px 0
text-align: center
position: relative
overflow: hidden
```

### 5. Who We Are Section
**Component:** `<AboutSection />`

**Section Title:**
```
WHO WE ARE
```

**Content:**
```
[PARAGRAPH TEXT TO BE PROVIDED]
[Each sentence may be wrapped in <span> for special formatting]
```

**Styling:**
```css
font-family: 'PP Supply Mono'
font-size: 22px
font-weight: 400
line-height: 30px
color: #2B2B2B
text-transform: uppercase
text-align: left
margin-bottom: 30px
padding: 20px 0 40px 0
```

### 6. What We Do Section
**Component:** `<ServicesSlider />`

**Section Title:**
```
WHAT WE DO
```

**Slider Configuration:**
- Slide dimensions: 752px × 930px
- Background: `what-we-do-bx.png` per slide
- Horizontal scrolling slider
- Slide padding: 111px
- Content positioned absolutely at bottom (105px from bottom)

**Slide Content Structure:**
Each slide contains:
1. **Service Title (H3):**
   ```css
   font-family: 'OT Neue Montreal'
   font-size: 65px
   font-weight: 600
   line-height: 68.6px
   color: #F1EDE9
   text-transform: uppercase
   margin-bottom: 15px
   ```

2. **Service Description:**
   ```css
   font-family: 'PP Supply Mono'
   font-size: 20px
   font-weight: 400
   line-height: 28px
   color: #F1EDE9
   text-align: justify
   text-transform: none
   ```

**Service Categories (Slides):**
1. Creative Strategy
2. Brand Development
3. Web Development
4. Digital Marketing
5. Video Production
6. [Additional services]

**Assets:**
- Background frames: `what-we-do-abt-1.png`, `what-we-do-abt-2.png`, `what-we-do-abt-3.png`
- Frame decoration: `what-we-do-frame.png`

### 7. Featured Clients Section
**Component:** `<ClientsSection />`

**Section Title:**
```
FEATURED CLIENTS
```

**Layout:**
- Dark background container (#2B2B2B)
- Logo grid layout
- Multiple rows with consistent spacing

**Container Styling:**
```css
background: #2B2B2B
padding: 70px 170px
```

**Logo Grid:**
```css
margin-bottom: 86px (between rows)
```

**Client Logos:**
- `client-1.png`
- `client-2.png` 
- `gold-logo-banner.png`
- Additional client logos from admin panel

### 8. Featured Quote Section
**Component:** `<FeaturedQuote />`

**Content Structure:**
1. **Quote Heading (H3):**
   ```
   [FEATURED QUOTE TITLE]
   ```
   **Styling:**
   ```css
   font-family: 'OT Neue Montreal'
   font-size: 65px
   font-weight: 600
   line-height: 58.594px
   color: #2B2B2B
   text-transform: uppercase
   ```

2. **Quote Text:**
   ```
   [QUOTE CONTENT - max 393px width]
   ```
   **Styling:**
   ```css
   font-family: 'PP Supply Mono'
   font-size: 20px
   font-weight: 400
   line-height: 28px
   color: #2B2B2B
   text-align: justify
   max-width: 393px
   margin-bottom: 40px
   ```

3. **Animated Separators:** (Same as hero section)

**Layout:** Right-aligned content using flexbox

**Section Padding:** `60px 0 40px 0`

### 9. Work Portfolio Section
**Component:** `<WorkGrid />`

**Layout:**
- 2-column grid system
- 50/50 split with border separator
- Minimum height: 914px per column

**Grid Styling:**
```css
.col-sm-6:nth-child(odd) { padding-right: 0px; }
.col-sm-6:nth-child(even) { 
  border-left: 1px solid #000;
  padding-left: 0px;
}
```

**Work Items:**
Each item contains:
1. **Featured Image:**
   - `work-1.jpg` through `work-6.jpg`
   - `case-study-1.jpg` through `case-study-7.jpg`

2. **Project Title (H3):**
   ```css
   font-family: 'OT Neue Montreal'
   font-size: 39px
   font-weight: 600
   color: #2B2B2B
   text-transform: uppercase
   ```

3. **Project Category:**
   ```css
   font-family: 'PP Supply Mono'
   font-size: 16px
   font-weight: 400
   line-height: 30px
   color: #2B2B2B
   text-transform: uppercase
   margin-bottom: 0px
   ```

**Content Padding:** `20px 30px 110px 30px`

### 10. Video Gallery Section
**Component:** `<VideoGallery />`

**Video Assets:**
- `gallery-1.mp4`
- `gallery-2.mp4`
- `gallery-bg.mp4` (background video)

**Interactive Elements:**
- Play controls: `play-icon.png`, `pause-icon.png`
- Mute control: `mute-icon.png`
- Gallery frame: `gallery-frame.png`

### 11. Pre-Footer Navigation
**Component:** `<PreFooter />`

**Navigation Links:**
```
- PRIVACY POLICY
- TERMS OF SERVICE
- CAREERS
- PRESS
- [Additional links]
```

**Styling:**
```css
font-family: 'PP Supply Mono'
font-size: 20px
font-weight: 400
line-height: 28px
color: #2B2B2B
text-transform: uppercase
display: inline-block
margin: 0 16px
```

**Section:** `padding: 40px 0, text-align: center`

### 12. Footer Section
**Component:** `<Footer />`

**Background Elements:**
- Main texture: `main-bg.jpg`
- Embossed logo: `logo-emboss.png` (center 40px no-repeat)

**Content:**
1. **Copyright Information:**
   ```
   © 2024 DISRUPTORS MEDIA. ALL RIGHTS RESERVED.
   ```

2. **Contact Information:**
   ```
   HELLO@DISRUPTORSMEDIA.COM
   +1 (XXX) XXX-XXXX
   [ADDRESS]
   ```

3. **Social Media Icons:**
   - Facebook: `fb.svg`
   - Instagram: `insta.svg`
   - Twitter: `twitter.svg`
   - YouTube: `youtube.svg`
   - Margin: `0 13px` between icons

**Text Styling:**
```css
font-family: 'PP Supply Mono'
font-size: 16px
font-weight: 400
color: #2B2B2B
text-transform: uppercase
line-height: 1.8
```

**Section Padding:** `160px 30px 40px 30px`

## Interactive Behaviors

### 1. Video Controls
- Auto-play background videos (muted)
- Click-to-play for featured videos
- Custom video controls with brand styling

### 2. Slider Navigation
- Horizontal scroll for "What We Do" section
- Touch/swipe gestures on mobile
- Navigation arrows or dots

### 3. Hover States
- Subtle animations on interactive elements
- No color changes (accessibility focused)
- Scale or opacity transitions

### 4. Mobile Responsiveness
- Typography scaling for mobile devices
- Stacked layouts for mobile
- Touch-optimized interaction areas

## Content Requirements

### Text Content Needed:
1. Main hero headline and subheadline
2. Who We Are section paragraph
3. What We Do service descriptions (per slide)
4. Featured quote content
5. Work portfolio project titles and categories
6. Footer contact information
7. All navigation labels

### Media Assets Required:
- All images mentioned above
- Video files for background and gallery
- Social media icons
- Logo files in various formats
- Background textures and patterns

## SEO Considerations

### Meta Tags:
- Page title: "Disruptors Media - [Brand Tagline]"
- Meta description: Service overview and value proposition
- Open Graph tags for social sharing
- Structured data for business information

### Semantic HTML:
- Proper heading hierarchy (H1, H2, H3)
- Semantic sectioning elements
- Alt tags for all images
- ARIA labels for interactive elements

## Performance Optimizations

### Image Optimization:
- WebP format with fallbacks
- Responsive image sizes
- Lazy loading for below-fold content
- Optimized file sizes

### Video Optimization:
- Multiple format support (MP4, WebM)
- Compressed file sizes
- Poster images for video elements
- Progressive loading