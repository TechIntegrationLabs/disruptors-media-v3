import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CpuChipIcon,
  ArrowPathIcon,
  FilmIcon,
  VideoCameraIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const services = [
  {
    title: 'AI Marketing Strategy',
    description: 'Leverage cutting-edge AI to optimize campaigns, predict customer behavior, and achieve unprecedented ROI.',
    icon: CpuChipIcon,
    href: '/services/ai-marketing',
    features: [
      'AI-powered campaign optimization',
      'Predictive analytics',
      'Automated A/B testing',
      'Performance tracking'
    ],
    highlight: 'Most Popular',
    color: 'from-gold/20 to-cream'
  },
  {
    title: 'Digital Transformation',
    description: 'Modernize your business operations with cloud solutions, automation, and AI integration.',
    icon: ArrowPathIcon,
    href: '/services/digital-transformation',
    features: [
      'Cloud migration',
      'Process automation',
      'Data security',
      'Change management'
    ],
    color: 'from-blue-50 to-cream'
  },
  {
    title: 'Content Production',
    description: 'Professional video, podcast, and content creation services to tell your story effectively.',
    icon: FilmIcon,
    href: '/services/content-production',
    features: [
      'Video production',
      'Podcast recording',
      'Photography',
      'Content writing'
    ],
    color: 'from-purple-50 to-cream'
  },
  {
    title: 'Studio Services',
    description: 'State-of-the-art studio facility with professional equipment for all your production needs.',
    icon: VideoCameraIcon,
    href: '/services/studio',
    features: [
      'BlackMagic cameras',
      'Shure SM7B mics',
      'Green screen',
      '$99/hour rate'
    ],
    highlight: 'Book Now',
    color: 'from-green-50 to-cream'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We analyze your current state and identify opportunities for growth'
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'Develop a customized plan aligned with your business goals'
  },
  {
    step: '03',
    title: 'Implementation',
    description: 'Execute the strategy with our expert team and proven methods'
  },
  {
    step: '04',
    title: 'Optimization',
    description: 'Continuously improve and scale based on performance data'
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark via-dark/95 to-dark/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Services That <span className="text-gold">Drive Results</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              From AI-powered marketing to professional content production, we provide comprehensive 
              solutions that transform your business and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Get Started
              </Link>
              <a
                href="#services"
                className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
              >
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrated solutions designed to work together for maximum impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gradient-to-br ${service.color} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                {service.highlight && (
                  <span className="absolute top-4 right-4 bg-gold text-dark text-sm font-semibold px-3 py-1 rounded-full">
                    {service.highlight}
                  </span>
                )}
                
                <service.icon className="w-12 h-12 text-gold mb-4" />
                <h3 className="text-2xl font-bold text-dark mb-3">{service.title}</h3>
                <p className="text-gray-700 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 text-gold hover:text-gold/80 font-semibold group-hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">How We Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven process ensures successful outcomes for every client
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-gold/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-bold text-dark mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Why Choose <span className="text-gold">Disruptors Media</span>?
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Integrated Approach</h3>
                  <p className="text-gray-300">
                    Our services work together seamlessly. Use AI insights to inform content 
                    strategy, or leverage our studio for transformation announcements.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Proven Results</h3>
                  <p className="text-gray-300">
                    $50M+ in revenue generated, 200+ successful campaigns, and 95% client 
                    satisfaction rate speak to our track record.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                  <p className="text-gray-300">
                    Our specialists bring deep expertise in AI, marketing, technology, and 
                    creative production to every project.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Local Presence</h3>
                  <p className="text-gray-300">
                    Based in Utah with a professional studio facility, we combine local 
                    accessibility with global capabilities.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://via.placeholder.com/600x500/1a1a1a/d4af37?text=Why+Choose+Us"
                alt="Why Choose Disruptors Media"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold text-dark p-6 rounded-lg shadow-xl">
                <div className="text-4xl font-bold">12+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Service Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combine services for comprehensive solutions and better value
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg text-center"
            >
              <h3 className="text-2xl font-bold text-dark mb-4">Growth Package</h3>
              <p className="text-gray-600 mb-6">
                Perfect for companies ready to scale with AI-powered marketing
              </p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>AI Marketing Strategy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Content Production</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Monthly Analytics</span>
                </li>
              </ul>
              <Link
                to="/contact?package=growth"
                className="bg-gold hover:bg-gold/90 text-dark px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg text-center ring-2 ring-gold transform scale-105"
            >
              <div className="bg-gold text-dark text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Transformation Package</h3>
              <p className="text-gray-600 mb-6">
                Complete digital transformation with ongoing support
              </p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Everything in Growth</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Digital Transformation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Studio Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <Link
                to="/contact?package=transformation"
                className="bg-gold hover:bg-gold/90 text-dark px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-lg text-center"
            >
              <h3 className="text-2xl font-bold text-dark mb-4">Enterprise Package</h3>
              <p className="text-gray-600 mb-6">
                Custom solutions for large organizations
              </p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>All Services</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Dedicated Team</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>Custom Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span>SLA Guarantee</span>
                </li>
              </ul>
              <Link
                to="/contact?package=enterprise"
                className="bg-dark hover:bg-dark/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark to-dark/90 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to <span className="text-gold">Transform Your Business</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss which services will help you achieve your goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Start a Conversation
            </Link>
            <Link
              to="/portfolio"
              className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}