import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  VideoCameraIcon,
  MicrophoneIcon,
  PhotoIcon,
  PencilSquareIcon,
  FilmIcon,
  SpeakerWaveIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const contentServices = [
  {
    icon: VideoCameraIcon,
    title: 'Video Production',
    description: 'Professional video content from concept to final cut',
    features: [
      '4K/8K recording capability',
      'Multi-camera setups',
      'Professional editing',
      'Motion graphics & VFX'
    ]
  },
  {
    icon: MicrophoneIcon,
    title: 'Podcast Production',
    description: 'Complete podcast solutions in our professional studio',
    features: [
      '4 Shure SM7B microphones',
      'Multi-track recording',
      'Post-production editing',
      'Distribution support'
    ]
  },
  {
    icon: PhotoIcon,
    title: 'Photography',
    description: 'High-quality imagery for all your marketing needs',
    features: [
      'Product photography',
      'Corporate headshots',
      'Event coverage',
      'Lifestyle shoots'
    ]
  },
  {
    icon: PencilSquareIcon,
    title: 'Content Writing',
    description: 'AI-enhanced content creation that converts',
    features: [
      'Blog posts & articles',
      'Website copy',
      'Email campaigns',
      'Social media content'
    ]
  }
];

const contentPackages = [
  {
    name: 'Content Starter',
    price: '$1,500',
    period: '/month',
    description: 'Perfect for small businesses starting their content journey',
    features: [
      '4 blog posts per month',
      '20 social media posts',
      'Basic photo editing',
      'Monthly content calendar',
      'Email support'
    ],
    highlighted: false
  },
  {
    name: 'Content Pro',
    price: '$3,500',
    period: '/month',
    description: 'Comprehensive content solution for growing brands',
    features: [
      'Everything in Starter',
      '2 professional videos',
      '1 podcast episode',
      'Product photography',
      'Weekly strategy calls',
      'Priority support'
    ],
    highlighted: true
  },
  {
    name: 'Content Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'Full-service content production for established companies',
    features: [
      'Unlimited content creation',
      'Dedicated content team',
      'Studio priority access',
      'Custom workflows',
      'White-label options',
      'Quarterly reviews'
    ],
    highlighted: false
  }
];

const portfolio = [
  {
    title: 'Tech Startup Launch Video',
    category: 'Video Production',
    image: 'https://via.placeholder.com/600x400/1a1a1a/d4af37?text=Launch+Video',
    results: '2M+ views, 300% increase in sign-ups'
  },
  {
    title: 'Executive Podcast Series',
    category: 'Podcast Production',
    image: 'https://via.placeholder.com/600x400/1a1a1a/d4af37?text=Podcast+Series',
    results: 'Top 10 in Business category'
  },
  {
    title: 'Product Campaign Photography',
    category: 'Photography',
    image: 'https://via.placeholder.com/600x400/1a1a1a/d4af37?text=Product+Photos',
    results: '150% increase in conversions'
  },
  {
    title: 'AI-Powered Blog Content',
    category: 'Content Writing',
    image: 'https://via.placeholder.com/600x400/1a1a1a/d4af37?text=Blog+Content',
    results: '400% increase in organic traffic'
  }
];

export default function ContentProduction() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark via-dark/95 to-dark/90 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Content That <span className="text-gold">Captivates</span> & Converts
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              From professional video production to AI-powered content creation, we craft stories 
              that resonate with your audience and drive real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/studio-services"
                className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Book Studio Time
              </Link>
              <a
                href="#portfolio"
                className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
              >
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Full-Service Content Creation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to tell your story and engage your audience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contentServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <service.icon className="w-12 h-12 text-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Features */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Professional <span className="text-gold">Studio Facility</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our state-of-the-art studio in North Salt Lake, Utah provides everything you need 
                for professional content production.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <FilmIcon className="w-8 h-8 text-gold mb-2" />
                  <h4 className="font-bold mb-1">3 BlackMagic Cameras</h4>
                  <p className="text-sm text-gray-300">4K cinema-quality recording</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <SpeakerWaveIcon className="w-8 h-8 text-gold mb-2" />
                  <h4 className="font-bold mb-1">Acoustic Treatment</h4>
                  <p className="text-sm text-gray-300">Professional sound quality</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <PhotoIcon className="w-8 h-8 text-gold mb-2" />
                  <h4 className="font-bold mb-1">Lighting Systems</h4>
                  <p className="text-sm text-gray-300">Perfect shots every time</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <SparklesIcon className="w-8 h-8 text-gold mb-2" />
                  <h4 className="font-bold mb-1">Green Screen</h4>
                  <p className="text-sm text-gray-300">Unlimited creative options</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link
                  to="/studio-services"
                  className="bg-gold hover:bg-gold/90 text-dark px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Tour the Studio
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gold">$99/HR</span>
                  <span className="text-gray-300">Studio Rate</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Studio+1"
                alt="Studio setup"
                className="rounded-lg shadow-xl"
              />
              <img
                src="https://via.placeholder.com/300x400/1a1a1a/d4af37?text=Studio+2"
                alt="Recording session"
                className="rounded-lg shadow-xl mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Recent Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our content drives real results for our clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-semibold">{project.results}</p>
                  </div>
                </div>
                <span className="text-sm text-gold font-semibold">{project.category}</span>
                <h3 className="text-lg font-bold text-dark mt-1">{project.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Content Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible packages designed to meet your content needs and budget
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {contentPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-8 ${
                  pkg.highlighted 
                    ? 'ring-2 ring-gold shadow-xl transform scale-105' 
                    : 'shadow-lg'
                }`}
              >
                <h3 className="text-2xl font-bold text-dark mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gold">{pkg.price}</span>
                  <span className="text-gray-600">{pkg.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/contact?service=content-production&package=${pkg.name.toLowerCase().replace(' ', '-')}`}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors inline-block text-center ${
                    pkg.highlighted
                      ? 'bg-gold hover:bg-gold/90 text-dark'
                      : 'bg-dark hover:bg-dark/90 text-white'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark to-dark/90 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Create <span className="text-gold">Amazing Content</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your content needs and how we can help you achieve your goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact?service=content-production"
              className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Start a Project
            </Link>
            <Link
              to="/portfolio"
              className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}