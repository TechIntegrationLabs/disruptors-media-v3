import { motion } from 'framer-motion';

interface VideoHeroProps {
  title: string;
  subtitle: string;
  videoUrl: string;
  posterImage: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  showLogo?: boolean;
}

export default function VideoHero({ title, subtitle, videoUrl, posterImage, primaryCta, secondaryCta, showLogo = true }: VideoHeroProps) {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          poster={posterImage || '/assets/images/poster.jpg'}
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            // Fallback to poster image if video fails to load
            e.currentTarget.style.display = 'none';
          }}
        >
          <source src={videoUrl || '/assets/videos/main-banner-video.mp4'} type="video/mp4" />
        </video>
        {/* Fallback background image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-dark"
          style={{ 
            backgroundImage: `url(${posterImage || '/assets/images/poster.jpg'})`,
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark/70" />
      </div>

      {/* Gold Logo Overlay */}
      {showLogo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-24 h-24 md:w-32 md:h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full text-gold">
              <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.9" />
              <text 
                x="50" 
                y="58" 
                textAnchor="middle" 
                className="fill-dark font-bold text-2xl"
                fontSize="24"
              >
                DM
              </text>
            </svg>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={primaryCta.href}
            className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
          >
            {primaryCta.text}
          </a>
          <a
            href={secondaryCta.href}
            className="border-2 border-white text-white hover:bg-white hover:text-dark px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
          >
            {secondaryCta.text}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-white rounded-full mx-auto"
          />
        </div>
      </motion.div>
    </section>
  );
}