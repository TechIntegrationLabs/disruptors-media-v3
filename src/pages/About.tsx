import React, { useState, useRef } from 'react';
import SEO from '../components/common/SEO';

const About: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Company statistics - PRD Specification
  const companyStats = [
    { number: '12+', label: 'YEARS OF EXPERIENCE' },
    { number: '200+', label: 'PROJECTS COMPLETED' },
    { number: '95%', label: 'CLIENT SATISFACTION' },
    { number: '25+', label: 'TEAM MEMBERS' }
  ];

  // Core values - PRD Specification
  const coreValues = [
    {
      title: 'INNOVATION',
      description: 'We embrace cutting-edge technology and creative solutions to solve complex business challenges and deliver exceptional results.'
    },
    {
      title: 'EXCELLENCE',
      description: 'Our commitment to quality drives everything we do, from strategic planning to final delivery and ongoing support.'
    },
    {
      title: 'COLLABORATION',
      description: 'We believe in true partnership with our clients, working together to achieve shared goals and sustainable growth.'
    },
    {
      title: 'INTEGRITY',
      description: 'Transparency, honesty, and ethical practices are the foundation of all our client relationships and business operations.'
    }
  ];

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-texture">
      <SEO
        title="About - Disruptors Media"
        description="Learn about our mission, values, and approach to creative strategy, brand development, and digital marketing. Discover what makes us different."
        keywords="about us, creative agency, brand strategy, digital marketing, company values, mission, team"
        url="https://disruptorsmedia.com/about"
        type="website"
      />
      
      {/* 1. About Hero Section - PRD Specification with Modified Padding */}
      <section 
        className="relative w-full"
        style={{ 
          paddingTop: '186px', // Modified from 130px per PRD
          paddingBottom: '110px',
          background: 'transparent'
        }}
      >
        <div className="container-custom">
          {/* Page Title - PRD Specification */}
          <h1 
            className="text-brand-charcoal mb-20"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '220.302px',
              fontWeight: 600,
              lineHeight: '198.59px',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '75px'
            }}
          >
            ABOUT
          </h1>

          {/* About Subtitle - PRD Specification with Custom Styling */}
          <h2 
            className="text-brand-charcoal mb-16"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '63px',
              fontWeight: 600,
              lineHeight: '68.6px',
              color: 'var(--color-brand-charcoal)',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '894px',
              marginBottom: '70px'
            }}
          >
            CREATIVE EXCELLENCE MEETS STRATEGIC INNOVATION
          </h2>
        </div>
      </section>

      {/* 2. About Content Section - PRD Specification */}
      <section className="w-full">
        <div className="container-custom">
          {/* Introduction Paragraph - PRD Specification */}
          <p 
            className="text-brand-charcoal mb-20"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '28px',
              color: 'var(--color-brand-charcoal)',
              textAlign: 'justify',
              marginBottom: '80px'
            }}
          >
            Founded with a vision to transform how businesses connect with their audiences, Disruptors Media has been at the forefront of creative and digital innovation for over a decade. We believe that great marketing is more than just promotion – it's about creating meaningful connections, telling compelling stories, and driving measurable results that impact your bottom line.
          </p>

          {/* Company Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-brand-charcoal mb-2"
                  style={{
                    fontFamily: 'var(--font-secondary)',
                    fontSize: '48px',
                    fontWeight: 600,
                    lineHeight: '1'
                  }}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-brand-charcoal"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    fontWeight: 400,
                    textTransform: 'uppercase'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Video Section - PRD Specification */}
      <section className="w-full py-20">
        <div className="container-custom">
          <h2 
            className="text-brand-charcoal text-center mb-12"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '63px',
              fontWeight: 600,
              lineHeight: '68.6px',
              textTransform: 'uppercase',
              marginBottom: '50px'
            }}
          >
            OUR STORY
          </h2>

          {/* Video Player */}
          <div className="relative max-w-4xl mx-auto">
            <video
              ref={videoRef}
              className="w-full h-auto"
              poster="/images/poster-abt.jpg"
              controls={false}
              playsInline
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source src="/videos/dm-abt.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Video Controls Overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={toggleVideo}
              style={{
                background: isVideoPlaying ? 'transparent' : 'rgba(0,0,0,0.3)'
              }}
            >
              {!isVideoPlaying && (
                <div 
                  className="play-button"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'var(--color-brand-charcoal)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <img 
                    src="/images/play-ico.png" 
                    alt="Play Video" 
                    className="w-8 h-8 ml-1"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Values/Philosophy Section - PRD Specification */}
      <section 
        className="w-full"
        style={{
          background: 'var(--color-warm-beige)',
          padding: '60px 30px'
        }}
      >
        <div className="container-custom">
          {/* Section Title */}
          <h2 
            className="text-brand-charcoal text-center mb-12"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '63px',
              fontWeight: 600,
              lineHeight: '68.6px',
              textTransform: 'uppercase',
              marginBottom: '50px'
            }}
          >
            OUR PHILOSOPHY
          </h2>

          {/* Philosophy Text */}
          <p 
            className="text-pure-black mb-16 text-center"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '28px',
              color: 'var(--color-pure-black)',
              textAlign: 'justify',
              marginBottom: '60px'
            }}
          >
            We believe that exceptional creative work is born from the intersection of strategic thinking, innovative technology, and deep understanding of human behavior. Our approach combines data-driven insights with creative intuition to deliver campaigns that not only look remarkable but drive meaningful business results.
          </p>

          {/* Core Values */}
          <h3 
            className="text-brand-charcoal text-center mb-12"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '39px',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '40px'
            }}
          >
            OUR VALUES
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="mb-8">
                <h4 
                  className="text-brand-charcoal mb-3"
                  style={{
                    fontFamily: 'var(--font-secondary)',
                    fontSize: '24px',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}
                >
                  {value.title}
                </h4>
                <p 
                  className="text-pure-black"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '28px',
                    color: 'var(--color-pure-black)'
                  }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Client Approach Section - PRD Specification */}
      <section className="w-full py-20">
        <div className="container-custom">
          <h2 
            className="text-brand-charcoal text-center mb-12"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '63px',
              fontWeight: 600,
              lineHeight: '68.6px',
              textTransform: 'uppercase',
              marginBottom: '50px'
            }}
          >
            HOW WE WORK WITH CLIENTS
          </h2>

          <p 
            className="text-brand-charcoal mb-16 text-center"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '28px',
              textAlign: 'justify',
              marginBottom: '60px'
            }}
          >
            Our collaborative process ensures that every project is tailored to your unique needs, goals, and market position. We don't believe in one-size-fits-all solutions – instead, we work closely with you to understand your business, your challenges, and your vision for success.
          </p>

          {/* Process Steps */}
          <h3 
            className="text-brand-charcoal text-center mb-12"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '39px',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '40px'
            }}
          >
            OUR PROCESS
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '01', title: 'DISCOVERY & STRATEGY', description: 'Understanding your business, market, and goals' },
              { number: '02', title: 'DESIGN & DEVELOPMENT', description: 'Creating compelling solutions that resonate' },
              { number: '03', title: 'IMPLEMENTATION', description: 'Bringing strategies to life across all channels' },
              { number: '04', title: 'LAUNCH & SUPPORT', description: 'Ensuring success and continuous optimization' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-brand-charcoal mb-3"
                  style={{
                    fontFamily: 'var(--font-secondary)',
                    fontSize: '48px',
                    fontWeight: 600,
                    lineHeight: '1'
                  }}
                >
                  {step.number}
                </div>
                <h4 
                  className="text-brand-charcoal mb-3"
                  style={{
                    fontFamily: 'var(--font-secondary)',
                    fontSize: '20px',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}
                >
                  {step.title}
                </h4>
                <p 
                  className="text-brand-charcoal"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px'
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact CTA Section - PRD Specification */}
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
            READY TO WORK TOGETHER?
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
            Let's discuss your vision and explore how our expertise can help you achieve your goals and drive meaningful growth.
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
            <span>GET IN TOUCH</span>
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

export default About;