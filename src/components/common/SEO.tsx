import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  noindex = false,
  canonical
}) => {
  // Default values
  const defaultTitle = 'Disruptors Media - AI-Powered Marketing Solutions';
  const defaultDescription = 'Transform your business with AI-powered marketing strategies, professional content production, and data-driven digital transformation. 12+ years of proven results generating $50M+ in client revenue.';
  const defaultImage = 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1/og-images/disruptors-media-og-default.jpg';
  const defaultUrl = 'https://disruptorsmedia.com';
  const defaultKeywords = 'AI marketing, digital transformation, content production, studio services, marketing automation, business growth, North Salt Lake, Utah';

  const siteTitle = title ? `${title} | Disruptors Media` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteImage = image || defaultImage;
  const siteUrl = url || defaultUrl;
  const siteKeywords = keywords || defaultKeywords;

  // JSON-LD Schema for better SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Disruptors Media",
    "url": "https://disruptorsmedia.com",
    "logo": "https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/logo/disruptors-media-logo.png",
    "description": defaultDescription,
    "foundingDate": "2012",
    "founder": {
      "@type": "Person",
      "name": "Moe"
    },
    "location": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "North Salt Lake",
        "addressRegion": "Utah",
        "addressCountry": "US"
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "(801) 555-0123",
      "contactType": "customer service",
      "email": "hello@disruptorsmedia.com"
    },
    "sameAs": [
      "https://twitter.com/DisruptorsMedia",
      "https://www.instagram.com/disruptorsmedia_",
      "https://www.youtube.com/channel/UCIS7eKSZMJWnUT1dTLBjOWA",
      "https://www.tiktok.com/@disruptorsmedia"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "AI Marketing Solutions",
        "description": "AI-powered marketing strategies and automation"
      },
      {
        "@type": "Service", 
        "name": "Digital Transformation",
        "description": "Complete digital infrastructure overhaul and optimization"
      },
      {
        "@type": "Service",
        "name": "Content Production",
        "description": "Professional video, podcast, and content creation services"
      },
      {
        "@type": "Service",
        "name": "Studio Services",
        "description": "Professional studio facility with state-of-the-art equipment"
      }
    ]
  };

  const articleSchema = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": author || "Disruptors Media Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Disruptors Media",
      "logo": {
        "@type": "ImageObject",
        "url": "https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/logo/disruptors-media-logo.png"
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  } : null;

  const breadcrumbSchema = url && url !== defaultUrl ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://disruptorsmedia.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": url
      }
    ]
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      {author && <meta name="author" content={author} />}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Disruptors Media" />

      {/* Article specific Open Graph */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:site" content="@DisruptorsMedia" />
      <meta name="twitter:creator" content="@DisruptorsMedia" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#FFD700" />
      <meta name="msapplication-TileColor" content="#FFD700" />
      
      {/* Language */}
      <html lang="en" />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//res.cloudinary.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </Helmet>
  );
};

export default SEO;