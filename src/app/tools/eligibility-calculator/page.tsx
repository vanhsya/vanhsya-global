'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FaCalculator, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

interface EligibilityForm {
  // Personal Information
  age: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  nationality: string;
  currentCountry: string;
  
  // Education
  educationLevel: 'high-school' | 'diploma' | 'bachelor' | 'master' | 'phd';
  fieldOfStudy: string;
  
  // Work Experience
  workExperience: number;
  currentOccupation: string;
  skillsAssessment: boolean;
  
  // Language Skills
  englishLevel: 'none' | 'basic' | 'intermediate' | 'advanced' | 'native';
  secondLanguage: string;
  secondLanguageLevel: 'none' | 'basic' | 'intermediate' | 'advanced' | 'native';
  
  // Financial
  funds: number;
  jobOffer: boolean;
  provincialNomination: boolean;
  
  // Family
  spouseEducation: 'none' | 'high-school' | 'diploma' | 'bachelor' | 'master' | 'phd';
  spouseWorkExperience: number;
  spouseLanguage: 'none' | 'basic' | 'intermediate' | 'advanced' | 'native';
  children: number;
  relativesInDestination: boolean;
}

interface CountryScore {
  country: string;
  score: number;
  maxScore: number;
  percentage: number;
  eligible: boolean;
  requirements: string[];
  recommendations: string[];
  processingTime: string;
  minInvestment: string;
  pathways: Array<{
    name: string;
    description: string;
    timeframe: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
}

const EligibilityCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EligibilityForm>({
    age: 25,
    maritalStatus: 'single',
    nationality: '',
    currentCountry: '',
    educationLevel: 'bachelor',
    fieldOfStudy: '',
    workExperience: 0,
    currentOccupation: '',
    skillsAssessment: false,
    englishLevel: 'intermediate',
    secondLanguage: '',
    secondLanguageLevel: 'none',
    funds: 0,
    jobOffer: false,
    provincialNomination: false,
    spouseEducation: 'none',
    spouseWorkExperience: 0,
    spouseLanguage: 'none',
    children: 0,
    relativesInDestination: false
  });
  const [results, setResults] = useState<CountryScore[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const totalSteps = 5;

  const calculateEligibility = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const countryScores: CountryScore[] = [
        calculateCanadaScore(),
        calculateAustraliaScore(),
        calculateUSAScore(),
        calculateUKScore(),
        calculateGermanyScore()
      ];
      
      setResults(countryScores.sort((a, b) => b.percentage - a.percentage));
      setIsCalculating(false);
      setShowResults(true);
    }, 2000);
  };

  const calculateCanadaScore = (): CountryScore => {
    let score = 0;
    const maxScore = 1200; // Express Entry CRS system
    const requirements: string[] = [];
    const recommendations: string[] = [];

    // Age scoring (maximum 110 points)
    if (formData.age >= 20 && formData.age <= 29) score += 110;
    else if (formData.age >= 30 && formData.age <= 34) score += 105;
    else if (formData.age >= 35 && formData.age <= 39) score += 100;
    else if (formData.age >= 40 && formData.age <= 44) score += 95;
    else if (formData.age >= 45) score += 50;

    // Education (maximum 150 points)
    const educationPoints = {
      'high-school': 30,
      'diploma': 90,
      'bachelor': 120,
      'master': 135,
      'phd': 150
    };
    score += educationPoints[formData.educationLevel];

    // Language (maximum 280 points for first language)
    const languagePoints = {
      'none': 0,
      'basic': 50,
      'intermediate': 150,
      'advanced': 230,
      'native': 280
    };
    score += languagePoints[formData.englishLevel];

    // Work experience (maximum 80 points)
    if (formData.workExperience >= 6) score += 80;
    else if (formData.workExperience >= 4) score += 70;
    else if (formData.workExperience >= 2) score += 50;
    else if (formData.workExperience >= 1) score += 40;

    // Job offer bonus
    if (formData.jobOffer) score += 200;

    // Provincial nomination bonus
    if (formData.provincialNomination) score += 600;

    // Requirements and recommendations
    if (formData.englishLevel === 'none' || formData.englishLevel === 'basic') {
      requirements.push('Improve English language skills (minimum CLB 7 required)');
    }
    if (formData.workExperience < 1) {
      requirements.push('Gain at least 1 year of skilled work experience');
    }
    if (!formData.skillsAssessment) {
      recommendations.push('Complete Educational Credential Assessment (ECA)');
    }
    if (formData.funds < 13000) {
      requirements.push('Show proof of funds (minimum CAD $13,000 for single applicant)');
    }

    const pathways = [
      {
        name: 'Express Entry - Federal Skilled Worker',
        description: 'Points-based system for skilled workers',
        timeframe: '6-8 months',
        difficulty: 'medium' as const
      },
      {
        name: 'Provincial Nominee Program (PNP)',
        description: 'Province-specific nomination programs',
        timeframe: '12-18 months',
        difficulty: 'medium' as const
      },
      {
        name: 'Start-up Visa Program',
        description: 'For entrepreneurs with innovative business ideas',
        timeframe: '12-16 months',
        difficulty: 'hard' as const
      }
    ];

    return {
      country: 'Canada',
      score,
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
      eligible: score >= 470, // Typical CRS cutoff
      requirements,
      recommendations,
      processingTime: '6-12 months',
      minInvestment: 'CAD $13,000',
      pathways
    };
  };

  const calculateAustraliaScore = (): CountryScore => {
    let score = 0;
    const maxScore = 130; // SkillSelect points system
    const requirements: string[] = [];
    const recommendations: string[] = [];

    // Age scoring
    if (formData.age >= 25 && formData.age <= 32) score += 30;
    else if (formData.age >= 33 && formData.age <= 39) score += 25;
    else if (formData.age >= 40 && formData.age <= 44) score += 15;
    else if (formData.age >= 45) score += 0;

    // English language
    const englishPoints = {
      'none': 0,
      'basic': 0,
      'intermediate': 10,
      'advanced': 20,
      'native': 20
    };
    score += englishPoints[formData.englishLevel];

    // Education
    const educationPoints = {
      'high-school': 0,
      'diploma': 10,
      'bachelor': 15,
      'master': 15,
      'phd': 20
    };
    score += educationPoints[formData.educationLevel];

    // Work experience
    if (formData.workExperience >= 8) score += 20;
    else if (formData.workExperience >= 5) score += 15;
    else if (formData.workExperience >= 3) score += 10;
    else if (formData.workExperience >= 1) score += 5;

    // Skills assessment required
    if (!formData.skillsAssessment) {
      requirements.push('Complete skills assessment for your occupation');
    }

    if (formData.englishLevel === 'none' || formData.englishLevel === 'basic') {
      requirements.push('Achieve competent English (IELTS 6.0 minimum)');
    }

    const pathways = [
      {
        name: 'Skilled Independent Visa (189)',
        description: 'Points-based permanent residence visa',
        timeframe: '8-12 months',
        difficulty: 'medium' as const
      },
      {
        name: 'Skilled Nominated Visa (190)',
        description: 'State/territory nominated visa',
        timeframe: '10-14 months',
        difficulty: 'medium' as const
      },
      {
        name: 'Business Innovation Visa (188)',
        description: 'For business owners and investors',
        timeframe: '12-18 months',
        difficulty: 'hard' as const
      }
    ];

    return {
      country: 'Australia',
      score,
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
      eligible: score >= 65, // Minimum points requirement
      requirements,
      recommendations: [...recommendations, 'Consider regional migration for additional points'],
      processingTime: '8-12 months',
      minInvestment: 'AUD $25,000',
      pathways
    };
  };

  const calculateUSAScore = (): CountryScore => {
    let score = 0;
    const maxScore = 100;
    const requirements: string[] = [];
    const recommendations: string[] = [];

    // Education
    if (formData.educationLevel === 'phd') score += 30;
    else if (formData.educationLevel === 'master') score += 25;
    else if (formData.educationLevel === 'bachelor') score += 20;
    else if (formData.educationLevel === 'diploma') score += 10;

    // Work experience
    if (formData.workExperience >= 5) score += 25;
    else if (formData.workExperience >= 3) score += 20;
    else if (formData.workExperience >= 1) score += 15;

    // Job offer significantly important for USA
    if (formData.jobOffer) score += 35;
    else requirements.push('US job offer typically required for most pathways');

    // English proficiency
    if (formData.englishLevel === 'advanced' || formData.englishLevel === 'native') score += 10;
    else if (formData.englishLevel === 'intermediate') score += 5;

    const pathways = [
      {
        name: 'H-1B Specialty Occupation',
        description: 'Temporary work visa for skilled professionals',
        timeframe: '6-12 months',
        difficulty: 'hard' as const
      },
      {
        name: 'EB-2/EB-3 Employment-Based Green Card',
        description: 'Permanent residence through employment',
        timeframe: '2-5 years',
        difficulty: 'hard' as const
      },
      {
        name: 'EB-5 Investor Visa',
        description: 'Investment-based permanent residence',
        timeframe: '18-24 months',
        difficulty: 'hard' as const
      }
    ];

    return {
      country: 'United States',
      score,
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
      eligible: score >= 60 && formData.jobOffer,
      requirements: [...requirements, 'Bachelor\'s degree or equivalent', 'Clean background check'],
      recommendations: [...recommendations, 'Consider L-1 visa if employed by multinational company'],
      processingTime: '12-24 months',
      minInvestment: '$900,000 (EB-5)',
      pathways
    };
  };

  const calculateUKScore = (): CountryScore => {
    let score = 0;
    const maxScore = 100;
    const requirements: string[] = [];
    const recommendations: string[] = [];

    // Job offer (required for most routes)
    if (formData.jobOffer) score += 40;
    else requirements.push('Job offer from UK employer typically required');

    // Education
    if (formData.educationLevel === 'phd') score += 20;
    else if (formData.educationLevel === 'master') score += 15;
    else if (formData.educationLevel === 'bachelor') score += 10;

    // English language
    if (formData.englishLevel === 'advanced' || formData.englishLevel === 'native') score += 20;
    else if (formData.englishLevel === 'intermediate') score += 10;
    else requirements.push('English language proficiency required (B2 level minimum)');

    // Work experience
    if (formData.workExperience >= 5) score += 15;
    else if (formData.workExperience >= 3) score += 10;
    else if (formData.workExperience >= 1) score += 5;

    // Funds
    if (formData.funds >= 2500) score += 5; // £2,500 minimum

    const pathways = [
      {
        name: 'Skilled Worker Visa',
        description: 'Points-based work visa for skilled professionals',
        timeframe: '3-6 months',
        difficulty: 'medium' as const
      },
      {
        name: 'Global Talent Visa',
        description: 'For leaders and potential leaders in specific fields',
        timeframe: '4-8 months',
        difficulty: 'hard' as const
      },
      {
        name: 'Innovator Founder Visa',
        description: 'For entrepreneurs with innovative business ideas',
        timeframe: '6-12 months',
        difficulty: 'hard' as const
      }
    ];

    return {
      country: 'United Kingdom',
      score,
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
      eligible: score >= 70 && formData.jobOffer,
      requirements: [...requirements, 'Minimum salary threshold (typically £26,200)'],
      recommendations: [...recommendations, 'Consider shortage occupation list for easier qualification'],
      processingTime: '3-8 months',
      minInvestment: '£50,000 (business routes)',
      pathways
    };
  };

  const calculateGermanyScore = (): CountryScore => {
    let score = 0;
    const maxScore = 100;
    const requirements: string[] = [];
    const recommendations: string[] = [];

    // Education
    if (formData.educationLevel === 'phd') score += 25;
    else if (formData.educationLevel === 'master') score += 20;
    else if (formData.educationLevel === 'bachelor') score += 15;
    else if (formData.educationLevel === 'diploma') score += 10;

    // Work experience
    if (formData.workExperience >= 5) score += 20;
    else if (formData.workExperience >= 2) score += 15;
    else if (formData.workExperience >= 1) score += 10;

    // Language skills
    if (formData.secondLanguage === 'German') {
      if (formData.secondLanguageLevel === 'advanced' || formData.secondLanguageLevel === 'native') score += 25;
      else if (formData.secondLanguageLevel === 'intermediate') score += 15;
      else if (formData.secondLanguageLevel === 'basic') score += 5;
    } else {
      recommendations.push('Learn German for better opportunities');
    }

    // English proficiency
    if (formData.englishLevel === 'advanced' || formData.englishLevel === 'native') score += 15;
    else if (formData.englishLevel === 'intermediate') score += 10;

    // Job offer
    if (formData.jobOffer) score += 15;

    const pathways = [
      {
        name: 'EU Blue Card',
        description: 'For highly qualified professionals',
        timeframe: '2-4 months',
        difficulty: 'medium' as const
      },
      {
        name: 'Skilled Immigration Act',
        description: 'Points-based system for skilled workers',
        timeframe: '3-6 months',
        difficulty: 'medium' as const
      },
      {
        name: 'Freelance/Self-Employment Visa',
        description: 'For self-employed professionals',
        timeframe: '4-8 months',
        difficulty: 'hard' as const
      }
    ];

    return {
      country: 'Germany',
      score,
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
      eligible: score >= 60,
      requirements: [...requirements, 'Recognized qualification or university degree', 'Sufficient financial resources'],
      recommendations: [...recommendations, 'Consider obtaining German language certification'],
      processingTime: '2-6 months',
      minInvestment: '€25,000 (self-employment)',
      pathways
    };
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateEligibility();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof EligibilityForm, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  min="18"
                  max="65"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={(e) => updateFormData('maritalStatus', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nationality
                </label>
                <input
                  id="nationality"
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => updateFormData('nationality', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Indian, Pakistani, Bangladeshi"
                />
              </div>

              <div>
                <label htmlFor="currentCountry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Country of Residence
                </label>
                <input
                  id="currentCountry"
                  type="text"
                  value={formData.currentCountry}
                  onChange={(e) => updateFormData('currentCountry', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., India, Pakistan, UAE"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education & Work Experience</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Highest Education Level
                </label>
                <select
                  id="educationLevel"
                  value={formData.educationLevel}
                  onChange={(e) => updateFormData('educationLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="high-school">High School</option>
                  <option value="diploma">Diploma/Certificate</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD/Doctorate</option>
                </select>
              </div>

              <div>
                <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Field of Study
                </label>
                <input
                  id="fieldOfStudy"
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => updateFormData('fieldOfStudy', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Computer Science, Engineering, Medicine"
                />
              </div>

              <div>
                <label htmlFor="workExperience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Years of Work Experience
                </label>
                <input
                  id="workExperience"
                  type="number"
                  min="0"
                  max="30"
                  value={formData.workExperience}
                  onChange={(e) => updateFormData('workExperience', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="currentOccupation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Occupation
                </label>
                <input
                  id="currentOccupation"
                  type="text"
                  value={formData.currentOccupation}
                  onChange={(e) => updateFormData('currentOccupation', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Engineer, Doctor, Teacher"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="skillsAssessment"
                checked={formData.skillsAssessment}
                onChange={(e) => updateFormData('skillsAssessment', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="skillsAssessment" className="text-sm text-gray-700 dark:text-gray-300">
                I have completed or am willing to complete skills assessment/credential evaluation
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Language Skills</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="englishLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  English Proficiency Level
                </label>
                <select
                  id="englishLevel"
                  value={formData.englishLevel}
                  onChange={(e) => updateFormData('englishLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="none">No English</option>
                  <option value="basic">Basic (A1-A2)</option>
                  <option value="intermediate">Intermediate (B1-B2)</option>
                  <option value="advanced">Advanced (C1-C2)</option>
                  <option value="native">Native Speaker</option>
                </select>
              </div>

              <div>
                <label htmlFor="secondLanguage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Second Language
                </label>
                <input
                  id="secondLanguage"
                  type="text"
                  value={formData.secondLanguage}
                  onChange={(e) => updateFormData('secondLanguage', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., French, German, Spanish"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="secondLanguageLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Second Language Proficiency Level
                </label>
                <select
                  id="secondLanguageLevel"
                  value={formData.secondLanguageLevel}
                  onChange={(e) => updateFormData('secondLanguageLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!formData.secondLanguage}
                >
                  <option value="none">No Proficiency</option>
                  <option value="basic">Basic (A1-A2)</option>
                  <option value="intermediate">Intermediate (B1-B2)</option>
                  <option value="advanced">Advanced (C1-C2)</option>
                  <option value="native">Native Speaker</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Language Testing Information</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Most countries require standardized language test results (IELTS, TOEFL, PTE for English; TEF, DELF for French).
                Higher scores significantly improve your eligibility.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Financial & Employment Status</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="funds" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Available Funds (USD)
                </label>
                <input
                  id="funds"
                  type="number"
                  min="0"
                  value={formData.funds}
                  onChange={(e) => updateFormData('funds', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 50000"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="jobOffer"
                  checked={formData.jobOffer}
                  onChange={(e) => updateFormData('jobOffer', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="jobOffer" className="text-sm text-gray-700 dark:text-gray-300">
                  I have a valid job offer from the destination country
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="provincialNomination"
                  checked={formData.provincialNomination}
                  onChange={(e) => updateFormData('provincialNomination', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="provincialNomination" className="text-sm text-gray-700 dark:text-gray-300">
                  I have or can obtain provincial/state nomination
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="relativesInDestination"
                  checked={formData.relativesInDestination}
                  onChange={(e) => updateFormData('relativesInDestination', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="relativesInDestination" className="text-sm text-gray-700 dark:text-gray-300">
                  I have close relatives in the destination country
                </label>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Financial Requirements Vary</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Each country has different minimum fund requirements. Having more funds available shows financial stability
                and can improve your application success rate.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Family Information</h3>
            
            {formData.maritalStatus === 'married' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="spouseEducation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Spouse's Education Level
                  </label>
                  <select
                    id="spouseEducation"
                    value={formData.spouseEducation}
                    onChange={(e) => updateFormData('spouseEducation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="none">No formal education</option>
                    <option value="high-school">High School</option>
                    <option value="diploma">Diploma/Certificate</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD/Doctorate</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="spouseWorkExperience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Spouse's Work Experience (Years)
                  </label>
                  <input
                    id="spouseWorkExperience"
                    type="number"
                    min="0"
                    max="30"
                    value={formData.spouseWorkExperience}
                    onChange={(e) => updateFormData('spouseWorkExperience', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="spouseLanguage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Spouse's English Level
                  </label>
                  <select
                    id="spouseLanguage"
                    value={formData.spouseLanguage}
                    onChange={(e) => updateFormData('spouseLanguage', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="none">No English</option>
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="native">Native</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="children" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Dependent Children
              </label>
              <input
                id="children"
                type="number"
                min="0"
                max="10"
                value={formData.children}
                onChange={(e) => updateFormData('children', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Ready to Calculate!</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Click "Calculate Eligibility" to see your eligibility scores for different countries and get personalized
                recommendations for your immigration journey.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <FaCalculator className="w-16 h-16 text-blue-600" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Immigration Eligibility Calculator
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Get instant eligibility assessment for multiple countries including Canada, Australia, USA, UK, and Germany.
              Our advanced calculator analyzes your profile and provides personalized recommendations.
            </motion.p>
          </div>

          {!showResults ? (
            <div className="max-w-4xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Step {currentStep} of {totalSteps}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {Math.round((currentStep / totalSteps) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Form Card */}
              <motion.div
                layout
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>{currentStep === totalSteps ? 'Calculate Eligibility' : 'Next'}</span>
                    {currentStep !== totalSteps && <span>→</span>}
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {isCalculating ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Calculating Your Eligibility...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Analyzing your profile across multiple immigration programs
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  {/* Results Header */}
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Your Eligibility Results
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Based on your profile, here's your eligibility assessment for different countries
                    </p>
                  </div>

                  {/* Country Results */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {results.map((result, index) => (
                      <motion.div
                        key={result.country}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 ${
                          result.eligible 
                            ? 'border-green-500' 
                            : result.percentage >= 50 
                            ? 'border-yellow-500' 
                            : 'border-red-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {result.country}
                          </h3>
                          <div className={`flex items-center space-x-1 ${
                            result.eligible 
                              ? 'text-green-600' 
                              : result.percentage >= 50 
                              ? 'text-yellow-600' 
                              : 'text-red-600'
                          }`}>
                            {result.eligible ? (
                              <FaCheckCircle className="w-5 h-5" />
                            ) : result.percentage >= 50 ? (
                              <FaExclamationTriangle className="w-5 h-5" />
                            ) : (
                              <FaInfoCircle className="w-5 h-5" />
                            )}
                            <span className="font-medium">
                              {result.eligible ? 'Eligible' : result.percentage >= 50 ? 'Possible' : 'Not Eligible'}
                            </span>
                          </div>
                        </div>

                        {/* Score Display */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Score: {result.score}/{result.maxScore}
                            </span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {result.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${
                                result.eligible 
                                  ? 'bg-green-500' 
                                  : result.percentage >= 50 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(result.percentage, 100)}%` }}
                            />
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <FaCalendarAlt className="w-4 h-4 text-gray-500 inline mr-2" />
                            <span className="text-gray-600 dark:text-gray-400">Processing: {result.processingTime}</span>
                          </div>
                          <div>
                            <FaDollarSign className="w-4 h-4 text-gray-500 inline mr-2" />
                            <span className="text-gray-600 dark:text-gray-400">Min. Investment: {result.minInvestment}</span>
                          </div>
                        </div>

                        {/* Requirements */}
                        {result.requirements.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Requirements:</h4>
                            <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                              {result.requirements.slice(0, 2).map((req, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Top Pathway */}
                        {result.pathways.length > 0 && (
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Best Pathway:</h4>
                            <div className="text-sm">
                              <div className="font-medium text-blue-600">{result.pathways[0].name}</div>
                              <div className="text-gray-600 dark:text-gray-400">{result.pathways[0].description}</div>
                              <div className="text-gray-500 text-xs mt-1">
                                {result.pathways[0].timeframe} • {result.pathways[0].difficulty} difficulty
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="text-center space-y-4">
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setCurrentStep(1);
                      }}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-4"
                    >
                      Recalculate
                    </button>
                    
                    <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Get Detailed Consultation
                    </button>
                    
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Disclaimer:</strong> This calculator provides estimates based on general program requirements. 
                        Actual eligibility may vary. Consult with our immigration experts for detailed assessment.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EligibilityCalculator;
