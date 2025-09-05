import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import VideoHero from '../components/sections/VideoHero';
import ClientLogos from '../components/sections/ClientLogos';
import StudioShowcase from '../components/sections/StudioShowcase';
import Testimonials from '../components/sections/Testimonials';
import BlogPreview from '../components/sections/BlogPreview';
import Newsletter from '../components/sections/Newsletter';
import AnimatedCounters from '../components/sections/AnimatedCounters';
import { featuredClients } from '../data/clients';
import { testimonials } from '../data/clients';
import { blogPosts } from '../data/blog';

const Home: React.FC = () => {
  // Convert client data to logo format
  const clientLogos = featuredClients.map(client => ({
    name: client.name,
    src: client.logo,
    href: client.url
  }));

  // Get featured blog posts
  const featuredBlogPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  const counters = [
    { label: 'Revenue Generated', value: 50, suffix: 'M+', prefix: '$' },
    { label: 'Successful Campaigns', value: 200, suffix: '+' },
    { label: 'Client Satisfaction', value: 95, suffix: '%' },
    { label: 'Years of Excellence', value: 12, suffix: '+' },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="AI-Powered Marketing Solutions That Drive Results"
        description="Transform your business with data-driven AI marketing strategies, professional content production, and digital transformation. 12+ years generating $50M+ in client revenue."
        keywords="AI marketing, digital transformation, content production, studio services, marketing automation, business growth, North Salt Lake, Utah, AI-powered marketing, data-driven strategies"
        url="https://disruptorsmedia.com"
        type="website"
      />
      <VideoHero
        title="AI Marketing That Drives Results"
        subtitle="Transform your business with data-driven strategies and professional content production"
        videoUrl="https://cdn.coverr.co/videos/coverr-typing-on-laptop-keyboard-1005/1080p.mp4"
        posterImage="https://via.placeholder.com/1920x1080/1a1a1a/d4af37?text=Hero+Video"
        primaryCta={{ text: 'Start Your Transformation', href: '/contact' }}
        secondaryCta={{ text: 'Watch Our Work', href: '/portfolio' }}
      />
      
      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered marketing strategies to professional studio production,
              we provide comprehensive solutions for your business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-cream to-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-gold text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-dark mb-4">AI Marketing Strategy</h3>
              <p className="text-gray-600 mb-6">
                Leverage cutting-edge AI technology to optimize your marketing campaigns,
                analyze customer data, and drive measurable results.
              </p>
              <Link
                to="/services/ai-marketing"
                className="btn-primary inline-block"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gold/10 to-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-gold text-4xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold text-dark mb-4">Professional Studio</h3>
              <p className="text-gray-600 mb-6">
                State-of-the-art studio facility with professional equipment for
                video production, podcasting, and content creation.
              </p>
              <Link
                to="/services/studio"
                className="btn-primary inline-block"
              >
                Book Studio
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos logos={clientLogos} />

      {/* Studio Showcase */}
      <StudioShowcase />

      {/* Animated Counters */}
      <AnimatedCounters counters={counters} />

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* Blog Preview */}
      <BlogPreview posts={featuredBlogPosts} />

      {/* Newsletter */}
      <Newsletter />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold/10 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let's discuss how our AI-powered solutions and professional services
            can accelerate your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Get Started
            </Link>
            <a href="#services" className="btn-secondary">
              View Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;