# Header Navigation Component - Disruptors Media

## Component Overview

The Header Navigation component is a fixed-position navigation bar that provides consistent site navigation across all pages. It features a clean, minimalist design with the brand logo and primary navigation menu.

## Visual Specifications

### Layout Structure
```
[LOGO]                           [NAV MENU ITEMS]
```

### Container Specifications
```css
.header {
    padding: 25px 0;
    background: transparent; /* No background color */
    position: relative; /* Can be made sticky/fixed */
    width: 100%;
    z-index: 1000;
}
```

### Logo Specifications
**Position:** Left-aligned within container
**Assets:** 
- Primary: `logo.svg`
- Alternative: `logo-menu.png`
- Mobile version: `mobile-menu-logo.png`

**Styling:**
```css
.header .logo {
    display: inline-block;
    height: auto;
    max-height: 40px; /* Adjust based on actual logo */
}
```

### Navigation Menu Specifications
**Position:** Right-aligned within container
**Layout:** Horizontal inline-block list

```css
.header .navigation {
    display: inline-block;
    float: right;
}

.header .navigation li {
    display: inline-block;
    color: #2B2B2B;
    text-align: center;
    font-family: 'PP Supply Mono';
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    text-transform: uppercase;
    margin: 0 16px;
}

.header .navigation li a {
    color: #2B2B2B;
    text-decoration: none;
    transition: color 0.3s ease-out;
}
```

## Navigation Items

### Primary Navigation Menu
1. **HOME** - `/`
2. **ABOUT** - `/about`
3. **SERVICES** - `/services`
4. **WORK** - `/work`
5. **CONTACT** - `/contact`
6. **FAQ** - `/faq`

### Link States
```css
/* Default state */
.navigation li a {
    color: #2B2B2B;
    position: relative;
}

/* Hover state */
.navigation li a:hover {
    color: #2B2B2B; /* No color change for accessibility */
}

/* Active/Current page state */
.navigation li a.active {
    color: #2B2B2B;
    font-weight: 600;
}

/* Optional underline hover effect */
.navigation li a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #2B2B2B;
    transition: width 0.3s ease-out;
}

.navigation li a:hover::after {
    width: 100%;
}
```

## React Component Implementation

### Basic Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'SERVICES', path: '/services' },
    { label: 'WORK', path: '/work' },
    { label: 'CONTACT', path: '/contact' },
    { label: 'FAQ', path: '/faq' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <img 
              src="/images/logo.svg" 
              alt="Disruptors Media" 
              className="logo-image"
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="navigation desktop-nav">
              <ul>
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.path}
                      className={location.pathname === item.path ? 'active' : ''}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <nav className={`navigation mobile-nav ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
```

## Mobile Navigation

### Mobile Menu Toggle
```css
.mobile-menu-toggle {
    background: none;
    border: none;
    padding: 10px;
    cursor: pointer;
    display: none;
}

@media (max-width: 767px) {
    .mobile-menu-toggle {
        display: block;
    }
    
    .desktop-nav {
        display: none;
    }
}
```

### Hamburger Icon
```css
.hamburger {
    position: relative;
    width: 30px;
    height: 20px;
    display: block;
}

.hamburger span {
    position: absolute;
    width: 100%;
    height: 2px;
    background: #2B2B2B;
    transition: all 0.3s ease;
}

.hamburger span:nth-child(1) { top: 0; }
.hamburger span:nth-child(2) { top: 50%; transform: translateY(-50%); }
.hamburger span:nth-child(3) { bottom: 0; }

/* Open state */
.hamburger.open span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
    opacity: 0;
}

.hamburger.open span:nth-child(3) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
}
```

### Mobile Menu Overlay
```css
.mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #F1EDE9;
    transform: translateX(-100%);
    transition: transform 0.4s ease-in-out;
    z-index: 999;
    padding-top: 100px;
}

.mobile-nav.open {
    transform: translateX(0);
}

.mobile-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
}

.mobile-nav li {
    margin: 20px 0;
}

.mobile-nav a {
    font-family: 'PP Supply Mono';
    font-size: 24px;
    font-weight: 400;
    text-transform: uppercase;
    color: #2B2B2B;
    text-decoration: none;
    display: block;
    padding: 15px;
    transition: background-color 0.3s ease;
}

.mobile-nav a:hover,
.mobile-nav a.active {
    background-color: rgba(43, 43, 43, 0.1);
}
```

## Responsive Behavior

### Breakpoints
- **Desktop:** 768px and above
- **Mobile:** 767px and below

### Desktop Layout (768px+)
```css
@media (min-width: 768px) {
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .navigation ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .navigation li {
        margin: 0 16px;
    }
}
```

### Mobile Layout (767px and below)
```css
@media (max-width: 767px) {
    .header {
        padding: 20px 0;
    }
    
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .logo-image {
        max-height: 35px;
    }
}
```

## Accessibility Features

### ARIA Labels
```jsx
<button 
  className="mobile-menu-toggle"
  onClick={toggleMenu}
  aria-label="Toggle navigation menu"
  aria-expanded={isMenuOpen}
  aria-controls="mobile-navigation"
>
```

### Keyboard Navigation
```jsx
const handleKeyDown = (event, action) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    action();
  }
};
```

### Focus Management
```css
.navigation a:focus {
    outline: 2px solid #2B2B2B;
    outline-offset: 2px;
}

.mobile-menu-toggle:focus {
    outline: 2px solid #2B2B2B;
    outline-offset: 2px;
}
```

## Performance Considerations

### Logo Optimization
```jsx
// Lazy load logo if needed
const [logoLoaded, setLogoLoaded] = useState(false);

<img 
  src="/images/logo.svg" 
  alt="Disruptors Media"
  className="logo-image"
  onLoad={() => setLogoLoaded(true)}
  style={{ opacity: logoLoaded ? 1 : 0 }}
/>
```

### Menu Animation Performance
```css
/* Use transform for smooth animations */
.mobile-nav {
    transform: translateX(-100%);
    will-change: transform;
}

.mobile-nav.open {
    transform: translateX(0);
}

/* Remove will-change after animation */
.mobile-nav.animation-complete {
    will-change: auto;
}
```

## State Management

### Active Page Detection
```jsx
const isActivePage = (path) => {
  if (path === '/' && location.pathname === '/') return true;
  if (path !== '/' && location.pathname.startsWith(path)) return true;
  return false;
};
```

### Scroll Position Header (Optional)
```jsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Apply different styling based on scroll position
<header className={`header ${scrolled ? 'scrolled' : ''}`}>
```

## Testing Checklist

### Functionality Tests
- [ ] Logo links to homepage
- [ ] All navigation links work correctly
- [ ] Active page highlighting works
- [ ] Mobile menu opens/closes smoothly
- [ ] Menu closes when clicking navigation items
- [ ] Hamburger icon animates correctly

### Responsive Tests
- [ ] Layout works on all screen sizes
- [ ] Mobile breakpoint triggers correctly
- [ ] Touch targets are appropriately sized
- [ ] Text remains readable at all sizes

### Accessibility Tests
- [ ] Tab navigation works correctly
- [ ] Screen reader compatibility
- [ ] Focus indicators are visible
- [ ] ARIA labels are properly implemented
- [ ] Keyboard shortcuts work (Enter, Space, Escape)

### Performance Tests
- [ ] Logo loads quickly
- [ ] Menu animations run smoothly (60fps)
- [ ] No layout shifts during load
- [ ] Component renders efficiently