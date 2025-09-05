import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/common/SEO';

interface GalleryItem {
  id: number;
  title: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  category: 'work' | 'behind-scenes' | 'culture' | 'studio';
  description?: string;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Gallery items using migrated assets
  const galleryItems: GalleryItem[] = [
    // Work Portfolio Items
    {
      id: 1,
      title: 'Case Study 1',
      type: 'image',
      src: '/assets/images/portfolio/case-study-1.jpg',
      thumbnail: '/assets/images/portfolio/case-study-1.jpg',
      category: 'work',
      description: 'Digital marketing transformation for enterprise client'
    },
    {
      id: 2,
      title: 'Case Study 2',
      type: 'image',
      src: '/assets/images/portfolio/case-study-2.jpg',
      thumbnail: '/assets/images/portfolio/case-study-2.jpg',
      category: 'work',
      description: 'AI-powered content strategy implementation'
    },
    {
      id: 3,
      title: 'Case Study 3',
      type: 'image',
      src: '/assets/images/portfolio/case-study-3.jpg',
      thumbnail: '/assets/images/portfolio/case-study-3.jpg',
      category: 'work'
    },
    {
      id: 4,
      title: 'Case Study 4',
      type: 'image',
      src: '/assets/images/portfolio/case-study-4.jpg',
      thumbnail: '/assets/images/portfolio/case-study-4.jpg',
      category: 'work'
    },
    // Behind the Scenes & Culture
    {
      id: 5,
      title: 'Technology Meets Humanity',
      type: 'image',
      src: '/assets/images/hand-robot.png',
      thumbnail: '/assets/images/hand-robot.png',
      category: 'culture',
      description: 'Our core philosophy: bridging technology and human connection'
    },
    {
      id: 6,
      title: 'Human Touch in Digital World',
      type: 'image',
      src: '/assets/images/hand-human.png',
      thumbnail: '/assets/images/hand-human.png',
      category: 'culture',
      description: 'Every digital solution starts with human insight'
    },
    // Studio Work
    {
      id: 7,
      title: 'Service Framework',
      type: 'image',
      src: '/assets/images/services/what-we-do-abt.png',
      thumbnail: '/assets/images/services/what-we-do-abt.png',
      category: 'studio',
      description: 'Our comprehensive service methodology'
    },
    {
      id: 8,
      title: 'Studio Overview',
      type: 'image',
      src: '/assets/images/services/services-img.png',
      thumbnail: '/assets/images/services/services-img.png',
      category: 'studio'
    },
    // More Portfolio Items
    ...Array.from({ length: 6 }, (_, i) => ({
      id: 9 + i,
      title: `Work ${i + 1}`,
      type: 'image' as const,
      src: `/assets/images/portfolio/work-${i + 1}.jpg`,
      thumbnail: `/assets/images/portfolio/work-${i + 1}.jpg`,
      category: 'work' as const,
    })),
  ];

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'work', label: 'Client Work' },
    { key: 'studio', label: 'Studio' },
    { key: 'culture', label: 'Culture' },
    { key: 'behind-scenes', label: 'Behind the Scenes' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Gallery | Disruptors Media"
        description="Explore our work, behind-the-scenes moments, and company culture. See the intersection of technology and humanity in action."
        keywords="gallery, portfolio, behind the scenes, company culture, digital marketing work, case studies"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-dark to-dark-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-headline text-4xl lg:text-6xl font-bold mb-6">
              Gallery
            </h1>
            <p className="text-xl lg:text-2xl text-cream/90 font-tech">
              Where technology meets humanity
            </p>
            <div className="flex justify-center items-center mt-8 space-x-8">
              <img 
                src="/assets/images/hand-robot.png" 
                alt="Technology"
                className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
              />
              <div className="font-tech text-gold">+</div>
              <img 
                src="/assets/images/hand-human.png" 
                alt="Humanity"
                className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Navigation */}
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

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-4">
                          <img 
                            src="/assets/images/icons/play-icon.png" 
                            alt="Play" 
                            className="w-8 h-8"
                          />
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-headline font-semibold text-lg text-dark mb-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-dark/70 text-sm">
                          {item.description}
                        </p>
                      )}
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 text-xs font-tech rounded-full ${
                          item.category === 'work' ? 'bg-gold/20 text-gold-dark' :
                          item.category === 'studio' ? 'bg-blue-100 text-blue-800' :
                          item.category === 'culture' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {categories.find(c => c.key === item.category)?.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-auto"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-headline text-2xl font-bold text-dark mb-2">
                  {selectedItem.title}
                </h3>
                {selectedItem.description && (
                  <p className="text-dark/80 mb-4">
                    {selectedItem.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 text-sm font-tech rounded-full ${
                    selectedItem.category === 'work' ? 'bg-gold/20 text-gold-dark' :
                    selectedItem.category === 'studio' ? 'bg-blue-100 text-blue-800' :
                    selectedItem.category === 'culture' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {categories.find(c => c.key === selectedItem.category)?.label}
                  </span>
                  <span className="font-tech text-sm text-dark/60">
                    {selectedItem.type.toUpperCase()}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;