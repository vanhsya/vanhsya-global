'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowRight, ArrowLeft, CheckCircle, Clock, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'slider' | 'input';
  options?: string[];
  min?: number;
  max?: number;
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: 'age',
    question: 'What is your age?',
    type: 'slider',
    min: 18,
    max: 65
  },
  {
    id: 'education',
    question: 'What is your highest level of education?',
    type: 'single',
    options: ['High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD/Doctorate', 'Professional Certification']
  },
  {
    id: 'experience',
    question: 'How many years of work experience do you have?',
    type: 'slider',
    min: 0,
    max: 20
  },
  {
    id: 'language',
    question: 'What is your English proficiency level?',
    type: 'single',
    options: ['Beginner', 'Intermediate', 'Advanced', 'Native/Fluent', 'IELTS 6.0+', 'IELTS 7.0+', 'IELTS 8.0+']
  },
  {
    id: 'occupation',
    question: 'What is your current occupation field?',
    type: 'single',
    options: ['Information Technology', 'Engineering', 'Healthcare', 'Education', 'Finance', 'Business/Management', 'Skilled Trades', 'Arts/Creative', 'Other']
  },
  {
    id: 'countries',
    question: 'Which countries are you interested in?',
    type: 'multiple',
    options: ['Canada', 'Australia', 'United Kingdom', 'United States', 'Germany', 'New Zealand', 'Singapore', 'UAE']
  },
  {
    id: 'purpose',
    question: 'What is your primary immigration purpose?',
    type: 'single',
    options: ['Work/Employment', 'Study', 'Family Reunification', 'Business/Investment', 'Permanent Residence', 'Tourism/Visit']
  },
  {
    id: 'timeline',
    question: 'When do you plan to immigrate?',
    type: 'single',
    options: ['Within 6 months', '6-12 months', '1-2 years', '2+ years', 'Just exploring options']
  }
];

interface AssessmentResult {
  country: string;
  score: number;
  probability: string;
  recommendations: string[];
  nextSteps: string[];
  estimatedTime: string;
  flag: string;
}

export default function EligibilityBot() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (questionId: string, answer: string | number | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      generateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const generateResults = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
    setShowResults(true);
  };

  const getRecommendations = (): AssessmentResult[] => {
    // AI-powered logic would go here
    const baseResults: AssessmentResult[] = [
      {
        country: 'Canada',
        score: 85,
        probability: 'Very High',
        flag: '🇨🇦',
        recommendations: [
          'Apply for Express Entry Pool',
          'Improve IELTS score to 7.0+ for better chances',
          'Consider Provincial Nominee Program',
          'Get Educational Credential Assessment'
        ],
        nextSteps: [
          'Create Express Entry profile',
          'Take IELTS exam',
          'Get documents assessed',
          'Build Canadian work experience'
        ],
        estimatedTime: '8-12 months'
      },
      {
        country: 'Australia',
        score: 78,
        probability: 'High',
        flag: '🇦🇺',
        recommendations: [
          'Check occupation on skilled list',
          'Get skills assessment completed',
          'Apply for SkillSelect',
          'Consider regional sponsorship'
        ],
        nextSteps: [
          'Skills assessment application',
          'Submit EOI through SkillSelect',
          'Prepare for invitation',
          'Gather all documents'
        ],
        estimatedTime: '10-14 months'
      },
      {
        country: 'United Kingdom',
        score: 72,
        probability: 'Moderate',
        flag: '🇬🇧',
        recommendations: [
          'Secure job offer from UK employer',
          'Check Skilled Worker Visa requirements',
          'Consider Global Talent Visa if applicable',
          'Improve English proficiency'
        ],
        nextSteps: [
          'Job search with UK employers',
          'Apply for Certificate of Sponsorship',
          'Prepare visa application',
          'Book biometrics appointment'
        ],
        estimatedTime: '6-10 months'
      }
    ];

    return baseResults.sort((a, b) => b.score - a.score);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const results = getRecommendations();
    
    return (
      <div className="min-h-screen">
        <Navigation />
        
        <section className="section-padding pt-32 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="heading-xl text-gray-800 mb-6">
                Your <span className="text-gradient-cyan">Eligibility Assessment</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Based on your profile, here are your best immigration opportunities ranked by success probability
              </p>
            </motion.div>

            <div className="space-y-8">
              {results.map((result, index) => (
                <motion.div
                  key={result.country}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="modern-card overflow-hidden"
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <div className="text-center p-6">
                        <span className="text-6xl mb-4 block">{result.flag}</span>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{result.country}</h3>
                        <div className="text-3xl font-bold text-blue-600 mb-2">{result.score}%</div>
                        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          result.probability === 'Very High' ? 'bg-green-100 text-green-700' :
                          result.probability === 'High' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {result.probability} Success Rate
                        </div>
                        <div className="mt-4 text-gray-600">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {result.estimatedTime}
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2 p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <Star className="w-4 h-4 mr-2 text-yellow-500" />
                            Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {result.recommendations.map((rec, recIndex) => (
                              <li key={recIndex} className="text-sm text-gray-600 flex items-start">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                            Next Steps
                          </h4>
                          <ul className="space-y-2">
                            {result.nextSteps.map((step, stepIndex) => (
                              <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                  <span className="text-xs text-blue-600 font-semibold">{stepIndex + 1}</span>
                                </div>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary text-sm"
                          >
                            Start Application
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-secondary text-sm"
                          >
                            Get Expert Consultation
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-secondary text-sm"
                          >
                            Download Report
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                className="btn-secondary"
              >
                Take Assessment Again
              </button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        <section className="section-padding pt-32 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Processing Your Profile...</h2>
            <p className="text-gray-600 mb-6">Our advanced algorithms are analyzing your responses and matching you with the best immigration opportunities.</p>
            <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3 }}
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding pt-32 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center">
        <div className="container-max w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="modern-card p-8"
              >
                <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQ.question}</h2>
                </div>

                {/* Single Choice */}
                {currentQ.type === 'single' && (
                  <div className="space-y-3">
                    {currentQ.options?.map((option) => (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(currentQ.id, option)}
                        className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-300 ${
                          answers[currentQ.id] === option
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Multiple Choice */}
                {currentQ.type === 'multiple' && (
                  <div className="space-y-3">
                    {currentQ.options?.map((option) => (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const current = answers[currentQ.id] as string[] || [];
                          const updated = current.includes(option)
                            ? current.filter((item: string) => item !== option)
                            : [...current, option];
                          handleAnswer(currentQ.id, updated);
                        }}
                        className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-300 ${
                          (answers[currentQ.id] as string[] || []).includes(option)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 border-2 rounded mr-3 ${
                            (answers[currentQ.id] as string[] || []).includes(option)
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {(answers[currentQ.id] as string[] || []).includes(option) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          {option}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Slider */}
                {currentQ.type === 'slider' && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {answers[currentQ.id] || currentQ.min}
                      </div>
                      <div className="text-gray-500">
                        {currentQ.id === 'age' ? 'years old' : 'years of experience'}
                      </div>
                    </div>
                    <input
                      type="range"
                      min={currentQ.min}
                      max={currentQ.max}
                      value={answers[currentQ.id] as number || currentQ.min}
                      onChange={(e) => handleAnswer(currentQ.id, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      aria-label={currentQ.question}
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{currentQ.min}</span>
                      <span>{currentQ.max}+</span>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      currentQuestion === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextQuestion}
                    disabled={!answers[currentQ.id] || (currentQ.type === 'multiple' && (answers[currentQ.id] as string[] || []).length === 0)}
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      !answers[currentQ.id] || (currentQ.type === 'multiple' && (answers[currentQ.id] as string[] || []).length === 0)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
