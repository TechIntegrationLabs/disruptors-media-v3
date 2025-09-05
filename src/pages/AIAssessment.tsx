import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  LightBulbIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface Question {
  id: string;
  question: string;
  category: 'marketing' | 'technology' | 'data' | 'strategy';
  options: {
    value: number;
    label: string;
    description: string;
  }[];
}

const questions: Question[] = [
  {
    id: '1',
    category: 'marketing',
    question: 'How do you currently track customer behavior across your digital channels?',
    options: [
      { value: 1, label: 'Basic Analytics', description: 'Only Google Analytics or similar basic tracking' },
      { value: 2, label: 'Multi-Platform', description: 'Track across website, social, email separately' },
      { value: 3, label: 'Integrated Tracking', description: 'Unified view across most channels' },
      { value: 4, label: 'Advanced Attribution', description: 'Full customer journey mapping with AI insights' }
    ]
  },
  {
    id: '2',
    category: 'technology',
    question: 'What level of marketing automation do you currently use?',
    options: [
      { value: 1, label: 'Manual Processes', description: 'Mostly manual email and social posting' },
      { value: 2, label: 'Basic Automation', description: 'Email sequences and scheduled posts' },
      { value: 3, label: 'Advanced Workflows', description: 'Behavioral triggers and lead scoring' },
      { value: 4, label: 'AI-Powered', description: 'Machine learning optimization and personalization' }
    ]
  },
  {
    id: '3',
    category: 'data',
    question: 'How do you use data to make marketing decisions?',
    options: [
      { value: 1, label: 'Gut Instinct', description: 'Decisions based on experience and intuition' },
      { value: 2, label: 'Basic Reports', description: 'Monthly/quarterly reporting reviews' },
      { value: 3, label: 'Regular Analysis', description: 'Weekly data reviews with optimization' },
      { value: 4, label: 'Real-Time Optimization', description: 'AI-driven real-time campaign adjustments' }
    ]
  },
  {
    id: '4',
    category: 'strategy',
    question: 'How personalized is your customer communication?',
    options: [
      { value: 1, label: 'One-Size-Fits-All', description: 'Same message to entire audience' },
      { value: 2, label: 'Basic Segmentation', description: 'Demographic or geographic segments' },
      { value: 3, label: 'Behavioral Targeting', description: 'Based on past actions and preferences' },
      { value: 4, label: 'Dynamic Personalization', description: 'AI-powered individual customization' }
    ]
  },
  {
    id: '5',
    category: 'marketing',
    question: 'What\'s your approach to content creation?',
    options: [
      { value: 1, label: 'Ad-Hoc Creation', description: 'Create content as needed without strategy' },
      { value: 2, label: 'Content Calendar', description: 'Planned content with regular posting schedule' },
      { value: 3, label: 'Data-Driven Content', description: 'Content optimized based on performance data' },
      { value: 4, label: 'AI-Enhanced Production', description: 'AI assists in creation, optimization, and distribution' }
    ]
  },
  {
    id: '6',
    category: 'technology',
    question: 'How do you handle lead qualification and nurturing?',
    options: [
      { value: 1, label: 'Manual Review', description: 'Sales team manually reviews all leads' },
      { value: 2, label: 'Basic Scoring', description: 'Simple point-based lead scoring system' },
      { value: 3, label: 'Automated Nurturing', description: 'Automated email sequences based on behavior' },
      { value: 4, label: 'Predictive AI', description: 'AI predicts conversion probability and optimal timing' }
    ]
  }
];

const AIAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    company: ''
  });

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setContactInfo({ name: '', email: '', company: '' });
  };

  const calculateScore = () => {
    const totalPossible = questions.length * 4;
    const userScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    return Math.round((userScore / totalPossible) * 100);
  };

  const getScoreCategory = (score: number) => {
    if (score >= 80) return { label: 'AI Ready', color: 'text-green-400', bg: 'bg-green-400/20' };
    if (score >= 60) return { label: 'AI Opportunistic', color: 'text-gold', bg: 'bg-gold/20' };
    if (score >= 40) return { label: 'AI Emerging', color: 'text-orange-400', bg: 'bg-orange-400/20' };
    return { label: 'AI Beginner', color: 'text-red-400', bg: 'bg-red-400/20' };
  };

  const getRecommendations = (score: number) => {
    if (score >= 80) {
      return [
        'Implement advanced AI-powered predictive analytics',
        'Explore machine learning for dynamic pricing optimization',
        'Consider AI-driven product recommendations',
        'Develop autonomous campaign optimization systems'
      ];
    }
    if (score >= 60) {
      return [
        'Integrate customer data platforms for unified view',
        'Implement advanced marketing automation workflows',
        'Add AI-powered personalization to key touchpoints',
        'Develop predictive lead scoring models'
      ];
    }
    if (score >= 40) {
      return [
        'Set up comprehensive analytics and tracking',
        'Implement basic marketing automation',
        'Start with simple behavioral segmentation',
        'Create data-driven content optimization processes'
      ];
    }
    return [
      'Establish basic digital analytics foundation',
      'Implement email marketing automation',
      'Create structured data collection processes',
      'Develop content strategy based on audience insights'
    ];
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ?.id];

  if (showResults) {
    const score = calculateScore();
    const category = getScoreCategory(score);
    const recommendations = getRecommendations(score);

    return (
      <div className="min-h-screen bg-dark py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <ChartBarIcon className="h-16 w-16 text-gold mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">
              Your AI Readiness Results
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Score Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 text-center"
            >
              <div className="relative mb-6">
                <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-600"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${score * 2.51} 251`}
                    strokeLinecap="round"
                    className="text-gold transform -rotate-90 origin-center"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{score}%</span>
                </div>
              </div>
              
              <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium mb-4 ${category.bg} ${category.color}`}>
                {category.label}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">AI Readiness Score</h3>
              <p className="text-gray-300">
                Based on your responses across marketing, technology, data, and strategy categories.
              </p>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-8"
            >
              <div className="flex items-center mb-6">
                <LightBulbIcon className="h-6 w-6 text-gold mr-3" />
                <h3 className="text-xl font-bold text-white">Recommended Next Steps</h3>
              </div>
              
              <ul className="space-y-4">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{rec}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card p-8 mt-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Category Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['marketing', 'technology', 'data', 'strategy'].map(category => {
                const categoryQuestions = questions.filter(q => q.category === category);
                const categoryScore = categoryQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
                const categoryMax = categoryQuestions.length * 4;
                const categoryPercent = Math.round((categoryScore / categoryMax) * 100);
                
                return (
                  <div key={category} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 relative">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-gray-600"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${categoryPercent * 2.51} 251`}
                          strokeLinecap="round"
                          className="text-gold transform -rotate-90 origin-center"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{categoryPercent}%</span>
                      </div>
                    </div>
                    <h4 className="text-sm font-medium text-white capitalize">{category}</h4>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass-card p-8 mt-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Get Your Personalized AI Strategy Report
            </h3>
            <form className="space-y-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Your Name"
                value={contactInfo.name}
                onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={contactInfo.email}
                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={contactInfo.company}
                onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <button type="submit" className="btn-primary w-full">
                Get My Custom Report
              </button>
            </form>
          </motion.div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={resetAssessment}
              className="btn-secondary flex items-center"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Retake Assessment
            </button>
            <a href="/contact" className="btn-primary">
              Schedule Strategy Call
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <ChartBarIcon className="h-16 w-16 text-gold mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Marketing Readiness Assessment
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover how ready your business is for AI-powered marketing transformation.
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
              <span>Progress</span>
              <span>{currentQuestion + 1} of {questions.length}</span>
            </div>
            <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-8"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-gold text-dark text-sm font-medium rounded-full capitalize">
                  {currentQ.category}
                </span>
                <span className="text-gray-400 text-sm">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-6 leading-relaxed">
                {currentQ.question}
              </h2>
              
              <div className="space-y-4">
                {currentQ.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQ.id, option.value)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                      currentAnswer === option.value
                        ? 'border-gold bg-gold/10 text-white'
                        : 'border-white/20 bg-dark-light text-gray-300 hover:border-gold/50 hover:bg-gold/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium mb-1">{option.label}</div>
                        <div className="text-sm opacity-80">{option.description}</div>
                      </div>
                      {currentAnswer === option.value && (
                        <CheckCircleIcon className="h-6 w-6 text-gold flex-shrink-0 ml-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentQuestion === 0
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <ChevronLeftIcon className="h-5 w-5 mr-2" />
                Previous
              </button>
              
              <button
                onClick={nextQuestion}
                disabled={!currentAnswer}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  !currentAnswer
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gold text-dark hover:bg-gold-light'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'View Results' : 'Next Question'}
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIAssessment;