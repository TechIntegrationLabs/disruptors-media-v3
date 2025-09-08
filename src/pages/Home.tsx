import React from 'react';
import SEO from '../components/common/SEO';

// PRD-Compliant Sections
import HeroSection from '../components/sections/HeroSection';
import CTASection from '../components/sections/CTASection';  
import InteractiveSection from '../components/sections/InteractiveSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSlider from '../components/sections/ServicesSlider';
import FeaturedClients from '../components/sections/FeaturedClients';
import FeaturedQuote from '../components/sections/FeaturedQuote';
import WorkGrid from '../components/sections/WorkGrid';
import VideoGallery from '../components/sections/VideoGallery';
import PreFooter from '../components/sections/PreFooter';
const Home: React.FC = () => {
  // PRD Homepage Content Data
  const heroData = {
    title: "DISRUPTORS", // Will be styled with exact PRD specifications
    subtitle: "CREATIVE STRATEGY & DIGITAL INNOVATION", // Exact PRD subtitle
  };

  const aboutContent = {
    title: "WHO WE ARE",
    content: `We are creative strategists and digital innovators who believe in disrupting traditional approaches to deliver exceptional results. Our team combines cutting-edge technology with proven creative methodologies to transform businesses and amplify their impact in the marketplace.`
  };

  const servicesData = [
    {
      id: 1,
      title: "Creative Strategy",
      description: "Brand positioning and creative direction that cuts through the noise and connects with your target audience.",
      backgroundImage: "/images/what-we-do-bx-1.png"
    },
    {
      id: 2, 
      title: "Brand Development",
      description: "Complete identity systems and brand guidelines that establish your unique market position.",
      backgroundImage: "/images/what-we-do-bx-2.png"
    },
    {
      id: 3,
      title: "Web Development", 
      description: "Custom websites and digital experiences that drive engagement and conversions.",
      backgroundImage: "/images/what-we-do-bx-3.png"
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Data-driven strategies and campaigns that deliver measurable results and ROI.",
      backgroundImage: "/images/what-we-do-bx.png"
    },
    {
      id: 5,
      title: "Video Production",
      description: "Professional video content and animation that tells your story with impact.",
      backgroundImage: "/images/what-we-do-bx-1.png"
    },
    {
      id: 6,
      title: "Photography",
      description: "Commercial photography and visual content that showcases your brand professionally.",
      backgroundImage: "/images/what-we-do-bx-2.png"
    }
  ];

  const workPortfolio = [
    {
      id: 1,
      title: "Brand Identity System",
      category: "Brand Development",
      image: "/images/work-1.jpg",
      slug: "brand-identity-system"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "/images/work-2.jpg", 
      slug: "ecommerce-platform"
    },
    {
      id: 3,
      title: "Marketing Campaign",
      category: "Digital Marketing",
      image: "/images/work-3.jpg",
      slug: "marketing-campaign"
    },
    {
      id: 4,
      title: "Corporate Video",
      category: "Video Production",
      image: "/images/work-4.jpg",
      slug: "corporate-video"
    },
    {
      id: 5,
      title: "Product Photography",
      category: "Photography",
      image: "/images/work-5.jpg",
      slug: "product-photography"
    },
    {
      id: 6,
      title: "Creative Strategy",
      category: "Strategy",
      image: "/images/work-6.jpg",
      slug: "creative-strategy"
    }
  ];

  const featuredQuote = {
    title: "RESULTS SPEAK LOUDER THAN PROMISES",
    content: "We don't just deliver projects – we deliver transformations. Every strategy, every design, every campaign is crafted to not just meet expectations, but to exceed them and drive real, measurable impact for our clients.",
  };

  return (
    <div className="min-h-screen bg-texture">
      <SEO
        title="Disruptors Media - Creative Strategy & Digital Innovation"
        description="Creative strategists and digital innovators delivering exceptional results through cutting-edge technology and proven creative methodologies."
        keywords="creative strategy, digital innovation, brand development, web development, digital marketing, video production, photography, disruptors media"
        url="https://disruptorsmedia.com"
        type="website"
      />
      
      {/* 1. Main Hero Section - PRD Specification */}
      <HeroSection 
        title={heroData.title}
        subtitle={heroData.subtitle}
      />
      
      {/* 2. Call-to-Action Section - PRD Specification */}
      <CTASection />
      
      {/* 3. Mobile/Interactive Section - PRD Specification */}
      <InteractiveSection />
      
      {/* 4. Who We Are Section - PRD Specification */}
      <AboutSection 
        title={aboutContent.title}
        content={aboutContent.content}
      />
      
      {/* 5. What We Do Section - PRD Specification */}
      <ServicesSlider services={servicesData} />
      
      {/* 6. Featured Clients Section - PRD Specification */}
      <FeaturedClients />
      
      {/* 7. Featured Quote Section - PRD Specification */}
      <FeaturedQuote 
        title={featuredQuote.title}
        content={featuredQuote.content}
      />
      
      {/* 8. Work Portfolio Section - PRD Specification */}
      <WorkGrid portfolio={workPortfolio} />
      
      {/* 9. Video Gallery Section - PRD Specification */}
      <VideoGallery />
      
      {/* 10. Pre-Footer Navigation - PRD Specification */}
      <PreFooter />
      
      {/* Footer will be handled by Layout wrapper */}
    </div>
  );
};

export default Home;