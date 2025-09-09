# CLAUDE.md - Documentation System

This file provides guidance for working with the comprehensive documentation system of the Disruptors Media v3 project.

## Overview

The `/docs/` directory contains a comprehensive documentation ecosystem covering project specifications, technical implementation, asset management, and legacy content archives. This system serves as the knowledge base for development, deployment, and maintenance of the marketing website.

## Documentation Structure

```
docs/
├── README.md                                    # Documentation navigation index
├── SESSION_SUMMARY_DECEMBER_2024.md           # Implementation history
├── PROJECT_OVERVIEW.md                         # Business context & objectives
├── TODO_ROADMAP.md                            # Development priorities
├── DM3_STATIC_PRD.md                          # Product Requirements Document
├── CLOUDINARY_ASSETS_DOCUMENTATION.md         # Asset management guide
├── CLOUDINARY_ASSET_MIGRATION_PLAN.md         # Asset optimization strategy
└── disruptors-site-extracted copy/            # Legacy content archive
    ├── assets/                                 # Complete legacy asset library
    ├── brand/                                  # Brand guidelines
    └── documentation/                          # Historical documentation
```

## Core Documentation Files

### Project Management (`README.md`)

**Purpose**: Central navigation hub for all documentation

**Contents**:
- Documentation index with quick links
- Project status overview (70% completion)
- Navigation to key documents
- Quick command references

**Usage**: Start here for any documentation needs or project orientation

### Implementation History (`SESSION_SUMMARY_DECEMBER_2024.md`)

**Purpose**: Detailed log of recent development sessions and technical implementations

**Key Sections**:
- Navigation system overhaul (dropdown menus, mobile responsiveness)
- Image management resolution (Cloudinary + stock image strategy)
- Technical improvements (TypeScript interfaces, PWA fixes)
- Repository status and build verification

**Usage**: Reference for understanding recent changes and implementation decisions

### Business Context (`PROJECT_OVERVIEW.md`)

**Purpose**: High-level business objectives and project context

**Contents**:
- Company background and market positioning
- Project goals and success metrics
- Target audience and user personas
- Business model and revenue streams

**Usage**: Essential reading for understanding the "why" behind technical decisions

### Development Planning (`TODO_ROADMAP.md`)

**Purpose**: Comprehensive development roadmap and task prioritization

**Key Sections**:
- **Immediate Priorities** (Logo assets, form integration)
- **Phase 1**: Content completion and SEO optimization  
- **Phase 2**: Backend integration and CRM connectivity
- **Phase 3**: Advanced features and analytics
- **Launch Requirements**: Critical path to production

**Usage**: Guide for sprint planning and development prioritization

### Technical Specifications (`DM3_STATIC_PRD.md`)

**Purpose**: Detailed product requirements document

**Contents**:
- Technical architecture specifications
- Feature requirements and user stories
- Integration requirements (Cloudinary, Google Sheets)
- Performance and accessibility standards
- Testing and quality assurance protocols

**Usage**: Reference for technical implementation details and requirements validation

## Asset Management Documentation

### Cloudinary Integration (`CLOUDINARY_ASSETS_DOCUMENTATION.md`)

**Purpose**: Comprehensive guide to asset management and optimization

**Key Sections**:
- **Asset Inventory**: Organized by category (studio photos, logos, backgrounds)
- **Optimization Parameters**: f_auto, q_auto, responsive sizing
- **URL Patterns**: Standardized asset URL construction
- **Performance Guidelines**: Best practices for image loading

**Asset Categories**:
```
Cloudinary Structure (dvcvxhzmt):
├── photos/studio/          # Professional studio photography
├── logos/                  # Brand assets and client logos  
├── backgrounds/            # Hero and section backgrounds
├── gallery/                # Portfolio and work samples
└── team/                   # Team member photos
```

**Usage Pattern**:
```typescript
// Optimized asset URL construction
const assetUrl = `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_${width},h_${height}/${path}`;

// Responsive image implementation
<img 
  src={assetUrl}
  alt="Descriptive alt text"
  loading="lazy"
  className="w-full h-auto"
/>
```

### Migration Strategy (`CLOUDINARY_ASSET_MIGRATION_PLAN.md`)

**Purpose**: Strategic plan for asset optimization and migration

**Contents**:
- Legacy asset analysis and categorization
- Migration timeline and phases
- Quality standards and optimization targets
- Fallback strategies for missing assets

**Usage**: Guide for systematic asset improvement and optimization efforts

## Legacy Content Archive (`disruptors-site-extracted copy/`)

### Asset Library (`assets/`)

**Purpose**: Complete archive of previous website assets

**Structure**:
```
assets/
├── fonts/                  # Typography assets (OT Neue Montreal, PP Supply Mono)
├── images/                 # Organized by category and usage
│   ├── backgrounds/        # Hero and section backgrounds
│   ├── gallery/           # Portfolio and work samples
│   ├── icons/             # UI icons and graphics
│   ├── logos/             # Brand and client logos
│   ├── portfolio/         # Project showcase images  
│   ├── services/          # Service illustration assets
│   └── team/              # Team member photography
└── videos/                # Video content and placeholders
```

**Usage**: Reference library for asset migration and backup source for missing assets

### Brand Guidelines (`brand/`)

**Purpose**: Historical brand standards and guidelines

**Contents**:
- Logo usage specifications
- Color palette definitions (Gold #FFD700, Dark #2B2B2B, Cream #F1EDE9)
- Typography standards
- Visual identity guidelines

**Usage**: Ensure brand consistency across new implementations

### Historical Documentation (`documentation/`)

**Purpose**: Archive of previous documentation and specifications

**Contents**:
- Previous PRD versions
- Technical architecture documents  
- Content strategies and marketing plans
- Client onboarding processes

**Usage**: Reference for understanding project evolution and maintaining continuity

## Documentation Workflows

### Adding New Documentation

1. **Create Document**: Follow naming convention (UPPERCASE_WITH_UNDERSCORES.md)
2. **Update Index**: Add reference in `README.md` with description
3. **Cross-Reference**: Link related documents for navigation
4. **Version Control**: Document significant changes in git commits

### Updating Existing Documentation

1. **Review Impact**: Understand downstream effects of changes
2. **Update Cross-References**: Ensure linked documents remain accurate
3. **Maintain History**: Preserve implementation decision context
4. **Validate Links**: Ensure all internal links remain functional

### Documentation Standards

**File Naming**:
- Use UPPERCASE_WITH_UNDERSCORES for major documents
- Use descriptive names that indicate content purpose
- Include version dates for time-sensitive documents

**Content Structure**:
- Start with clear overview and purpose
- Use consistent heading hierarchy
- Include code examples where applicable
- Provide usage instructions and patterns

**Cross-Referencing**:
- Link related documents for easy navigation
- Reference specific sections where relevant
- Maintain bidirectional links between related content

## Integration with Development Workflow

### Development Commands

```bash
# Documentation generation
npm run docs:generate        # Generate documentation from code comments
npm run docs:validate       # Validate internal links and references

# Asset documentation
npm run assets:audit        # Audit asset usage against documentation
npm run assets:optimize     # Apply documented optimization strategies
```

### Documentation-Driven Development

1. **Requirement Analysis**: Start with PRD and roadmap review
2. **Technical Planning**: Reference architecture documentation
3. **Implementation**: Follow documented patterns and standards
4. **Asset Integration**: Use documented asset management workflows
5. **Quality Assurance**: Validate against documented requirements

### Maintenance Workflows

**Weekly Reviews**:
- Update TODO_ROADMAP.md with completed tasks
- Review and update PROJECT_OVERVIEW.md metrics
- Validate asset documentation accuracy

**Monthly Audits**:
- Review and archive outdated documentation
- Update technical specifications for implemented changes
- Consolidate lessons learned into best practices

## Documentation Access Patterns

### For Developers
- **Start**: README.md for navigation
- **Technical Details**: DM3_STATIC_PRD.md for specifications
- **Implementation History**: SESSION_SUMMARY_DECEMBER_2024.md for context
- **Asset Management**: CLOUDINARY_ASSETS_DOCUMENTATION.md for asset workflows

### For Project Managers
- **Status**: README.md for completion percentage  
- **Planning**: TODO_ROADMAP.md for priorities and timeline
- **Business Context**: PROJECT_OVERVIEW.md for objectives
- **Requirements**: DM3_STATIC_PRD.md for feature specifications

### For Content Teams
- **Asset Library**: Legacy archive for existing assets
- **Brand Guidelines**: Brand folder for consistency standards
- **Content Standards**: PRD for content requirements and specifications

This documentation system provides comprehensive coverage of all project aspects while maintaining clear organization and easy navigation for different user types and use cases.