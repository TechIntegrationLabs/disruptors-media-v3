# Site Documentation - Source of Truth

This folder serves as the **main source of truth** for the Disruptors Media v3 website. It contains comprehensive documentation for every part of the site and how it works.

## 📁 Documentation Structure

```
site-documentation/
├── README.md                           # This overview
├── architecture/                       # Technical architecture docs
│   ├── overview.md                    # System architecture overview
│   ├── data-flow.md                   # Data flow patterns
│   ├── component-hierarchy.md         # Component structure
│   └── api-integrations.md            # External API integrations
├── modules/                           # Feature module documentation
│   ├── clients-module.md              # Client data management system
│   ├── navigation-module.md           # Header/navigation system
│   ├── animation-module.md            # Framer Motion animations
│   ├── asset-management-module.md     # Cloudinary integration
│   └── form-handling-module.md        # Contact forms and validation
├── pages/                            # Page-specific documentation
│   ├── home-page.md                  # Homepage components and flow
│   ├── services-pages.md             # All service pages
│   ├── about-page.md                 # About page content
│   ├── contact-page.md               # Contact page functionality
│   └── portfolio-page.md             # Portfolio and case studies
├── components/                       # Component documentation
│   ├── layout-components.md          # Header, Footer, Layout
│   ├── section-components.md         # Reusable page sections
│   ├── animation-components.md       # Animation-specific components
│   └── common-components.md          # Shared utility components
├── styling/                          # Design system documentation
│   ├── design-system.md              # Complete design system
│   ├── tailwind-config.md            # Tailwind customizations
│   ├── color-palette.md              # Brand colors and usage
│   └── typography.md                 # Font systems and hierarchy
├── integrations/                     # External service integrations
│   ├── cloudinary.md                 # Asset management
│   ├── google-sheets.md              # Data synchronization
│   ├── analytics.md                  # Analytics and tracking
│   └── forms.md                      # Form submissions
├── deployment/                       # Deployment and DevOps
│   ├── build-process.md              # Build and optimization
│   ├── hosting.md                    # Hosting configuration
│   └── domain-setup.md               # Domain and DNS setup
└── maintenance/                      # Ongoing maintenance
    ├── content-updates.md            # Content management
    ├── asset-optimization.md         # Performance optimization
    └── troubleshooting.md            # Common issues and fixes
```

## 📖 How to Use This Documentation

### For Developers
- Start with `architecture/overview.md` for system understanding
- Reference `modules/` for specific feature implementation
- Check `components/` for component usage and props
- Review `styling/` for design system compliance

### For Content Managers
- Use `pages/` documentation for content structure
- Reference `modules/clients-module.md` for client data management
- Check `maintenance/content-updates.md` for update procedures

### For Designers
- Review `styling/design-system.md` for brand guidelines
- Check `components/` for UI component specifications
- Reference `pages/` for layout and visual hierarchy

### For Project Managers
- Use `integrations/` for third-party service status
- Check `deployment/` for deployment procedures
- Reference `maintenance/` for ongoing requirements

## 🎯 Documentation Standards

### Completeness
Each document should include:
- **Purpose**: What the feature/component does
- **Implementation**: How it works technically
- **Usage**: How to use or modify it
- **Dependencies**: What it relies on
- **Examples**: Code examples and use cases
- **Troubleshooting**: Common issues and solutions

### Accuracy
- Documentation is updated with every code change
- All examples are tested and working
- Screenshots are current and relevant
- Links are verified and functional

### Clarity
- Written for multiple audiences (developers, designers, content managers)
- Uses clear headings and structure
- Includes visual aids where helpful
- Explains technical concepts in plain language

## 🔄 Maintenance Process

1. **Update with Changes**: Any code change requires documentation update
2. **Regular Reviews**: Monthly documentation accuracy reviews
3. **User Feedback**: Collect and address documentation feedback
4. **Version Control**: Track documentation changes with code changes

## 📊 Quick Reference

### Key System Components
- **React 19.1.1** with TypeScript
- **Tailwind CSS 3.4.17** with custom design tokens
- **Framer Motion 12.23.12** for animations
- **React Router DOM 7.8.2** for navigation
- **Cloudinary** for asset management
- **Google Sheets API** for dynamic data

### Development Commands
```bash
npm start              # Development server
npm run build         # Production build
npm run clients:sync  # Sync client data
npm test             # Run tests
```

### Important Files
- `src/App.tsx` - Main router configuration
- `src/components/layout/Header.tsx` - Navigation system
- `src/data/clients/` - Client data management
- `tailwind.config.js` - Design system configuration
- `.env` - Environment variables and API keys

This documentation serves as the single source of truth for understanding, maintaining, and extending the Disruptors Media v3 website.