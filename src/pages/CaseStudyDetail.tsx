import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface CaseStudyData {
  id: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  services: string[];
  challenge: string;
  solution: string;
  implementation: string[];
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
    company: string;
  };
  images: {
    hero: string;
    gallery: string[];
  };
  technologies: string[];
  nextSteps: string;
  websiteUrl?: string;
}

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock case study data - in real app would fetch from API
  const caseStudies: Record<string, CaseStudyData> = {
    'enterprise-ai-transformation': {
      id: 'enterprise-ai-transformation',
      title: 'Enterprise AI Marketing Transformation',
      client: 'TechCorp Industries',
      industry: 'Technology',
      duration: '8 months',
      services: ['AI Strategy', 'Marketing Automation', 'Content Production', 'Analytics Implementation'],
      challenge: 'TechCorp Industries was struggling with fragmented marketing efforts across multiple channels. Their traditional approach was not scaling with their rapid growth, resulting in inconsistent messaging and poor lead qualification. They needed a unified AI-powered approach that could maintain personalization at scale while driving measurable ROI.',
      solution: 'We implemented a comprehensive AI marketing ecosystem that unified their customer journey across all touchpoints. Our solution combined machine learning algorithms for predictive analytics with human creativity for authentic storytelling, embodying our core philosophy of technology meeting humanity.',
      implementation: [
        'Deployed advanced customer segmentation using machine learning algorithms',
        'Created personalized content workflows powered by AI and refined by human insight',
        'Implemented predictive lead scoring to prioritize high-value prospects',
        'Established real-time analytics dashboard for data-driven decision making',
        'Integrated all marketing channels into a unified automation platform',
        'Developed dynamic content optimization based on user behavior patterns'
      ],
      results: [
        {
          metric: 'Lead Quality Improvement',
          value: '340%',
          description: 'Higher conversion rate from marketing qualified leads to sales qualified leads'
        },
        {
          metric: 'Marketing ROI',
          value: '250%',
          description: 'Increase in return on marketing investment within 6 months'
        },
        {
          metric: 'Content Efficiency',
          value: '180%',
          description: 'Faster content production with AI-assisted workflows'
        },
        {
          metric: 'Customer Acquisition Cost',
          value: '45%',
          description: 'Reduction in CAC through improved targeting and personalization'
        }
      ],
      testimonial: {
        quote: "Disruptors Media transformed how we think about marketing. Their AI-powered approach didn't just improve our metrics—it revolutionized our entire customer engagement strategy. The balance of technology and human insight is exactly what we needed.",
        author: "Sarah Johnson",
        title: "Chief Marketing Officer",
        company: "TechCorp Industries"
      },
      images: {
        hero: '/assets/images/portfolio/case-study-1.jpg',
        gallery: [
          '/assets/images/portfolio/work-1.jpg',
          '/assets/images/portfolio/work-2.jpg',
          '/assets/images/portfolio/work-3.jpg'
        ]
      },
      technologies: ['Machine Learning', 'Marketing Automation', 'Predictive Analytics', 'Content AI', 'Customer Data Platform'],
      nextSteps: 'Following the success of the initial implementation, TechCorp is expanding the AI marketing system to their international markets and exploring advanced personalization capabilities.',
      websiteUrl: 'https://techcorp.example.com'
    },
    'creative-brand-storytelling': {
      id: 'creative-brand-storytelling',
      title: 'Creative Brand Storytelling Campaign',
      client: 'Artisan Collective',
      industry: 'Retail & E-commerce',
      duration: '4 months',
      services: ['Brand Strategy', 'Content Production', 'Social Media Marketing', 'Video Production'],
      challenge: 'Artisan Collective, a premium handcrafted goods marketplace, was struggling to differentiate itself in a crowded e-commerce space. Their beautiful products were getting lost among mass-produced alternatives, and they needed a way to communicate their authentic craftsmanship story effectively.',
      solution: 'We developed a comprehensive storytelling strategy that highlighted the human element behind each product. Using our studio services and AI-powered content optimization, we created a multi-channel narrative that celebrated the intersection of traditional craftsmanship and modern marketing.',
      implementation: [
        'Conducted in-depth interviews with artisan partners to capture authentic stories',
        'Created a visual identity system that emphasized handmade authenticity',
        'Produced high-quality video content showcasing the creation process',
        'Developed AI-optimized social media content while maintaining brand authenticity',
        'Implemented influencer partnerships with genuine brand alignment',
        'Created an interactive website experience highlighting artisan stories'
      ],
      results: [
        {
          metric: 'Brand Awareness',
          value: '280%',
          description: 'Increase in brand recognition within target demographics'
        },
        {
          metric: 'Social Engagement',
          value: '420%',
          description: 'Higher engagement rates across all social platforms'
        },
        {
          metric: 'Sales Growth',
          value: '190%',
          description: 'Increase in direct-to-consumer sales'
        },
        {
          metric: 'Customer Lifetime Value',
          value: '150%',
          description: 'Improvement in repeat customer purchases'
        }
      ],
      testimonial: {
        quote: "They didn't just create marketing for us—they helped us rediscover our story. The way they blend technology with genuine human connection is remarkable. Our artisans feel heard, and our customers feel connected.",
        author: "Michael Chen",
        title: "Founder",
        company: "Artisan Collective"
      },
      images: {
        hero: '/assets/images/portfolio/case-study-2.jpg',
        gallery: [
          '/assets/images/portfolio/work-4.jpg',
          '/assets/images/portfolio/work-5.jpg',
          '/assets/images/portfolio/work-6.jpg'
        ]
      },
      technologies: ['Brand Strategy', 'Video Production', 'Social Media AI', 'Content Management', 'E-commerce Integration'],
      nextSteps: 'Artisan Collective is now expanding internationally and implementing advanced personalization features for their growing customer base.',
      websiteUrl: 'https://artisancollective.example.com'
    }
  };

  const caseStudy = id ? caseStudies[id] : null;

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark mb-4">Case Study Not Found</h1>
          <button
            onClick={() => navigate('/portfolio')}
            className="bg-gold text-dark px-6 py-3 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title={`${caseStudy.title} | Case Study | Disruptors Media`}
        description={caseStudy.challenge.substring(0, 155)}
        keywords={`case study, ${caseStudy.industry.toLowerCase()}, ${caseStudy.services.join(', ').toLowerCase()}`}
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-dark via-dark-light to-pure-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={caseStudy.images.hero}
            alt={caseStudy.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/60"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/portfolio')}
            className="flex items-center text-cream/80 hover:text-gold transition-colors mb-8"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            <span className="font-tech">Back to Portfolio</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center mb-6 space-x-4">
              <img src="/assets/images/hand-robot.png" alt="Technology" className="w-8 h-8" />
              <span className="font-tech text-gold text-sm uppercase tracking-wider">
                Case Study
              </span>
              <img src="/assets/images/hand-human.png" alt="Humanity" className="w-8 h-8" />
            </div>
            
            <h1 className="font-headline text-4xl lg:text-6xl font-bold mb-6">
              {caseStudy.title}
            </h1>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div>
                <div className="font-tech text-gold text-sm uppercase mb-2">Client</div>
                <div className="text-cream">{caseStudy.client}</div>
              </div>
              <div>
                <div className="font-tech text-gold text-sm uppercase mb-2">Industry</div>
                <div className="text-cream">{caseStudy.industry}</div>
              </div>
              <div>
                <div className="font-tech text-gold text-sm uppercase mb-2">Duration</div>
                <div className="text-cream">{caseStudy.duration}</div>
              </div>
              <div>
                <div className="font-tech text-gold text-sm uppercase mb-2">Website</div>
                {caseStudy.websiteUrl && (
                  <a
                    href={caseStudy.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream hover:text-gold transition-colors flex items-center"
                  >
                    Visit Site
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {caseStudy.services.map((service) => (
                <span
                  key={service}
                  className="px-3 py-1 bg-gold/20 text-gold font-tech text-sm rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-headline text-3xl font-bold text-dark mb-6">
                  The Challenge
                </h2>
                <p className="text-dark/80 text-lg leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-headline text-3xl font-bold text-dark mb-6">
                  Our Solution
                </h2>
                <p className="text-dark/80 text-lg leading-relaxed">
                  {caseStudy.solution}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-headline text-4xl font-bold text-dark text-center mb-12"
            >
              Implementation Process
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {caseStudy.implementation.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-cream/50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gold text-dark rounded-full flex items-center justify-center font-tech font-bold text-sm mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-dark/80 leading-relaxed">
                      {step}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-light text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-headline text-4xl font-bold text-center mb-12"
            >
              Measurable Results
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caseStudy.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-gold mb-4 font-headline">
                    {result.value}
                  </div>
                  <div className="font-tech text-cream text-sm uppercase mb-2 tracking-wider">
                    {result.metric}
                  </div>
                  <div className="text-cream/80 text-sm leading-relaxed">
                    {result.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-12 shadow-xl"
              >
                <blockquote className="text-2xl lg:text-3xl text-dark/90 leading-relaxed mb-8 italic">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-tech font-bold text-gold text-lg">
                      {caseStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-dark text-lg">
                      {caseStudy.testimonial.author}
                    </div>
                    <div className="text-dark/70">
                      {caseStudy.testimonial.title}
                    </div>
                    <div className="text-dark/50 font-tech text-sm">
                      {caseStudy.testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="py-20 bg-cream/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-headline text-3xl font-bold text-dark text-center mb-12">
              Project Gallery
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudy.images.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={image}
                    alt={`${caseStudy.title} Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark to-dark-light text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-headline text-3xl lg:text-4xl font-bold mb-6">
              Ready for Similar Results?
            </h2>
            <p className="text-xl text-cream/90 mb-8">
              Let's discuss how our AI-powered approach can transform your marketing strategy
              and deliver measurable business growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="bg-gold text-dark px-8 py-4 rounded-full font-tech font-semibold hover:bg-gold-light transition-colors inline-flex items-center justify-center"
              >
                Start Your Project
                <img 
                  src="/assets/images/icons/arrow-cta.svg" 
                  alt="Arrow" 
                  className="ml-2 w-4 h-4"
                />
              </a>
              <a
                href="/portfolio"
                className="border-2 border-cream text-cream px-8 py-4 rounded-full font-tech font-semibold hover:bg-cream hover:text-dark transition-all duration-300"
              >
                View More Cases
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;