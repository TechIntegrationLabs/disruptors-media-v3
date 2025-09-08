import React from 'react';
import { motion } from 'framer-motion';

interface BrandStatement {
  id: string;
  order: number;
  statement: string;
  emphasis?: boolean;
}

const brandStatements: BrandStatement[] = [
  {
    id: '1',
    order: 1,
    statement: "WE'RE NOT JUST ANOTHER AGENCY.",
    emphasis: true
  },
  {
    id: '2',
    order: 2,
    statement: "WE'RE ARCHITECTS OF DIGITAL LANDSCAPES."
  },
  {
    id: '3',
    order: 3,
    statement: "TURNING CLICKS INTO CUSTOMERS.",
    emphasis: true
  },
  {
    id: '4',
    order: 4,
    statement: "A WEBSITE THAT ADAPTS TO EVERY VISITOR."
  },
  {
    id: '5',
    order: 5,
    statement: "EMAIL CAMPAIGNS THAT FEEL LIKE PERSONAL LETTERS."
  },
  {
    id: '6',
    order: 6,
    statement: "SOCIAL MEDIA PAGES RECEIVING MILLIONS OF ENGAGEMENT.",
    emphasis: true
  },
  {
    id: '7',
    order: 7,
    statement: "LAUNCHING BRANDS INTO THE DYNAMIC DIGITAL WORLD."
  },
  {
    id: '8',
    order: 8,
    statement: "WHERE EVERY INTERACTION IS AN OPPORTUNITY."
  },
  {
    id: '9',
    order: 9,
    statement: "IT'S NOT JUST MARKETING.",
    emphasis: true
  },
  {
    id: '10',
    order: 10,
    statement: "IT'S A NEW CHAPTER FOR YOUR BRAND."
  }
];

const BrandStatements: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-dark via-dark/95 to-dark/90 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23FFD700" fill-opacity="0.1"><rect width="2" height="2" x="2" y="2"/><rect width="2" height="2" x="10" y="10"/><rect width="2" height="2" x="18" y="18"/></g></svg>')`,
          backgroundSize: '60px 60px'
        }}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center mb-6">
            <div className="h-px bg-gold flex-grow max-w-20"></div>
            <span className="font-tech text-gold text-sm uppercase tracking-wider mx-6">
              What We Stand For
            </span>
            <div className="h-px bg-gold flex-grow max-w-20"></div>
          </div>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold mb-6">
            OUR <span className="text-gold">MANIFESTO</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Progressive Separators */}
          <div className="mb-12">
            {[1, 2, 4, 7, 9, 10].map((height, index) => (
              <motion.div
                key={height}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className={`bg-gold mx-auto`}
                style={{ 
                  height: `${height}px`, 
                  marginBottom: `${18 - (index * 2)}px` 
                }}
              />
            ))}
          </div>

          {/* Brand Statements */}
          <div className="space-y-8">
            {brandStatements.map((statement, index) => (
              <motion.div
                key={statement.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`text-center ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}
              >
                <p className={`font-tech text-lg lg:text-xl leading-relaxed tracking-wide ${
                  statement.emphasis 
                    ? 'text-gold font-bold text-xl lg:text-2xl' 
                    : 'text-cream'
                }`}>
                  <span className="font-tech text-gold/60 text-sm mr-4">
                    {statement.order.toString().padStart(2, '0')}
                  </span>
                  {statement.statement}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Progressive Separators Bottom */}
          <div className="mt-12">
            {[10, 9, 7, 4, 2, 1].map((height, index) => (
              <motion.div
                key={height}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className={`bg-gold mx-auto`}
                style={{ 
                  height: `${height}px`, 
                  marginBottom: `${10 + (index * 2)}px` 
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 bg-gold/10 backdrop-blur rounded-full px-8 py-4">
            <span className="font-tech text-cream/90">Ready to write your chapter?</span>
            <a
              href="/contact"
              className="bg-gold hover:bg-gold/90 text-dark px-6 py-3 rounded-full font-tech font-semibold transition-colors"
            >
              Let's Begin
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStatements;