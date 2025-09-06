import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  id: string;
  client: string;
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  projectId?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-dark"
        >
          What Our Clients Say
        </motion.h2>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Rating */}
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-6 h-6 ${
                  i < current.rating ? 'text-gold' : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <blockquote className="text-lg md:text-xl text-gray-700 text-center mb-8 italic">
            "{current.content}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center">
            <img
              src={current.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'}
              alt={current.author}
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
            <div className="text-left">
              <div className="font-semibold text-dark">{current.author}</div>
              <div className="text-gray-600">
                {current.role} at {current.company}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6 text-dark" />
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-gold' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-6 h-6 text-dark" />
          </button>
        </div>
      </div>
    </section>
  );
}