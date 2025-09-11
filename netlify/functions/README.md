# Netlify Functions for DM3

This directory contains serverless functions that replace the original WebSocket server and provide backend functionality for the Disruptors Media v3 application.

## Available Functions

### 1. `blog-posts.js`
**Endpoint**: `/.netlify/functions/blog-posts`
**Method**: GET
**Purpose**: Fetch blog posts from Google Sheets with fallback to CSV export

**Features**:
- Primary: Google Sheets API integration
- Fallback: Public CSV export (no API key required)
- Filters approved posts only
- Date-based visibility (past posts only)
- Automatic categorization and slug generation

**Environment Variables Required**:
- `REACT_APP_GOOGLE_SHEETS_API_KEY` (optional - falls back to CSV if not provided)
- `REACT_APP_BLOG_GOOGLE_SHEET_ID` (defaults to existing sheet ID)

### 2. `google-docs-content.js`
**Endpoint**: `/.netlify/functions/google-docs-content`
**Method**: GET
**Purpose**: Fetch and process Google Docs content for blog posts

**Query Parameters**:
- `url`: Google Docs URL to fetch content from

**Features**:
- Converts Google Docs to clean HTML
- Applies DM3-specific styling classes
- Handles HTML cleanup and optimization
- Returns both HTML and plain text versions

### 3. `ai-chat.js`
**Endpoint**: `/.netlify/functions/ai-chat`
**Method**: POST
**Purpose**: AI-powered chat using OpenAI API

**Request Body**:
```json
{
  "messages": [
    {"role": "user", "content": "What services do you offer?"}
  ],
  "context": "Services inquiry"
}
```

**Environment Variables Required**:
- `REACT_APP_OPENAI_API_KEY` or `OPENAI_API_KEY`

**Features**:
- Disruptors Media context and knowledge
- Professional, helpful responses
- Token usage tracking
- Error handling and fallbacks

### 4. `contact-form.js`
**Endpoint**: `/.netlify/functions/contact-form`
**Method**: POST
**Purpose**: Handle contact form submissions

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Interested in your services",
  "phone": "+1234567890",
  "company": "Example Corp",
  "service": "AI Marketing"
}
```

**Features**:
- Form validation
- Email format validation
- Ready for email service integration (SendGrid, Mailgun)
- CRM integration ready (Go High Level)

### 5. `validate-image.js`
**Endpoint**: `/.netlify/functions/validate-image`
**Method**: GET
**Purpose**: Validate and optimize image URLs

**Query Parameters**:
- `url`: Image URL to validate
- `width`: Desired width (default: 800)
- `height`: Desired height (default: 600)

**Features**:
- Image URL validation
- Cloudinary optimization
- Fallback to default images
- Responsive image handling

### 6. `health-check.js`
**Endpoint**: `/.netlify/functions/health-check`
**Method**: GET
**Purpose**: System health monitoring and status

**Features**:
- Environment variable status
- External service connectivity checks
- Function status overview
- Debugging information

## Usage Examples

### Frontend Integration

```javascript
// Fetch blog posts
const response = await fetch('/.netlify/functions/blog-posts');
const blogPosts = await response.json();

// AI Chat
const chatResponse = await fetch('/.netlify/functions/ai-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Tell me about your AI services' }],
    context: 'AI Services inquiry'
  })
});

// Contact form
const formResponse = await fetch('/.netlify/functions/contact-form', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I need help with AI marketing'
  })
});

// Image validation
const imageResponse = await fetch(
  `/.netlify/functions/validate-image?url=${encodeURIComponent(imageUrl)}&width=800&height=600`
);

// Health check
const healthResponse = await fetch('/.netlify/functions/health-check');
const healthData = await healthResponse.json();
```

### API Routes (via netlify.toml redirect)

All functions are also available via `/api/*` routes:
- `/api/blog-posts`
- `/api/google-docs-content`
- `/api/ai-chat`
- `/api/contact-form`
- `/api/validate-image`
- `/api/health-check`

## Development

### Local Testing
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local development with functions
netlify dev

# Test individual function
netlify functions:invoke blog-posts
```

### Environment Variables Setup

In your Netlify dashboard, configure these environment variables:

1. **Required for Google Sheets**:
   - `REACT_APP_GOOGLE_SHEETS_API_KEY`
   - `REACT_APP_GOOGLE_SHEETS_CLIENT_ID`
   - `REACT_APP_BLOG_GOOGLE_SHEET_ID` (already configured)

2. **Required for AI Chat**:
   - `REACT_APP_OPENAI_API_KEY` or `OPENAI_API_KEY`

3. **Optional for Enhanced Features**:
   - `REACT_APP_CLOUDINARY_CLOUD_NAME` (already configured)
   - `SENDGRID_API_KEY` (for email notifications)
   - `GHL_API_KEY` (for CRM integration)

### Function Configuration

Each function is configured in `netlify.toml` with specific timeout and memory settings optimized for their use case.

### Error Handling

All functions include:
- CORS handling for browser requests
- Proper HTTP status codes
- Error logging
- Graceful fallbacks where applicable

## Migration from WebSocket

These serverless functions replace the previous WebSocket server functionality:
- **Real-time features** → HTTP polling or webhooks
- **Persistent connections** → Stateless HTTP requests
- **Server state** → External services (Google Sheets, OpenAI)
- **WebSocket endpoints** → REST API endpoints

The functions maintain the same functionality while being more scalable and cost-effective on Netlify.

## Security

- CORS properly configured
- Input validation on all endpoints
- Rate limiting handled by Netlify
- API keys stored as environment variables
- No sensitive data exposed in responses

## Performance

- Functions optimized for cold start performance
- Memory allocation tuned per function
- Timeout settings appropriate for each use case
- CDN caching for appropriate responses