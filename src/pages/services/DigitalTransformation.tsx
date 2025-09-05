import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CloudArrowUpIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowPathIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const transformationPillars = [
  {
    icon: CloudArrowUpIcon,
    title: 'Cloud Migration',
    description: 'Seamlessly transition your infrastructure to modern cloud solutions for enhanced scalability and efficiency'
  },
  {
    icon: LightBulbIcon,
    title: 'Process Automation',
    description: 'Automate repetitive tasks and workflows to free up your team for strategic initiatives'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Data Security',
    description: 'Implement enterprise-grade security measures to protect your digital assets and customer data'
  },
  {
    icon: SparklesIcon,
    title: 'AI Integration',
    description: 'Embed AI capabilities across your organization for smarter decision-making and operations'
  }
];

const transformationPhases = [
  {
    phase: 'Discovery',
    duration: '2-3 weeks',
    activities: [
      'Current state assessment',
      'Technology audit',
      'Process mapping',
      'Stakeholder interviews'
    ]
  },
  {
    phase: 'Strategy',
    duration: '2-4 weeks',
    activities: [
      'Digital roadmap creation',
      'Technology selection',
      'Change management plan',
      'ROI projections'
    ]
  },
  {
    phase: 'Implementation',
    duration: '3-6 months',
    activities: [
      'Phased rollout',
      'System integration',
      'Team training',
      'Performance monitoring'
    ]
  },
  {
    phase: 'Optimization',
    duration: 'Ongoing',
    activities: [
      'Continuous improvement',
      'Performance tuning',
      'Scaling operations',
      'Innovation cycles'
    ]
  }
];

const caseStudies = [
  {
    company: 'TechCorp Solutions',
    industry: 'B2B SaaS',
    results: {
      efficiency: '+65%',
      costs: '-40%',
      revenue: '+120%'
    },
    quote: 'The digital transformation led by Disruptors Media revolutionized how we operate and serve our customers.'
  },
  {
    company: 'Global Manufacturing Inc',
    industry: 'Manufacturing',
    results: {
      efficiency: '+85%',
      costs: '-55%',
      revenue: '+95%'
    },
    quote: 'We went from industry laggard to industry leader in just 8 months.'
  }
];

export default function DigitalTransformation() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark via-dark/95 to-gold/20 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Digital Transformation for the <span className="text-gold">AI Era</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Modernize your business operations, enhance customer experiences, and unlock new revenue streams 
              with our comprehensive digital transformation services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact?service=digital-transformation"
                className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Start Your Journey
              </Link>
              <a
                href="#case-studies"
                className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
              >
                See Case Studies
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transformation Pillars */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Four Pillars of Transformation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our holistic approach ensures every aspect of your business is optimized for the digital age
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transformationPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <pillar.icon className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-3">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Your Transformation Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that takes you from current state to future-ready
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transformationPhases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gold/10 to-cream rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-dark">{phase.phase}</h3>
                    {index < transformationPhases.length - 1 && (
                      <ArrowRightIcon className="w-6 h-6 text-gold absolute -right-4 top-8 hidden lg:block" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{phase.duration}</p>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Transformation Success Stories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how we've helped businesses like yours achieve remarkable results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur rounded-xl p-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{study.company}</h3>
                  <p className="text-gold">{study.industry}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-3xl font-bold text-gold">{study.results.efficiency}</div>
                    <div className="text-sm text-gray-300">Efficiency Gain</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gold">{study.results.costs}</div>
                    <div className="text-sm text-gray-300">Cost Reduction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gold">{study.results.revenue}</div>
                    <div className="text-sm text-gray-300">Revenue Growth</div>
                  </div>
                </div>
                
                <blockquote className="italic text-gray-300">
                  "{study.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-dark mb-6">
                Why Digital Transformation <span className="text-gold">Matters Now</span>
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2">Stay Competitive</h3>
                  <p className="text-gray-600">
                    In today's fast-paced market, businesses that don't adapt get left behind. 
                    Digital transformation ensures you stay ahead of the curve.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2">Enhance Customer Experience</h3>
                  <p className="text-gray-600">
                    Modern customers expect seamless, personalized experiences. Digital tools 
                    make it possible to exceed those expectations.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2">Increase Efficiency</h3>
                  <p className="text-gray-600">
                    Automation and AI eliminate manual processes, allowing your team to focus 
                    on high-value activities that drive growth.
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
                src="https://via.placeholder.com/600x600/1a1a1a/d4af37?text=Digital+Transformation"
                alt="Digital Transformation Benefits"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-dark text-white p-6 rounded-lg shadow-lg">
                <ArrowPathIcon className="w-8 h-8 text-gold mb-2" />
                <div className="text-2xl font-bold">8-12 Weeks</div>
                <div className="text-sm">Average Time to First ROI</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold/10 to-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-dark mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how digital transformation can unlock your company's full potential
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact?service=digital-transformation"
              className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/portfolio"
              className="bg-dark hover:bg-dark/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              View More Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}