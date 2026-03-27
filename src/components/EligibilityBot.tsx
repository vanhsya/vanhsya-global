'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket,
  FaCheck,
  FaTimes,
  FaSpinner
} from 'react-icons/fa';
import GlassCard from './GlassCard';

interface EligibilityStep {
  id: string;
  title: string;
  question: string;
  type: 'select' | 'input' | 'multiselect';
  options?: string[];
  required: boolean;
}

interface EligibilityResult {
  score: number;
  eligiblePrograms: string[];
  recommendations: string[];
  nextSteps: string[];
}

const eligibilitySteps: EligibilityStep[] = [
  {
    id: 'age',
    title: 'Age Information',
    question: 'What is your age?',
    type: 'select',
    options: ['18-25', '26-30', '31-35', '36-40', '41-45', '45+'],
    required: true
  },
  {
    id: 'education',
    title: 'Education Level',
    question: 'What is your highest level of education?',
    type: 'select',
    options: [
      'High School',
      'Bachelor\'s Degree',
      'Master\'s Degree',
      'PhD/Doctorate',
      'Professional Certification'
    ],
    required: true
  },
  {
    id: 'experience',
    title: 'Work Experience',
    question: 'How many years of work experience do you have?',
    type: 'select',
    options: ['0-1 years', '2-3 years', '4-5 years', '6-10 years', '10+ years'],
    required: true
  },
  {
    id: 'language',
    title: 'Language Skills',
    question: 'What is your English proficiency level?',
    type: 'select',
    options: [
      'Beginner (IELTS 4.0-5.0)',
      'Intermediate (IELTS 5.5-6.0)',
      'Advanced (IELTS 6.5-7.0)',
      'Expert (IELTS 7.5+)'
    ],
    required: true
  },
  {
    id: 'destination',
    title: 'Preferred Destination',
    question: 'Which countries are you interested in?',
    type: 'multiselect',
    options: ['Canada', 'Australia', 'UK', 'USA', 'Germany', 'New Zealand'],
    required: true
  },
  {
    id: 'purpose',
    title: 'Migration Purpose',
    question: 'What is your primary goal?',
    type: 'select',
    options: ['Study', 'Work', 'Business', 'Family Reunion', 'Investment'],
    required: true
  }
];

export default function EligibilityBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleAnswer = (stepId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [stepId]: value }));
  };

  const nextStep = () => {
    if (currentStep < eligibilitySteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateEligibility();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateEligibility = async () => {
    setIsCalculating(true);
    
    // Simulate AI calculation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock calculation logic
    let score = 0;
    const eligiblePrograms = [];
    const recommendations = [];
    const nextSteps = [];

    // Age scoring
    if (answers.age === '26-30' || answers.age === '31-35') score += 25;
    else if (answers.age === '18-25') score += 20;
    else score += 15;

    // Education scoring
    if (answers.education === 'Master\'s Degree' || answers.education === 'PhD/Doctorate') score += 25;
    else if (answers.education === 'Bachelor\'s Degree') score += 20;
    else score += 10;

    // Experience scoring
    if (answers.experience === '6-10 years' || answers.experience === '10+ years') score += 20;
    else if (answers.experience === '4-5 years') score += 15;
    else score += 10;

    // Language scoring
    if (answers.language === 'Expert (IELTS 7.5+)') score += 20;
    else if (answers.language === 'Advanced (IELTS 6.5-7.0)') score += 15;
    else score += 10;

    // Determine eligible programs
    if (score >= 80) {
      eligiblePrograms.push('Express Entry (Canada)', 'SkillSelect (Australia)', 'Skilled Worker (UK)');
      recommendations.push('You have excellent chances for skilled migration programs');
    } else if (score >= 60) {
      eligiblePrograms.push('Provincial Nominee Program', 'State Nomination (Australia)');
      recommendations.push('Consider improving language scores for better chances');
    } else {
      eligiblePrograms.push('Student Visa pathways', 'Work permit programs');
      recommendations.push('Focus on education or work experience improvement');
    }

    // Generate next steps
    nextSteps.push('Book a consultation with our certified consultants');
    nextSteps.push('Prepare required documents');
    nextSteps.push('Improve language test scores if needed');

    setResult({
      score,
      eligiblePrograms,
      recommendations,
      nextSteps
    });
    setIsCalculating(false);
  };

  const resetBot = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setIsCalculating(false);
  };

  const currentStepData = eligibilitySteps[currentStep];
  const progress = ((currentStep + 1) / eligibilitySteps.length) * 100;

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-600 to-accent-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        <FaRocket className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <GlassCard className="bg-slate-900/90 backdrop-blur-xl border-white/20">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  🤖 AI Eligibility Assessment
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Close eligibility assessment"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Content */}
              {isCalculating ? (
                <div className="text-center py-12">
                  <FaSpinner className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Analyzing Your Profile...
                  </h3>
                  <p className="text-white/70">
                    Our AI is evaluating your eligibility across 50+ immigration programs
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  {/* Score */}
                  <div className="text-center">
                    <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text mb-2">
                      {result.score}/100
                    </div>
                    <p className="text-white/70">Eligibility Score</p>
                  </div>

                  {/* Eligible Programs */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      📋 Eligible Programs
                    </h4>
                    <div className="space-y-2">
                      {result.eligiblePrograms.map((program, index) => (
                        <div key={index} className="flex items-center text-white/90">
                          <FaCheck className="w-4 h-4 text-green-400 mr-3" />
                          {program}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      💡 AI Recommendations
                    </h4>
                    <div className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <p key={index} className="text-white/80">
                          • {rec}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      🚀 Next Steps
                    </h4>
                    <div className="space-y-2">
                      {result.nextSteps.map((step, index) => (
                        <p key={index} className="text-white/80">
                          {index + 1}. {step}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={resetBot}
                      className="flex-1 bg-white/20 text-white py-3 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      Start Over
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 bg-gradient-to-r from-primary-600 to-accent-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Question */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {currentStepData.title}
                    </h3>
                    <p className="text-white/80 mb-6">{currentStepData.question}</p>

                    {/* Options */}
                    <div className="space-y-3">
                      {currentStepData.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(currentStepData.id, option)}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                            answers[currentStepData.id] === option
                              ? 'bg-primary-600 text-white border-primary-500'
                              : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
                          } border`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!answers[currentStepData.id]}
                      className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {currentStep === eligibilitySteps.length - 1 ? 'Calculate' : 'Next'}
                    </button>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
