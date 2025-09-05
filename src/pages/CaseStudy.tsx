import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  ClockIcon,
  BuildingOffice2Icon,
  TagIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

interface CaseStudyData {
  id: string;
  title: string;
  client: {
    name: string;
    industry: string;
    size: string;
    website?: string;
  };
  project: {
    serviceType: string;
    timeline: string;
    teamSize: number;
    technologies: string[];
  };
  challenge: {
    overview: string;
    specificIssues: string[];
    businessImpact: string;
  };
  solution: {
    approach: string;
    implementation: {
      phase: string;
      description: string;
      duration: string;
    }[];
    technologies: string[];
  };
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    title: string;
    company: string;
    image?: string;
  };
  relatedProjects: {
    id: string;
    title: string;
    industry: string;
    results: string;
  }[];
}

// Sample case study data - this would typically come from a CMS or API
const sampleCaseStudy: CaseStudyData = {
  id: 'techcorp-ai-transformation',
  title: 'AI-Powered Lead Generation System',
  client: {
    name: 'TechCorp Solutions',
    industry: 'Technology / SaaS',
    size: 'Enterprise (500+ employees)',
    website: 'techcorp-solutions.com'
  },
  project: {
    serviceType: 'AI Marketing Strategy & Implementation',
    timeline: '6 months',
    teamSize: 8,
    technologies: ['HubSpot', 'Salesforce', 'OpenAI GPT', 'Zapier', 'Google Analytics 4', 'Tableau']
  },
  challenge: {
    overview: 'TechCorp Solutions was struggling with inefficient lead generation processes, poor lead quality, and lengthy sales cycles that were impacting their growth targets and team productivity.',
    specificIssues: [
      'Manual lead scoring resulting in 40% inaccurate qualification',
      'Generic nurturing sequences with 2.3% conversion rate',
      'Average sales cycle of 8.5 months',
      'Marketing and sales teams misaligned on lead definitions',
      'Lack of predictive analytics for pipeline forecasting'
    ],
    businessImpact: 'Revenue growth had stalled at 15% YoY, well below their 40% target. The sales team was spending 60% of their time on unqualified leads, and marketing ROI was declining quarter over quarter.'
  },
  solution: {
    approach: 'We implemented a comprehensive AI-powered lead generation and nurturing system that automated lead scoring, personalized customer journeys, and provided predictive analytics for better decision-making.',
    implementation: [
      {
        phase: 'Discovery & Strategy',
        description: 'Analyzed existing processes, data quality, and customer journey mapping',
        duration: '3 weeks'
      },
      {
        phase: 'AI Model Development',
        description: 'Built custom lead scoring models and predictive analytics algorithms',
        duration: '6 weeks'
      },
      {
        phase: 'System Integration',
        description: 'Integrated AI models with existing CRM and marketing automation platforms',
        duration: '8 weeks'
      },
      {
        phase: 'Testing & Optimization',
        description: 'A/B tested different approaches and optimized model performance',
        duration: '4 weeks'
      },
      {
        phase: 'Team Training & Launch',
        description: 'Trained teams on new processes and launched full system',
        duration: '3 weeks'
      }
    ],
    technologies: ['Machine Learning Models', 'CRM Integration', 'Marketing Automation', 'Predictive Analytics', 'Real-time Scoring', 'Automated Workflows']
  },
  results: [
    {
      metric: 'Lead Quality Score',
      before: '42%',
      after: '87%',
      improvement: '+240%'
    },
    {
      metric: 'Sales Conversion Rate',
      before: '8.2%',
      after: '15.1%',
      improvement: '+85%'
    },
    {
      metric: 'Average Sales Cycle',
      before: '8.5 months',
      after: '4.7 months',
      improvement: '-45%'
    },
    {
      metric: 'Marketing ROI',
      before: '2.1:1',
      after: '5.8:1',
      improvement: '+176%'
    },
    {
      metric: 'Revenue Growth',
      before: '15% YoY',
      after: '47% YoY',
      improvement: '+213%'
    },
    {
      metric: 'Sales Team Productivity',
      before: '40% qualified time',
      after: '78% qualified time',
      improvement: '+95%'
    }
  ],
  testimonial: {
    quote: "The AI transformation Disruptors Media implemented completely changed our business. We're not just hitting our growth targets - we're exceeding them by 200%. The predictive insights alone have saved us countless hours and helped us make strategic decisions with confidence.",
    author: 'Sarah Martinez',
    title: 'VP of Marketing & Sales',
    company: 'TechCorp Solutions'
  },
  relatedProjects: [
    {
      id: 'fintech-startup-growth',
      title: 'FinTech User Acquisition',
      industry: 'Finance',
      results: '+400% user growth'
    },
    {
      id: 'ecommerce-ai-personalization',
      title: 'E-commerce Personalization',
      industry: 'E-commerce',
      results: '+150% conversion rate'
    },
    {
      id: 'saas-predictive-analytics',
      title: 'SaaS Churn Prediction',
      industry: 'SaaS',
      results: '-65% customer churn'
    }
  ]
};

const CaseStudy: React.FC = () => {
  const data = sampleCaseStudy;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-sophisticated">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <span className="px-4 py-2 bg-gold text-dark font-semibold rounded-full">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {data.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-300">
              <div className="flex items-center">
                <BuildingOffice2Icon className="h-5 w-5 mr-2" />
                <span>{data.client.name}</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center">
                <TagIcon className="h-5 w-5 mr-2" />
                <span>{data.client.industry}</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                <span>{data.project.timeline}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Results Overview */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Key Results</h2>
            <p className="text-gray-300 text-lg">
              Measurable impact delivered in {data.project.timeline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl font-bold text-gold mb-2">
                  {result.improvement}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {result.metric}
                </div>
                <div className="text-sm text-gray-300">
                  From {result.before} to {result.after}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="section-padding bg-dark-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Client Information */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-6">Client Overview</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-300 block">Company</span>
                  <span className="text-white font-semibold">{data.client.name}</span>
                </div>
                <div>
                  <span className="text-gray-300 block">Industry</span>
                  <span className="text-white font-semibold">{data.client.industry}</span>
                </div>
                <div>
                  <span className="text-gray-300 block">Company Size</span>
                  <span className="text-white font-semibold">{data.client.size}</span>
                </div>
                {data.client.website && (
                  <div>
                    <span className="text-gray-300 block">Website</span>
                    <a href={`https://${data.client.website}`} className="text-gold hover:text-gold-light">
                      {data.client.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-6">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-300 block">Service Type</span>
                  <span className="text-white font-semibold">{data.project.serviceType}</span>
                </div>
                <div>
                  <span className="text-gray-300 block">Timeline</span>
                  <span className="text-white font-semibold">{data.project.timeline}</span>
                </div>
                <div>
                  <span className="text-gray-300 block">Team Size</span>
                  <span className="text-white font-semibold">{data.project.teamSize} specialists</span>
                </div>
                <div>
                  <span className="text-gray-300 block">Technologies Used</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-dark text-gold text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="section-padding bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">The Challenge</h2>
          
          <div className="glass-card p-8">
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {data.challenge.overview}
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Specific Issues Identified:</h3>
            <ul className="space-y-3 mb-8">
              {data.challenge.specificIssues.map((issue, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-2 w-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300">{issue}</span>
                </li>
              ))}
            </ul>

            <div className="bg-dark-light p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-3">Business Impact</h4>
              <p className="text-gray-300">
                {data.challenge.businessImpact}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding bg-dark-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Solution</h2>
          
          <div className="glass-card p-8 mb-8">
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {data.solution.approach}
            </p>

            <h3 className="text-xl font-semibold text-white mb-6">Implementation Timeline</h3>
            <div className="space-y-6">
              {data.solution.implementation.map((phase, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 bg-gold text-dark font-bold rounded-full mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">{phase.phase}</h4>
                      <span className="text-gray-400 text-sm flex items-center">
                        <CalendarDaysIcon className="h-4 w-4 mr-1" />
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-gray-300">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Technologies & Solutions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.solution.technologies.map((tech, idx) => (
                <div key={idx} className="bg-dark p-3 rounded-lg text-center">
                  <CheckCircleIcon className="h-6 w-6 text-gold mx-auto mb-2" />
                  <span className="text-white text-sm">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Results */}
      <section className="section-padding bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Detailed Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{result.metric}</h3>
                  <ChartBarIcon className="h-6 w-6 text-gold" />
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">Before</div>
                    <div className="text-xl font-bold text-white">{result.before}</div>
                  </div>
                  <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">After</div>
                    <div className="text-xl font-bold text-white">{result.after}</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">{result.improvement}</div>
                  <div className="text-sm text-gray-400">Improvement</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="section-padding bg-gradient-sophisticated">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8">
              "{data.testimonial.quote}"
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-semibold text-gold">{data.testimonial.author}</div>
                <div className="text-gray-300">{data.testimonial.title}</div>
                <div className="text-gray-400">{data.testimonial.company}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-padding bg-dark-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.relatedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card hover:bg-white/10 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-dark text-gold text-sm rounded">
                      {project.industry}
                    </span>
                    <ChartBarIcon className="h-6 w-6 text-gold" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {project.title}
                  </h3>
                  
                  <div className="text-gold font-semibold mb-4">
                    {project.results}
                  </div>

                  <a 
                    href={`/portfolio/${project.id}`} 
                    className="btn-secondary w-full"
                  >
                    View Case Study
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready for Similar Results?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can transform your business with AI-powered marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Start Your Project
            </a>
            <a href="/portfolio" className="btn-secondary">
              View More Case Studies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;