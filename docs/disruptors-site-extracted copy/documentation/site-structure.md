# Disruptors Media - Site Structure Documentation

## Navigation Architecture

### Primary Pages

1. **Home** (`/`)
   - Hero section with video background
   - Introduction to services
   - Featured work carousel
   - Client testimonials
   - Call-to-action sections

2. **About** (`/about`)
   - Company story
   - Mission and values
   - Team introduction
   - Company culture showcase

3. **Services** (`/services`)
   - Service offerings grid
   - Detailed service descriptions
   - Process overview
   - Technology stack

4. **Work** (`/work`)
   - Portfolio grid layout
   - Case study previews
   - Client logos
   - Industry categories

5. **Work Detail** (`/work/:slug`)
   - Individual case study pages
   - Project overview
   - Challenge & solution
   - Results and metrics
   - Visual showcase

6. **Gallery** (`/gallery`)
   - Media showcase
   - Video reels
   - Behind-the-scenes content
   - Company culture visuals

7. **Podcast** (`/podcast`)
   - Podcast episodes listing
   - Audio player integration
   - Episode descriptions
   - Guest information

8. **Contact** (`/contact`)
   - Contact form
   - Office location
   - Contact information
   - Business hours

### Secondary Pages

9. **FAQ** (`/faq`)
   - Frequently asked questions
   - Accordion-style layout
   - Category organization

10. **Privacy Policy** (`/privacy-policy`)
    - Legal privacy information
    - Data collection policies
    - User rights

11. **Terms & Conditions** (`/terms-conditions`)
    - Legal terms of service
    - Usage guidelines
    - Disclaimers

### 404 Page
- Custom error page design
- Navigation back to main site
- Search functionality

## Navigation Components

### Header Navigation
- Logo (links to home)
- Main menu items
- Mobile hamburger menu
- Smooth scroll integration

### Footer Navigation
- Quick links
- Social media links
- Newsletter signup
- Contact information
- Legal links

## User Flow Patterns

### Primary User Journey
1. Home → Services → Work → Contact
2. Home → About → Team → Contact
3. Work → Case Study → Contact

### Content Discovery Flow
1. Gallery → Work → Case Studies
2. Podcast → About → Contact
3. Services → FAQ → Contact

## Technical Implementation

### Routing
- React Router v6 implementation
- Client-side routing
- Dynamic route parameters for case studies
- 404 fallback handling

### Data Flow
- API-driven content from Laravel backend
- Dynamic navigation menu from API
- SEO metadata management
- Loading states with custom animations

### Authentication
- No public user authentication
- Admin panel separate (Laravel backend)
- Cookie-based session management for UI states