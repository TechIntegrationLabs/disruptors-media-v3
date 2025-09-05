import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Counter {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

interface AnimatedCountersProps {
  counters: Counter[];
}

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endValue = value;

    const updateNumber = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * endValue);
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setDisplayValue(endValue);
      }
    };

    updateNumber();
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
}

export default function AnimatedCounters({ counters }: AnimatedCountersProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-dark via-dark/95 to-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Results That Speak Volumes</h2>
          <p className="text-xl text-gray-300">Our track record of success</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((counter, index) => (
            <motion.div
              key={counter.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                {counter.prefix}
                <AnimatedNumber value={counter.value} />
                {counter.suffix}
              </div>
              <div className="text-gray-300">{counter.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}