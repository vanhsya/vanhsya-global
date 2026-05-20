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
    id: 'nationality',
    question: 'What is your country of origin (nationality)?',
    type: 'input',
    placeholder: 'e.g., India'
  },
  {
    id: 'currentCountry',
    question: 'Where do you currently live? (optional)',
    type: 'input',
    placeholder: 'e.g., UAE'
  },
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
    id: 'fieldOfStudy',
    question: 'What is your field of study? (optional)',
    type: 'input',
    placeholder: 'e.g., Computer Science'
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
    id: 'ieltsOverall',
    question: 'IELTS overall score (optional, 0–9)',
    type: 'input',
    placeholder: 'e.g., 7.5'
  },
  {
    id: 'occupation',
    question: 'What is your current occupation field?',
    type: 'single',
    options: ['Information Technology', 'Engineering', 'Healthcare', 'Education', 'Finance', 'Business/Management', 'Skilled Trades', 'Arts/Creative', 'Other']
  },
  {
    id: 'jobOffer',
    question: 'Do you have a job offer in your target country?',
    type: 'single',
    options: ['Yes', 'No']
  },
  {
    id: 'fundsUsd',
    question: 'Available settlement funds (USD, optional)',
    type: 'input',
    placeholder: 'e.g., 20000'
  },
  {
    id: 'relativesInDestination',
    question: 'Do you have close relatives in your destination country?',
    type: 'single',
    options: ['Yes', 'No']
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
  },
  {
    id: 'notes',
    question: 'Anything else we should know? (optional)',
    type: 'input',
    placeholder: 'e.g., spouse profile, certifications, budget constraints'
  }
];

interface AssessmentResult {
  countryId: string;
  country: string;
  score: number;
  probability: string;
  recommendedPrograms: string[];
  nextSteps: string[];
  estimatedTime: string;
  flag: string;
  matchedSignals: string[];
  gaps: string[];
}

type EligibilityReport = {
  normalized: { nationality: string | null; currentCountry: string | null; targets: string[] };
  issues: { field: string; message: string }[];
  results: AssessmentResult[];
};

type EligibilityApiResponse = { ok: true; report: EligibilityReport; ai: null | { summary: string; keyMatches: string[]; highestLeverageImprovements: string[]; disclaimers: string[] }; offline: boolean };

export default function EligibilityBot() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<EligibilityReport | null>(null);
  const [ai, setAi] = useState<EligibilityApiResponse['ai']>(null);
  const [offline, setOffline] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitError(null);
    setReport(null);
    setAi(null);
    setOffline(false);

    const num = (v: unknown) => {
      if (typeof v === 'number') return v;
      if (typeof v === 'string' && v.trim()) return Number(v);
      return undefined;
    };

    const profile = {
      age: typeof answers.age === 'number' ? answers.age : num(answers.age),
      nationality: typeof answers.nationality === 'string' ? answers.nationality : '',
      currentCountry: typeof answers.currentCountry === 'string' ? answers.currentCountry : undefined,
      educationLevel: typeof answers.education === 'string' ? answers.education : '',
      fieldOfStudy: typeof answers.fieldOfStudy === 'string' ? answers.fieldOfStudy : undefined,
      workExperienceYears: typeof answers.experience === 'number' ? answers.experience : num(answers.experience),
      occupationField: typeof answers.occupation === 'string' ? answers.occupation : '',
      englishLevel: typeof answers.language === 'string' ? answers.language : undefined,
      ieltsOverall: num(answers.ieltsOverall),
      jobOffer: answers.jobOffer === 'Yes',
      fundsUsd: num(answers.fundsUsd),
      relativesInDestination: answers.relativesInDestination === 'Yes',
      purpose: typeof answers.purpose === 'string' ? answers.purpose : '',
      timeline: typeof answers.timeline === 'string' ? answers.timeline : undefined,
      targetCountries: Array.isArray(answers.countries) ? (answers.countries as string[]) : [],
      notes: typeof answers.notes === 'string' ? answers.notes : undefined
    };

    try {
      const res = await fetch('/api/ai/eligibility', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const json = (await res.json().catch(() => null)) as EligibilityApiResponse | { error?: string } | null;
      if (!res.ok) {
        setSubmitError((json as any)?.error || 'Failed to assess eligibility.');
        setIsLoading(false);
        return;
      }
      const ok = json as EligibilityApiResponse;
      setReport(ok.report);
      setAi(ok.ai);
      setOffline(ok.offline);
      setIsLoading(false);
      setShowResults(true);
    } catch {
      setSubmitError('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const results = report?.results ?? [];
    
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
              {report?.issues?.length ? (
                <div className="modern-card border border-amber-200/60 bg-amber-50">
                  <div className="font-extrabold text-amber-900">Profile checks</div>
                  <div className="mt-2 text-sm text-amber-800 space-y-1">
                    {report.issues.map((x) => (
                      <div key={`${x.field}:${x.message}`}>• {x.message}</div>
                    ))}
                  </div>
                </div>
              ) : null}

              {ai ? (
                <div className="modern-card border border-indigo-200/60 bg-indigo-50">
                  <div className="font-extrabold text-indigo-900">AI summary</div>
                  <div className="mt-2 text-sm text-indigo-900/90 whitespace-pre-wrap">{ai.summary}</div>
                  {ai.highestLeverageImprovements?.length ? (
                    <div className="mt-4">
                      <div className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Highest leverage improvements</div>
                      <div className="mt-2 text-sm text-indigo-900/90 space-y-1">
                        {ai.highestLeverageImprovements.slice(0, 6).map((x) => (
                          <div key={x}>• {x}</div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {offline ? (
                    <div className="mt-4 text-xs font-bold text-indigo-700">AI is in offline mode; results are computed deterministically from your profile.</div>
                  ) : null}
                </div>
              ) : offline ? (
                <div className="modern-card border border-indigo-200/60 bg-indigo-50">
                  <div className="font-extrabold text-indigo-900">Offline analysis</div>
                  <div className="mt-2 text-sm text-indigo-900/90">
                    AI is currently offline. Results below are computed deterministically from your full profile answers.
                  </div>
                </div>
              ) : null}

              {results.map((result, index) => (
                <motion.div
                  key={result.countryId}
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
                            {result.recommendedPrograms.map((rec, recIndex) => (
                              <li key={`${recIndex}:${rec}`} className="text-sm text-gray-600 flex items-start">
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
                            {result.nextSteps.map((step, idx) => (
                              <li key={step} className="text-sm text-gray-600 flex items-start">
                                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                  <span className="text-xs text-blue-600 font-semibold">{idx + 1}</span>
                                </div>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 grid md:grid-cols-2 gap-6">
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                          <div className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">Matched profile signals</div>
                          <div className="mt-3 text-sm text-gray-700 space-y-1">
                            {result.matchedSignals.slice(0, 8).map((x) => (
                              <div key={x}>• {x}</div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                          <div className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">Gaps / improvements</div>
                          <div className="mt-3 text-sm text-gray-700 space-y-1">
                            {result.gaps.length ? (
                              result.gaps.slice(0, 8).map((x) => <div key={x}>• {x}</div>)
                            ) : (
                              <div>• No major gaps detected from the submitted profile.</div>
                            )}
                          </div>
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
            {submitError ? <div className="text-sm text-red-600 font-semibold mb-6">{submitError}</div> : null}
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

                {currentQ.type === 'input' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={(answers[currentQ.id] as string) || ''}
                      onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                      placeholder={currentQ.placeholder || ''}
                      className="w-full h-12 px-4 rounded-2xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                      aria-label={currentQ.question}
                    />
                    {currentQ.id === 'ieltsOverall' ? (
                      <div className="text-xs text-gray-500">
                        If you provide IELTS, it will be used instead of the coarse English level selection.
                      </div>
                    ) : null}
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
