import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/common/SEO';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // FAQ items based on old site patterns and common digital marketing questions
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "What makes Disruptors Media different from other digital marketing agencies?",
      answer: "We specialize in the intersection of AI technology and human creativity. Our approach combines cutting-edge artificial intelligence tools with deep human insights to create marketing strategies that are both technologically advanced and authentically human. This unique 'technology meets humanity' philosophy allows us to deliver results that are both data-driven and emotionally resonant.",
      category: "general"
    },
    {
      id: 2,
      question: "How do you integrate AI into your marketing strategies?",
      answer: "We use AI for data analysis, predictive modeling, content optimization, and audience segmentation. Our AI tools help us identify trends, automate repetitive tasks, and personalize campaigns at scale. However, we always maintain human oversight to ensure creativity, empathy, and strategic thinking remain at the core of every campaign.",
      category: "ai-technology"
    },
    {
      id: 3,
      question: "What industries do you work with?",
      answer: "We work with businesses across various industries including technology, healthcare, finance, e-commerce, and professional services. Our diverse portfolio demonstrates our ability to adapt our strategies to different market dynamics while maintaining our core methodology of balancing technology with human understanding.",
      category: "general"
    },
    {
      id: 4,
      question: "What's included in your studio services?",
      answer: "Our studio services encompass full-scale content production including video creation, photography, graphic design, and multimedia content. We have a state-of-the-art studio facility where we produce high-quality visual content that aligns with your brand identity and marketing objectives.",
      category: "services"
    },
    {
      id: 5,
      question: "How do you measure the success of marketing campaigns?",
      answer: "We use a comprehensive approach to measurement that includes traditional KPIs like ROI, conversion rates, and engagement metrics, combined with advanced analytics and AI-powered insights. We provide detailed reporting and analysis that shows not just what happened, but why it happened and what it means for future strategy.",
      category: "results"
    },
    {
      id: 6,
      question: "What is your typical project timeline?",
      answer: "Project timelines vary depending on scope and complexity. A typical marketing strategy development takes 2-4 weeks, while full campaign implementation can range from 6-12 weeks. Studio production projects typically take 1-3 weeks. We always provide detailed timelines during our initial consultation phase.",
      category: "process"
    },
    {
      id: 7,
      question: "Do you work with small businesses or only large enterprises?",
      answer: "We work with businesses of all sizes, from innovative startups to established enterprises. Our scalable approach allows us to tailor our services to match your budget and growth stage while maintaining the same level of strategic thinking and creative excellence.",
      category: "general"
    },
    {
      id: 8,
      question: "What AI tools and technologies do you use?",
      answer: "We utilize a comprehensive suite of AI tools including machine learning platforms for data analysis, natural language processing for content optimization, computer vision for visual content analysis, and predictive analytics for campaign forecasting. Our technology stack is constantly evolving to incorporate the latest advances in AI and marketing technology.",
      category: "ai-technology"
    },
    {
      id: 9,
      question: "How do you ensure data privacy and security?",
      answer: "Data privacy and security are paramount in our operations. We follow industry best practices, comply with GDPR and CCPA regulations, use encrypted data storage and transmission, and maintain strict access controls. All team members undergo regular training on data privacy protocols.",
      category: "process"
    },
    {
      id: 10,
      question: "Can you help with both strategy and execution?",
      answer: "Absolutely. We provide end-to-end services from initial strategy development through full campaign execution and ongoing optimization. Our integrated approach ensures consistency between strategic vision and tactical implementation, resulting in more effective and cohesive marketing efforts.",
      category: "services"
    },
    {
      id: 11,
      question: "What kind of results can we expect?",
      answer: "While results vary by industry and campaign objectives, our clients typically see significant improvements in key metrics within 3-6 months. We've helped generate over $50M in revenue for our clients, achieved average engagement rate increases of 150%, and maintained a 95% client satisfaction rate.",
      category: "results"
    },
    {
      id: 12,
      question: "Do you offer training or consulting services?",
      answer: "Yes, we provide marketing consulting, AI implementation guidance, and team training services. We can help your internal team develop AI-powered marketing capabilities or provide strategic consultation on digital transformation initiatives.",
      category: "services"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Questions' },
    { key: 'general', label: 'General' },
    { key: 'ai-technology', label: 'AI & Technology' },
    { key: 'services', label: 'Services' },
    { key: 'process', label: 'Process' },
    { key: 'results', label: 'Results' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="FAQ | Disruptors Media"
        description="Get answers to common questions about our AI-powered marketing services, studio capabilities, processes, and results. Technology meets humanity in digital marketing."
        keywords="FAQ, digital marketing questions, AI marketing, studio services, marketing agency, process, results"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-dark via-dark-light to-pure-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center items-center mb-6">
              <img 
                src="/assets/images/hand-human.png" 
                alt="Human Touch" 
                className="w-12 h-12 mr-4"
              />
              <span className="font-tech text-gold text-sm uppercase tracking-wider">
                Frequently Asked Questions
              </span>
              <img 
                src="/assets/images/hand-robot.png" 
                alt="Technology" 
                className="w-12 h-12 ml-4"
              />
            </div>
            <h1 className="font-headline text-4xl lg:text-6xl font-bold mb-6">
              Got <span className="text-gold">Questions?</span>
            </h1>
            <p className="text-xl lg:text-2xl text-cream/90 leading-relaxed">
              Everything you need to know about our AI-powered marketing approach
              and how we balance technology with human insight.
            </p>
          </motion.div>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/assets/images/main-bg.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full font-tech text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? 'bg-gold text-dark'
                    : 'bg-cream text-dark hover:bg-gold/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-cream/30 transition-colors duration-300"
                  >
                    <h3 className="font-headline text-lg lg:text-xl font-semibold text-dark pr-8">
                      {item.question}
                    </h3>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-gold flex items-center justify-center transition-all duration-300 ${
                      activeItem === item.id ? 'bg-gold text-dark rotate-180' : 'text-gold'
                    }`}>
                      {activeItem === item.id ? (
                        <MinusIcon className="w-4 h-4" />
                      ) : (
                        <PlusIcon className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeItem === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6">
                          <div className="border-t border-cream mb-6"></div>
                          <p className="text-dark/80 leading-relaxed">
                            {item.answer}
                          </p>
                          <div className="mt-4">
                            <span className={`inline-block px-3 py-1 text-xs font-tech rounded-full ${
                              item.category === 'general' ? 'bg-blue-100 text-blue-800' :
                              item.category === 'ai-technology' ? 'bg-gold/20 text-gold-dark' :
                              item.category === 'services' ? 'bg-green-100 text-green-800' :
                              item.category === 'process' ? 'bg-purple-100 text-purple-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {categories.find(c => c.key === item.category)?.label}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark to-dark-light text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-center items-center mb-6">
              <img 
                src="/assets/images/hand-robot.png" 
                alt="Technology" 
                className="w-16 h-16 mr-4"
              />
              <div className="font-tech text-gold text-2xl">+</div>
              <img 
                src="/assets/images/hand-human.png" 
                alt="Humanity" 
                className="w-16 h-16 ml-4"
              />
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-cream/90 mb-8">
              Let's discuss how our AI-powered approach can transform your marketing strategy.
              Get personalized answers from our expert team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="bg-gold text-dark px-8 py-4 rounded-full font-tech font-semibold hover:bg-gold-light transition-colors duration-300 inline-flex items-center justify-center"
              >
                Get In Touch
                <img 
                  src="/assets/images/icons/arrow-cta.svg" 
                  alt="Arrow" 
                  className="ml-2 w-4 h-4"
                />
              </a>
              <a
                href="/assessment"
                className="border-2 border-cream text-cream px-8 py-4 rounded-full font-tech font-semibold hover:bg-cream hover:text-dark transition-all duration-300"
              >
                Take AI Assessment
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;