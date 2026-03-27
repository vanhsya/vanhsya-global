'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, 
  FaPaperPlane, 
  FaTimes, 
  FaUser
} from 'react-icons/fa';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m VANHSYA AI Assistant. I can help you with our AI innovations, CV builder, referral system, and lucky draw features. How can I assist you today?',
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        'Tell me about AI CV Builder',
        'How does the referral system work?',
        'What are the lucky draw prizes?',
        'Show me AI innovations'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: { [key: string]: string } = {
    'cv builder': 'Our AI CV Builder offers 4 professional templates: Modern, Creative, Executive, and Academic. It uses AI to optimize your content and helps you create industry-specific CVs that stand out!',
    'referral': 'Our referral system lets you earn rewards by inviting friends! Generate your unique referral code, share it, and earn points for every successful referral. Points can be redeemed for premium features.',
    'lucky draw': 'Join our monthly lucky draw for exciting prizes! Entry is automatic for active users. Current prizes include premium subscriptions, AI consultation sessions, and innovation grants up to $1,000!',
    'ai innovations': 'We offer cutting-edge AI solutions including smart CV building, intelligent referral systems, automated lucky draws, AI analytics, and transparent innovation tracking. All with 100% transparency!',
    'pricing': 'We believe in transparency! Many of our AI features are free to start. Premium features start at just $9.99/month with no hidden fees. Check our pricing page for detailed information.',
    'support': 'Our AI-powered support is available 24/7! You can also reach our human experts via email at support@vanhsya.com or through our contact form. We typically respond within 2 hours.'
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (input.includes(key)) {
        return response;
      }
    }
    
    if (input.includes('hello') || input.includes('hi')) {
      return 'Hello! I\'m excited to help you explore our AI innovations. What would you like to know about?';
    }
    
    if (input.includes('thank')) {
      return 'You\'re very welcome! Is there anything else about our AI platform I can help you with?';
    }
    
    return 'That\'s a great question! While I\'m still learning, I\'d recommend checking our AI innovations page or contacting our experts for detailed information. Is there something specific about our AI tools I can help with?';
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => {
      const userMessage: Message = {
        id: String(prev.length + 1),
        text,
        isBot: false,
        timestamp: new Date(),
      };
      return [...prev, userMessage];
    });
    setInputText('');
    setIsTyping(true);

    const delayMs = 900 + Math.min(900, text.trim().length * 18);
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => {
        const botMessage: Message = {
          id: String(prev.length + 1),
          text: botResponse,
          isBot: true,
          timestamp: new Date(),
          suggestions: text.toLowerCase().includes('cv')
            ? ['Show CV templates', 'How to optimize CV?', 'CV pricing']
            : text.toLowerCase().includes('referral')
              ? ['Generate referral code', 'Referral rewards', 'How to share?']
              : ['Tell me about pricing', 'Contact support', 'View features'],
        };
        return [...prev, botMessage];
      });
      setIsTyping(false);
    }, delayMs);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <FaTimes className="text-white text-xl" />
        ) : (
          <FaRobot className="text-white text-xl" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaRobot className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold">VANHSYA AI Assistant</h3>
                  <p className="text-xs text-blue-100">Always here to help!</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isBot 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.isBot && (
                        <FaRobot className="text-blue-600 mt-1 flex-shrink-0" />
                      )}
                      {!message.isBot && (
                        <FaUser className="text-white mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.text}</p>
                        {message.suggestions && (
                          <div className="mt-3 space-y-1">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSendMessage(suggestion)}
                                className="block w-full text-left text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex items-center space-x-1">
                      <FaRobot className="text-blue-600" />
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                  placeholder="Ask about our AI innovations..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <motion.button
                  onClick={() => handleSendMessage(inputText)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
