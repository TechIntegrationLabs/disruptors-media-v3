import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  TrophyIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const values = [
  {
    icon: SparklesIcon,
    title: 'Innovation First',
    description: 'We embrace cutting-edge AI technology and creative solutions to solve complex business challenges.'
  },
  {
    icon: ChartBarIcon,
    title: 'Results Driven',
    description: 'Every strategy, campaign, and project is measured by its impact on your bottom line and growth goals.'
  },
  {
    icon: UserGroupIcon,
    title: 'Client Partnership',
    description: 'We believe in true collaboration, working alongside you as an extension of your team.'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Continuous Growth',
    description: 'We never stop learning, evolving, and pushing the boundaries of what\'s possible in marketing.'
  }
];

const milestones = [
  { year: '2012', event: 'Founded with a vision to transform B2B marketing' },
  { year: '2015', event: 'Opened professional studio facility in North Salt Lake' },
  { year: '2018', event: 'Launched AI-powered marketing services' },
  { year: '2020', event: 'Achieved $50M+ in client revenue generation' },
  { year: '2022', event: 'Expanded to comprehensive digital transformation services' },
  { year: '2024', event: 'Leading the AI marketing revolution with 200+ successful campaigns' }
];

const awards = [
  {
    title: 'Utah Business Marketing Agency of the Year',
    year: '2023',
    organization: 'Utah Business Magazine'
  },
  {
    title: 'AI Innovation Award',
    year: '2023',
    organization: 'MarTech Breakthrough Awards'
  },
  {
    title: 'Best in Show - Digital Campaign',
    year: '2022',
    organization: 'Utah Advertising Federation'
  },
  {
    title: 'Top 50 Fastest Growing Companies',
    year: '2022',
    organization: 'MountainWest Capital'
  }
];

const teamStats = [
  { number: '25+', label: 'Team Members' },
  { number: '12+', label: 'Years in Business' },
  { number: '200+', label: 'Successful Campaigns' },
  { number: '95%', label: 'Client Satisfaction' }
];

export default function About() {
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
              We're <span className="text-gold">Disruptors</span> by Design
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Founded in 2012 with a simple mission: help businesses harness the power of AI and 
              cutting-edge marketing to achieve extraordinary growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Work With Us
              </Link>
              <a
                href="#story"
                className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
              >
                Our Story
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-dark mb-6">
                From Vision to <span className="text-gold">Revolution</span>
              </h2>
              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  In 2012, we saw the future of marketing changing. While others were still 
                  relying on traditional methods, we believed that data-driven, technology-powered 
                  marketing would become the new standard.
                </p>
                <p className="text-lg">
                  What started as a small team in Utah has grown into a leading AI marketing agency, 
                  but our core mission remains unchanged: help businesses grow by leveraging the 
                  latest technology and creative thinking.
                </p>
                <p className="text-lg">
                  Today, we're proud to have generated over $50 million in revenue for our clients 
                  and established ourselves as pioneers in AI-powered marketing strategies.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_600,h_400,c_fill/about/company-story-timeline"
                alt="Disruptors Media Story"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gold text-dark p-6 rounded-lg shadow-xl">
                <div className="text-3xl font-bold">2012</div>
                <div className="text-sm">Founded</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones that shaped who we are today
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="flex-1 max-w-md">
                    <div className={`bg-white rounded-lg p-6 shadow-lg ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                      <div className="text-gold font-bold text-lg mb-2">{milestone.year}</div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-4 bg-gold rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-cream rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <value.icon className="w-12 h-12 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <TrophyIcon className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Recognized by industry leaders for our innovative work
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur rounded-lg p-6 text-center"
              >
                <div className="text-gold text-2xl font-bold mb-2">{award.year}</div>
                <h3 className="font-bold mb-2">{award.title}</h3>
                <p className="text-gray-300 text-sm">{award.organization}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <LightBulbIcon className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-dark mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To empower businesses with AI-driven marketing strategies and innovative technology 
                solutions that drive measurable growth and competitive advantage in the digital age.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <GlobeAltIcon className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-2xl font-bold text-dark mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be the global leader in AI marketing transformation, helping businesses of all 
                sizes unlock their full potential through intelligent, data-driven strategies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Culture & Work Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <HeartIcon className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-dark mb-4">Our Culture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What makes Disruptors Media a great place to work and partner with
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gold/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <RocketLaunchIcon className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Innovation Mindset</h3>
              <p className="text-gray-600">
                We encourage experimentation, creative problem-solving, and staying ahead of industry trends.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-gold/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <UserGroupIcon className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Collaborative Spirit</h3>
              <p className="text-gray-600">
                We believe the best results come from diverse perspectives working together toward common goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gold/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <ChartBarIcon className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Results Focused</h3>
              <p className="text-gray-600">
                Every project, strategy, and campaign is measured by its real-world impact on client success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark to-dark/90 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Join the <span className="text-gold">AI Revolution</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how our team can help transform your business with AI-powered marketing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Start a Conversation
            </Link>
            <Link
              to="/portfolio"
              className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}