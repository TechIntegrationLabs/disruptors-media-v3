import { motion } from 'framer-motion';

interface ClientLogosProps {
  title?: string;
  logos: {
    name: string;
    src: string;
    href?: string;
  }[];
}

export default function ClientLogos({ title = "Trusted by Industry Leaders", logos }: ClientLogosProps) {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-dark"
          >
            {title}
          </motion.h2>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-center"
            >
              {logo.href ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-12 md:h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              ) : (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 md:h-16 w-auto object-contain opacity-60 filter grayscale"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}