import { motion } from 'framer-motion';
import { PlayIcon, VideoCameraIcon, MicrophoneIcon, TvIcon } from '@heroicons/react/24/outline';

const studioFeatures = [
  {
    icon: VideoCameraIcon,
    title: "3 BlackMagic Cameras",
    description: "Professional 4K cinema cameras for broadcast-quality production"
  },
  {
    icon: MicrophoneIcon,
    title: "4 Shure SM7B Mics",
    description: "Industry-standard microphones for crystal-clear audio"
  },
  {
    icon: TvIcon,
    title: "3 HD Display Monitors",
    description: "Multiple viewing angles for perfect shot composition"
  }
];

export default function StudioShowcase() {
  return (
    <section className="py-20 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Professional <span className="text-gold">Podcast Studio</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              State-of-the-art recording facility in North Salt Lake, Utah. Perfect for podcasts, video interviews, and content creation.
            </p>
            
            <div className="space-y-6 mb-8">
              {studioFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4"
                >
                  <feature.icon className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/studio-services"
                className="bg-gold hover:bg-gold/90 text-dark px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Book Studio Time
              </a>
              <a
                href="#studio-tour"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-dark px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <PlayIcon className="w-5 h-5" />
                Virtual Tour
              </a>
            </div>
          </motion.div>
          
          {/* Studio Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img
                src="https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_600,h_400,c_fill/photos/studio/overview/wide-angle-001.jpg"
                alt="Studio wide shot"
                className="rounded-lg w-full h-48 object-cover"
              />
              <img
                src="https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_600,h_400,c_fill/photos/studio/recording/session-example.jpg"
                alt="Recording setup"
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_80,h_80/photos/studio/equipment/cameras-detail.jpg"
                alt="Camera equipment"
                className="rounded-lg w-full h-64 object-cover"
              />
              <img
                src="https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_600,h_400,c_fill/photos/studio/equipment/setup-overview.jpg"
                alt="Control room"
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}