import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CalculatorIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface CalculatorInputs {
  monthlyRevenue: number;
  monthlyMarketingSpend: number;
  conversionRate: number;
  averageOrderValue: number;
  monthlyTraffic: number;
  customerLifetimeValue: number;
}

interface ROIResults {
  currentROI: number;
  projectedROI: number;
  additionalRevenue: number;
  paybackPeriod: number;
  revenueIncrease: number;
  conversionImprovement: number;
}

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyRevenue: 100000,
    monthlyMarketingSpend: 15000,
    conversionRate: 2.5,
    averageOrderValue: 150,
    monthlyTraffic: 10000,
    customerLifetimeValue: 450
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const calculateROI = () => {
    const {
      monthlyRevenue,
      monthlyMarketingSpend,
      conversionRate,
      averageOrderValue,
      monthlyTraffic,
      customerLifetimeValue
    } = inputs;

    // Current metrics
    const currentROI = ((monthlyRevenue - monthlyMarketingSpend) / monthlyMarketingSpend) * 100;
    
    // AI-enhanced projections (conservative estimates based on industry data)
    const trafficIncrease = 0.35; // 35% traffic increase
    const conversionIncrease = 0.45; // 45% conversion rate improvement
    const aovIncrease = 0.25; // 25% average order value increase
    const retentionIncrease = 0.30; // 30% customer lifetime value increase

    // Projected metrics
    const newTraffic = monthlyTraffic * (1 + trafficIncrease);
    const newConversionRate = conversionRate * (1 + conversionIncrease);
    const newAOV = averageOrderValue * (1 + aovIncrease);
    const newCLV = customerLifetimeValue * (1 + retentionIncrease);

    // Calculate projected revenue
    const newMonthlyRevenue = (newTraffic * (newConversionRate / 100) * newAOV);
    const additionalRevenue = newMonthlyRevenue - monthlyRevenue;
    
    // Projected ROI (assuming 20% increase in marketing spend for AI implementation)
    const newMarketingSpend = monthlyMarketingSpend * 1.2;
    const projectedROI = ((newMonthlyRevenue - newMarketingSpend) / newMarketingSpend) * 100;
    
    // Payback period (months to recoup additional investment)
    const additionalInvestment = newMarketingSpend - monthlyMarketingSpend;
    const paybackPeriod = additionalInvestment > 0 ? additionalInvestment / additionalRevenue : 0;

    setResults({
      currentROI,
      projectedROI,
      additionalRevenue,
      paybackPeriod,
      revenueIncrease: ((newMonthlyRevenue - monthlyRevenue) / monthlyRevenue) * 100,
      conversionImprovement: conversionIncrease * 100
    });
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const resetCalculator = () => {
    setInputs({
      monthlyRevenue: 100000,
      monthlyMarketingSpend: 15000,
      conversionRate: 2.5,
      averageOrderValue: 150,
      monthlyTraffic: 10000,
      customerLifetimeValue: 450
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
  };

  const tooltips: Record<string, string> = {
    monthlyRevenue: 'Total revenue generated per month from your business',
    monthlyMarketingSpend: 'Total amount spent on marketing activities per month',
    conversionRate: 'Percentage of website visitors who become customers',
    averageOrderValue: 'Average amount customers spend per transaction',
    monthlyTraffic: 'Number of unique visitors to your website per month',
    customerLifetimeValue: 'Total revenue a customer generates over their relationship with your business'
  };

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <CalculatorIcon className="h-16 w-16 text-gold mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Marketing ROI Calculator
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate the potential return on investment for AI-powered marketing solutions. 
            See how much revenue you could generate with data-driven optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Current Business Metrics</h2>
              <button
                onClick={resetCalculator}
                className="flex items-center text-gold hover:text-gold-light text-sm transition-colors"
              >
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Reset
              </button>
            </div>

            <div className="space-y-6">
              {[
                { key: 'monthlyRevenue', label: 'Monthly Revenue', prefix: '$', type: 'currency' },
                { key: 'monthlyMarketingSpend', label: 'Monthly Marketing Spend', prefix: '$', type: 'currency' },
                { key: 'conversionRate', label: 'Website Conversion Rate', suffix: '%', type: 'percentage' },
                { key: 'averageOrderValue', label: 'Average Order Value', prefix: '$', type: 'currency' },
                { key: 'monthlyTraffic', label: 'Monthly Website Traffic', type: 'number' },
                { key: 'customerLifetimeValue', label: 'Customer Lifetime Value', prefix: '$', type: 'currency' }
              ].map(({ key, label, prefix, suffix, type }) => (
                <div key={key} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {label}
                    </label>
                    <button
                      onMouseEnter={() => setShowTooltip(key)}
                      onMouseLeave={() => setShowTooltip(null)}
                      className="text-gray-400 hover:text-gold transition-colors"
                    >
                      <InformationCircleIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {showTooltip === key && (
                    <div className="absolute top-0 right-0 z-10 w-64 p-3 bg-dark-light border border-gold/20 rounded-lg text-sm text-gray-300">
                      {tooltips[key as keyof typeof tooltips]}
                    </div>
                  )}

                  <div className="relative">
                    {prefix && (
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {prefix}
                      </span>
                    )}
                    <input
                      type="number"
                      value={inputs[key as keyof CalculatorInputs]}
                      onChange={(e) => handleInputChange(key as keyof CalculatorInputs, e.target.value)}
                      className={`w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
                        prefix ? 'pl-8' : ''
                      } ${suffix ? 'pr-8' : ''}`}
                      step={type === 'percentage' ? '0.1' : type === 'currency' ? '100' : '1'}
                      min="0"
                    />
                    {suffix && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {suffix}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* ROI Comparison */}
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <ArrowTrendingUpIcon className="h-6 w-6 text-gold mr-3" />
                <h3 className="text-xl font-bold text-white">ROI Comparison</h3>
              </div>
              
              {results && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-300 mb-1">
                        {results.currentROI.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-400">Current ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gold mb-1">
                        {results.projectedROI.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-400">Projected ROI</div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">ROI Improvement</span>
                      <span className="text-sm font-medium text-gold">
                        +{(results.projectedROI - results.currentROI).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gold rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${Math.min((results.projectedROI / Math.max(results.currentROI, results.projectedROI)) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Revenue Impact */}
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <CurrencyDollarIcon className="h-6 w-6 text-gold mr-3" />
                <h3 className="text-xl font-bold text-white">Revenue Impact</h3>
              </div>
              
              {results && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-4 bg-dark-light rounded-lg">
                    <span className="text-gray-300">Additional Monthly Revenue</span>
                    <span className="text-xl font-bold text-gold">
                      {formatCurrency(results.additionalRevenue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-dark-light rounded-lg">
                    <span className="text-gray-300">Revenue Increase</span>
                    <span className="text-lg font-bold text-green-400">
                      +{results.revenueIncrease.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-dark-light rounded-lg">
                    <span className="text-gray-300">Annual Revenue Boost</span>
                    <span className="text-lg font-bold text-gold">
                      {formatCurrency(results.additionalRevenue * 12)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Investment Details */}
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <ChartBarIcon className="h-6 w-6 text-gold mr-3" />
                <h3 className="text-xl font-bold text-white">Investment Analysis</h3>
              </div>
              
              {results && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-dark-light rounded-lg">
                    <span className="text-gray-300">Payback Period</span>
                    <span className="text-lg font-bold text-gold">
                      {results.paybackPeriod.toFixed(1)} months
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-dark-light rounded-lg">
                    <span className="text-gray-300">12-Month ROI</span>
                    <span className="text-lg font-bold text-green-400">
                      {((results.additionalRevenue * 12) / (inputs.monthlyMarketingSpend * 0.2 * 12) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Key Assumptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card p-8 mt-8"
        >
          <h3 className="text-xl font-bold text-white mb-6">AI Enhancement Projections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Traffic Increase', value: '35%', description: 'Through AI-optimized SEO and content' },
              { label: 'Conversion Boost', value: '45%', description: 'Via personalization and optimization' },
              { label: 'AOV Improvement', value: '25%', description: 'Using AI-powered recommendations' },
              { label: 'Customer Retention', value: '30%', description: 'Through predictive analytics' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gold mb-2">{item.value}</div>
                <div className="text-sm font-medium text-white mb-1">{item.label}</div>
                <div className="text-xs text-gray-400">{item.description}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm text-gray-400 text-center">
            *Projections based on industry benchmarks and Disruptors Media case studies. 
            Actual results may vary based on implementation and market conditions.
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Achieve These Results?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how AI-powered marketing can transform your business ROI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Schedule Strategy Session
            </a>
            <a href="/assessment" className="btn-secondary">
              Take AI Readiness Assessment
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ROICalculator;