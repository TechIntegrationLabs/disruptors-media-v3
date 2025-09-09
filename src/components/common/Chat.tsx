import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  UserIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

// OpenAI Configuration
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: "Hi! I'm here to help you learn more about our AI-powered marketing solutions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Company knowledge base
  const COMPANY_KNOWLEDGE = `
    Disruptors Media is a leading AI-powered marketing agency with 12+ years of experience.
    
    Services:
    1. AI Marketing Solutions - Predictive analytics, automated personalization, intelligent campaign optimization. Average ROI increase of 240%.
    2. Digital Transformation - Business process optimization, technology integration, data analytics.
    3. Content Production - Video, podcast, photography, written content creation with professional studio.
    4. Studio Services - Professional studio in North Salt Lake with BlackMagic 4K cameras, professional lighting, acoustic treatment. Hourly rentals at $99/hour.
    
    Key Stats:
    - Generated over $50M in revenue for clients
    - Average 85% increase in conversion rates
    - Average 120% revenue growth for clients
    - 12+ years in business
    
    Pricing:
    - Small business packages start at $5K
    - Enterprise solutions available
    - Free 30-minute strategy sessions
    
    Contact:
    - Strategy session booking: cal.com/disruptors-media/strategy-session
    - Contact form available on website
    - ROI calculator available for potential returns estimation
    
    Location: North Salt Lake, Utah
    
    Specialties: AI integration, marketing automation, video production, podcast production, business intelligence
  `;

  // OpenAI API integration
  const getOpenAIResponse = async (userMessage: string): Promise<string> => {
    if (!OPENAI_API_KEY) {
      return getFallbackResponse(userMessage);
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant for Disruptors Media. Use this knowledge base to answer questions accurately and conversationally. Always be helpful, professional, and encourage users to book a consultation or use our tools when appropriate. Knowledge base: ${COMPANY_KNOWLEDGE}`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || getFallbackResponse(userMessage);
    } catch (error) {
      console.warn('OpenAI API failed, using fallback:', error);
      return getFallbackResponse(userMessage);
    }
  };

  // Fallback responses when OpenAI is unavailable
  const getFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('pricing') || message.includes('cost') || message.includes('price')) {
      return "Our pricing depends on your specific needs and project scope. We offer packages starting from $5K for small businesses up to enterprise solutions. Would you like to schedule a free consultation to discuss your requirements?";
    }
    
    if (message.includes('ai') || message.includes('artificial intelligence')) {
      return "We specialize in AI-powered marketing solutions including predictive analytics, automated personalization, and intelligent campaign optimization. Our AI tools have helped clients increase ROI by an average of 240%. What specific AI challenges are you facing?";
    }
    
    if (message.includes('studio') || message.includes('video') || message.includes('podcast')) {
      return "Our professional studio in North Salt Lake features state-of-the-art equipment including BlackMagic 4K cameras, professional lighting, and acoustic treatment. We offer hourly rentals starting at $99/hour or full production services. Would you like to book a tour?";
    }
    
    if (message.includes('results') || message.includes('roi') || message.includes('success')) {
      return "We've generated over $50M in revenue for our clients over 12+ years. Recent case studies show average increases of 85% in conversion rates and 120% in revenue growth. Check out our ROI calculator to estimate your potential returns!";
    }
    
    if (message.includes('contact') || message.includes('meeting') || message.includes('call')) {
      return "I'd love to connect you with our team! You can schedule a free 30-minute strategy session at cal.com/disruptors-media/strategy-session or fill out our contact form. What time works best for you?";
    }
    
    if (message.includes('services') || message.includes('what do you do')) {
      return "We offer four main services: 1) AI Marketing Solutions, 2) Digital Transformation, 3) Content Production, and 4) Professional Studio Services. Which area interests you most?";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Great to meet you. I'm here to help you discover how AI-powered marketing can transform your business. What brings you to Disruptors Media today?";
    }
    
    return "That's a great question! For detailed information and personalized recommendations, I'd suggest scheduling a call with our team. They can provide specific insights for your business. Would you like me to help you book a consultation?";
  };

  const simulateTyping = async (message: string): Promise<void> => {
    setIsTyping(true);
    
    // Add typing indicator
    const typingMessage: Message = {
      id: Date.now().toString(),
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);
    
    // Wait for realistic typing time
    await new Promise(resolve => setTimeout(resolve, 1000 + (message.length * 20)));
    
    // Remove typing indicator and add actual message
    setMessages(prev => {
      const withoutTyping = prev.filter(msg => !msg.typing);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: message,
        sender: 'bot',
        timestamp: new Date()
      };
      return [...withoutTyping, botMessage];
    });
    
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    // Generate and send bot response
    const response = await getOpenAIResponse(currentInput);
    await simulateTyping(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gold hover:bg-gold-light'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-dark" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-dark border border-gold/20 rounded-lg shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-sophisticated p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                    <ComputerDesktopIcon className="h-4 w-4 text-dark" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Assistant</h3>
                    <p className="text-gray-300 text-xs">Usually replies in a few seconds</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-end space-x-2 max-w-[80%]">
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <ComputerDesktopIcon className="h-3 w-3 text-dark" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-gold text-dark'
                          : 'bg-dark-light text-white'
                      }`}
                    >
                      {message.typing ? (
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserIcon className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gold/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gold/30 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold !text-white"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 bg-gold hover:bg-gold-light disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
                >
                  <PaperAirplaneIcon className="h-4 w-4 text-dark" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-dark-light rounded-b-lg">
              <div className="flex flex-wrap gap-2">
                {[
                  'Pricing info',
                  'Book a call',
                  'ROI Calculator',
                  'AI Assessment'
                ].map((action) => (
                  <button
                    key={action}
                    onClick={() => setInputValue(action)}
                    className="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full hover:bg-gold/30 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;