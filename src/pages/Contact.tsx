import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { companyInfo } from '../data/team';

type FormType = 'general' | 'project' | 'studio' | 'partnership';
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  studioDate?: string;
  studioTime?: string;
  partnershipType?: string;
}

const Contact: React.FC = () => {
  const [activeForm, setActiveForm] = useState<FormType>('general');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    studioDate: '',
    studioTime: '',
    partnershipType: ''
  });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          studioDate: '',
          studioTime: '',
          partnershipType: ''
        });
      }, 3000);
    }, 1500);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formTypes = [
    { id: 'general', label: 'General Inquiry', icon: ChatBubbleLeftRightIcon },
    { id: 'project', label: 'Project Quote', icon: CheckCircleIcon },
    { id: 'studio', label: 'Studio Booking', icon: CalendarDaysIcon },
    { id: 'partnership', label: 'Partnership', icon: ExclamationTriangleIcon }
  ];

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your business with AI-powered marketing?
            Choose how you'd like to connect with us below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Contact Details */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <PhoneIcon className="h-6 w-6 text-gold mr-4" />
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <div className="text-gray-300">{companyInfo.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <EnvelopeIcon className="h-6 w-6 text-gold mr-4" />
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-300">{companyInfo.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPinIcon className="h-6 w-6 text-gold mr-4" />
                  <div>
                    <div className="text-white font-medium">Location</div>
                    <div className="text-gray-300">{companyInfo.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ClockIcon className="h-6 w-6 text-gold mr-4" />
                  <div>
                    <div className="text-white font-medium">Business Hours</div>
                    <div className="text-gray-300">Mon-Fri: 9AM-6PM MST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/assessment"
                  className="w-full btn-primary text-center block"
                >
                  Take AI Assessment
                </a>
                <a
                  href="/roi-calculator"
                  className="w-full btn-secondary text-center block"
                >
                  Calculate ROI
                </a>
                <a
                  href="https://cal.com/disruptors-media/strategy-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-outline text-center block"
                >
                  Book Strategy Call
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {Object.entries(companyInfo.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gold/20 text-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300"
                  >
                    <span className="sr-only">{platform}</span>
                    <div className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Forms */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-8">
              {/* Form Type Selector */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">How can we help you?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formTypes.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveForm(id as FormType)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        activeForm === id
                          ? 'border-gold bg-gold/10 text-white'
                          : 'border-white/20 bg-dark-light text-gray-300 hover:border-gold/50'
                      }`}
                    >
                      <Icon className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                {/* Form-specific fields */}
                {activeForm === 'project' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                      >
                        <option value="">Select type</option>
                        <option value="ai-marketing">AI Marketing</option>
                        <option value="digital-transformation">Digital Transformation</option>
                        <option value="content-production">Content Production</option>
                        <option value="studio-services">Studio Services</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                      >
                        <option value="">Select budget</option>
                        <option value="5k-15k">$5K - $15K</option>
                        <option value="15k-50k">$15K - $50K</option>
                        <option value="50k-100k">$50K - $100K</option>
                        <option value="100k+">$100K+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-3-months">1-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="6-months+">6+ months</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeForm === 'studio' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.studioDate}
                        onChange={(e) => handleInputChange('studioDate', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Time
                      </label>
                      <select
                        value={formData.studioTime}
                        onChange={(e) => handleInputChange('studioTime', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                      >
                        <option value="">Select time</option>
                        <option value="morning">Morning (9AM-12PM)</option>
                        <option value="afternoon">Afternoon (1PM-5PM)</option>
                        <option value="evening">Evening (6PM-9PM)</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeForm === 'partnership' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Partnership Type
                    </label>
                    <select
                      value={formData.partnershipType}
                      onChange={(e) => handleInputChange('partnershipType', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select partnership type</option>
                      <option value="referral">Referral Partner</option>
                      <option value="technology">Technology Integration</option>
                      <option value="reseller">Reseller/Agency</option>
                      <option value="strategic">Strategic Alliance</option>
                    </select>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    placeholder="Tell us about your project, goals, or questions..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-300 ${
                    formStatus === 'success'
                      ? 'bg-green-500 text-white'
                      : formStatus === 'error'
                      ? 'bg-red-500 text-white'
                      : formStatus === 'loading'
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gold text-dark hover:bg-gold-light'
                  }`}
                >
                  {formStatus === 'loading' && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {formStatus === 'loading' ? 'Sending...' :
                   formStatus === 'success' ? 'Message Sent!' :
                   formStatus === 'error' ? 'Try Again' :
                   'Send Message'}
                </button>

                {formStatus === 'success' && (
                  <div className="text-center text-green-400 text-sm">
                    Thank you! We'll get back to you within 24 hours.
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Cal.com Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prefer to Schedule a Call?
            </h2>
            <p className="text-xl text-gray-300">
              Book a free 30-minute strategy session to discuss your needs.
            </p>
          </div>
          
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                { title: 'Strategy Session', duration: '30 mins', description: 'Discuss goals and challenges' },
                { title: 'Project Consultation', duration: '60 mins', description: 'Deep dive into your project needs' },
                { title: 'Studio Tour', duration: '45 mins', description: 'Visit our facility and see the setup' }
              ].map((session, index) => (
                <div key={index} className="text-center">
                  <CalendarDaysIcon className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{session.title}</h3>
                  <div className="text-gold font-medium mb-2">{session.duration}</div>
                  <p className="text-gray-300 text-sm">{session.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <iframe
                src="https://cal.com/disruptors-media/strategy-session"
                width="100%"
                height="600"
                frameBorder="0"
                className="rounded-lg"
                title="Schedule Strategy Session"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;