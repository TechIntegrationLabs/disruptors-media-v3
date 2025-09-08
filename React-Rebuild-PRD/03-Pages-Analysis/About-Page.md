# About Page Analysis - Disruptors Media

## Page Overview

The About page provides detailed information about Disruptors Media's story, mission, and team. It features a modified layout from the homepage with specific styling for about content and video integration.

## Complete Section Breakdown

### 1. Header/Navigation Section
**Component:** `<Header />` (Same as homepage)

**Styling:** Consistent with homepage navigation

### 2. About Hero Section
**Component:** `<AboutHero />`

**CSS Class:** `.main-sec.abt`

**Modifications from Homepage Hero:**
```css
padding-top: 186px; /* Increased from 130px */
```

**Content Structure:**

1. **Page Title (H1):**
   ```
   ABOUT
   ```
   **Styling:** Same as homepage H1
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

2. **About Subtitle (H2):**
   ```
   [ABOUT SUBTITLE - MISSION STATEMENT OR BRAND STORY]
   ```
   **Custom Styling for About Page:**
   ```css
   font-family: 'OT Neue Montreal'
   font-size: 63px
   font-weight: 600
   line-height: 68.6px
   color: #2B2B2B
   text-transform: uppercase
   text-align: center
   margin-left: auto
   margin-right: auto
   max-width: 894px
   margin-bottom: 70px
   ```

**Background Elements:**
- Body texture: `main-bg.jpg` (repeating)
- Embossed logo: `logo-emboss.png` (center positioned)

### 3. About Content Section
**Component:** `<AboutContent />`

**Content Structure:**

1. **Introduction Paragraph:**
   ```
   [COMPANY INTRODUCTION - DETAILED BRAND STORY]
   ```
   **Styling:**
   ```css
   font-family: 'PP Supply Mono'
   font-size: 20px
   font-weight: 400
   line-height: 28px
   color: #2B2B2B
   text-align: justify
   margin-bottom: 80px
   ```

2. **Key Sections:**
   - Our Story
   - Our Mission
   - Our Values
   - Our Approach

**Section Spacing:** Each content block with appropriate margins

### 4. About Video Section
**Component:** `<AboutVideo />`

**Video Assets:**
- Main video: `dm-abt.mp4`
- Video poster: `poster-abt.jpg`

**Video Controls:**
- Play/pause functionality
- Custom branded video player
- Full-width or contained video layout

**Interactive Elements:**
- Play button overlay: `play-ico.png`
- Custom video controls with brand styling

### 5. Team/Company Information
**Component:** `<CompanyInfo />`

**Content Structure:**

1. **Company Statistics:**
   ```
   [YEARS OF EXPERIENCE]
   [NUMBER OF PROJECTS COMPLETED]
   [CLIENT SATISFACTION RATE]
   [TEAM SIZE]
   ```

2. **Service Areas:**
   ```
   [LIST OF PRIMARY SERVICE OFFERINGS]
   ```

**Styling:**
- Consistent with brand typography
- Proper hierarchy and spacing

### 6. What We Do Section (Modified for About)
**Component:** `<AboutServices />`

**Layout:** Similar to homepage but with about-specific content

**Content Focus:**
- How we approach projects
- Our methodology
- Client collaboration process
- Quality standards

### 7. Values/Philosophy Section
**Component:** `<ValuesSection />`

**Background:** May use `#CAC1B8` background color

**Content Structure:**
```
OUR PHILOSOPHY
[Detailed explanation of company philosophy and approach]

OUR VALUES
[List of core company values with descriptions]
```

**Styling:**
```css
font-family: 'PP Supply Mono'
font-size: 20px
font-weight: 400
line-height: 28px
color: #000 (on colored background)
text-align: justify
```

### 8. Client Approach Section
**Component:** `<ClientApproach />`

**Content:**
```
HOW WE WORK WITH CLIENTS
[Detailed process explanation]

OUR PROCESS
1. Discovery & Strategy
2. Design & Development  
3. Implementation
4. Launch & Support
```

### 9. Awards/Recognition Section (If Applicable)
**Component:** `<Awards />`

**Content:**
- Industry awards
- Certifications
- Recognition badges
- Client testimonials

### 10. Contact CTA Section
**Component:** `<AboutCTA />`

**Content:**
```
READY TO WORK TOGETHER?
[Call-to-action text encouraging contact]
[Button: "GET IN TOUCH" or "START A PROJECT"]
```

**Button Styling:** Same as homepage CTA button

### 11. Footer Section
**Component:** `<Footer />` (Same as homepage)

## About-Specific Content Requirements

### Text Content Needed:

1. **Hero Section:**
   - Main "ABOUT" title (already defined)
   - Subtitle/mission statement (max-width: 894px)

2. **Introduction Content:**
   - Company founding story
   - Mission and vision statements
   - What makes the company unique

3. **Company Information:**
   - Years in business
   - Number of successful projects
   - Client satisfaction metrics
   - Team size and expertise

4. **Philosophy Content:**
   - Core values and principles
   - Approach to client work
   - Quality standards
   - Innovation philosophy

5. **Process Information:**
   - Step-by-step client process
   - Timeline expectations
   - Collaboration methods
   - Deliverable standards

### Media Assets Required:

1. **Videos:**
   - `dm-abt.mp4` (main about video)
   - `poster-abt.jpg` (video thumbnail)

2. **Images:**
   - Team photos (if applicable)
   - Office/studio images
   - Behind-the-scenes content
   - Process visualization images

3. **Background Elements:**
   - Same textured background as homepage
   - Embossed logo pattern
   - Section background colors

## Page-Specific Styling

### Modified Hero Section:
```css
.main-sec.abt {
    padding-top: 186px; /* Increased padding */
}

.main-sec.abt h2 {
    margin-left: auto;
    margin-right: auto;
    max-width: 894px;
    margin-bottom: 70px;
}
```

### Content Paragraphs:
```css
.main-sec p {
    color: #2B2B2B;
    text-align: justify;
    font-family: 'PP Supply Mono';
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 80px;
}
```

## Interactive Elements

### 1. Video Player
- Custom video controls matching brand design
- Play/pause functionality
- Volume controls
- Full-screen capabilities
- Progress bar with brand colors

### 2. Content Animations
- Fade-in animations for content sections
- Scroll-triggered animations
- Smooth transitions between sections

### 3. Image Galleries
- If team photos or office images are included
- Lightbox functionality for larger images
- Touch/swipe gestures for mobile

## Responsive Behavior

### Mobile Adaptations:
- Hero title scales down appropriately
- Video becomes mobile-optimized
- Content blocks stack vertically
- Reduced padding and margins
- Touch-optimized video controls

### Tablet Adaptations:
- Proportional scaling of elements
- Maintained readability
- Adjusted video player size

## SEO Considerations

### Meta Tags:
- Page title: "About - Disruptors Media"
- Meta description: Company overview and unique value proposition
- Open Graph tags for social sharing
- Schema markup for organization information

### Content Structure:
- Proper heading hierarchy
- Descriptive alt tags for images
- Video transcripts for accessibility
- Internal linking to relevant service pages

## Content Guidelines

### Tone and Voice:
- Professional but approachable
- Confident and authoritative
- Innovative and forward-thinking
- Client-focused language

### Key Messages:
- Company expertise and experience
- Unique approach to client work
- Quality and innovation focus
- Results-driven philosophy
- Collaborative partnership approach

### Content Length:
- Introduction paragraph: 150-200 words
- Each section: 100-150 words
- Process descriptions: Bullet points or numbered lists
- Mission/vision: Concise, impactful statements

## Technical Requirements

### Performance:
- Optimized video loading
- Compressed images
- Lazy loading for below-fold content
- Fast page load times

### Accessibility:
- Video captions/subtitles
- Alt tags for all images
- Proper focus management
- Screen reader compatibility
- Keyboard navigation support