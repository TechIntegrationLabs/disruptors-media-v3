# DM3 Site Database PRD
## Google Sheets Multi-Tab Data Management System

### Overview
This document specifies the structure for a comprehensive Google Sheets database to manage all dynamic content for the Disruptors Media v3 website. Each tab represents a different content type that will be synced to the site via the existing client data integration system.

---

## Sheet 1: CLIENTS (Existing - Reference Structure)

**Purpose**: Client logos, testimonials, and company information for social proof

**Estimated Columns** (to be confirmed from existing sheet):
- `company_name` (Text) - Client company name
- `logo_url` (URL) - Cloudinary or direct image URL
- `industry` (Text) - Client industry/vertical
- `testimonial` (Text) - Client testimonial quote
- `testimonial_author` (Text) - Name and title of person giving testimonial
- `case_study_available` (Boolean) - TRUE/FALSE if case study exists
- `featured` (Boolean) - TRUE/FALSE for homepage display
- `website_url` (URL) - Client website
- `project_date` (Date) - When project was completed
- `display_order` (Number) - Sort order for display

---

## Sheet 2: SERVICES

**Purpose**: Service offerings, descriptions, and pricing information

**Columns:**
- `service_id` (Text) - Unique identifier (e.g., "ai-marketing-001")
- `service_name` (Text) - Display name (e.g., "AI-Powered Marketing Automation")
- `service_category` (Text) - Category: "AI Marketing", "Studio Services", "Content Production", "Digital Transformation"
- `short_description` (Text) - Brief 1-2 sentence description
- `long_description` (Text) - Detailed service description
- `key_features` (Text) - Comma-separated list of features
- `pricing_model` (Text) - "Fixed", "Hourly", "Monthly", "Project-based", "Custom"
- `starting_price` (Number) - Base price point
- `delivery_timeframe` (Text) - "1-2 weeks", "30 days", "Ongoing", etc.
- `service_icon_url` (URL) - Icon/illustration for service
- `featured_image_url` (URL) - Hero image for service page
- `cta_text` (Text) - Call-to-action button text
- `cta_url` (URL) - Where CTA button links
- `related_services` (Text) - Comma-separated list of related service IDs
- `active` (Boolean) - TRUE/FALSE if service is currently offered
- `featured` (Boolean) - TRUE/FALSE for homepage/featured display
- `seo_title` (Text) - Page title for SEO
- `seo_description` (Text) - Meta description
- `display_order` (Number) - Sort order

---

## Sheet 3: TEAM_MEMBERS

**Purpose**: Team member profiles, bios, and expertise

**Columns:**
- `member_id` (Text) - Unique identifier
- `first_name` (Text) - First name
- `last_name` (Text) - Last name
- `display_name` (Text) - How name appears on site
- `job_title` (Text) - Current role/title
- `department` (Text) - "Leadership", "Creative", "Strategy", "Development", "Operations"
- `bio_short` (Text) - Brief 1-2 sentence bio
- `bio_long` (Text) - Detailed biography
- `headshot_url` (URL) - Professional headshot image
- `years_experience` (Number) - Years in industry
- `specialties` (Text) - Comma-separated areas of expertise
- `education` (Text) - Relevant education/certifications
- `linkedin_url` (URL) - LinkedIn profile
- `twitter_url` (URL) - Twitter handle
- `email` (Email) - Contact email
- `phone` (Text) - Contact phone
- `available_for_projects` (Boolean) - TRUE/FALSE availability
- `featured` (Boolean) - TRUE/FALSE for homepage display
- `leadership_team` (Boolean) - TRUE/FALSE for leadership section
- `display_order` (Number) - Sort order

---

## Sheet 4: CASE_STUDIES

**Purpose**: Detailed project case studies with results and metrics

**Columns:**
- `case_study_id` (Text) - Unique identifier
- `project_title` (Text) - Case study title
- `client_name` (Text) - Client company (should match CLIENTS sheet)
- `industry` (Text) - Client industry
- `project_type` (Text) - Type of project/service delivered
- `challenge` (Text) - Problem/challenge client faced
- `solution` (Text) - How Disruptors Media solved it
- `results` (Text) - Outcomes and achievements
- `roi_percentage` (Number) - ROI if quantifiable
- `key_metrics` (Text) - Important numbers/statistics
- `project_duration` (Text) - How long project took
- `team_members` (Text) - Comma-separated list of team member IDs involved
- `services_used` (Text) - Comma-separated list of service IDs used
- `featured_image_url` (URL) - Main case study image
- `before_image_url` (URL) - Before state image
- `after_image_url` (URL) - After state image
- `testimonial` (Text) - Client testimonial specific to this project
- `testimonial_author` (Text) - Name/title of testimonial giver
- `project_date` (Date) - When project was completed
- `featured` (Boolean) - TRUE/FALSE for homepage display
- `public` (Boolean) - TRUE/FALSE if can be shown publicly
- `slug` (Text) - URL slug for case study page
- `seo_title` (Text) - Page title for SEO
- `seo_description` (Text) - Meta description
- `display_order` (Number) - Sort order

---

## Sheet 5: PORTFOLIO

**Purpose**: Visual portfolio items and project gallery

**Columns:**
- `portfolio_id` (Text) - Unique identifier
- `project_name` (Text) - Name of portfolio item
- `project_type` (Text) - "Website", "Branding", "Marketing Campaign", "Video", "Photography"
- `category` (Text) - Portfolio category for filtering
- `description` (Text) - Project description
- `client_name` (Text) - Client name (if allowed to share)
- `industry` (Text) - Client industry
- `featured_image_url` (URL) - Main portfolio image
- `gallery_images` (Text) - Comma-separated URLs for image gallery
- `project_url` (URL) - Link to live project (if applicable)
- `technologies_used` (Text) - Comma-separated tech stack
- `completion_date` (Date) - When project was finished
- `team_members` (Text) - Comma-separated team member IDs
- `featured` (Boolean) - TRUE/FALSE for homepage display
- `public` (Boolean) - TRUE/FALSE if can be shown publicly
- `award_winning` (Boolean) - TRUE/FALSE if project won awards
- `display_order` (Number) - Sort order

---

## Sheet 6: TESTIMONIALS

**Purpose**: Client testimonials and reviews

**Columns:**
- `testimonial_id` (Text) - Unique identifier
- `client_name` (Text) - Person giving testimonial
- `client_company` (Text) - Company name
- `client_title` (Text) - Job title/role
- `testimonial_text` (Text) - Full testimonial quote
- `rating` (Number) - 1-5 star rating
- `project_type` (Text) - What service/project testimonial relates to
- `testimonial_date` (Date) - When testimonial was given
- `client_photo_url` (URL) - Photo of testimonial giver
- `company_logo_url` (URL) - Company logo
- `video_testimonial_url` (URL) - Video testimonial if available
- `permission_to_use` (Boolean) - TRUE/FALSE legal permission
- `featured` (Boolean) - TRUE/FALSE for homepage display
- `case_study_id` (Text) - Related case study ID if applicable
- `display_order` (Number) - Sort order

---

## Sheet 7: BLOG_POSTS

**Purpose**: Blog content management

**Columns:**
- `post_id` (Text) - Unique identifier
- `title` (Text) - Blog post title
- `slug` (Text) - URL slug
- `excerpt` (Text) - Brief post summary
- `content` (Text) - Full blog post content (HTML/Markdown)
- `author` (Text) - Team member ID of author
- `publish_date` (Date) - Publication date
- `last_updated` (Date) - Last modification date
- `category` (Text) - "AI Marketing", "Industry Insights", "Case Studies", "Tips", "News"
- `tags` (Text) - Comma-separated tags
- `featured_image_url` (URL) - Main blog image
- `status` (Text) - "Draft", "Published", "Scheduled", "Archived"
- `featured` (Boolean) - TRUE/FALSE for featured posts
- `seo_title` (Text) - SEO title
- `seo_description` (Text) - Meta description
- `read_time` (Number) - Estimated read time in minutes
- `view_count` (Number) - Page views
- `social_shares` (Number) - Social media shares
- `display_order` (Number) - Sort order

---

## Sheet 8: FAQS

**Purpose**: Frequently asked questions

**Columns:**
- `faq_id` (Text) - Unique identifier
- `question` (Text) - FAQ question
- `answer` (Text) - FAQ answer
- `category` (Text) - "General", "Services", "Pricing", "Process", "Technical"
- `priority` (Number) - Display order priority
- `last_updated` (Date) - When answer was last updated
- `related_services` (Text) - Comma-separated service IDs
- `keywords` (Text) - Search keywords for internal search
- `view_count` (Number) - How often question is viewed
- `helpful_votes` (Number) - User votes on helpfulness
- `active` (Boolean) - TRUE/FALSE if FAQ is active

---

## Sheet 9: PRICING_PACKAGES

**Purpose**: Service packages and pricing information

**Columns:**
- `package_id` (Text) - Unique identifier
- `package_name` (Text) - Display name
- `service_category` (Text) - Related service category
- `price` (Number) - Package price
- `billing_cycle` (Text) - "One-time", "Monthly", "Quarterly", "Annually"
- `features` (Text) - Comma-separated feature list
- `popular` (Boolean) - TRUE/FALSE if popular package
- `includes_consultation` (Boolean) - TRUE/FALSE
- `delivery_timeframe` (Text) - Expected delivery time
- `contract_terms` (Text) - Contract requirements
- `add_ons_available` (Text) - Available add-on services
- `competitor_comparison` (Text) - How it compares to competitors
- `cta_text` (Text) - Call-to-action text
- `cta_url` (URL) - CTA link destination
- `active` (Boolean) - TRUE/FALSE if currently offered
- `display_order` (Number) - Sort order

---

## Sheet 10: TOOLS_RESOURCES

**Purpose**: Downloadable tools and resources

**Columns:**
- `resource_id` (Text) - Unique identifier
- `resource_name` (Text) - Display name
- `resource_type` (Text) - "PDF", "Template", "Checklist", "Calculator", "Guide"
- `description` (Text) - Resource description
- `download_url` (URL) - Direct download link
- `preview_image_url` (URL) - Preview/thumbnail image
- `access_level` (Text) - "Free", "Email Required", "Premium Only"
- `file_size` (Text) - File size (e.g., "2.5 MB")
- `last_updated` (Date) - When resource was updated
- `download_count` (Number) - Number of downloads
- `category` (Text) - Resource category
- `related_services` (Text) - Related service IDs
- `seo_keywords` (Text) - SEO keywords
- `featured` (Boolean) - TRUE/FALSE for featured resources
- `active` (Boolean) - TRUE/FALSE if available
- `display_order` (Number) - Sort order

---

## Sheet 11: EVENTS_WEBINARS

**Purpose**: Events, webinars, and speaking engagements

**Columns:**
- `event_id` (Text) - Unique identifier
- `event_name` (Text) - Event title
- `event_type` (Text) - "Webinar", "Workshop", "Conference", "Speaking", "Networking"
- `event_date` (Date) - Event date
- `event_time` (Time) - Event time
- `duration` (Text) - Event duration
- `description` (Text) - Event description
- `registration_url` (URL) - Registration link
- `location` (Text) - Physical or virtual location
- `speakers` (Text) - Comma-separated speaker names/IDs
- `target_audience` (Text) - Who should attend
- `capacity` (Number) - Maximum attendees
- `current_registrations` (Number) - Current registration count
- `price` (Number) - Ticket price (0 for free)
- `featured_image_url` (URL) - Event promotional image
- `recording_url` (URL) - Recording link after event
- `materials_url` (URL) - Presentation/handout materials
- `status` (Text) - "Upcoming", "Live", "Completed", "Cancelled"
- `featured` (Boolean) - TRUE/FALSE for homepage promotion
- `display_order` (Number) - Sort order

---

## Sheet 12: AWARDS_CERTIFICATIONS

**Purpose**: Company awards and team certifications

**Columns:**
- `award_id` (Text) - Unique identifier
- `award_name` (Text) - Name of award/certification
- `issuing_organization` (Text) - Who gave the award
- `award_type` (Text) - "Company Award", "Team Certification", "Individual Achievement"
- `date_received` (Date) - When award was received
- `description` (Text) - Award description
- `certificate_url` (URL) - Link to certificate/proof
- `press_mention_url` (URL) - Press coverage of award
- `category` (Text) - Award category
- `team_members` (Text) - Team members involved (if applicable)
- `project_related` (Text) - Related project/case study ID
- `badge_image_url` (URL) - Award badge/logo
- `public_display` (Boolean) - TRUE/FALSE if can be displayed publicly
- `featured` (Boolean) - TRUE/FALSE for homepage display
- `display_order` (Number) - Sort order

---

## Sheet 13: SEO_META_DATA

**Purpose**: SEO metadata for all pages

**Columns:**
- `page_slug` (Text) - URL slug/path
- `page_title` (Text) - HTML title tag
- `meta_description` (Text) - Meta description
- `meta_keywords` (Text) - Meta keywords
- `og_title` (Text) - Open Graph title
- `og_description` (Text) - Open Graph description
- `og_image_url` (URL) - Open Graph image
- `twitter_card_type` (Text) - Twitter card type
- `canonical_url` (URL) - Canonical URL
- `robots_directive` (Text) - Robots meta tag
- `schema_markup` (Boolean) - TRUE/FALSE if schema markup applied
- `last_seo_audit` (Date) - Last SEO review date
- `performance_score` (Number) - Lighthouse/SEO score
- `priority` (Text) - "High", "Medium", "Low" for optimization priority
- `notes` (Text) - SEO notes and recommendations

---

## Sheet 14: SOCIAL_MEDIA

**Purpose**: Social media profiles and content

**Columns:**
- `platform` (Text) - Social media platform
- `handle` (Text) - Account handle/username
- `profile_url` (URL) - Link to profile
- `follower_count` (Number) - Current followers
- `posting_frequency` (Text) - How often content is posted
- `content_type` (Text) - Type of content posted
- `engagement_rate` (Number) - Average engagement percentage
- `last_post_date` (Date) - When last content was posted
- `campaign_tracking` (Text) - Current campaigns
- `utm_parameters` (Text) - UTM tracking codes
- `manager` (Text) - Team member responsible
- `active` (Boolean) - TRUE/FALSE if account is active
- `featured` (Boolean) - TRUE/FALSE for main social links
- `display_order` (Number) - Order for social media display

---

## Sheet 15: CONTACT_LOCATIONS

**Purpose**: Contact information and office locations

**Columns:**
- `location_id` (Text) - Unique identifier
- `location_type` (Text) - "Headquarters", "Satellite Office", "Mailing Address", "Virtual"
- `office_name` (Text) - Display name for location
- `address_line_1` (Text) - Street address
- `address_line_2` (Text) - Suite/unit number
- `city` (Text) - City
- `state` (Text) - State/province
- `zip_code` (Text) - Postal code
- `country` (Text) - Country
- `phone` (Text) - Office phone number
- `email` (Text) - Office email
- `hours_of_operation` (Text) - Business hours
- `google_maps_embed` (Text) - Embed code for map
- `parking_info` (Text) - Parking instructions
- `accessibility` (Text) - Accessibility information
- `key_contacts` (Text) - Important people at this location
- `departments` (Text) - Departments housed here
- `appointment_booking_url` (URL) - Calendar booking link
- `primary_location` (Boolean) - TRUE/FALSE if main office
- `public_facing` (Boolean) - TRUE/FALSE if clients visit
- `display_order` (Number) - Sort order

---

## Implementation Notes

### Data Integration Pattern
Based on existing client data sync, each sheet will follow this pattern:
1. **Data Source**: Google Sheets API integration
2. **Sync Frequency**: Real-time or scheduled updates
3. **Caching**: Local storage for performance
4. **Fallbacks**: Default data if sync fails

### Naming Conventions
- **Sheet Names**: UPPERCASE with underscores
- **Column Names**: lowercase with underscores
- **IDs**: kebab-case format (e.g., "ai-marketing-001")
- **URLs**: Full URLs with protocol
- **Booleans**: TRUE/FALSE (not 1/0)

### Data Validation Rules
- **Required Fields**: Mark with * in column headers
- **URL Validation**: Ensure proper URL format
- **Date Formats**: YYYY-MM-DD standard
- **Number Formats**: No commas, decimals as needed
- **Text Length**: Set character limits for UI compatibility

### API Integration Points
Each sheet should have corresponding React components:
- `useClients()` → `useServices()`, `useTeamMembers()`, etc.
- Error handling for API failures
- Loading states during data fetch
- Local caching for performance

This structure provides comprehensive content management while maintaining consistency with your existing client data system.