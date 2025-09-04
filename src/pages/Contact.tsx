import React from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const Contact: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-sophisticated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Let's Get Started
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Ready to transform your business with AI-powered marketing? We're here to help you succeed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">
                Send Us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="ai-marketing">AI Marketing Strategy</option>
                    <option value="digital-transformation">Digital Transformation</option>
                    <option value="content-production">Content Production</option>
                    <option value="studio-services">Studio Services</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    placeholder="Tell us about your project, goals, and how we can help..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-lg"
                >
                  Send Message
                </button>

                <p className="text-sm text-gray-400 text-center">
                  We'll respond within 24 hours during business days.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">
                Get in Touch
              </h2>

              <div className="space-y-8">
                {/* Contact Methods */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <PhoneIcon className="h-6 w-6 text-gold mr-4 flex-shrink-0" />
                      <div>
                        <div className="text-white font-medium">Phone</div>
                        <a href="tel:(801)555-6634" className="text-gray-300 hover:text-gold">
                          (801) 555-MEDIA
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <EnvelopeIcon className="h-6 w-6 text-gold mr-4 flex-shrink-0" />
                      <div>
                        <div className="text-white font-medium">Email</div>
                        <a href="mailto:hello@disruptorsmedia.com" className="text-gray-300 hover:text-gold">
                          hello@disruptorsmedia.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPinIcon className="h-6 w-6 text-gold mr-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-white font-medium">Location</div>
                        <div className="text-gray-300">
                          North Salt Lake, Utah<br />
                          Professional Studio Available
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <ClockIcon className="h-6 w-6 text-gold mr-4 flex-shrink-0" />
                      <div>
                        <div className="text-white font-medium">Business Hours</div>
                        <div className="text-gray-300">
                          Monday - Friday: 9 AM - 6 PM MST
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Response Time</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Email Inquiries</span>
                      <span className="text-gold font-semibold">24 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Phone Calls</span>
                      <span className="text-gold font-semibold">Same day</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Project Proposals</span>
                      <span className="text-gold font-semibold">2-3 days</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a 
                      href="/assessment" 
                      className="block w-full text-center btn-secondary py-3"
                    >
                      Take AI Readiness Assessment
                    </a>
                    <a 
                      href="/calculator" 
                      className="block w-full text-center btn-secondary py-3"
                    >
                      Calculate ROI Potential
                    </a>
                    <a 
                      href="/services/studio" 
                      className="block w-full text-center btn-secondary py-3"
                    >
                      Book Studio Session
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-dark-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                How do I get started with AI marketing?
              </h3>
              <p className="text-gray-300">
                Start with our free AI Readiness Assessment to understand where AI can impact your business most. From there, we'll schedule a consultation to discuss your specific needs and develop a custom strategy.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                What's included in your AI marketing services?
              </h3>
              <p className="text-gray-300">
                Our services include strategy development, AI tool implementation, automation setup, performance monitoring, and ongoing optimization. We also provide training for your team and comprehensive reporting.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                How can I book your professional studio?
              </h3>
              <p className="text-gray-300">
                Studio bookings can be made through our contact form, by phone, or by visiting our studio services page. We require 24-hour advance notice and have a 2-hour minimum booking policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;