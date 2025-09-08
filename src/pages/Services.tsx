import React, { useState } from 'react';
import SEO from '../components/common/SEO';

// PRD Services Data with Accordion Interface
const servicesData = [
  {
    id: 1,
    title: 'CREATIVE STRATEGY',
    subtitle: 'Brand Positioning & Creative Direction',
    content: `Our creative strategy services combine market research, competitive analysis, and brand positioning to develop comprehensive creative direction that resonates with your target audience. We work closely with clients to understand their unique value proposition and translate that into compelling creative strategies that drive engagement and conversion.

    Key deliverables include brand positioning statements, creative briefs, campaign concepts, and strategic messaging frameworks that serve as the foundation for all marketing and creative efforts.`
  },
  {
    id: 2,
    title: 'BRAND DEVELOPMENT',
    subtitle: 'Logo Design, Identity Systems & Guidelines',
    content: `Complete brand development services that establish a strong, cohesive brand identity across all touchpoints. Our process includes logo design, color palette development, typography selection, and comprehensive brand guidelines.

    We create scalable identity systems that maintain consistency while providing flexibility for various applications, from digital platforms to print materials. Each brand development project includes detailed usage guidelines and asset libraries.`
  },
  {
    id: 3,
    title: 'WEB DEVELOPMENT',
    subtitle: 'Custom Websites & Digital Experiences',
    content: `Custom web development solutions built with modern technologies and best practices. Our development process focuses on performance, user experience, and search engine optimization.

    Services include responsive web design, e-commerce platforms, content management systems, and web applications. We utilize the latest frameworks and technologies to create fast, secure, and scalable websites that drive results.`
  },
  {
    id: 4,
    title: 'DIGITAL MARKETING',
    subtitle: 'SEO, PPC, Social Media & Content Marketing',
    content: `Comprehensive digital marketing strategies that leverage data-driven insights to maximize ROI. Our approach combines search engine optimization, pay-per-click advertising, social media marketing, and content marketing.

    We provide detailed analytics and reporting to track performance and continuously optimize campaigns for better results. Our team stays current with platform updates and industry trends to ensure maximum effectiveness.`
  },
  {
    id: 5,
    title: 'VIDEO PRODUCTION',
    subtitle: 'Commercial Videos, Documentaries & Animation',
    content: `Professional video production services covering the complete production process from concept development to final delivery. Our capabilities include commercial videos, corporate documentaries, product demonstrations, and animated content.

    We utilize state-of-the-art equipment and post-production techniques to create compelling visual narratives that engage audiences and communicate your message effectively.`
  },
  {
    id: 6,
    title: 'PHOTOGRAPHY',
    subtitle: 'Commercial Photography & Product Shoots',
    content: `Commercial photography services for businesses of all sizes. Our photography team specializes in product photography, lifestyle shoots, corporate headshots, and commercial imagery.

    We provide comprehensive photography services including pre-production planning, professional shooting, and post-production editing to deliver high-quality images that enhance your brand presence.`
  }
];

const Services: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-texture">
      <SEO
        title="Services - Disruptors Media"
        description="Creative strategy, brand development, web development, digital marketing, video production, and photography services. Comprehensive solutions for your business growth."
        keywords="creative strategy, brand development, web development, digital marketing, video production, photography, services"
        url="https://disruptorsmedia.com/services"
        type="website"
      />
      
      {/* 1. Services Hero Section - PRD Specification */}
      <section 
        className="relative w-full"
        style={{ 
          paddingTop: '130px', 
          paddingBottom: '110px',
          background: 'transparent' // No embossed logo per PRD
        }}
      >
        <div className="container-custom">
          {/* Page Title - PRD Specification with left alignment */}
          <h1 
            className="text-brand-charcoal mb-24"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '220.302px',
              fontWeight: 600,
              lineHeight: '198.59px',
              textTransform: 'uppercase',
              textAlign: 'left', // Left-aligned instead of center
              marginBottom: '114px'
            }}
          >
            SERVICES
          </h1>

          {/* Services Introduction - PRD Specification */}
          <p 
            className="text-brand-charcoal mb-20"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '28px',
              textAlign: 'justify',
              marginBottom: '80px'
            }}
          >
            We provide comprehensive creative and digital services that transform businesses and amplify their impact in the marketplace. Our integrated approach combines strategic thinking, creative excellence, and technical expertise to deliver exceptional results that drive growth and success.
          </p>
        </div>
      </section>

      {/* 2. Services Detail Section - PRD Specification */}
      <section 
        className="w-full"
        style={{
          background: 'var(--color-warm-beige)',
          padding: '60px 30px'
        }}
      >
        <div className="container-custom">
          {/* Section Header - PRD Specification */}
          <h2 
            className="text-brand-charcoal mb-12"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '63px',
              fontWeight: 600,
              lineHeight: '68.6px',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '50px'
            }}
          >
            WHAT WE DO
          </h2>

          {/* Services Description - PRD Specification */}
          <p 
            className="text-pure-black mb-16"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '28px',
              color: 'var(--color-pure-black)', // Black text on colored background
              textAlign: 'center',
              marginBottom: '60px'
            }}
          >
            Our methodology combines strategic thinking with creative execution and technical expertise. We work collaboratively with clients to understand their unique challenges and opportunities, developing customized solutions that deliver measurable results and sustainable growth.
          </p>

          {/* 3. Interactive Services Accordion - PRD Specification */}
          <div className="space-y-5">
            {servicesData.map((service) => (
              <div 
                key={service.id}
                className="accordion-section"
                style={{
                  marginBottom: '20px',
                  padding: '20px',
                  borderBottom: '1px solid var(--color-pure-black)'
                }}
              >
                {/* Accordion Title - PRD Specification */}
                <div 
                  className="accordion-title cursor-pointer flex items-center justify-between"
                  onClick={() => toggleAccordion(service.id)}
                  style={{
                    color: 'var(--color-brand-charcoal)',
                    fontFamily: 'var(--font-secondary)',
                    fontSize: '39px',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}
                >
                  <div className="flex flex-col">
                    <span>{service.title}</span>
                    <span 
                      className="block text-brand-charcoal"
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: '20px',
                        fontWeight: 400,
                        lineHeight: '28px'
                      }}
                    >
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Toggle Icon - PRD Specification */}
                  <span 
                    className={`toggle-sign ${openAccordion === service.id ? 'minus' : 'plus'}`}
                    style={{
                      width: '39px',
                      height: '39px',
                      background: 'var(--color-brand-charcoal)',
                      borderRadius: '50%',
                      fontSize: '23px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                  >
                    {openAccordion === service.id ? '−' : '+'}
                  </span>
                </div>

                {/* Expandable Content - PRD Specification */}
                <div 
                  className={`accordion-content ${openAccordion === service.id ? 'open' : ''}`}
                  style={{
                    maxHeight: openAccordion === service.id ? '500px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease-in-out',
                    paddingTop: openAccordion === service.id ? '20px' : '0px'
                  }}
                >
                  <p 
                    className="text-pure-black"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '28px',
                      color: 'var(--color-pure-black)',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {service.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services CTA Section - PRD Specification */}
      <section 
        className="w-full text-center"
        style={{ padding: '60px 0' }}
      >
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
            READY TO GET STARTED?
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
            Let's discuss your project and explore how our services can help you achieve your goals and drive meaningful results.
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
            <span>SCHEDULE CONSULTATION</span>
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

export default Services;