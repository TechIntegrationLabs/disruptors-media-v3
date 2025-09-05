import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  VideoCameraIcon,
  MicrophoneIcon,
  LightBulbIcon,
  SignalIcon,
  ComputerDesktopIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const studioEquipment = [
  {
    category: 'Video Equipment',
    icon: VideoCameraIcon,
    items: [
      '3x BlackMagic Cinema Cameras (4K)',
      'Professional lighting grid',
      'Green screen setup',
      'Teleprompter',
      'Drone for aerial shots'
    ]
  },
  {
    category: 'Audio Equipment',
    icon: MicrophoneIcon,
    items: [
      '4x Shure SM7B Microphones',
      'Focusrite audio interface',
      'Acoustic treatment panels',
      'Studio monitors',
      'Headphone distribution'
    ]
  },
  {
    category: 'Display & Monitoring',
    icon: ComputerDesktopIcon,
    items: [
      '3x HD TV monitors',
      'Confidence monitors',
      'Multi-view switching',
      'Live streaming capability',
      'Playback systems'
    ]
  },
  {
    category: 'Additional Features',
    icon: LightBulbIcon,
    items: [
      'Climate controlled environment',
      'Makeup & green room',
      'High-speed internet',
      'Free parking',
      'Complimentary refreshments'
    ]
  }
];

const bookingOptions = [
  {
    name: 'Half Day',
    duration: '4 hours',
    price: '$350',
    savings: 'Save $46',
    features: ['All equipment included', 'Basic setup assistance', 'Free parking']
  },
  {
    name: 'Full Day',
    duration: '8 hours',
    price: '$650',
    savings: 'Save $142',
    features: ['All equipment included', 'Full setup assistance', 'Free parking', 'Lunch included'],
    popular: true
  },
  {
    name: 'Weekly',
    duration: '5 days',
    price: '$2,800',
    savings: 'Save $1,150',
    features: ['All equipment included', 'Dedicated support', 'Priority booking', 'All amenities'],
  }
];

const StudioServices: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark via-dark/95 to-dark/90 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=600&fit=crop&crop=center"
            alt="Studio background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional <span className="text-gold">Podcast & Video Studio</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              State-of-the-art facility in North Salt Lake, Utah. Everything you need for 
              professional content creation under one roof.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://cal.com/disruptors-media/studio-tour"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <CalendarDaysIcon className="w-5 h-5" />
                Book Studio Time
              </a>
              <button
                onClick={() => setSelectedTab('virtual-tour')}
                className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <PlayIcon className="w-5 h-5" />
                Take Virtual Tour
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Banner */}
      <section className="bg-gold text-dark py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <ClockIcon className="w-12 h-12" />
              <div>
                <div className="text-3xl font-bold">$99/HR</div>
                <div className="text-sm">2 Hour Minimum</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5" />
                <span>North Salt Lake, Utah</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5" />
                <a href="tel:+18015551234" className="hover:underline">(801) 555-1234</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-cream sticky top-16 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {['overview', 'equipment', 'pricing', 'virtual-tour'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                  selectedTab === tab
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-600 hover:text-dark'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-dark mb-6">
                  Everything You Need to <span className="text-gold">Create Professional Content</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Our 2,000 sq ft studio is designed for creators who demand the best. Whether you're 
                  recording a podcast, filming video content, or hosting a live stream, we have the 
                  equipment and expertise to make your vision a reality.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-dark">Professional Equipment Included</h4>
                      <p className="text-gray-600">No need to bring your own gear - we have everything</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-dark">Expert Technical Support</h4>
                      <p className="text-gray-600">Our team helps with setup and operation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-dark">Flexible Booking Options</h4>
                      <p className="text-gray-600">Hourly, daily, or weekly rates available</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to="/portfolio?filter=studio"
                    className="text-gold hover:text-gold/80 font-semibold inline-flex items-center gap-2"
                  >
                    See projects filmed in our studio →
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop&crop=center"
                  alt="Main studio area"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop&crop=center"
                  alt="Control room"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop&crop=center"
                  alt="Green screen setup"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=300&fit=crop&crop=center"
                  alt="Podcast recording"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Equipment Tab */}
      {selectedTab === 'equipment' && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-dark mb-4">Professional Grade Equipment</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We invest in the best equipment so you don't have to
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {studioEquipment.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <category.icon className="w-12 h-12 text-gold mb-4" />
                  <h3 className="text-xl font-bold text-dark mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gold/10 rounded-xl p-8 text-center"
            >
              <ComputerDesktopIcon className="w-16 h-16 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-dark mb-2">Post-Production Suite Available</h3>
              <p className="text-gray-600 mb-4">
                Need to edit on-site? We have fully equipped editing stations with Adobe Creative Suite, 
                Final Cut Pro, and DaVinci Resolve.
              </p>
              <Link
                to="/contact?service=post-production"
                className="text-gold hover:text-gold/80 font-semibold"
              >
                Learn about post-production services →
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Pricing Tab */}
      {selectedTab === 'pricing' && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-dark mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                All packages include full access to equipment and facilities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {bookingOptions.map((option, index) => (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl p-8 ${
                    option.popular 
                      ? 'ring-2 ring-gold shadow-xl transform scale-105' 
                      : 'shadow-lg'
                  }`}
                >
                  {option.popular && (
                    <div className="bg-gold text-dark text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-dark mb-2">{option.name}</h3>
                  <p className="text-gray-600 mb-4">{option.duration}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-dark">{option.price}</span>
                  </div>
                  <p className="text-gold font-semibold mb-6">{option.savings}</p>
                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://cal.com/disruptors-media/studio-booking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors inline-block text-center ${
                      option.popular
                        ? 'bg-gold hover:bg-gold/90 text-dark'
                        : 'bg-dark hover:bg-dark/90 text-white'
                    }`}
                  >
                    Book Now
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-cream rounded-xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-dark mb-4">Need Something Custom?</h3>
              <p className="text-gray-600 mb-6">
                Long-term projects, recurring bookings, or special requirements? Let's create a package that works for you.
              </p>
              <Link
                to="/contact?service=studio-custom"
                className="bg-dark hover:bg-dark/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Get Custom Quote
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Virtual Tour Tab */}
      {selectedTab === 'virtual-tour' && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-dark mb-4">Take a Virtual Tour</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our studio from the comfort of your home
              </p>
            </motion.div>

            <div className="bg-dark rounded-xl overflow-hidden shadow-xl">
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Studio Virtual Tour"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <SignalIcon className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">High-Speed Internet</h3>
                <p className="text-gray-600">1GB fiber connection for seamless streaming and uploads</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <MapPinIcon className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">Convenient Location</h3>
                <p className="text-gray-600">Easy access from I-15, ample free parking available</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <CalendarDaysIcon className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">Available 7 days a week, early morning to late evening</p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark to-dark/90 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Create in Our <span className="text-gold">Professional Studio</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book your session today and experience the difference professional equipment makes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://cal.com/disruptors-media/studio-booking"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Check Availability
            </a>
            <a
              href="tel:+18015551234"
              className="border-2 border-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <PhoneIcon className="w-5 h-5" />
              Call Us: (801) 555-1234
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudioServices;