import React from 'react';
import SEO from '../components/common/SEO';
import WorkGrid from '../components/sections/WorkGrid';
import { CLOUDINARY_ASSETS } from '../constants/cloudinaryAssets';

// PRD Work Portfolio Data
const portfolioProjects = [
  {
    id: 1,
    title: 'TECH INNOVATORS BRAND LAUNCH',
    category: 'BRAND IDENTITY • WEB DESIGN',
    image: CLOUDINARY_ASSETS.work_1,
    slug: 'tech-innovators-brand-launch'
  },
  {
    id: 2,
    title: 'HEALTHCARE TRANSFORMATION CAMPAIGN',
    category: 'VIDEO PRODUCTION • MARKETING',
    image: CLOUDINARY_ASSETS.work_2,
    slug: 'healthcare-transformation-campaign'
  },
  {
    id: 3,
    title: 'STARTUP GROWTH ACCELERATOR',
    category: 'DIGITAL STRATEGY • CREATIVE',
    image: CLOUDINARY_ASSETS.work_3,
    slug: 'startup-growth-accelerator'
  },
  {
    id: 4,
    title: 'E-COMMERCE PLATFORM REDESIGN',
    category: 'WEB DEVELOPMENT • UX/UI',
    image: CLOUDINARY_ASSETS.work_4,
    slug: 'ecommerce-platform-redesign'
  },
  {
    id: 5,
    title: 'PROFESSIONAL SERVICES BRANDING',
    category: 'PHOTOGRAPHY • BRANDING',
    image: CLOUDINARY_ASSETS.work_5,
    slug: 'professional-services-branding'
  },
  {
    id: 6,
    title: 'MULTIMEDIA AWARENESS CAMPAIGN',
    category: 'MULTIMEDIA • CAMPAIGN',
    image: CLOUDINARY_ASSETS.work_6,
    slug: 'multimedia-awareness-campaign'
  }
];

const Work: React.FC = () => {
  return (
    <div className="min-h-screen bg-texture">
      <SEO
        title="Work - Disruptors Media"
        description="Explore our portfolio of creative work including brand identity, web design, video production, and digital marketing campaigns. See our results."
        keywords="portfolio, creative work, brand identity, web design, video production, digital marketing, case studies, projects"
        url="https://disruptorsmedia.com/work"
        type="website"
      />
      
      {/* 1. Work Hero Section - PRD Specification */}
      <section 
        className="relative w-full"
        style={{ 
          paddingTop: '130px', 
          paddingBottom: '110px',
          background: 'transparent'
        }}
      >
        <div className="container-custom">
          {/* Page Title - PRD Specification */}
          <h1 
            className="text-brand-charcoal text-center mb-20"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '220.302px',
              fontWeight: 600,
              lineHeight: '198.59px',
              textTransform: 'uppercase',
              marginBottom: '75px'
            }}
          >
            WORK
          </h1>
        </div>
      </section>

      {/* 2. Portfolio Grid Section - PRD Specification */}
      <section className="w-full work-lst" style={{ paddingBottom: '0' }}>
        <WorkGrid portfolio={portfolioProjects} />
      </section>

      {/* CTA Section */}
      <section className="w-full text-center" style={{ padding: '60px 0' }}>
        <div className="container-custom">
          <h2 
            className="text-brand-charcoal mb-8"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '63px',
              fontWeight: 600,
              lineHeight: '68.6px',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '30px'
            }}
          >
            INTERESTED IN WORKING WITH US?
          </h2>
          
          <p 
            className="text-brand-charcoal mb-12"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '28px',
              textAlign: 'center',
              marginBottom: '40px'
            }}
          >
            Let's discuss your project and explore how our creative expertise can bring your vision to life.
          </p>

          <button 
            className="cta-large"
            style={{
              background: 'var(--color-brand-charcoal)',
              color: 'var(--color-brand-cream)',
              fontFamily: 'var(--font-primary)',
              fontSize: '39.645px',
              fontWeight: 400,
              lineHeight: '47.65px',
              textTransform: 'uppercase',
              padding: '16px 21px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minWidth: '300px',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/contact'}
          >
            <span>START A PROJECT</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              className="ml-4"
            >
              <path 
                d="M7 17L17 7M17 7H7M17 7V17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Work;