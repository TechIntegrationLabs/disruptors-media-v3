import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  howDidYouHear: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    howDidYouHear: ''
  });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      // Netlify Forms submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('form-name', 'contact');
      formDataToSubmit.append('firstName', formData.firstName);
      formDataToSubmit.append('lastName', formData.lastName);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('phone', formData.phone);
      formDataToSubmit.append('company', formData.company);
      formDataToSubmit.append('projectType', formData.projectType);
      formDataToSubmit.append('budget', formData.budget);
      formDataToSubmit.append('timeline', formData.timeline);
      formDataToSubmit.append('message', formData.message);
      formDataToSubmit.append('howDidYouHear', formData.howDidYouHear);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSubmit as any).toString()
      });

      if (response.ok) {
        setFormStatus('success');
        // Reset form after success
        setTimeout(() => {
          setFormStatus('idle');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            projectType: '',
            budget: '',
            timeline: '',
            message: '',
            howDidYouHear: ''
          });
        }, 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-texture">
      <SEO
        title="Contact - Disruptors Media"
        description="Get in touch with Disruptors Media for your next project. Contact us for a free consultation on creative strategy, brand development, and digital marketing."
        keywords="contact, get in touch, consultation, project inquiry, creative agency, brand strategy, digital marketing"
        url="https://disruptorsmedia.com/contact"
        type="website"
      />
      
      {/* 1. Contact Hero Section - PRD Specification with Modified Styling */}
      <section 
        className="relative w-full main-sec contact"
        style={{ 
          paddingTop: '130px', 
          paddingBottom: '110px',
          background: 'transparent'
        }}
      >
        <div className="container-custom">
          {/* Page Title - PRD Specification with increased margin */}
          <h1 
            className="text-brand-charcoal text-center"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '220.302px',
              fontWeight: 600,
              lineHeight: '198.59px',
              textTransform: 'uppercase',
              marginBottom: '168px' // Increased spacing per PRD
            }}
          >
            CONTACT
          </h1>

          {/* Contact Subtitle - PRD Specification with custom styling */}
          <h2 
            className="text-brand-charcoal text-center mb-20"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '61px', // Slightly smaller than default 63px
              fontWeight: 600,
              lineHeight: '68.6px',
              color: 'var(--color-brand-charcoal)',
              textTransform: 'none', // No uppercase transformation
              textAlign: 'center'
            }}
          >
            Let's start something great together
          </h2>
        </div>
      </section>

      {/* 2. Contact Information Section - PRD Specification */}
      <section className="w-full py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Primary Email */}
            <div className="text-center">
              <h3 
                className="text-brand-charcoal mb-4"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '16px',
                  fontWeight: 400,
                  textTransform: 'uppercase'
                }}
              >
                EMAIL
              </h3>
              <a 
                href="mailto:hello@disruptorsmedia.com"
                className="text-brand-charcoal no-underline hover:opacity-80 transition-opacity block mb-3"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '22px',
                  fontWeight: 400,
                  textTransform: 'uppercase'
                }}
              >
                HELLO@DISRUPTORSMEDIA.COM
              </a>
            </div>

            {/* Phone Number */}
            <div className="text-center">
              <h3 
                className="text-brand-charcoal mb-4"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '16px',
                  fontWeight: 400,
                  textTransform: 'uppercase'
                }}
              >
                PHONE
              </h3>
              <a 
                href="tel:+15551234567"
                className="text-brand-charcoal no-underline hover:opacity-80 transition-opacity block"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '22px',
                  fontWeight: 400
                }}
              >
                +1 (555) 123-4567
              </a>
            </div>

            {/* Address */}
            <div className="text-center">
              <h3 
                className="text-brand-charcoal mb-4"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '16px',
                  fontWeight: 400,
                  textTransform: 'uppercase'
                }}
              >
                ADDRESS
              </h3>
              <div 
                className="text-brand-charcoal"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px'
                }}
              >
                123 Creative Street<br />
                Innovation District<br />
                City, State 12345
              </div>
            </div>

            {/* Business Hours */}
            <div className="text-center">
              <h3 
                className="text-brand-charcoal mb-4"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '16px',
                  fontWeight: 400,
                  textTransform: 'uppercase'
                }}
              >
                HOURS
              </h3>
              <div 
                className="text-brand-charcoal"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px'
                }}
              >
                MONDAY - FRIDAY<br />
                9:00 AM - 6:00 PM<br />
                <br />
                SATURDAY - SUNDAY<br />
                BY APPOINTMENT
              </div>
            </div>
          </div>

          {/* Secondary Contact Methods */}
          <div className="text-center mb-20">
            <h3 
              className="text-brand-charcoal mb-8"
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: '39px',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '30px'
              }}
            >
              ADDITIONAL CONTACTS
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div 
                  className="text-brand-charcoal mb-2"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '14px',
                    fontWeight: 400,
                    textTransform: 'uppercase'
                  }}
                >
                  GENERAL INQUIRIES
                </div>
                <a 
                  href="mailto:info@disruptorsmedia.com"
                  className="text-brand-charcoal no-underline hover:opacity-80 transition-opacity"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    fontWeight: 400,
                    textTransform: 'uppercase'
                  }}
                >
                  INFO@DISRUPTORSMEDIA.COM
                </a>
              </div>
              <div>
                <div 
                  className="text-brand-charcoal mb-2"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '14px',
                    fontWeight: 400,
                    textTransform: 'uppercase'
                  }}
                >
                  NEW BUSINESS
                </div>
                <a 
                  href="mailto:hello@disruptorsmedia.com"
                  className="text-brand-charcoal no-underline hover:opacity-80 transition-opacity"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    fontWeight: 400,
                    textTransform: 'uppercase'
                  }}
                >
                  HELLO@DISRUPTORSMEDIA.COM
                </a>
              </div>
              <div>
                <div 
                  className="text-brand-charcoal mb-2"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '14px',
                    fontWeight: 400,
                    textTransform: 'uppercase'
                  }}
                >
                  PRESS & MEDIA
                </div>
                <a 
                  href="mailto:press@disruptorsmedia.com"
                  className="text-brand-charcoal no-underline hover:opacity-80 transition-opacity"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    fontWeight: 400,
                    textTransform: 'uppercase'
                  }}
                >
                  PRESS@DISRUPTORSMEDIA.COM
                </a>
              </div>
              <div>
                <div 
                  className="text-brand-charcoal mb-2"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '14px',
                    fontWeight: 400,
                    textTransform: 'uppercase'
                  }}
                >
                  CAREERS
                </div>
                <a 
                  href="mailto:careers@disruptorsmedia.com"
                  className="text-brand-charcoal no-underline hover:opacity-80 transition-opacity"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    fontWeight: 400,
                    textTransform: 'uppercase'
                  }}
                >
                  CAREERS@DISRUPTORSMEDIA.COM
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contact Form Section - PRD Specification */}
      <section className="w-full py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
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
              GET IN TOUCH
            </h2>

            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div style={{ display: 'none' }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-charcoal)',
                      marginBottom: '5px',
                      display: 'block'
                    }}
                  >
                    FIRST NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      padding: '15px',
                      border: '1px solid var(--color-brand-charcoal)',
                      background: 'transparent',
                      color: 'var(--color-brand-charcoal)',
                      width: '100%',
                      transition: 'all 0.2s ease'
                    }}
                    className="focus:scale-105 focus:border-yellow-500 focus:shadow-lg"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-charcoal)',
                      marginBottom: '5px',
                      display: 'block'
                    }}
                  >
                    LAST NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      padding: '15px',
                      border: '1px solid var(--color-brand-charcoal)',
                      background: 'transparent',
                      color: 'var(--color-brand-charcoal)',
                      width: '100%'
                    }}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-charcoal)',
                      marginBottom: '5px',
                      display: 'block'
                    }}
                  >
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      padding: '15px',
                      border: '1px solid var(--color-brand-charcoal)',
                      background: 'transparent',
                      color: 'var(--color-brand-charcoal)',
                      width: '100%'
                    }}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-charcoal)',
                      marginBottom: '5px',
                      display: 'block'
                    }}
                  >
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      padding: '15px',
                      border: '1px solid var(--color-brand-charcoal)',
                      background: 'transparent',
                      color: 'var(--color-brand-charcoal)',
                      width: '100%'
                    }}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-charcoal)',
                    marginBottom: '5px',
                    display: 'block'
                  }}
                >
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    padding: '15px',
                    border: '1px solid var(--color-brand-charcoal)',
                    background: 'transparent',
                    color: 'var(--color-brand-charcoal)',
                    width: '100%'
                  }}
                  placeholder="Your Company Name"
                />
              </div>

              {/* Project Information */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-charcoal)',
                      marginBottom: '5px',
                      display: 'block'
                    }}
                  >
                    PROJECT TYPE
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      padding: '15px',
                      border: '1px solid var(--color-brand-charcoal)',
                      background: 'transparent',
                      color: 'var(--color-brand-charcoal)',
                      width: '100%'
                    }}
                  >
                    <option value="">Select Project Type</option>
                    <option value="brand-identity">Brand Identity</option>
                    <option value="web-development">Web Development</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="video-production">Video Production</option>
                    <option value="photography">Photography</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-charcoal)',
                      marginBottom: '5px',
                      display: 'block'
                    }}
                  >
                    PROJECT BUDGET
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      padding: '15px',
                      border: '1px solid var(--color-brand-charcoal)',
                      background: 'transparent',
                      color: 'var(--color-brand-charcoal)',
                      width: '100%'
                    }}
                  >
                    <option value="">Select Budget Range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-plus">$100,000+</option>
                    <option value="not-sure">Not Sure</option>
                  </select>
                </div>
                <div>
                  <label 
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-charcoal)',
                      marginBottom: '5px',
                      display: 'block'
                    }}
                  >
                    TIMELINE
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      padding: '15px',
                      border: '1px solid var(--color-brand-charcoal)',
                      background: 'transparent',
                      color: 'var(--color-brand-charcoal)',
                      width: '100%'
                    }}
                  >
                    <option value="">Select Timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 Months</option>
                    <option value="3-6-months">3-6 Months</option>
                    <option value="6-months-plus">6+ Months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-charcoal)',
                    marginBottom: '5px',
                    display: 'block'
                  }}
                >
                  PROJECT DESCRIPTION *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    padding: '15px',
                    border: '1px solid var(--color-brand-charcoal)',
                    background: 'transparent',
                    color: 'var(--color-brand-charcoal)',
                    width: '100%',
                    resize: 'none'
                  }}
                  placeholder="Tell us about your project goals, challenges, and what you're looking to achieve..."
                />
              </div>

              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-charcoal)',
                    marginBottom: '5px',
                    display: 'block'
                  }}
                >
                  HOW DID YOU HEAR ABOUT US?
                </label>
                <input
                  type="text"
                  value={formData.howDidYouHear}
                  onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '16px',
                    padding: '15px',
                    border: '1px solid var(--color-brand-charcoal)',
                    background: 'transparent',
                    color: 'var(--color-brand-charcoal)',
                    width: '100%'
                  }}
                  placeholder="Referral, Google, Social Media, etc."
                />
              </div>

              {/* Submit Button - Enhanced with Animations */}
              <div className="text-center pt-6">
                <motion.button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="submit-btn"
                  whileHover={formStatus === 'idle' ? { 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                  } : {}}
                  whileTap={formStatus === 'idle' ? { scale: 0.95 } : {}}
                  animate={{
                    background: formStatus === 'success' ? '#28a745' : 
                               formStatus === 'error' ? '#dc3545' : 
                               'var(--color-brand-charcoal)'
                  }}
                  transition={{ 
                    type: "spring", 
                    bounce: 0.4,
                    duration: 0.3
                  }}
                  style={{
                    color: 'var(--color-brand-cream)',
                    fontFamily: 'var(--font-primary)',
                    fontSize: '20px',
                    textTransform: 'uppercase',
                    padding: '19px 40px',
                    border: 'none',
                    cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: formStatus === 'loading' ? 0.6 : 1
                  }}
                >
                  {formStatus === 'loading' ? 'SENDING...' :
                   formStatus === 'success' ? 'MESSAGE SENT!' :
                   formStatus === 'error' ? 'TRY AGAIN' :
                   'SEND MESSAGE'}
                </button>

                {formStatus === 'success' && (
                  <div 
                    className="mt-4"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      color: '#28a745'
                    }}
                  >
                    Thank you! We'll be in touch within 24 hours.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 4. Contact CTA Section - PRD Specification */}
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
            PREFER TO TALK?
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
            Schedule a free 30-minute consultation to discuss your project.
          </p>

          <motion.button 
            className="cta-large"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 50px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              bounce: 0.4,
              duration: 0.3
            }}
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
            onClick={() => window.open('https://cal.com/disruptors-media/strategy-session', '_blank')}
          >
            <span>SCHEDULE CALL</span>
            <motion.svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              className="ml-4"
              whileHover={{ x: 8, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <path 
                d="M7 17L17 7M17 7H7M17 7V17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        </div>
      </section>

      {/* 5. Social Media Links Section - PRD Specification */}
      <section className="w-full text-center py-12">
        <div className="container-custom">
          <h3 
            className="text-brand-charcoal mb-6"
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '39px',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}
          >
            CONNECT WITH US
          </h3>
          
          <p 
            className="text-brand-charcoal mb-8"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              marginBottom: '30px'
            }}
          >
            Follow us on social media for updates and behind-the-scenes content.
          </p>

          <div className="flex justify-center space-x-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ margin: '0 13px' }}
            >
              <img 
                src="/images/fb.svg" 
                alt="Facebook" 
                className="w-8 h-8"
              />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ margin: '0 13px' }}
            >
              <img 
                src="/images/insta.svg" 
                alt="Instagram" 
                className="w-8 h-8"
              />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ margin: '0 13px' }}
            >
              <img 
                src="/images/twitter.svg" 
                alt="Twitter/X" 
                className="w-8 h-8"
              />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ margin: '0 13px' }}
            >
              <img 
                src="/images/youtube.svg" 
                alt="YouTube" 
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;