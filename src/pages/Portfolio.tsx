import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FunnelIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: 'Tech' | 'Healthcare' | 'Finance' | 'E-commerce' | 'SaaS' | 'Manufacturing';
  serviceType: 'AI Marketing' | 'Digital Transformation' | 'Content Production' | 'Studio Services';
  projectSize: 'Startup' | 'SMB' | 'Enterprise';
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  timeline: string;
  image: string;
  featured: boolean;
}

// Sample portfolio data - this would come from a CMS or data file
const portfolioProjects: Project[] = [
  {
    id: '1',
    slug: 'techcorp-ai-transformation',
    title: 'AI-Powered Lead Generation System',
    client: 'TechCorp Solutions',
    industry: 'Tech',
    serviceType: 'AI Marketing',
    projectSize: 'Enterprise',
    challenge: 'Struggling with low-quality leads and manual lead scoring processes',
    solution: 'Implemented AI-driven lead scoring, automated nurturing sequences, and predictive analytics',
    results: [
      { metric: 'Lead Quality Increase', value: '+240%' },
      { metric: 'Sales Conversion Rate', value: '+85%' },
      { metric: 'Time to Close', value: '-45%' }
    ],
    timeline: '6 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/c_scale,w_800/v1/portfolio/techcorp-results',
    featured: true
  },
  {
    id: '2',
    slug: 'healthsystem-digital-overhaul',
    title: 'Healthcare Digital Transformation',
    client: 'Regional Health System',
    industry: 'Healthcare',
    serviceType: 'Digital Transformation',
    projectSize: 'Enterprise',
    challenge: 'Outdated systems hampering patient experience and operational efficiency',
    solution: 'Complete digital infrastructure overhaul with AI-powered patient engagement tools',
    results: [
      { metric: 'Patient Satisfaction', value: '+65%' },
      { metric: 'Operational Efficiency', value: '+40%' },
      { metric: 'Cost Reduction', value: '-30%' }
    ],
    timeline: '8 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/c_scale,w_800/v1/portfolio/health-transformation',
    featured: true
  },
  {
    id: '3',
    slug: 'fintech-startup-growth',
    title: 'FinTech Startup Growth Strategy',
    client: 'InnovateFinance',
    industry: 'Finance',
    serviceType: 'AI Marketing',
    projectSize: 'Startup',
    challenge: 'New fintech struggling to acquire users in competitive market',
    solution: 'AI-driven user acquisition campaigns with personalized onboarding flows',
    results: [
      { metric: 'User Acquisition', value: '+400%' },
      { metric: 'Customer Acquisition Cost', value: '-55%' },
      { metric: 'User Retention', value: '+120%' }
    ],
    timeline: '4 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/c_scale,w_800/v1/portfolio/fintech-growth',
    featured: false
  },
  {
    id: '4',
    slug: 'ecommerce-ai-personalization',
    title: 'E-commerce AI Personalization',
    client: 'ShopSmart Retail',
    industry: 'E-commerce',
    serviceType: 'AI Marketing',
    projectSize: 'SMB',
    challenge: 'Low conversion rates and poor customer engagement on e-commerce platform',
    solution: 'Implemented AI-powered product recommendations and personalized shopping experiences',
    results: [
      { metric: 'Conversion Rate', value: '+150%' },
      { metric: 'Average Order Value', value: '+75%' },
      { metric: 'Customer Lifetime Value', value: '+90%' }
    ],
    timeline: '3 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/c_scale,w_800/v1/portfolio/ecommerce-personalization',
    featured: true
  },
  {
    id: '5',
    slug: 'manufacturing-content-series',
    title: 'Manufacturing Industry Thought Leadership',
    client: 'Advanced Manufacturing Co',
    industry: 'Manufacturing',
    serviceType: 'Content Production',
    projectSize: 'Enterprise',
    challenge: 'Needed to establish thought leadership in industrial automation space',
    solution: 'Created comprehensive content series with studio-produced video content and AI-optimized distribution',
    results: [
      { metric: 'Brand Awareness', value: '+180%' },
      { metric: 'Industry Recognition', value: '5 Awards' },
      { metric: 'Lead Generation', value: '+220%' }
    ],
    timeline: '5 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/c_scale,w_800/v1/portfolio/manufacturing-thought-leadership',
    featured: false
  },
  {
    id: '6',
    slug: 'saas-startup-studio',
    title: 'SaaS Startup Podcast Launch',
    client: 'CloudTech Innovations',
    industry: 'SaaS',
    serviceType: 'Studio Services',
    projectSize: 'Startup',
    challenge: 'Wanted to launch thought leadership podcast to attract enterprise clients',
    solution: 'Full podcast production using our professional studio with AI-powered content optimization',
    results: [
      { metric: 'Podcast Downloads', value: '50K+' },
      { metric: 'Enterprise Inquiries', value: '+300%' },
      { metric: 'Brand Authority Score', value: '+160%' }
    ],
    timeline: '2 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/c_scale,w_800/v1/portfolio/saas-podcast-launch',
    featured: false
  }
];

const Portfolio: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique filter values
  const industries = Array.from(new Set(portfolioProjects.map(p => p.industry)));
  const serviceTypes = Array.from(new Set(portfolioProjects.map(p => p.serviceType)));
  const projectSizes = Array.from(new Set(portfolioProjects.map(p => p.projectSize)));

  // Filter projects based on selected criteria
  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.challenge.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesIndustry = selectedIndustry === 'all' || project.industry === selectedIndustry;
      const matchesService = selectedService === 'all' || project.serviceType === selectedService;
      const matchesSize = selectedSize === 'all' || project.projectSize === selectedSize;

      return matchesSearch && matchesIndustry && matchesService && matchesSize;
    });
  }, [searchTerm, selectedIndustry, selectedService, selectedSize]);

  // Separate featured and regular projects
  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('all');
    setSelectedService('all');
    setSelectedSize('all');
  };

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
                Our Portfolio
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Discover how we've helped businesses achieve remarkable results through AI-powered marketing and digital transformation.
              </p>
              <div className="flex items-center justify-center text-gray-300">
                <ChartBarIcon className="h-6 w-6 mr-2" />
                <span>Over $50M+ in client revenue generated</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-lg mb-4 lg:mb-0">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, clients, or challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
              {(selectedIndustry !== 'all' || selectedService !== 'all' || selectedSize !== 'all') && (
                <span className="ml-2 px-2 py-1 bg-gold text-dark text-xs rounded-full">Active</span>
              )}
            </button>
          </div>

          {/* Filter Controls */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry
                  </label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-4 py-2 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="all">All Industries</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service Type
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-2 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="all">All Services</option>
                    {serviceTypes.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Size
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-4 py-2 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="all">All Sizes</option>
                    {projectSizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-300">
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                </span>
                <button
                  onClick={clearFilters}
                  className="text-gold hover:text-gold-light text-sm"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="section-padding bg-dark-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Featured Case Studies
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative h-64 bg-gradient-to-br from-gold/20 to-transparent rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <ChartBarIcon className="h-16 w-16 text-gold mx-auto mb-4" />
                      <div className="text-gold font-semibold">{project.industry}</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gold text-dark text-sm font-medium rounded-full">
                        Featured
                      </span>
                      <span className="text-gray-400 text-sm flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {project.timeline}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4">
                      <span className="font-medium">{project.client}</span> • {project.serviceType}
                    </p>

                    <p className="text-gray-300 mb-6">
                      {project.challenge}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {project.results.map((result, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-2xl font-bold text-gold mb-1">
                            {result.value}
                          </div>
                          <div className="text-xs text-gray-400">
                            {result.metric}
                          </div>
                        </div>
                      ))}
                    </div>

                    <a 
                      href={`/portfolio/${project.slug}`} 
                      className="btn-primary w-full inline-flex items-center justify-center"
                    >
                      View Full Case Study
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 ml-2" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            All Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-gold/10 to-transparent rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <ChartBarIcon className="h-12 w-12 text-gold mx-auto mb-2" />
                    <div className="text-gold text-sm font-medium">{project.industry}</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-dark-light text-gold text-xs font-medium rounded">
                      {project.projectSize}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {project.timeline}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4">
                    <span className="font-medium">{project.client}</span> • {project.serviceType}
                  </p>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.challenge}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    {project.results.slice(0, 2).map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-lg font-bold text-gold">
                          {result.value}
                        </div>
                        <div className="text-xs text-gray-400">
                          {result.metric}
                        </div>
                      </div>
                    ))}
                  </div>

                  <a 
                    href={`/portfolio/${project.slug}`} 
                    className="btn-secondary w-full inline-flex items-center justify-center text-sm"
                  >
                    View Case Study
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-300 mb-6">
                Try adjusting your search criteria or clearing filters.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-sophisticated">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Become Our Next Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how AI-powered marketing can transform your business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Get Your Free Strategy Session
            </a>
            <a href="/assessment" className="btn-secondary">
              Take AI Readiness Assessment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;