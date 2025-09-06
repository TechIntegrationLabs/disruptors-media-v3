import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, ChartBarIcon, RocketLaunchIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface MetricHighlight {
  project: string;
  metric: string;
  value: string;
  description: string;
  icon?: React.ElementType;
}

const highlightedMetrics: MetricHighlight[] = [
  {
    project: 'Bruce Leeroy',
    metric: 'Social Media Views',
    value: '2M+',
    description: 'millions of views on TikTok and Instagram',
    icon: ChartBarIcon
  },
  {
    project: 'Desjardins Brands',
    metric: 'Annual Revenue',
    value: '$100K+',
    description: 'per year in revenue generation',
    icon: CurrencyDollarIcon
  },
  {
    project: 'BYS',
    metric: 'Combined Followers',
    value: '100K+',
    description: 'across all social platforms',
    icon: RocketLaunchIcon
  },
  {
    project: "Master Lu's",
    metric: 'Client Growth',
    value: '+85%',
    description: 'increase in new clients',
    icon: TrophyIcon
  }
];

export default function SocialProofMetrics() {
  return (
    <section className="py-20 bg-gradient-to-br from-dark via-dark/95 to-dark/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Proven <span className="text-gold">Results</span> That Matter
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real metrics from real client success stories. These aren't just numbers – 
            they're transformations that changed businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlightedMetrics.map((metric, index) => {
            const Icon = metric.icon || ChartBarIcon;
            return (
              <motion.div
                key={`${metric.project}-${metric.metric}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-gold/50 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-8 w-8 text-gold" />
                    <span className="text-xs text-gold/80 font-medium uppercase tracking-wider">
                      {metric.project}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-gold mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {metric.metric}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {metric.description}
                  </p>
                  
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            View All Case Studies
            <ChartBarIcon className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}