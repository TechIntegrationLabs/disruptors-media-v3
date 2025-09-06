import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import ProjectGallery from '../components/sections/ProjectGallery';
import { portfolioProjects } from '../data/portfolio';
import { testimonials } from '../data/clients';
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

  // Find the project by slug
  const project = portfolioProjects.find(p => p.slug === id);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark mb-4">Case Study Not Found</h1>
          <button
            onClick={() => navigate('/portfolio')}
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  // Get testimonial for this project
  const projectTestimonial = testimonials.find(t => t.projectId === project.id);

  // Convert portfolio project to case study format
  const caseStudy: CaseStudyData = {
    id: project.slug,
    title: project.title,
    client: project.client,
    industry: project.industry,
    duration: project.timeline,
    services: project.categories,
    challenge: project.challenge,
    solution: project.solution,
    implementation: [
      "Initial assessment and strategy development",
      "Implementation of core solutions and systems",
      "Testing and optimization phase",
      "Launch and performance monitoring"
    ],
    results: project.results.map(r => ({
      metric: r.metric,
      value: r.value,
      description: `Achieved ${r.value} improvement in ${r.metric.toLowerCase()}`
    })),
    testimonial: projectTestimonial ? {
      quote: projectTestimonial.content,
      author: projectTestimonial.author,
      title: projectTestimonial.role,
      company: projectTestimonial.company
    } : undefined,
    images: {
      hero: project.image,
      gallery: [
        project.image,
        project.image.replace('.jpg', '-2.jpg'),
        project.image.replace('.jpg', '-3.jpg'),
        project.image.replace('.jpg', '-4.jpg')
      ].filter((img, index) => index === 0 || Math.random() > 0.3) // Randomly include 2-4 images
    },
    technologies: project.categories,
    nextSteps: "Continue optimizing and scaling the implemented solutions while exploring new opportunities for growth and innovation."
  };

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
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-headline text-3xl font-bold text-dark text-center mb-12"
            >
              Project Gallery
            </motion.h2>
            <ProjectGallery 
              images={caseStudy.images.gallery} 
              projectName={caseStudy.title}
            />
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