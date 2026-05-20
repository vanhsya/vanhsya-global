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
  topCountry: string;
  probability: string;
  eligiblePrograms: string[];
  recommendations: string[];
  nextSteps: string[];
}

const eligibilitySteps: EligibilityStep[] = [
  {
    id: 'nationality',
    title: 'Country of Origin',
    question: 'What is your nationality (country of origin)?',
    type: 'input',
    required: true
  },
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

    const ageMid = (v: string) => {
      if (v === '18-25') return 22;
      if (v === '26-30') return 28;
      if (v === '31-35') return 33;
      if (v === '36-40') return 38;
      if (v === '41-45') return 43;
      return 48;
    };

    const expMid = (v: string) => {
      if (v.includes('0-1')) return 1;
      if (v.includes('2-3')) return 3;
      if (v.includes('4-5')) return 5;
      if (v.includes('6-10')) return 8;
      return 10;
    };

    const english = (v: string) => {
      if (v.includes('Expert')) return 'IELTS 8.0+';
      if (v.includes('Advanced')) return 'IELTS 7.0+';
      if (v.includes('Intermediate')) return 'IELTS 6.0+';
      return 'Beginner';
    };

    const profile = {
      age: ageMid(String(answers.age || '')),
      nationality: String(answers.nationality || ''),
      educationLevel: String(answers.education || ''),
      workExperienceYears: expMid(String(answers.experience || '')),
      occupationField: 'Other',
      englishLevel: english(String(answers.language || '')),
      purpose: String(answers.purpose || ''),
      timeline: 'Just exploring options',
      targetCountries: Array.isArray(answers.destination) ? answers.destination : [],
      jobOffer: false,
      relativesInDestination: false
    };

    try {
      const res = await fetch('/api/ai/eligibility', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const json = (await res.json().catch(() => null)) as any;
      if (!res.ok || !json?.report?.results?.length) {
        setResult({
          score: 0,
          topCountry: 'Global',
          probability: 'Low',
          eligiblePrograms: ['Open the full assessment for a detailed match'],
          recommendations: ['We could not generate results for this quick widget.'],
          nextSteps: ['Open the full eligibility assessment', 'Book a consultation']
        });
        setIsCalculating(false);
        return;
      }
      const top = json.report.results[0] as any;
      const score = typeof top.score === 'number' ? top.score : 0;
      const probability = typeof top.probability === 'string' ? top.probability : 'Moderate';
      const country = typeof top.country === 'string' ? top.country : 'Destination';
      const programs = Array.isArray(top.recommendedPrograms) ? top.recommendedPrograms : Array.isArray(top.recommendations) ? top.recommendations : [];
      const gaps = Array.isArray(top.gaps) ? top.gaps : [];
      const signals = Array.isArray(top.matchedSignals) ? top.matchedSignals : [];

      setResult({
        score,
        topCountry: country,
        probability,
        eligiblePrograms: programs.slice(0, 4),
        recommendations: [...gaps.slice(0, 2), ...signals.slice(0, 1)].filter(Boolean),
        nextSteps: ['Open the full eligibility assessment', 'Book a consultation', 'Prepare your core documents']
      });
      setIsCalculating(false);
    } catch {
      setResult({
        score: 0,
        topCountry: 'Global',
        probability: 'Low',
        eligiblePrograms: ['Open the full assessment for a detailed match'],
        recommendations: ['Network error while assessing profile.'],
        nextSteps: ['Open the full eligibility assessment', 'Book a consultation']
      });
      setIsCalculating(false);
    }
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
                    <div className="mt-2 text-sm font-bold text-white/80">
                      Best match: {result.topCountry} ({result.probability})
                    </div>
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
                    {currentStepData.type === 'input' ? (
                      <input
                        type="text"
                        value={String(answers[currentStepData.id] || '')}
                        onChange={(e) => handleAnswer(currentStepData.id, e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        placeholder="Type your answer…"
                        aria-label={currentStepData.question}
                      />
                    ) : currentStepData.type === 'multiselect' ? (
                      <div className="space-y-3">
                        {currentStepData.options?.map((option) => {
                          const current = Array.isArray(answers[currentStepData.id]) ? (answers[currentStepData.id] as string[]) : [];
                          const selected = current.includes(option);
                          return (
                            <button
                              key={option}
                              onClick={() => {
                                const next = selected ? current.filter((x) => x !== option) : [...current, option];
                                handleAnswer(currentStepData.id, next);
                              }}
                              className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                                selected ? 'bg-primary-600 text-white border-primary-500' : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
                              } border`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {currentStepData.options?.map((option) => (
                          <button
                            key={option}
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
                    )}
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
                      disabled={
                        currentStepData.required
                          ? currentStepData.type === 'multiselect'
                            ? !(Array.isArray(answers[currentStepData.id]) && (answers[currentStepData.id] as string[]).length > 0)
                            : currentStepData.type === 'input'
                              ? !(typeof answers[currentStepData.id] === 'string' && String(answers[currentStepData.id]).trim().length > 0)
                              : !answers[currentStepData.id]
                          : false
                      }
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
