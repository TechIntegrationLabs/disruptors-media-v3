import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  CpuChipIcon, 
  BeakerIcon, 
  RocketLaunchIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const aiProcess = [
  {
    title: 'AI-Powered Analysis',
    description: 'We analyze your current marketing data, customer behavior, and market trends using advanced AI algorithms',
    icon: ChartBarIcon
  },
  {
    title: 'Strategy Development',
    description: 'Our AI models generate personalized marketing strategies optimized for your specific business goals',
    icon: CpuChipIcon
  },
  {
    title: 'Continuous Testing',
    description: 'A/B testing and multivariate experiments powered by machine learning for optimal results',
    icon: BeakerIcon
  },
  {
    title: 'Automated Optimization',
    description: 'Real-time campaign adjustments based on performance data and predictive analytics',
    icon: RocketLaunchIcon
  }
];

const aiTools = [
  'OpenAI GPT-4 for content generation',
  'Custom ML models for audience segmentation',
  'Predictive analytics for customer lifetime value',
  'Automated bid optimization algorithms',
  'Natural language processing for sentiment analysis',
  'Computer vision for visual content optimization'
];

const pricingTiers = [
  {
    name: 'Starter',
    price: '$2,500',
    period: '/month',
    features: [
      'AI-powered content generation',
      'Basic audience segmentation',
      'Monthly performance reports',
      'Email support',
      'Up to 5 campaigns'
    ],
    cta: 'Start Free Trial',
    highlighted: false
  },
  {
    name: 'Professional',
    price: '$5,000',
    period: '/month',
    features: [
      'Everything in Starter',
      'Advanced ML models',
      'Weekly optimization sprints',
      'Priority support',
      'Unlimited campaigns',
      'Custom integrations'
    ],
    cta: 'Most Popular',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    features: [
      'Everything in Professional',
      'Dedicated AI specialist',
      'Custom model training',
      'White-label solutions',
      'SLA guarantee',
      'Quarterly business reviews'
    ],
    cta: 'Contact Sales',
    highlighted: false
  }
];

const AIMarketing: React.FC = () => {
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
              AI Marketing That <span className="text-gold">Transforms</span> Your Business
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Harness the power of artificial intelligence to create hyper-personalized campaigns, 
              predict customer behavior, and achieve unprecedented ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact?service=ai-marketing"
                className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Get AI Assessment
              </Link>
              <a
                href="#case-studies"
                className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
              >
                View Success Stories
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Our AI-Driven Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From analysis to optimization, every step is enhanced by cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiProcess.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <step.icon className="w-12 h-12 text-gold mb-4" />
                <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technology */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-dark mb-6">
                Powered by <span className="text-gold">Advanced AI</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We leverage the latest AI technologies to deliver results that traditional marketing can't match.
              </p>
              <ul className="space-y-4">
                {aiTools.map((tool, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{tool}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://via.placeholder.com/600x400/1a1a1a/d4af37?text=AI+Dashboard"
                alt="AI Marketing Dashboard"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold text-dark p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">240%</div>
                <div className="text-sm">Average ROI Increase</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Proven Success Metrics</h2>
            <p className="text-xl text-gray-300">Real results from real clients</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <UserGroupIcon className="w-12 h-12 mx-auto mb-4 text-gold" />
              <div className="text-3xl font-bold mb-2">3.2x</div>
              <div className="text-gray-300">Lead Generation Increase</div>
            </div>
            <div>
              <CurrencyDollarIcon className="w-12 h-12 mx-auto mb-4 text-gold" />
              <div className="text-3xl font-bold mb-2">67%</div>
              <div className="text-gray-300">Cost Per Acquisition Reduction</div>
            </div>
            <div>
              <ClockIcon className="w-12 h-12 mx-auto mb-4 text-gold" />
              <div className="text-3xl font-bold mb-2">85%</div>
              <div className="text-gray-300">Time Saved on Campaign Management</div>
            </div>
            <div>
              <ChartBarIcon className="w-12 h-12 mx-auto mb-4 text-gold" />
              <div className="text-3xl font-bold mb-2">92%</div>
              <div className="text-gray-300">Prediction Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your growth goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-8 ${
                  tier.highlighted 
                    ? 'ring-2 ring-gold shadow-xl scale-105' 
                    : 'shadow-lg'
                }`}
              >
                <h3 className="text-2xl font-bold text-dark mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gold">{tier.price}</span>
                  <span className="text-gray-600">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/contact?service=ai-marketing&plan=${tier.name.toLowerCase()}`}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors inline-block text-center ${
                    tier.highlighted
                      ? 'bg-gold hover:bg-gold/90 text-dark'
                      : 'bg-dark hover:bg-dark/90 text-white'
                  }`}
                >
                  {tier.cta}
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
            Ready to <span className="text-gold">Revolutionize</span> Your Marketing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get a free AI readiness assessment and see how much you could improve your ROI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/ai-assessment"
              className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Take Free Assessment
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIMarketing;