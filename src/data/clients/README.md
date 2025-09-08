# Clients Data Management System

This folder contains the dynamic client data management system that syncs with Google Sheets.

## Files Structure

```
clients/
├── README.md                    # This documentation
├── sample-clients-data.csv      # Template/example data format
├── clients-sync.js             # Google Sheets sync script
├── clients-types.ts            # TypeScript interfaces
└── clients-api.ts              # API integration functions
```

## Google Sheets Setup

### 1. Create Google Sheets API Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable Google Sheets API
4. Create credentials (API Key + OAuth 2.0)
5. Add credentials to `.env` file

### 2. Required Environment Variables
```env
# Google Sheets API Configuration
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SHEETS_CLIENT_ID=your_client_id_here  
GOOGLE_SHEETS_CLIENT_SECRET=your_client_secret_here

# Sheet Configuration
CLIENTS_GOOGLE_SHEET_ID=your_sheet_id_here
CLIENTS_GOOGLE_SHEET_RANGE=Sheet1!A1:Z1000
```

### 3. Google Sheet Format
Your Google Sheet should match the CSV headers exactly:

| client_id | company_name | industry | contact_name | contact_email | ... |
|-----------|--------------|----------|--------------|---------------|-----|
| 1 | Tech Innovators Inc | Technology | John Smith | john@tech.com | ... |

## CSV Data Fields

### Required Fields
- `client_id`: Unique identifier
- `company_name`: Client company name
- `industry`: Business industry/sector
- `contact_name`: Primary contact person
- `contact_email`: Contact email address

### Optional Fields  
- `contact_phone`: Phone number
- `website_url`: Client website
- `logo_url`: Cloudinary logo URL
- `project_start_date`: YYYY-MM-DD format
- `project_end_date`: YYYY-MM-DD format
- `project_status`: completed | in_progress | proposal_sent | cancelled
- `project_type`: website_redesign | brand_identity | ecommerce_development | etc.
- `budget_range`: e.g., "25000-50000"
- `testimonial_quote`: Client testimonial text
- `testimonial_author`: Person who gave testimonial
- `testimonial_position`: Their job title
- `case_study_url`: Link to case study
- `portfolio_url`: Link to portfolio entry
- `work_examples`: Comma-separated services provided
- `social_media_*`: Social media URLs
- `notes`: Internal notes
- `tags`: Comma-separated tags for filtering

## Usage

### Sync from Google Sheets
```bash
npm run clients:sync
```

### Generate TypeScript types
```bash
npm run clients:generate-types
```

### Validate data
```bash
npm run clients:validate
```

## Integration with React Components

The synced data will be available as TypeScript interfaces:

```typescript
import { Client } from '../data/clients/clients-types';
import { getClients, getClientsByTag } from '../data/clients/clients-api';

// Get all clients
const clients = await getClients();

// Filter by tag
const techClients = await getClientsByTag('technology');
```