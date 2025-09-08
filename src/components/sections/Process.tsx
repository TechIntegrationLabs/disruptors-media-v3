import React from 'react';
import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  DocumentTextIcon, 
  BriefcaseIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const processSteps: ProcessStep[] = [
  {
    id: '1',
    order: 1,
    title: 'DISCOVERY CALL',
    description: 'Kick-off with Insight: A focused call to understand your brand\'s needs and outline our role in your growth story.',
    icon: PhoneIcon
  },
  {
    id: '2',
    order: 2,
    title: 'SEND PROPOSAL',
    description: 'Strategic Blueprint: A detailed proposal presenting a customized plan for your brand\'s digital and creative journey.',
    icon: DocumentTextIcon
  },
  {
    id: '3',
    order: 3,
    title: 'SCOPE OF WORK',
    description: 'We help you build a sustainable, competitive advantage through data-driven creative that establishes brand identity, engages consumers, and drives traffic.',
    icon: BriefcaseIcon
  },
  {
    id: '4',
    order: 4,
    title: 'START DESIGN + CREATIVE WORK',
    description: 'Creative Execution: Launching into the design and marketing phase to turn your brand vision into impactful reality.',
    icon: SparklesIcon
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center mb-6">
            <div className="h-px bg-gold flex-grow max-w-20"></div>
            <span className="font-tech text-gold text-sm uppercase tracking-wider mx-6">
              Our Process
            </span>
            <div className="h-px bg-gold flex-grow max-w-20"></div>
          </div>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-dark mb-6">
            FROM VISION TO <span className="text-gold">REALITY</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven 4-step methodology ensures every project delivers exceptional results
            through strategic planning, creative execution, and data-driven optimization.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent transform -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                {/* Step Number & Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gold rounded-full flex items-center justify-center group-hover:bg-gold/90 transition-colors relative z-10">
                    <step.icon className="w-10 h-10 text-dark" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-dark text-white rounded-full flex items-center justify-center font-tech text-sm font-bold">
                    {step.order}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="font-headline text-lg font-bold text-dark uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Progressive Separator */}
                {index < processSteps.length - 1 && (
                  <div className="mt-8 lg:hidden">
                    <div className={`mx-auto bg-gold`} style={{ height: `${(index + 1) * 2}px`, width: '100%', marginBottom: `${16 - (index * 2)}px` }}></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-cream rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-headline text-2xl font-bold text-dark mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-700 mb-6">
              Let's begin with a discovery call to understand your unique needs and goals.
            </p>
            <a
              href="/contact"
              className="bg-gold hover:bg-gold/90 text-dark px-8 py-4 rounded-full font-tech font-semibold transition-colors inline-flex items-center justify-center"
            >
              Schedule Discovery Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;