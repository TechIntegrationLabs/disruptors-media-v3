import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  duration: string;
  publishedAt: string;
  audioUrl: string;
  coverImage: string;
  guest?: {
    name: string;
    title: string;
    company?: string;
  };
  category: string;
}

const Podcast: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock podcast episodes using old site assets
  const episodes: PodcastEpisode[] = [
    {
      id: 1,
      title: "The Future of AI in Digital Marketing",
      description: "Exploring how artificial intelligence is reshaping the marketing landscape and what businesses need to know to stay competitive.",
      duration: "45:23",
      publishedAt: "2024-01-15",
      audioUrl: "#", // Would be actual audio URLs
      coverImage: "/assets/images/podcast-new-lg.jpg",
      guest: {
        name: "Sarah Johnson",
        title: "Head of AI Strategy",
        company: "TechCorp"
      },
      category: "AI & Technology"
    },
    {
      id: 2,
      title: "Building Authentic Brand Stories",
      description: "Discover the power of storytelling in modern marketing and how to create narratives that truly resonate with your audience.",
      duration: "38:45",
      publishedAt: "2024-01-08",
      audioUrl: "#",
      coverImage: "/assets/images/podcast-new-lg-1.jpg",
      guest: {
        name: "Mike Chen",
        title: "Creative Director",
        company: "Brand Studio"
      },
      category: "Branding"
    },
    {
      id: 3,
      title: "Data-Driven Decision Making",
      description: "How to leverage analytics and data insights to make smarter marketing decisions and drive better business outcomes.",
      duration: "42:10",
      publishedAt: "2024-01-01",
      audioUrl: "#",
      coverImage: "/assets/images/pd-new-sm.png",
      category: "Analytics"
    },
    {
      id: 4,
      title: "The Art of Content Production",
      description: "Behind-the-scenes look at creating high-quality content that engages audiences and drives meaningful results.",
      duration: "35:30",
      publishedAt: "2023-12-25",
      audioUrl: "#",
      coverImage: "/assets/images/pd-new-sm1.jpg",
      category: "Content"
    }
  ];

  const categories = ['All', 'AI & Technology', 'Branding', 'Analytics', 'Content'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEpisodes = selectedCategory === 'All' 
    ? episodes 
    : episodes.filter(episode => episode.category === selectedCategory);

  const handlePlayPause = (episodeId: number) => {
    if (currentEpisode === episodeId && isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    } else {
      setCurrentEpisode(episodeId);
      setIsPlaying(true);
      // In a real app, you'd load and play the audio file
      console.log(`Playing episode ${episodeId}`);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Podcast | Disruptors Media"
        description="Listen to insights from industry leaders on AI, marketing, branding, and digital transformation. Expert conversations that drive business growth."
        keywords="podcast, marketing podcast, AI discussions, business insights, digital marketing, industry leaders, expert interviews"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-dark via-dark-light to-pure-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <img 
                  src="/assets/images/hand-robot.png" 
                  alt="Technology" 
                  className="w-8 h-8 mr-3"
                />
                <span className="font-tech text-gold text-sm uppercase tracking-wider">
                  Podcast Series
                </span>
              </div>
              <h1 className="font-headline text-4xl lg:text-6xl font-bold mb-6">
                Disruptors<br />
                <span className="text-gold">Conversations</span>
              </h1>
              <p className="text-xl lg:text-2xl text-cream/90 mb-8 leading-relaxed">
                Insights from industry leaders on AI, marketing, and digital transformation.
                Where technology meets human wisdom.
              </p>
              <div className="flex items-center space-x-6">
                <button className="bg-gold text-dark px-8 py-3 rounded-full font-tech font-semibold hover:bg-gold-light transition-colors duration-300">
                  Subscribe Now
                </button>
                <div className="flex items-center text-cream/80">
                  <span className="font-tech text-sm">
                    New episodes weekly
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gold/20 to-transparent rounded-3xl p-8">
                <img
                  src="/assets/images/podcast-new-lg.jpg"
                  alt="Podcast Studio"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-gold text-dark rounded-full p-4">
                  <SpeakerWaveIcon className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-tech text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gold text-dark'
                    : 'bg-cream text-dark hover:bg-gold/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes List */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {filteredEpisodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Episode Cover */}
                    <div className="lg:w-64 lg:flex-shrink-0">
                      <div className="relative h-48 lg:h-full">
                        <img
                          src={episode.coverImage}
                          alt={episode.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <button
                          onClick={() => handlePlayPause(episode.id)}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold/90 hover:bg-gold text-dark rounded-full p-4 transition-colors duration-300"
                        >
                          {currentEpisode === episode.id && isPlaying ? (
                            <PauseIcon className="w-8 h-8" />
                          ) : (
                            <PlayIcon className="w-8 h-8 ml-1" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Episode Info */}
                    <div className="flex-1 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-gold/20 text-gold-dark text-xs font-tech rounded-full mb-3">
                            {episode.category}
                          </span>
                          <h3 className="font-headline text-2xl font-bold text-dark mb-2 hover:text-gold transition-colors duration-300">
                            {episode.title}
                          </h3>
                        </div>
                        <span className="font-tech text-sm text-dark/60 whitespace-nowrap ml-4">
                          {episode.duration}
                        </span>
                      </div>

                      <p className="text-dark/80 mb-4 leading-relaxed">
                        {episode.description}
                      </p>

                      {episode.guest && (
                        <div className="flex items-center mb-4 p-4 bg-cream/50 rounded-lg">
                          <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mr-4">
                            <span className="font-tech font-bold text-gold text-lg">
                              {episode.guest.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-dark">{episode.guest.name}</p>
                            <p className="text-sm text-dark/70">
                              {episode.guest.title}
                              {episode.guest.company && ` at ${episode.guest.company}`}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-dark/60">
                        <span className="font-tech">
                          Published {new Date(episode.publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        <div className="flex items-center space-x-4">
                          <button 
                            onClick={toggleMute}
                            className="hover:text-gold transition-colors duration-300"
                          >
                            {isMuted ? (
                              <SpeakerXMarkIcon className="w-5 h-5" />
                            ) : (
                              <SpeakerWaveIcon className="w-5 h-5" />
                            )}
                          </button>
                          <button className="hover:text-gold transition-colors duration-300">
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
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
                src="/assets/images/hand-human.png" 
                alt="Human Connection" 
                className="w-12 h-12 mr-4"
              />
              <h2 className="font-headline text-3xl lg:text-4xl font-bold">
                Never Miss an Episode
              </h2>
            </div>
            <p className="text-xl text-cream/90 mb-8">
              Subscribe to get the latest insights delivered directly to your preferred podcast platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Apple Podcasts', 'Spotify', 'Google Podcasts'].map((platform) => (
                <Link
                  key={platform}
                  to="#"
                  className="bg-gold text-dark px-6 py-3 rounded-full font-tech font-semibold hover:bg-gold-light transition-colors duration-300"
                >
                  {platform}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hidden audio element for future audio playback */}
      <audio ref={audioRef} />
    </div>
  );
};

export default Podcast;