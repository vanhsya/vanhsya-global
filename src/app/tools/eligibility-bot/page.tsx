'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, CheckCircle, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
}

interface EligibilityResult {
  score: number;
  eligible: boolean;
  recommendations: string[];
  nextSteps: string[];
}

const questions = [
  {
    id: 'age',
    question: "What is your age?",
    type: 'options',
    options: ['18-25', '26-30', '31-35', '36-40', '41-45', '45+']
  },
  {
    id: 'education',
    question: "What is your highest level of education?",
    type: 'options',
    options: ['High School', 'Diploma/Certificate', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD/Doctorate']
  },
  {
    id: 'experience',
    question: "How many years of work experience do you have?",
    type: 'options',
    options: ['0-1 years', '2-3 years', '4-5 years', '6-8 years', '9+ years']
  },
  {
    id: 'language',
    question: "What is your English proficiency level?",
    type: 'options',
    options: ['Beginner', 'Intermediate', 'Advanced', 'Native/IELTS 8+']
  },
  {
    id: 'destination',
    question: "Which country are you interested in?",
    type: 'options',
    options: ['Canada', 'Australia', 'USA', 'UK', 'Germany', 'New Zealand']
  },
  {
    id: 'occupation',
    question: "What is your occupation?",
    type: 'options',
    options: ['IT/Software', 'Healthcare', 'Engineering', 'Business/Finance', 'Education', 'Skilled Trades', 'Other']
  }
];

export default function EligibilityBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your Immigration Eligibility Assistant. I'll help you assess your eligibility for immigration programs. Let's start with a few questions.",
      timestamp: new Date()
    }
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const askQuestion = useCallback(() => {
    if (currentQuestionIndex >= questions.length) return;
    
    setIsTyping(true);
    
    setTimeout(() => {
      const question = questions[currentQuestionIndex];
      setMessages(prev => {
        const newMessage: Message = {
          id: String(prev.length + 1),
          type: 'bot',
          content: question.question,
          timestamp: new Date(),
          options: question.options
        };
        return [...prev, newMessage];
      });
      setIsTyping(false);
    }, 1500);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (currentQuestionIndex < questions.length && !isComplete) {
      const timer = setTimeout(() => {
        askQuestion();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, isComplete, askQuestion]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    setMessages(prev => {
      const userMessage: Message = {
        id: String(prev.length + 1),
        type: 'user',
        content: answer,
        timestamp: new Date(),
      };
      return [...prev, userMessage];
    });
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Complete assessment
      completeAssessment({ ...answers, [currentQuestion.id]: answer });
    }
  };

  const calculateEligibility = (userAnswers: Record<string, string>): EligibilityResult => {
    let score = 0;
    const recommendations: string[] = [];
    const nextSteps: string[] = [];

    // Age scoring
    if (userAnswers.age === '26-30' || userAnswers.age === '31-35') score += 25;
    else if (userAnswers.age === '18-25') score += 20;
    else if (userAnswers.age === '36-40') score += 15;
    else score += 10;

    // Education scoring
    if (userAnswers.education === 'PhD/Doctorate') score += 25;
    else if (userAnswers.education === 'Master\'s Degree') score += 23;
    else if (userAnswers.education === 'Bachelor\'s Degree') score += 21;
    else if (userAnswers.education === 'Diploma/Certificate') score += 15;
    else score += 5;

    // Experience scoring
    if (userAnswers.experience === '9+ years') score += 20;
    else if (userAnswers.experience === '6-8 years') score += 18;
    else if (userAnswers.experience === '4-5 years') score += 15;
    else if (userAnswers.experience === '2-3 years') score += 10;
    else score += 5;

    // Language scoring
    if (userAnswers.language === 'Native/IELTS 8+') score += 20;
    else if (userAnswers.language === 'Advanced') score += 15;
    else if (userAnswers.language === 'Intermediate') score += 10;
    else score += 5;

    // Add recommendations based on answers
    if (userAnswers.destination === 'Canada') {
      recommendations.push("Express Entry system is ideal for your profile");
      nextSteps.push("Take IELTS test if not already done");
      nextSteps.push("Get Educational Credential Assessment (ECA)");
    }

    if (userAnswers.occupation === 'IT/Software') {
      recommendations.push("Tech professionals are in high demand");
      score += 5;
    }

    if (score < 50) {
      recommendations.push("Consider improving language skills");
      recommendations.push("Gain more work experience");
    }

    const eligible = score >= 65;
    
    if (eligible) {
      nextSteps.push("Book a consultation with our experts");
      nextSteps.push("Prepare your document checklist");
    } else {
      nextSteps.push("Work on improving your profile");
      nextSteps.push("Consider alternative immigration pathways");
    }

    return {
      score,
      eligible,
      recommendations,
      nextSteps
    };
  };

  const completeAssessment = (finalAnswers: Record<string, string>) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const result = calculateEligibility(finalAnswers);
      setEligibilityResult(result);
      
      setMessages(prev => {
        const resultMessage: Message = {
          id: String(prev.length + 1),
          type: 'bot',
          content: `Based on your answers, your eligibility score is ${result.score}/100. ${
            result.eligible
              ? "🎉 Great news! You appear to be eligible for immigration programs."
              : "Your profile needs some improvements to meet standard requirements."
          }`,
          timestamp: new Date(),
        };
        return [...prev, resultMessage];
      });
      setIsComplete(true);
      setIsTyping(false);
    }, 2000);
  };

  const restartAssessment = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "Hello! I'm your Immigration Eligibility Assistant. I'll help you assess your eligibility for immigration programs. Let's start with a few questions.",
        timestamp: new Date()
      }
    ]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsComplete(false);
    setEligibilityResult(null);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="section-padding pt-32 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="heading-xl text-white mb-6">
              AI Immigration <span className="text-gradient-cyan">Eligibility Bot</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Get an instant assessment of your immigration eligibility with our intelligent chatbot.
              Answer a few questions and receive personalized recommendations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="modern-card p-0 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Eligibility Assistant</h3>
                    <p className="text-white/80">Online • Ready to help</p>
                  </div>
                  <div className="ml-auto">
                    <button 
                      onClick={restartAssessment}
                      className="btn-secondary bg-white/20 border-white/30 hover:bg-white/30"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Restart
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-xs lg:max-w-md ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      } rounded-2xl px-4 py-3`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        
                        {message.options && (
                          <div className="mt-3 space-y-2">
                            {message.options.map((option, index) => (
                              <motion.button
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleAnswer(option)}
                                className="block w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-purple-50 transition-colors text-gray-700 text-sm"
                              >
                                {option}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>

                      {message.type === 'user' && (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Results Panel */}
            {eligibilityResult && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-8 grid md:grid-cols-2 gap-6"
              >
                {/* Score Card */}
                <div className={`modern-card ${eligibilityResult.eligible ? 'card-green' : 'card-orange'}`}>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {eligibilityResult.score}/100
                    </div>
                    <div className="flex items-center justify-center gap-2 text-white/90">
                      {eligibilityResult.eligible ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      <span className="font-medium">
                        {eligibilityResult.eligible ? 'Eligible' : 'Needs Improvement'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="modern-card">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">Recommendations</h4>
                  <ul className="space-y-2">
                    {eligibilityResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div className="md:col-span-2">
                  <div className="modern-card">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Next Steps</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <ul className="space-y-2">
                          {eligibilityResult.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600">
                              <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-3">
                        <button className="btn-primary">
                          Book Free Consultation
                        </button>
                        <button className="btn-secondary">
                          Download Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
