'use client';
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaArrowRight, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

interface CalculatorState {
  age: string;
  education: string;
  experience: string;
  language: string;
  jobOffer: string;
  country: string;
}

interface CalculatorResult {
  score: number;
  eligibility: string;
  recommendations: string[];
}

const EligibilityCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CalculatorState>({
    age: '',
    education: '',
    experience: '',
    language: '',
    jobOffer: '',
    country: ''
  });
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateScore = () => {
    let score = 0;
    let eligibility = 'Not Eligible';
    let recommendations: string[] = [];

    // Age scoring
    const ageNum = parseInt(formData.age);
    if (ageNum >= 18 && ageNum <= 35) score += 25;
    else if (ageNum >= 36 && ageNum <= 45) score += 20;
    else if (ageNum >= 46 && ageNum <= 55) score += 10;

    // Education scoring
    if (formData.education === 'masters') score += 25;
    else if (formData.education === 'bachelors') score += 20;
    else if (formData.education === 'diploma') score += 15;

    // Experience scoring
    const expNum = parseInt(formData.experience);
    if (expNum >= 6) score += 20;
    else if (expNum >= 3) score += 15;
    else if (expNum >= 1) score += 10;

    // Language scoring
    if (formData.language === 'native') score += 20;
    else if (formData.language === 'fluent') score += 15;
    else if (formData.language === 'intermediate') score += 10;

    // Job offer bonus
    if (formData.jobOffer === 'yes') score += 15;

    // Determine eligibility
    if (score >= 75) {
      eligibility = 'Highly Eligible';
      recommendations = ['Express Entry (Canada)', 'Skilled Independent (Australia)', 'Skilled Worker (UK)'];
    } else if (score >= 50) {
      eligibility = 'Eligible';
      recommendations = ['Provincial Nominee Program', 'State Sponsored Visa', 'Consider improving language scores'];
    } else if (score >= 30) {
      eligibility = 'May Be Eligible';
      recommendations = ['Consider further education', 'Gain more work experience', 'Improve language proficiency'];
    } else {
      recommendations = ['Focus on education and experience', 'Consider study visa pathway', 'Consult with our experts'];
    }

    setResult({ score, eligibility, recommendations });
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      calculateScore();
    }
  };

  const questions = [
    {
      id: 'age',
      title: 'What is your age?',
      options: [
        { value: '25', label: '18-35 years' },
        { value: '40', label: '36-45 years' },
        { value: '50', label: '46-55 years' },
        { value: '60', label: '55+ years' }
      ]
    },
    {
      id: 'education',
      title: 'What is your highest education level?',
      options: [
        { value: 'masters', label: 'Masters or PhD' },
        { value: 'bachelors', label: 'Bachelors Degree' },
        { value: 'diploma', label: 'Diploma/Certificate' },
        { value: 'high-school', label: 'High School' }
      ]
    },
    {
      id: 'experience',
      title: 'Years of skilled work experience?',
      options: [
        { value: '8', label: '6+ years' },
        { value: '4', label: '3-5 years' },
        { value: '2', label: '1-2 years' },
        { value: '0', label: 'Less than 1 year' }
      ]
    },
    {
      id: 'language',
      title: 'English language proficiency?',
      options: [
        { value: 'native', label: 'Native/Superior (IELTS 8+)' },
        { value: 'fluent', label: 'Fluent (IELTS 7-8)' },
        { value: 'intermediate', label: 'Intermediate (IELTS 6-7)' },
        { value: 'basic', label: 'Basic (IELTS <6)' }
      ]
    },
    {
      id: 'jobOffer',
      title: 'Do you have a job offer?',
      options: [
        { value: 'yes', label: 'Yes, from approved employer' },
        { value: 'no', label: 'No job offer' }
      ]
    },
    {
      id: 'country',
      title: 'Preferred destination country?',
      options: [
        { value: 'canada', label: 'Canada' },
        { value: 'australia', label: 'Australia' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'usa', label: 'United States' }
      ]
    }
  ];

  if (result) {
    return (
      <section className="section-padding bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              result.eligibility === 'Highly Eligible' ? 'bg-green-500' :
              result.eligibility === 'Eligible' ? 'bg-blue-500' :
              result.eligibility === 'May Be Eligible' ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {result.eligibility === 'Not Eligible' ? (
                <FaTimes className="text-2xl text-white" />
              ) : (
                <FaCheck className="text-2xl text-white" />
              )}
            </div>

            <h2 className="heading-md mb-4">Your Eligibility Assessment</h2>
            <div className="text-4xl font-bold mb-2">{result.score}/100</div>
            <div className={`text-xl font-semibold mb-6 ${
              result.eligibility === 'Highly Eligible' ? 'text-green-600' :
              result.eligibility === 'Eligible' ? 'text-blue-600' :
              result.eligibility === 'May Be Eligible' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {result.eligibility}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Recommended Pathways:</h3>
              <div className="space-y-2">
                {result.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-center text-left">
                    <FaArrowRight className="text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {setStep(1); setResult(null); setFormData({age: '', education: '', experience: '', language: '', jobOffer: '', country: ''});}}
                whileHover={{ scale: 1.05 }}
                className="btn-outline"
              >
                Retake Assessment
              </motion.button>
              <motion.a
                href="/consultation"
                whileHover={{ scale: 1.05 }}
                className="btn-primary"
              >
                Get Expert Consultation
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const currentQuestion = questions[step - 1];

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <FaCalculator className="text-4xl text-blue-600 mx-auto mb-4" />
            <h2 className="heading-lg mb-4">Free Eligibility Calculator</h2>
            <p className="text-gray-600">Get an instant assessment of your immigration eligibility in just 2 minutes</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {step} of {questions.length}</span>
              <span>{Math.round((step / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(step / questions.length) * 100}%` }}
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.title}</h3>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <motion.label
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                      formData[currentQuestion.id as keyof CalculatorState] === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option.value}
                      checked={formData[currentQuestion.id as keyof CalculatorState] === option.value}
                      onChange={(e) => setFormData({...formData, [currentQuestion.id]: e.target.value})}
                      className="sr-only"
                      aria-label={option.label}
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </motion.label>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <motion.button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  whileHover={{ scale: step === 1 ? 1 : 1.05 }}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    step === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  disabled={!formData[currentQuestion.id as keyof CalculatorState]}
                  whileHover={{ scale: formData[currentQuestion.id as keyof CalculatorState] ? 1.05 : 1 }}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    formData[currentQuestion.id as keyof CalculatorState]
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {step === questions.length ? 'Get Results' : 'Next'}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-6">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <FaInfoCircle className="mr-2" />
              This is a preliminary assessment. Contact our experts for detailed evaluation.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EligibilityCalculator;
