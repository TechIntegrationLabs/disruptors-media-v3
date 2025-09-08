# Services Page Analysis - Disruptors Media

## Page Overview

The Services page details Disruptors Media's service offerings with an interactive accordion-style layout and rich visual content. It features a unique layout with colored background sections and detailed service descriptions.

## Complete Section Breakdown

### 1. Header/Navigation Section
**Component:** `<Header />` (Same as homepage)

### 2. Services Hero Section
**Component:** `<ServicesHero />`

**CSS Classes:** `.main-sec.srv`

**Hero Modifications:**
```css
background: transparent; /* No embossed logo */
padding-bottom: 110px;
```

**Content Structure:**

1. **Page Title (H1):**
   ```
   SERVICES
   ```
   **Custom Styling for Services:**
   ```css
   font-family: 'OT Neue Montreal'
   font-size: 220.302px
   font-weight: 600
   line-height: 198.59px
   color: #2B2B2B
   text-transform: uppercase
   text-align: left /* Left-aligned instead of center */
   margin-bottom: 114px
   ```

2. **Services Introduction:**
   ```
   [SERVICES OVERVIEW PARAGRAPH - DETAILED DESCRIPTION OF CAPABILITIES]
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

### 3. Services Detail Section
**Component:** `<ServicesDetail />`

**CSS Classes:** `.srv-what-we-do`

**Layout:**
- Colored background container
- Full-width content area with padding

**Container Styling:**
```css
background: #CAC1B8; /* Warm beige background */
padding: 60px 30px;
```

**Content Structure:**

1. **Section Header (H2):**
   ```
   WHAT WE DO
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
   margin-bottom: 50px
   ```

2. **Services Description:**
   ```
   [DETAILED OVERVIEW OF SERVICE APPROACH AND METHODOLOGY]
   ```
   **Styling:**
   ```css
   font-family: 'PP Supply Mono'
   font-size: 20px
   font-weight: 400
   line-height: 28px
   color: #000; /* Black text on colored background */
   ```

### 4. Interactive Services Accordion
**Component:** `<ServicesAccordion />`

**CSS Classes:** `.accordion-section`, `.accordion-title`, `.accordion-content`

**JavaScript Functionality:**
```javascript
$('.accordion-content').hide(); // Initially hidden
$('.accordion-title .toggle-sign').addClass('plus'); // Plus icons

$('.accordion-title').click(function() {
  var $content = $(this).next('.accordion-content');
  var $sign = $(this).find('.toggle-sign');
  
  $content.slideToggle(function() {
    $sign.toggleClass('plus minus');
  });
});
```

**Accordion Item Structure:**

Each service contains:

1. **Service Title:**
   ```css
   font-family: 'OT Neue Montreal'
   font-size: 39px
   font-weight: 600
   color: #2B2B2B
   text-transform: uppercase
   cursor: pointer
   ```

2. **Service Subtitle:**
   ```css
   font-family: 'PP Supply Mono'
   font-size: 20px
   font-weight: 400
   line-height: 28px
   color: #2B2B2B
   display: block
   ```

3. **Toggle Icon:**
   ```css
   width: 39px
   height: 39px
   background: #2b2b2b
   border-radius: 50%
   font-size: 23px
   float: right
   display: flex
   align-items: center
   justify-content: center
   color: #fff
   ```
   - **Plus State:** `background: url('../images/plus-icon.png') no-repeat center center #2b2b2b`
   - **Minus State:** `background: url('../images/minus-icon.png') no-repeat center center #2b2b2b`

4. **Expandable Content:**
   ```css
   display: none; /* Initially hidden */
   padding-top: 20px
   ```

**Service Categories:**

### Service 1: Creative Strategy
**Title:** `CREATIVE STRATEGY`
**Subtitle:** `Brand Positioning & Creative Direction`
**Content:**
```
[Detailed description of creative strategy services including:
- Brand positioning and messaging
- Creative direction and concept development
- Campaign strategy and planning
- Market research and competitive analysis]
```

### Service 2: Brand Development
**Title:** `BRAND DEVELOPMENT`  
**Subtitle:** `Logo Design, Identity Systems & Guidelines`
**Content:**
```
[Detailed description of brand development services including:
- Logo design and brand mark creation
- Complete identity system development
- Brand guidelines and style guides
- Brand application across touchpoints]
```

### Service 3: Web Development
**Title:** `WEB DEVELOPMENT`
**Subtitle:** `Custom Websites & Digital Experiences`
**Content:**
```
[Detailed description of web development services including:
- Custom website design and development
- E-commerce solutions
- Content management systems
- Mobile-responsive design
- Performance optimization]
```

### Service 4: Digital Marketing
**Title:** `DIGITAL MARKETING`
**Subtitle:** `SEO, PPC, Social Media & Content Marketing`
**Content:**
```
[Detailed description of digital marketing services including:
- Search engine optimization
- Pay-per-click advertising
- Social media marketing
- Content marketing strategy
- Analytics and reporting]
```

### Service 5: Video Production
**Title:** `VIDEO PRODUCTION`
**Subtitle:** `Commercial Videos, Documentaries & Animation`
**Content:**
```
[Detailed description of video production services including:
- Commercial video production
- Documentary filmmaking
- Animation and motion graphics
- Post-production and editing
- Video marketing strategy]
```

### Service 6: Photography
**Title:** `PHOTOGRAPHY`
**Subtitle:** `Commercial Photography & Product Shoots`
**Content:**
```
[Detailed description of photography services including:
- Commercial photography
- Product photography
- Lifestyle and portrait photography
- Event photography
- Photo editing and retouching]
```

**Individual Item Styling:**
```css
.accordion-section {
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #000;
}
```

### 5. Services Image/Visual Section
**Component:** `<ServicesVisual />`

**Featured Image:** `services-img.png`

**Layout:** Full-width or contained image showcasing services in action

### 6. Process Section
**Component:** `<ProcessSection />`

**Content Structure:**
```
OUR PROCESS

1. DISCOVERY
   [Process step description]

2. STRATEGY
   [Process step description]

3. DESIGN
   [Process step description]

4. DEVELOPMENT
   [Process step description]

5. LAUNCH
   [Process step description]

6. SUPPORT
   [Process step description]
```

### 7. Service Areas/Capabilities
**Component:** `<ServiceCapabilities />`

**Content:**
- Industry expertise
- Technical capabilities
- Team specializations
- Geographic service areas

### 8. Call-to-Action Section
**Component:** `<ServicesCTA />`

**Content:**
```
READY TO GET STARTED?
[Description of next steps and consultation process]
[Button: "SCHEDULE CONSULTATION" or "GET A QUOTE"]
```

**Button Styling:** Same as homepage CTA

### 9. Footer Section
**Component:** `<Footer />` (Same as homepage)

## Interactive Behavior

### Accordion Functionality:
1. **Initial State:** All sections collapsed with plus icons
2. **Click Action:** Smooth slide animation to expand/collapse
3. **Icon Toggle:** Plus changes to minus and vice versa
4. **Multiple Sections:** Can have multiple sections open simultaneously
5. **Smooth Transitions:** jQuery slideToggle animation

### Responsive Behavior:
- Accordion maintains full functionality on all devices
- Touch-optimized for mobile interaction
- Proper spacing and sizing for tablet/mobile

## Assets Required

### Images:
- `services-img.png` (main services visual)
- `plus-icon.png` (accordion closed state)
- `minus-icon.png` (accordion open state)
- Background texture: `main-bg.jpg`
- Additional service-related imagery

### Interactive Elements:
- Smooth CSS transitions
- Hover states for accordion titles
- Focus states for accessibility

## Content Requirements

### Text Content Needed:

1. **Hero Section:**
   - "SERVICES" title (already defined)
   - Services overview paragraph (justify-aligned, ~150-200 words)

2. **Services Detail Section:**
   - "WHAT WE DO" header
   - Methodology and approach description

3. **Each Accordion Item:**
   - Service title (uppercase)
   - Service subtitle/tagline
   - Detailed service description (150-300 words each)
   - Specific deliverables or capabilities

4. **Process Section:**
   - Step-by-step process breakdown
   - Description for each process step

5. **CTA Section:**
   - Compelling call-to-action copy
   - Next steps description

### Service Descriptions Should Include:
- What the service entails
- Key deliverables
- Typical project timeline
- Technologies or methods used
- Target client types
- Expected outcomes

## SEO Considerations

### Meta Tags:
- Page title: "Services - Disruptors Media"
- Meta description: Overview of all services offered
- Service-specific schema markup
- Open Graph tags for social sharing

### Content Structure:
- Proper heading hierarchy (H1, H2, H3)
- Service-specific keywords
- Internal linking to portfolio examples
- FAQ integration for service questions

## Technical Implementation

### Accordion Component:
```jsx
const ServicesAccordion = () => {
  const [openItems, setOpenItems] = useState([]);
  
  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };
  
  return (
    // Accordion implementation with smooth animations
  );
};
```

### Animation Requirements:
- Smooth slide transitions (similar to jQuery slideToggle)
- Icon rotation/transformation
- Proper accessibility support (ARIA attributes)
- Focus management for keyboard navigation

## Accessibility Requirements

### ARIA Support:
- `aria-expanded` for accordion buttons
- `aria-controls` linking buttons to content
- `role="button"` for click targets
- Proper focus management

### Keyboard Navigation:
- Tab navigation through accordion items
- Enter/Space to activate toggles
- Focus indicators clearly visible

## Performance Considerations

### Loading:
- Lazy load accordion content
- Optimize images for web
- Minimize JavaScript bundle size
- Fast accordion animations (60fps)