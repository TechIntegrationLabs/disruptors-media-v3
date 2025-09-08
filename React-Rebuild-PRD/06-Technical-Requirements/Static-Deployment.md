# Static Deployment Requirements - Disruptors Media React Site

## Deployment Overview

The Disruptors Media website will be deployed as a static React application on Netlify, eliminating the need for a backend server while maintaining all functionality through modern JAMstack architecture and third-party services.

## Architecture Approach

### Static Site Generation (SSG)
**Recommended Framework:** Next.js with Static Export
```json
{
  "scripts": {
    "build": "next build && next export",
    "start": "next start",
    "dev": "next dev"
  }
}
```

**Next.js Configuration:**
```javascript
// next.config.js
module.exports = {
  trailingSlash: true,
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/services': { page: '/services' },
      '/work': { page: '/work' },
      '/contact': { page: '/contact' },
      '/faq': { page: '/faq' },
      // Add dynamic work portfolio pages if needed
    }
  },
  images: {
    unoptimized: true, // Required for static export
  }
}
```

### Alternative: Create React App with React Router
```json
{
  "scripts": {
    "build": "react-scripts build",
    "start": "react-scripts start",
    "deploy": "npm run build && netlify deploy --prod --dir=build"
  }
}
```

## Content Management Strategy

### 1. Static Content Files
**Structure:**
```
/src/data/
├── content/
│   ├── homepage.json
│   ├── about.json
│   ├── services.json
│   ├── faq.json
│   └── contact.json
├── portfolio/
│   ├── projects.json
│   └── case-studies/
└── assets/
    ├── images/
    └── videos/
```

**Example Content File (homepage.json):**
```json
{
  "hero": {
    "title": "DISRUPTORS",
    "subtitle": "Creative Strategy & Digital Innovation",
    "ctaText": "BOOK A CALL"
  },
  "aboutSection": {
    "title": "WHO WE ARE",
    "content": "We are creative strategists and digital innovators..."
  },
  "services": [
    {
      "id": 1,
      "title": "Creative Strategy",
      "description": "Brand positioning and creative direction",
      "image": "/images/services/creative-strategy.jpg"
    }
  ],
  "featuredWork": [
    {
      "id": 1,
      "title": "Project Name",
      "category": "Brand Identity",
      "image": "/images/work/project-1.jpg",
      "slug": "project-name"
    }
  ]
}
```

### 2. Headless CMS Option (Future-Proof)
**Recommended:** Strapi, Contentful, or Sanity
```javascript
// For future CMS integration
const fetchContent = async (endpoint) => {
  const response = await fetch(`${process.env.REACT_APP_CMS_URL}/api/${endpoint}`);
  return response.json();
};

// Build-time data fetching for static generation
export async function getStaticProps() {
  const content = await fetchContent('homepage');
  return {
    props: { content }
  };
}
```

## Form Handling Solutions

### 1. Netlify Forms (Recommended)
```jsx
// Contact form with Netlify Forms
const ContactForm = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData })
      });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />
      
      {/* Form fields */}
      <input
        type="email"
        name="email"
        required
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
      </button>
    </form>
  );
};
```

### 2. Alternative: EmailJS
```javascript
import emailjs from 'emailjs-com';

const sendEmail = (formData) => {
  return emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    formData,
    'YOUR_USER_ID'
  );
};
```

### 3. Alternative: Formspree
```jsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

## Asset Optimization

### 1. Image Optimization
```javascript
// Image optimization pipeline
const imageConfig = {
  formats: ['webp', 'jpg', 'png'],
  sizes: [320, 640, 768, 1024, 1200, 1920],
  quality: 85,
  lazy: true
};

// Responsive image component
const OptimizedImage = ({ src, alt, ...props }) => (
  <picture>
    <source
      srcSet={generateSrcSet(src, 'webp')}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      type="image/webp"
    />
    <img
      src={src}
      srcSet={generateSrcSet(src, 'jpg')}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      alt={alt}
      loading="lazy"
      {...props}
    />
  </picture>
);
```

### 2. Video Optimization
```jsx
const VideoPlayer = ({ src, poster, ...props }) => (
  <video
    poster={poster}
    preload="metadata"
    playsInline
    muted
    {...props}
  >
    <source src={`${src}.webm`} type="video/webm" />
    <source src={`${src}.mp4`} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);
```

### 3. Font Optimization
```css
/* Font loading strategy */
@font-face {
  font-family: 'OT Neue Montreal';
  src: url('/fonts/OTNeueMontreal-SemiBoldSemiSqueezed.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap; /* Improves loading performance */
}

@font-face {
  font-family: 'PP Supply Mono';
  src: url('/fonts/PPSupplyMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Build Configuration

### 1. Webpack Optimization
```javascript
// webpack.config.js (if using CRA with craco)
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          }
        }
      };
      return webpackConfig;
    }
  }
};
```

### 2. Build Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build && next export",
    "start": "next start",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "optimize-images": "node scripts/optimize-images.js",
    "deploy": "npm run build && netlify deploy --prod --dir=out"
  }
}
```

### 3. Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://disruptorsmedia.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FORM_ACTION=https://formspree.io/f/YOUR_ID
NETLIFY_SITE_ID=your-site-id
```

## Netlify Configuration

### 1. netlify.toml
```toml
[build]
  publish = "out"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/admin/*"
  to = "/404"
  status = 404

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 2. _redirects File
```
# Redirect old URLs if needed
/old-page /new-page 301
/portfolio /work 301

# SPA fallback
/* /index.html 200
```

## Performance Optimizations

### 1. Code Splitting
```javascript
// Route-based code splitting
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));

// Component-based code splitting
const VideoPlayer = lazy(() => import('../components/VideoPlayer'));
```

### 2. Bundle Analysis
```json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build"
  }
}
```

### 3. Service Worker for Caching
```javascript
// Register service worker for offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
```

## SEO Configuration

### 1. Meta Tags Management
```jsx
import Head from 'next/head';

const SEOHead = ({ title, description, image, url }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    
    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    
    {/* Structured Data */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Disruptors Media",
          "url": "https://disruptorsmedia.com"
        })
      }}
    />
  </Head>
);
```

### 2. Sitemap Generation
```javascript
// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const pages = ['/', '/about', '/services', '/work', '/contact', '/faq'];
const siteUrl = 'https://disruptorsmedia.com';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
```

## Analytics Integration

### 1. Google Analytics 4
```jsx
// components/Analytics.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Analytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return null;
};

export default Analytics;
```

### 2. Google Tag Manager
```jsx
// _document.js
export default function Document() {
  return (
    <Html>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
      </Head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## Testing and Quality Assurance

### 1. Lighthouse CI
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/", "http://localhost:3000/about"],
      "staticDistDir": "./out"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["warn", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

### 2. Testing Commands
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lighthouse": "lhci autorun",
    "bundle-analyzer": "npm run build && npx bundle-analyzer ./out/_next/static/chunks/*.js"
  }
}
```

## Deployment Pipeline

### 1. Automated Deployment
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lighthouse
      - uses: netlify/actions/cli@master
        with:
          args: deploy --dir=out --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 2. Preview Deployments
Netlify automatically creates preview deployments for pull requests, enabling:
- Design review before merging
- Content validation
- Performance testing
- Cross-browser testing

## Security Considerations

### 1. Content Security Policy
```javascript
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
  child-src *.youtube.com *.vimeo.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};
```

### 2. Environment Variable Security
- Never commit sensitive data to version control
- Use Netlify environment variables for secrets
- Prefix public variables with `NEXT_PUBLIC_` or `REACT_APP_`

This static deployment approach provides all the functionality of the original site while being more performant, secure, and cost-effective than a traditional server-based deployment.