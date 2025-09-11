# 🎯 GSAP Master MCP Server Documentation

## Overview

The GSAP Master MCP Server is a comprehensive animation toolkit that transforms Claude into a surgical precision animation expert. It provides AI-powered intent analysis, complete GSAP API coverage, and production-ready animation patterns.

**Created by:** @bruzethegreat  
**Version:** 2.2.0  
**License:** MIT  

> 🎉 **ALL GSAP PLUGINS NOW 100% FREE** thanks to Webflow! Including SplitText, MorphSVG, DrawSVG, and more!

## Installation and Configuration

### Local Installation (Current Setup)

The server is installed locally at:
```
/Users/disruptors/Documents/ProjectsD/DisruptorEcosystem/DM3/disruptors-media-v3/gsap-master-mcp-server/
```

### MCP Configuration

The server is configured in `/Users/disruptors/.cursor/mcp.json`:

```json
{
  "gsap-master": {
    "command": "node",
    "args": [
      "/Users/disruptors/Documents/ProjectsD/DisruptorEcosystem/DM3/disruptors-media-v3/gsap-master-mcp-server/dist/index.js"
    ],
    "env": {
      "NODE_ENV": "production",
      "MCP_MODE": "stdio"
    }
  }
}
```

### Alternative NPX Installation

You can also install globally via NPX:
```bash
claude mcp add-json gsap-master '{"command":"npx","args":["bruzethegreat-gsap-master-mcp-server@latest"]}'
```

## Available Tools

The GSAP MCP Server provides 6 powerful tools for animation development:

### 1. 🧠 AI Animation Creator (`understand_and_create_animation`)

**Purpose:** Transform natural language descriptions into production-ready GSAP animations.

**Examples:**
- *"Fade in portfolio cards one by one when scrolling"*
- *"Create a hero title that reveals character by character"*
- *"Build smooth hover effects for navigation"*

**Features:**
- Advanced intent analysis
- Framework-specific code (React, Vue, Vanilla JS)
- Mobile-optimized by default
- 60fps performance guaranteed

### 2. 📚 GSAP API Expert (`get_gsap_api_expert`)

**Purpose:** Complete documentation and examples for every GSAP feature.

**Covers:**
- Core methods (gsap.to, timeline, etc.)
- All plugins (ScrollTrigger, SplitText, DrawSVG, MorphSVG, Draggable)
- Performance tips and best practices
- Advanced examples and use cases

### 3. 🛠️ Complete Setup Generator (`generate_complete_setup`)

**Purpose:** One-command environment setup for various frameworks.

**Supported Frameworks:**
- React, Next.js
- Vue, Nuxt
- Svelte
- Vanilla JavaScript

**Includes:**
- All plugins and dependencies
- Performance configurations
- Starter code and patterns

### 4. 🔧 Expert Debugger (`debug_animation_issue`)

**Purpose:** AI-powered troubleshooting for animation problems.

**Troubleshoots:**
- Performance issues (lag, stuttering)
- Mobile compatibility problems
- ScrollTrigger positioning issues
- Timeline sequencing problems
- Plugin registration errors

### 5. ⚡ Performance Optimizer (`optimize_for_performance`)

**Purpose:** Transform animations for maximum smoothness and efficiency.

**Optimizations:**
- 60fps desktop optimization
- Mobile-smooth variants
- Battery-efficient versions
- Memory leak prevention

### 6. 🎨 Production Patterns (`create_production_pattern`)

**Purpose:** Battle-tested animation systems for common use cases.

**Patterns Available:**
- Hero sections with layered animations
- Complete scroll systems
- Advanced text effects
- Interactive UI components
- Loading sequences
- Page transitions

## GSAP Features Covered

### Core Animation Methods
- `gsap.to()` - Animate TO specified values
- `gsap.from()` - Animate FROM specified values
- `gsap.fromTo()` - Animate FROM/TO with full control
- `gsap.set()` - Immediately set properties
- `gsap.timeline()` - Create animation sequences
- `gsap.delayedCall()` - Execute functions with timing

### Plugin System (All FREE)
- **ScrollTrigger** - Scroll-based animations
- **SplitText** - Text character/word/line splitting
- **DrawSVG** - SVG path drawing animations
- **MorphSVG** - Shape morphing animations
- **Draggable** - Drag and drop interactions
- **MotionPath** - Animate along custom paths
- **TextPlugin** - Text content animations

### Animation Properties
- Transform properties (x, y, z, rotation, scale)
- CSS properties (backgroundColor, borderRadius, etc.)
- Special properties (autoAlpha, transformOrigin)
- Performance optimizations (force3D, will-change)

## Usage Examples

### Basic Animation Creation
```javascript
// Request: "Create a smooth fade-in animation for cards"
gsap.from(".cards", {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});
```

### Scroll-Based Animation
```javascript
// Request: "Create parallax hero section"
gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero-bg", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
```

### Text Animation
```javascript
// Request: "Character-by-character text reveal"
gsap.registerPlugin(SplitText);

const split = new SplitText(".title", { type: "chars" });
gsap.from(split.chars, {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.05,
  ease: "power3.out"
});
```

## Performance Best Practices

### GPU Acceleration
- Use transform properties (x, y, scale, rotation) instead of CSS left/top
- Set `force3D: true` for complex animations
- Add `will-change: transform` CSS property

### Mobile Optimization
- Reduce stagger delays on mobile
- Use `reduced-motion` media queries
- Implement battery-efficient alternatives

### Memory Management
- Kill animations with `.kill()`
- Clear timeline references
- Use `ScrollTrigger.refresh()` after DOM changes

## Integration with Project

### React Integration
```javascript
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedComponent = () => {
  const elementRef = useRef();

  useEffect(() => {
    gsap.from(elementRef.current, {
      opacity: 0,
      y: 50,
      duration: 1
    });
  }, []);

  return <div ref={elementRef}>Animated content</div>;
};
```

### Framework-Agnostic Setup
```javascript
// Register all plugins
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVG);

// Set global defaults
gsap.defaults({
  duration: 1,
  ease: "power3.out"
});

// Configure ScrollTrigger
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});
```

## Troubleshooting

### Common Issues

1. **Animation not working on mobile**
   - Check if reduced-motion is enabled
   - Verify touch events are properly handled
   - Test on actual devices, not just browser dev tools

2. **ScrollTrigger positioning incorrect**
   - Call `ScrollTrigger.refresh()` after DOM changes
   - Ensure trigger elements are properly sized
   - Check for CSS transforms on parent elements

3. **Performance issues**
   - Use `transform` properties instead of CSS positioning
   - Enable GPU acceleration with `force3D: true`
   - Reduce complexity on lower-end devices

### Debug Commands
```javascript
// Enable debug mode for ScrollTrigger
ScrollTrigger.saveStyles(".animated-element");

// Log animation progress
gsap.to(".element", {
  x: 100,
  onUpdate: function() {
    console.log("Progress:", this.progress());
  }
});
```

## Advanced Techniques

### Custom Easing
```javascript
// Create custom ease curves
const customEase = CustomEase.create("custom", "M0,0 C0.14,0 0.242,0.438 0.272,0.561");
gsap.to(".element", { x: 100, ease: customEase });
```

### Timeline Positioning
```javascript
const tl = gsap.timeline();
tl.to(".first", { x: 100 })
  .to(".second", { y: 100 }, "-=0.5") // Start 0.5s before previous ends
  .to(".third", { scale: 1.2 }, "+=0.2"); // Start 0.2s after previous ends
```

### Responsive Animations
```javascript
ScrollTrigger.matchMedia({
  "(min-width: 768px)": function() {
    // Desktop animations
    gsap.to(".element", { x: 200, duration: 2 });
  },
  "(max-width: 767px)": function() {
    // Mobile animations
    gsap.to(".element", { x: 100, duration: 1 });
  }
});
```

## Resources and Learning

### Official Documentation
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Learning Center](https://greensock.com/learning/)

### Community Resources
- [GSAP Forums](https://greensock.com/forums/)
- [CodePen GSAP Collection](https://codepen.io/collection/AEbkno)
- [YouTube Tutorials](https://www.youtube.com/user/GreenSockLearning)

### Project-Specific Implementation
- Check `src/components/animations/` for existing animation components
- Review `src/hooks/useScrollAnimations.ts` for scroll-based patterns
- See `FUTURISTIC_ANIMATION_STRATEGY.md` for project animation guidelines

## Maintenance and Updates

### Updating the Server
```bash
cd /Users/disruptors/Documents/ProjectsD/DisruptorEcosystem/DM3/disruptors-media-v3/gsap-master-mcp-server
npm update
npm run build
```

### Testing Changes
```bash
# Test the server locally
npm run dev

# Run any available tests
npm test
```

### Version Management
- Current version: 2.2.0
- Check for updates regularly on NPM
- Review changelog for breaking changes

## Support and Contribution

### Getting Help
- GitHub Issues: [gsap-master-mcp-server issues](https://github.com/bruzethegreat/gsap-master-mcp-server/issues)
- Feature requests welcome
- Community contributions encouraged

### Local Development
```bash
# Clone and setup for development
git clone [repository-url]
cd gsap-master-mcp-server
npm install
npm run dev
```

---

**Note:** This server provides comprehensive GSAP animation capabilities directly within Claude, making it easier to create professional animations with natural language descriptions and AI-powered optimization.