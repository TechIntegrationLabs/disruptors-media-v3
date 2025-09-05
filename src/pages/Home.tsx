import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
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

      {/* Results Section */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our data-driven approach delivers measurable outcomes for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">$50M+</div>
              <div className="text-gray-300">Revenue Generated</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">200+</div>
              <div className="text-gray-300">Successful Campaigns</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">95%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

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